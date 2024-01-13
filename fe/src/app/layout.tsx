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
    const authLink = setContext((_, { headers }) =>
        // get the authentication token from local storage if it exists

        // return the headers to the context so httpLink can read them
        ({
            headers: {
                ...headers,
                authorization:
                    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1MTE5NDk5LCJleHAiOjE3MDUyMDU4OTksImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.LLb81vdfOTnAYTMA8TR3V0TrSqtG8U78C9VuYQcNz59obq6TIbVlpk4umSEyuMxQh1iuZ9SNQy4-cP-zXX8zeYx95i-nhZqokVJw2m3MzNx3jpctANjOsRG5i7zEKa7hYLdIQ8GWn_h74ZdRaVIO9V5cYwidg2HgfRii1YWcRO5EeqZKcJq8pR3fKvDValGPacPiqj1SelEUM7XKPSnNJFSsyWdNuDwEgI_YHaavnth3P_f5NVUhziB_7OXf9euth_aK1-Xt55CsWkjC9fnaXOE_SfgWKDpEW6H_9FLVsVR2S5S0HqJbc_kWcCraxApBM20NSqtt1W7Cc0-4FiT9gw',
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
