package synthesize

import (
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
	"context"
	"graphql-test-api/ent"
	_ "log"
)

type Options struct {
	Text     string `json:"text"`
	Speed    string `json:"speed"`
	Pitch    string `json:"pitch"`
	Volume   string `json:"volume"`
	Voice    string `json:"voice"`
	Separate string `json:"separate"`
	Format   string `json:"format"`
}

func Synthesize(ctx context.Context, options Options, client *texttospeech.Client, entClient *ent.Client) (*texttospeechpb.SynthesizeSpeechResponse, error) {
	if options.Separate == "true" {
		// workIDの取得
		//partsの取得
		//synthesize
	}
	req := texttospeechpb.SynthesizeSpeechRequest{
		// Set the text input to be synthesized.
		Input: &texttospeechpb.SynthesisInput{
			InputSource: &texttospeechpb.SynthesisInput_Text{Text: "Hello, World!"},
		},
		// Build the voice request, select the language code ("en-US") and the SSML
		// voice gender ("neutral").
		Voice: &texttospeechpb.VoiceSelectionParams{
			LanguageCode: "en-US",
			SsmlGender:   texttospeechpb.SsmlVoiceGender_NEUTRAL,
		},
		// Select the type of audio file you want returned.
		AudioConfig: &texttospeechpb.AudioConfig{
			AudioEncoding: texttospeechpb.AudioEncoding_MP3,
		},
	}

	resp, err := client.SynthesizeSpeech(ctx, &req)
	return resp, err

}
