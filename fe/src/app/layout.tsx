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
import {createPersistedQueryLink} from "@apollo/client/link/persisted-queries";
import {generatePersistedQueryIdsFromManifest} from "@apollo/persisted-query-lists";

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

    const persistedQueryLink = createPersistedQueryLink(
        generatePersistedQueryIdsFromManifest({
            loadManifest: () => import("../../persisted-query-manifest.json"),
        }),
    );

    const link = createHttpLink({
        uri: 'http://localhost:8080/query',
        credentials: 'include',
    })
    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization:
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1NTQ0MTg2LCJleHAiOjE3MDU2MzA1ODYsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.UnZN6EHNDKjcHdeHlqTHGIPM5fbTWAXvRFnuykK-xD--wkyDguVzxgP65cihtjcvQCjPuc_nu6RZdV-9daMlZjDGTvyOlxM-o7S18OxJ9L3aALuW5f63UZ4M5LNSdZ0wL5s58pF2gwjYnrkuC_NDz3dbs3zrLZzLwc7rD9CbzO8QBOHk16aMi4FRKJMUSNnTMSimvnbzX-zXj7YDkgJREzoKDtoDnJ_ZlJiRZEmrzhFb_g9niTc_6R4NK3CQGn0GPVRs4S86XNXpa4aEr3Y46U5eWdPZ_UXdVYxUZsALuz4APzKUuMn8gtLJj7DD0Ktj1VZClN_fFgJFfA0iPR8T7Q',
        },

    }))
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: persistedQueryLink.concat(authLink.concat(link)),
        // link:authLink.concat(link),
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
