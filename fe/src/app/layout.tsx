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
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // if (__DEV__) {
    //     // Adds messages only in a dev environment
    //     loadDevMessages()
    //     loadErrorMessages()
    // }

    const link = createHttpLink({
        uri: 'http://localhost:8080/query',
        // credentials: 'include',
    })
    // const authLink = setContext((_, { headers }) =>
    //     // get the authentication token from local storage if it exists
    //
    //     // return the headers to the context so httpLink can read them
    //      ({
    //         headers: {
    //             ...headers,
    //             authorization: token ? `Bearer ${token}` : '',
    //         },
    //     })
    // )
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link,
        connectToDevTools: true,
        headers: { authorization: '11111111' },
    })
    return (
        <html lang="ja">
            <body>
                <SessionProvider>
                    <ApolloProvider client={client}>
                        <Theme>{children}</Theme>
                    </ApolloProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
