package middlewares

import (
	"bytes"
	"encoding/json"
	"graphql-test-api/types"
	"io"
	"net/http"
)

func PersistQuery(next http.Handler, queryManifest types.QueryManifest) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)
		var requestBody types.RequestBody
		json.Unmarshal(body, &requestBody)
		requestHashQuery := requestBody.Extensions.PersistedQuery.Sha256Hash
		var queryBody string
		for _, operation := range queryManifest.Operations {
			if operation.ID == requestHashQuery {
				queryBody = operation.Body
			}
		}
		if queryBody == "" {
			w.WriteHeader(http.StatusBadRequest)
		}

		// edit body
		type EgressBody struct {
			OperationName string `json:"operationName"`
			Variables     struct{}
			Query         string `json:"query"`
		}
		var egressBody EgressBody
		egressBody.OperationName = requestBody.OperationName
		egressBody.Query = queryBody
		egressBody.Variables = requestBody.Variables
		egressBodyJSON, _ := json.Marshal(egressBody)
		r.Body = io.NopCloser(bytes.NewBuffer(egressBodyJSON))
		next.ServeHTTP(w, r)
	})
}
