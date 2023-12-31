'use client'

import './globals.css'
import { Theme } from '@radix-ui/themes'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { __DEV__ } from '@apollo/client/utilities/globals'

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
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link,
    })
    return (
        <html lang="ja">
            <body>
                <ApolloProvider client={client}>
                    <SessionProvider>
                        <Theme>{children}</Theme>
                    </SessionProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}
