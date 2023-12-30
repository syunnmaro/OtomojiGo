'use client'

import './globals.css'
import { Theme } from '@radix-ui/themes'
import React from 'react'
import ApolloWrapper from '@/lib/apolloProvider'
import { SessionProvider } from 'next-auth/react'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const link = createHttpLink({
        uri: "http://localhost:8080/query",
        credentials: "include",
    });
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link,
    });
    return (
        <html lang="ja">
            <body>
            <ApolloProvider client={client}>
                <SessionProvider>
                    <ApolloWrapper>
                        <Theme>{children}</Theme>
                    </ApolloWrapper>
                </SessionProvider>
            </ApolloProvider>

            </body>
        </html>
    )
}
