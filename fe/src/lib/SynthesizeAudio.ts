import  { Block } from '@/lib/CacheMutation'

export function synthesizeForPlay(block:Block) {
    return fetch(`http://localhost:8080/synthesize?format=base64`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "authorization":'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1NjU1MzM4LCJleHAiOjE3MDU3NDE3MzgsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.M6nHXp2A6HsAODtDclQdYW5rAgw38IAuNdCTMWXTY4p7VWGv2hGytYN3ftVwbnAQOQGjoaJJBjrce7nUGvjF9eCvPurPU3Fnf1PK_-4Odj1_5JI8bsTMjKdE2b2Ag-hw_1nFS2tcugdWvqBuMJzMdzmn8pY0dOWyA4rzP5iGGMZ6WDAMObbimAeQ7ZUwYrI3QnW5XtvFwwpnMdnNecNGwLfsD3gR3qLkNKLCivBWlHYBu5Z1xdQQHYCG6ThX281o4FU1NgKIKEzOnYVVwPRe6k1ipEOhdeKvFebVdY99msbZuKmmLsrTw3g2Ib7iCy0M-kY31CXxhzVwrL7ss9tNjw',

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
            "authorization":'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1NjU1MzM4LCJleHAiOjE3MDU3NDE3MzgsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.M6nHXp2A6HsAODtDclQdYW5rAgw38IAuNdCTMWXTY4p7VWGv2hGytYN3ftVwbnAQOQGjoaJJBjrce7nUGvjF9eCvPurPU3Fnf1PK_-4Odj1_5JI8bsTMjKdE2b2Ag-hw_1nFS2tcugdWvqBuMJzMdzmn8pY0dOWyA4rzP5iGGMZ6WDAMObbimAeQ7ZUwYrI3QnW5XtvFwwpnMdnNecNGwLfsD3gR3qLkNKLCivBWlHYBu5Z1xdQQHYCG6ThX281o4FU1NgKIKEzOnYVVwPRe6k1ipEOhdeKvFebVdY99msbZuKmmLsrTw3g2Ib7iCy0M-kY31CXxhzVwrL7ss9tNjw',

        },

    })
}