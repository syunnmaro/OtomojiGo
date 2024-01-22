package synthesize

import (
	"archive/zip"
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"context"
	"encoding/json"
	"fmt"
	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"graphql-test-api/ent"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/work"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
)

const FormatMp3 = "mp3"
const FormatBase64 = "base64"
const SeparateTrue = "true"
const SeparateFalse = "false"

func HandleRequest(ctx context.Context, w http.ResponseWriter, r *http.Request, client *texttospeech.Client, entClient *ent.Client) {

	workId := r.RequestURI
	first, err := entClient.Work.Query().Where(work.IDEQ(workId)).Select("author_id").First(ctx)
	if err != nil {

	}
	payload := ctx.Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
	authorId := strings.Split(payload.RegisteredClaims.Subject, "|")[1]
	if first.AuthorID != authorId {
		w.WriteHeader(http.StatusForbidden)
		m := map[string]string{"message": "403 forbidden"}
		if err := json.NewEncoder(w).Encode(m); err != nil {
			log.Println(err)
		}
	}
	u, _ := url.Parse(r.URL.String())
	query := u.Query()

	if query.Get("format") == "" || query.Get("separate") != "mp3" || query.Get("separate") != "base64" {
		w.WriteHeader(http.StatusBadRequest)
		m := map[string]string{"message": "format parameter is required"}
		if err := json.NewEncoder(w).Encode(m); err != nil {
			log.Println(err)
		}

	}
	if query.Get("separate") != "" || query.Get("separate") != "true" || query.Get("separate") != "false" {
		w.WriteHeader(http.StatusBadRequest)
		m := map[string]string{"message": "separate parameter must be either true or false"}
		if err := json.NewEncoder(w).Encode(m); err != nil {
			log.Println(err)
		}
	}
	format := query.Get("format")
	separate := query.Get("separate")

	if format == FormatMp3 {
		parts, err := entClient.Part.Query().Where(part.WorkIDEQ(workId)).Select("id").All(ctx)
		if err != nil {

		}
		audios := make([][]byte, len(parts))
		for _, p := range parts {
			blocks, err := entClient.Block.Query().Where(block.PartIDEQ(p.ID)).Select("texts").All(ctx)
			if err != nil {

			}
			ssml := generateSSML(blocks)
			audio, err := compile(ctx, ssml, client)
			if err != nil {

			}
			audios = append(audios, audio.AudioContent)

		}
		if separate == SeparateTrue {
			w.Header().Set("Content-Type", "application/zip")
			w.Header().Set("Content-Disposition", "attachment; filename=audio.zip")
			zipWriter := zip.NewWriter(w)
			defer zipWriter.Close()
			for i, a := range audios {
				f, err := zipWriter.Create(fmt.Sprintf("audio%d.mp3", i))
				if err != nil {
					log.Fatal(err)
				}
				_, err = f.Write(a)
				if err != nil {
					log.Fatal(err)
				}
			}
			return
		}
		if separate == SeparateFalse {
			w.Header().Set("Content-Type", "audio/mpeg")
			for _, a := range audios {
				w.Write(a)
			}
			return
		}

	}
	if format == FormatBase64 {
		body, _ := io.ReadAll(r.Body)
		blocks := make([]*ent.Block, 0)
		if err := json.Unmarshal(body, &blocks); err != nil {
			fmt.Println(err)
		}
		ssml := generateSSML(blocks)
		audio, err := compile(ctx, ssml, client)
		if err != nil {

		}
		w.WriteHeader(http.StatusOK)
		w.Write(audio.AudioContent)
		return
	}
}
