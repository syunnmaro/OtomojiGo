package types

type Operation struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
	Body string `json:"body"`
}

type QueryManifest struct {
	Format     string      `json:"format"`
	Version    string      `json:"version"`
	Operations []Operation `json:"operations"`
}

type RequestBody struct {
	OperationName string `json:"operationName"`
	Variables     struct {
	} `json:"variables"`
	Extensions struct {
		PersistedQuery struct {
			Version    int    `json:"version"`
			Sha256Hash string `json:"sha256Hash"`
		} `json:"persistedQuery"`
	} `json:"extensions"`
}
