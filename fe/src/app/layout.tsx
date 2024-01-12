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
import useAuth0Token from '@/lib/useAuth0Token'
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
    const token = useAuth0Token()

    const link = createHttpLink({
        uri: 'http://localhost:8080/query',
        credentials: 'include',
    })
    const authLink = setContext((_, { headers }) =>
        // get the authentication token from local storage if it exists

        // return the headers to the context so httpLink can read them
        ({
            headers: {
                ...headers,
                authorization:
                    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJnaXZlbl9uYW1lIjoi44G-44KNIiwiZmFtaWx5X25hbWUiOiLjgZfjgoXjgpMiLCJuaWNrbmFtZSI6ImhhcnVrdTEzMTMiLCJuYW1lIjoi44GX44KF44KT44G-44KNIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pRQTFXRkh5ZnZZWnRUb0c1YlV6dmUtRWNTNURPUFNteUVVd0hhR1BXYkpRPXM5Ni1jIiwibG9jYWxlIjoiamEiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wMS0xMlQwNDoxNDo0OS4xOThaIiwiZW1haWwiOiJoYXJ1a3UxMzEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJ6ejh2MlpsRkhydUtmOVk1dGhTNDBJODhnMG9lMUxjYSIsImlhdCI6MTcwNTA1NjkzOSwiZXhwIjoxNzA1MDkyOTM5LCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsInNpZCI6IlFtTmxRalo1Z2lidkZTNUVydWtjWDdTdUo1TUpqN210Iiwibm9uY2UiOiJiSFZMVkZoMmNITlVWemhYVERFNE1VVnpMVWRRVEc5M1VuaHpXbTlrWlhCeU0zQXhabVY0UlhOdFl3PT0ifQ.UlPEihF-Z73jrs8mv7PPZggaQlDN5uGn31EGIpn7HQ0PoaW11vpu9sBnOn9wRf2hVhlsLXyplgcwbeqmLD0bqGrzVpmu7U2lJOCufH9QE-mfOePnSozN-Sy3u8XEYccUDu81-XZ4NPh4T_W3q1jcZFyky2589_l1xsusLO2IASP7QKQGZ_f5egn9DsLxEGjDzj5qIA3W99h7MGCXKmtTGGllY_ZidrQi_58Swh79hpaq41FyhbRnBwv4qA5VtIv7TisZlGyo8tZhgPnTDb6kAf0Icnp1pmw5lhYy5BUD-VAbZHmUhLC1xI0DtTU0p914qpRZTJNQgTefJChyo4pNqg',
            },
        })
    )
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
