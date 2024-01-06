package main

import (
	"context"
	"entgo.io/ent/dialect/sql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"graphql-test-api/ent"
	"graphql-test-api/ent/migrate"
	"graphql-test-api/graph"
	"graphql-test-api/graph/generated"
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
	drv, err := sql.Open("mysql", os.Getenv("DSN")+"?parseTime=True")
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

	client, err := Open()
	if err != nil {
		log.Fatalf("failed opening connection to MySQL: %v", err)
	}
	defer client.Close()
	ctx := context.Background()
	err = client.Schema.Create(
		ctx,
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	)
	if err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		Client: client,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", CORS((srv)))
	//http.Handle("/query", EnsureValidToken()(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//
	//	//next.ServeHTTP(w, r)
	//	fmt.Println("ok")
	//	token := r.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
	//	err := token.CustomClaims.Validate(ctx)
	//	if err != nil {
	//		return
	//	}
	//	fmt.Println(token)
	//	//ctx = context.WithValue(ctx, "token", token)
	//	claims := token.CustomClaims.(*middleware.CustomClaims)
	//	if !claims.HasScope("read:messages") {
	//		w.WriteHeader(http.StatusForbidden)
	//		w.Write([]byte(`{"message":"Insufficient scope."}`))
	//		return
	//	}
	//
	//})))

	//),
	//)))
	//http.Handle("/query", c.Handler(srv))
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
