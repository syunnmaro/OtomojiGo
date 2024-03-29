export type Speaker = {
    // jp: Record<"Neural2_B" | "Neural2_C" | "Neural2_D" | "Standard_A" | "Standard_B" | "Standard_C" | "Standard_D" | "WaveNet_A" | "WaveNet_B" | "WaveNet_C" | "WaveNet_D", string>;
    jp: Record<
        | 'Standard_A'
        | 'Standard_B'
        | 'Standard_C'
        | 'Standard_D'
        | 'WaveNet_A'
        | 'WaveNet_B'
        | 'WaveNet_C'
        | 'WaveNet_D',
        string
    >
    en_AU: Record<
        | 'Neural2_A'
        | 'Neural2_B'
        | 'Neural2_C'
        | 'Neural2_D'
        | 'News_E'
        | 'News_F'
        | 'News_G'
        | 'Polyglot_1'
        | 'Standard_A'
        | 'Standard_B'
        | 'Standard_C'
        | 'Standard_D'
        | 'WaveNet_A'
        | 'WaveNet_B'
        | 'WaveNet_C'
        | 'WaveNet_D',
        string
    >
    en_IN: Record<
        | 'Neural2_A'
        | 'Neural2_B'
        | 'Neural2_C'
        | 'Neural2_D'
        | 'Standard_A'
        | 'Standard_B'
        | 'Standard_C'
        | 'Standard_D'
        | 'WaveNetA'
        | 'WaveNetB'
        | 'WaveNetC'
        | 'WaveNetD',
        string
    >
    en_GB: Record<
        | 'Neural2_A'
        | 'Neural2_B'
        | 'Neural2_C'
        | 'Neural2_D'
        | 'Neural2_E'
        | 'Neural2_F'
        | 'News_G'
        | 'News_H'
        | 'News_I'
        | 'News_J'
        | 'News_K'
        | 'News_L'
        | 'News_M'
        | 'Standard_A'
        | 'Standard_B'
        | 'Standard_C'
        | 'Standard_D'
        | 'Standard_E'
        | 'Standard_F'
        | 'WaveNet_A'
        | 'WaveNet_B'
        | 'WaveNet_C'
        | 'WaveNet_D'
        | 'WaveNet_E'
        | 'WaveNet_F',
        string
    >
    en_US: Record<
        | 'Neural2_A'
        | 'Neural2_B'
        | 'Neural2_C'
        | 'Neural2_D'
        | 'Neural2_E'
        | 'Neural2_F'
        | 'Neural2_G'
        | 'Neural2_H'
        | 'Neural2_I'
        | 'Neural2_J'
        | 'News_K'
        | 'News_L'
        | 'News_M'
        | 'News_N'
        | 'Polyglot_1'
        | 'Standard_A'
        | 'Standard_B'
        | 'Standard_C'
        | 'Standard_D'
        | 'Standard_E'
        | 'Standard_F'
        | 'Standard_G'
        | 'Standard_H'
        | 'Standard_I'
        | 'Standard_J'
        | 'WaveNet_A'
        | 'WaveNet_B'
        | 'WaveNet_C'
        | 'WaveNet_D'
        | 'WaveNet_E'
        | 'WaveNet_F'
        | 'WaveNet_G'
        | 'WaveNet_H'
        | 'WaveNet_I'
        | 'WaveNet_J',
        string
    >
}

