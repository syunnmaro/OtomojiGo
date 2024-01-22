package synthesize

import (
	"graphql-test-api/ent"
	"strconv"
	"strings"
)

type SSML struct {
	string
}

func generateSSML(blocks []*ent.Block) SSML {
	var result []string
	result = append(result, "<speak>")
	for _, block := range blocks {
		result = append(result, "<voice name="+block.Speaker+">")
		result = append(result, block.Texts)
		result = append(result, "</voice>")
		result = append(result, "<break time="+strconv.Itoa(block.Duration)+"/>")
	}
	result = append(result, "</speak>")
	ssml := SSML{strings.Join(result, "")}
	return ssml
}
