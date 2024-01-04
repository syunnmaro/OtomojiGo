import textToSpeech from '@google-cloud/text-to-speech'
import { number, string } from 'superstruct'
import { credentials } from '@grpc/grpc-js'

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

export async function synthesizeText(
    text: string,
    speaker: string,
    pitch: number,
    volume: number,
    speed: number,
    duration: number
) {
    const languageCode = speaker.split('-')[0] + '-' + speaker.split('-')[1]
    console.log(duration)
    const ssml = `<speak>${text}<break time="${duration}s"/></speak>`
    console.log(ssml)
    const request = {
        input: { ssml: ssml },
        voice: { name: speaker, languageCode: languageCode },
        audioConfig: {
            audioEncoding: 'MP3',
            pitch: pitch,
            speakingRate: speed,
        },
    }

    // @ts-ignore
    const [response] = await client.synthesizeSpeech(request)
    return response.audioContent.toString('base64')
}
