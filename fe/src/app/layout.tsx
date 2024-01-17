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
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1NDU3NDcwLCJleHAiOjE3MDU1NDM4NzAsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.AZ1J3uinSINylxOnK_Ceu0EJUESsSMXIdleBPBI_6x-AaSoPKgpYPHlS2y5yAwCNr3TrbYY7TOUBCHW1Gph-QLJtbbaE25jdibjQw49EIhM0ng5aAQlJJLNaiDG05Dn5eP50DW7P9DEMOAgqftZpOZeMGZKPymspDVSqs6gnq4MV2fL3JDipE1D9pHmQ7teSSrdWI9s6VdFQMGZk8WTs2M5dtrfi-m7dBzJ91UPPFcXumt2FCmQsZTrxW_UpMx1WTj9PQ1h4S_7LIiinF6sKyN92PZb_XIbNAyMiYzeeE2EPLsWsh_0OXq0B_G8DnSikIrg_eFHga1rskTaQFeH80g',
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
