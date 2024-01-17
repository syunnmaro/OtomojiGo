package synthesize

import (
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"context"
	"encoding/json"
	"fmt"
	"graphql-test-api/ent"
	"log"
	"net/http"
	"net/url"
)

func HandleRequest(ctx context.Context, w http.ResponseWriter, r *http.Request, client *texttospeech.Client, entClient *ent.Client) {
	//TODO: 認可を行う
	u, _ := url.Parse(r.URL.String())
	query := u.Query()

	if query.Get("format") == "" {
		w.WriteHeader(http.StatusBadRequest)
		m := map[string]string{"message": "format parameter is required"}
		if err := json.NewEncoder(w).Encode(m); err != nil {
			log.Println(err)
		}

	}

	length := r.ContentLength
	body := make([]byte, length)
	var options Options
	r.Body.Read(body)

	if err := json.Unmarshal(body, &options); err != nil {
		fmt.Println(err)
	}
	options.Separate = query.Get("separate")
	options.Format = query.Get("format")

	resp, err := Synthesize(ctx, options, client, entClient)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.WriteHeader(http.StatusOK)
	switch query.Get("format") {
	case "base64":
		w.Write(resp.AudioContent)
	case "mp3":
		w.Header().Set("Content-Type", "audio/mpeg")
		w.Write(resp.AudioContent)
	default:
		w.WriteHeader(http.StatusBadRequest)
		m := map[string]string{"message": "format parameter must be either base64 or mp3"}
		if err := json.NewEncoder(w).Encode(m); err != nil {
			log.Println(err)
		}
	}

}