export const GoogleSpeaker: Speaker = {
    jp: {
        // Neural2_B: "ja-JP-Neural2-B",
        // Neural2_C: "ja-JP-Neural2-C",
        // Neural2_D: "ja-JP-Neural2-D",
        Standard_A: 'ja-JP-Standard-A',
        Standard_B: 'ja-JP-Standard-B',
        Standard_C: 'ja-JP-Standard-C',
        Standard_D: 'ja-JP-Standard-D',
        WaveNet_A: 'ja-JP-Wavenet-A',
        WaveNet_B: 'ja-JP-Wavenet-B',
        WaveNet_C: 'ja-JP-Wavenet-C',
        WaveNet_D: 'ja-JP-Wavenet-D',
    },
    en_AU: {
        Neural2_A: 'en-AU-Neural2-A',
        Neural2_B: 'en-AU-Neural2-B',
        Neural2_C: 'en-AU-Neural2-C',
        Neural2_D: 'en-AU-Neural2-D',
        News_E: 'en-AU-News-E',
        News_F: 'en-AU-News-F',
        News_G: 'en-AU-News-G',
        Polyglot_1: 'en-AU-Polyglot-1',
        Standard_A: 'en-AU-Standard-A',
        Standard_B: 'en-AU-Standard-B',
        Standard_C: 'en-AU-Standard-C',
        Standard_D: 'en-AU-Standard-D',
        WaveNet_A: 'en-AU-Wavenet-A',
        WaveNet_B: 'en-AU-Wavenet-B',
        WaveNet_C: 'en-AU-Wavenet-C',
        WaveNet_D: 'en-AU-Wavenet-D',
    },
    en_IN: {
        Neural2_A: 'en-IN-Neural2-A',
        Neural2_B: 'en-IN-Neural2-B',
        Neural2_C: 'en-IN-Neural2-C',
        Neural2_D: 'en-IN-Neural2-D',
        Standard_A: 'en-IN-Standard-A',
        Standard_B: 'en-IN-Standard-B',
        Standard_C: 'en-IN-Standard-C',
        Standard_D: 'en-IN-Standard-D',
        WaveNetA: 'en-IN-Wavenet-A',
        WaveNetB: 'en-IN-Wavenet-B',
        WaveNetC: 'en-IN-Wavenet-C',
        WaveNetD: 'en-IN-Wavenet-D',
    },
    en_GB: {
        Neural2_A: 'en-GB-Neural2-A',
        Neural2_B: 'en-GB-Neural2-B',
        Neural2_C: 'en-GB-Neural2-C',
        Neural2_D: 'en-GB-Neural2-D',
        Neural2_E: 'en-GB-Neural2-E',
        Neural2_F: 'en-GB-Neural2-F',
        News_G: 'en-GB-News-G',
        News_H: 'en-GB-News-H',
        News_I: 'en-GB-News-I',
        News_J: 'en-GB-News-J',
        News_K: 'en-GB-News-K',
        News_L: 'en-GB-News-L',
        News_M: 'en-GB-News-M',
        Standard_A: 'en-GB-Standard-A',
        Standard_B: 'en-GB-Standard-B',
        Standard_C: 'en-GB-Standard-C',
        Standard_D: 'en-GB-Standard-D',
        Standard_E: 'en-GB-Standard-E',
        Standard_F: 'en-GB-Standard-F',
        WaveNet_A: 'en-GB-Wavenet-A',
        WaveNet_B: 'en-GB-Wavenet-B',
        WaveNet_C: 'en-GB-Wavenet-C',
        WaveNet_D: 'en-GB-Wavenet-D',
        WaveNet_E: 'en-GB-Wavenet-E',
        WaveNet_F: 'en-GB-Wavenet-F',
    },
    en_US: {
        Neural2_A: 'en-US-Neural2-A',
        Neural2_B: 'en-US-Neural2-B',
        Neural2_C: 'en-US-Neural2-C',
        Neural2_D: 'en-US-Neural2-D',
        Neural2_E: 'en-US-Neural2-E',
        Neural2_F: 'en-US-Neural2-F',
        Neural2_G: 'en-US-Neural2-G',
        Neural2_H: 'en-US-Neural2-H',
        Neural2_I: 'en-US-Neural2-I',
        Neural2_J: 'en-US-Neural2-J',
        News_K: 'en-US-News-K',
        News_L: 'en-US-News-L',
        News_M: 'en-US-News-M',
        News_N: 'en-US-News-N',
        Polyglot_1: 'en-US-Polyglot-1',
        Standard_A: 'en-US-Standard-A',
        Standard_B: 'en-US-Standard-B',
        Standard_C: 'en-US-Standard-C',
        Standard_D: 'en-US-Standard-D',
        Standard_E: 'en-US-Standard-E',
        Standard_F: 'en-US-Standard-F',
        Standard_G: 'en-US-Standard-G',
        Standard_H: 'en-US-Standard-H',
        Standard_I: 'en-US-Standard-I',
        Standard_J: 'en-US-Standard-J',
        WaveNet_A: 'en-US-Wavenet-A',
        WaveNet_B: 'en-US-Wavenet-B',
        WaveNet_C: 'en-US-Wavenet-C',
        WaveNet_D: 'en-US-Wavenet-D',
        WaveNet_E: 'en-US-Wavenet-E',
        WaveNet_F: 'en-US-Wavenet-F',
        WaveNet_G: 'en-US-Wavenet-G',
        WaveNet_H: 'en-US-Wavenet-H',
        WaveNet_I: 'en-US-Wavenet-I',
        WaveNet_J: 'en-US-Wavenet-J',
    },
}
