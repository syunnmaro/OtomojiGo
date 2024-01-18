package main

import (
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"context"
	"encoding/json"
	"entgo.io/ent/dialect/sql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
	"graphql-test-api/ent"
	"graphql-test-api/ent/migrate"
	"graphql-test-api/graph"
	"graphql-test-api/graph/generated"
	middleware "graphql-test-api/middlewares"
	"graphql-test-api/synthesize"
	"graphql-test-api/types"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

const defaultPort = "8080"

func Open() (*ent.Client, error) {
	err := godotenv.Load()
	log.Print(err)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	drv, err := sql.Open("mysql", os.Getenv("DSN")+"&parseTime=True")
	if err != nil {
		return nil, err
	}
	db := drv.DB()
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	db.SetConnMaxLifetime(time.Hour)
	var entOptions []ent.Option
	entOptions = append(entOptions, ent.Debug())
	entOptions = append(entOptions, ent.Driver(drv))
	return ent.NewClient(entOptions...), nil
}

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	entClient, err := Open()
	if err != nil {
		log.Fatalf("failed opening connection to MySQL: %v", err)
	}
	defer entClient.Close()
	ctx := context.Background()
	ttsClient, err := texttospeech.NewClient(ctx, option.WithCredentialsFile("serviceAccount.json"))
	if err != nil {
		log.Fatal(err)
	}
	defer ttsClient.Close()

	querymanifestJson, err := os.Open("persisted-query-manifest.json")
	if err != nil {
		log.Fatal(err)
	}
	defer querymanifestJson.Close()

	querymanifestJsonBytes, err := io.ReadAll(querymanifestJson)
	if err != nil {
		log.Fatal(err)
	}
	var queryManifest types.QueryManifest
	err = json.Unmarshal(querymanifestJsonBytes, &queryManifest)

	err = entClient.Schema.Create(
		ctx,
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	)
	if err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		Client: entClient,
	}}))
	// TODO 本番時に消す
	// TODO PersistedQuery
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/synthesize", middleware.CORS(middleware.PersistQuery(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		synthesize.HandleRequest(ctx, w, r, ttsClient, entClient)
	}), queryManifest)))
	http.Handle("/query", middleware.CORS(middleware.EnsureValidToken()(middleware.PersistQuery(srv, queryManifest))))
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
