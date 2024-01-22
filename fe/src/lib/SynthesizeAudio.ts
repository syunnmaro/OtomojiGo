import  { Block } from '@/lib/CacheMutation'

export function synthesizeForPlay(block:Block) {
    return fetch(`http://localhost:8080/synthesize?format=base64`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "authorization":'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1OTAxMTUxLCJleHAiOjE3MDU5ODc1NTEsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.IsazSR85Ok7UoyaMCEoqX1dszVJ8T8KyPI6832GDFOywiEBYj-8sj3TMwm1ezLz01gfiBMDCXr0S0lil-CyOeSRkfAt4WRrCOa2qOv0pvkLs__zvNQ8xznjA29ivTx0QN-Z9lCpzA2MN75nVi8BxHnjKgFVqACadJKlnYAKTrluSlQmL1QVIGeP3OtGdfthLdTDWmFwYXCxpTVkY33oPZu60AeV9NTkYljosQ2FEyPyL0V6YAvdQt1cp02Ll54jM25y1UIGTk9kRz2M9O7afOZ-8MpiiBJLSOgiV_plG8s6bLGSgryOA5OEV-WvFRlNl2RgE5fTWYTMYCfeoNaDW1w',

        },
        body: JSON.stringify({
            texts: block.texts,
            speaker: block.speaker,
            speed: block.speed,
            pitch: block.pitch,
            volume: block.volume,
        }),
    })

}

export function synthesizeForDownload(workId:string,value:string) {
    const isSeparate = value === "left"
    return fetch(`http://localhost:8080/works/${workId}/synthesize?format=mp3?separate=${isSeparate}`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "authorization":'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1OTAxMTUxLCJleHAiOjE3MDU5ODc1NTEsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.IsazSR85Ok7UoyaMCEoqX1dszVJ8T8KyPI6832GDFOywiEBYj-8sj3TMwm1ezLz01gfiBMDCXr0S0lil-CyOeSRkfAt4WRrCOa2qOv0pvkLs__zvNQ8xznjA29ivTx0QN-Z9lCpzA2MN75nVi8BxHnjKgFVqACadJKlnYAKTrluSlQmL1QVIGeP3OtGdfthLdTDWmFwYXCxpTVkY33oPZu60AeV9NTkYljosQ2FEyPyL0V6YAvdQt1cp02Ll54jM25y1UIGTk9kRz2M9O7afOZ-8MpiiBJLSOgiV_plG8s6bLGSgryOA5OEV-WvFRlNl2RgE5fTWYTMYCfeoNaDW1w',

        },

    })
}