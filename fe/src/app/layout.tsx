'use client'

import './globals.css'
import { Theme } from '@radix-ui/themes'
import React from 'react'
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { __DEV__ } from '@apollo/client/utilities/globals'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { setContext } from '@apollo/client/link/context'
import { Auth0Provider } from '@auth0/auth0-react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    if (__DEV__) {
        // Adds messages only in a dev environment
        loadDevMessages()
        loadErrorMessages()
    }

    const link = createHttpLink({
        uri: 'http://localhost:8080/query',
        credentials: 'include',
    })
    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization:
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1MjA4NjAzLCJleHAiOjE3MDUyOTUwMDMsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.bne3wTemTCuSwn-Osxc6E6hv7lM1VwHIw40uNUe77BPG13s0I2p9xIYnR3ORC6mjk2MSXGC2DOpgxmFfv0VH1XppbPUVy-6RjgkJfhwUMWQon6IG7afKqMf6l0GZBtewRVXGMH8iGIQnnKRaizZE6-kJp5Ptcb8l52tUan3LIEKcJslRYyfWPYTdSEXEJiEDK7dMj1SNtw3YvMj03soCSKl68CgPxQG7PzXC5fegW1tp_-oDqrasfYjXWTi7QVBUkL2KFluZj2eQoyetmC9g4RUDfaslZjYoCFF435C58J7V0V_ljv9UQ9RGoTciOM3u_wueya8E80VAfeaVcdyvew',
        },
    }))
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(link),
        connectToDevTools: true,
    })
    return (
        <html lang="ja">
            <body>
                <Auth0Provider
                    domain="dev-bccftoq40gr26spu.us.auth0.com"
                    clientId="zz8v2ZlFHruKf9Y5thS40I88g0oe1Lca"
                    authorizationParams={{
                        redirect_uri: 'http://localhost:3000',
                        scope: 'read:current_user',
                        audience: `https://dev-bccftoq40gr26spu.us.auth0.com/api/v2/`,
                    }}
                >
                    <ApolloProvider client={client}>
                        <Theme>{children}</Theme>
                    </ApolloProvider>
                </Auth0Provider>
            </body>
        </html>
    )
}
