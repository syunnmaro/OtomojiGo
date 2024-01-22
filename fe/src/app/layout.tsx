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
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1OTAxMTUxLCJleHAiOjE3MDU5ODc1NTEsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.IsazSR85Ok7UoyaMCEoqX1dszVJ8T8KyPI6832GDFOywiEBYj-8sj3TMwm1ezLz01gfiBMDCXr0S0lil-CyOeSRkfAt4WRrCOa2qOv0pvkLs__zvNQ8xznjA29ivTx0QN-Z9lCpzA2MN75nVi8BxHnjKgFVqACadJKlnYAKTrluSlQmL1QVIGeP3OtGdfthLdTDWmFwYXCxpTVkY33oPZu60AeV9NTkYljosQ2FEyPyL0V6YAvdQt1cp02Ll54jM25y1UIGTk9kRz2M9O7afOZ-8MpiiBJLSOgiV_plG8s6bLGSgryOA5OEV-WvFRlNl2RgE5fTWYTMYCfeoNaDW1w',
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
