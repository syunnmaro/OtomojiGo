'use client'

import './globals.css'
import { Theme } from '@radix-ui/themes'
import React from 'react'
import ApolloWrapper from '@/lib/apolloProvider'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body>
                <SessionProvider>
                    <ApolloWrapper>
                        <Theme>{children}</Theme>
                    </ApolloWrapper>
                </SessionProvider>
            </body>
        </html>
    )
}
