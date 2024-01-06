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
import { setContext } from '@apollo/client/link/context'

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
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token =
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..0XOdmGgA_d_8Pg5O.ExTGHCQVD3SEiLUKtxcU-_koonrHp2kxslGtGKibA4AB0mGa8KWXYPYWQj3hYHYWE7WZcDWEQPvRk3rzjTggKYCz9is2UlXMlHNIleiL-EONeiolQgmMvyVv7qIhDh1-Jbg_XSgOtuc1FvjuXzv5SwbZh6gDCGnxDTh1mWEtO6EL5aXnh6Z3bPnB-G8bQuLf1Xuw7F_3dsUol5fAqPE9up7rsEyZvPEBZyXjCbCCCJVK4slvy9ChNE3iCFR1bEkUAebbtvOV0XSqdmwI7H1hZEWbyx7pKM0i3TQ7Ee6kWPTtkdPG5YZ7y8MYTNvBFos-dIm-nuW6OJ_vC6wh4zHiT3sl0HxpjvDMspQpxg2b3H0CwYbbl-iz-WEWLdbTyNQCcCQwcSF1bwW0nEWq1nBSFYY2P4BheiDr9qLSQs9czS1eqHqx4YeBGIWiOHTOipAXzj_-nlQeXejEG42Y-P2ej5wGjNVLvLY9VdWFWAQ5Hz4oA2MtVKQDFjxmfNwvWcs-qzAjj9-c0_DifwlVfXlMOhOgH4Q6JRaAn6aE9zUyWfFYFvZ-yY1Gi7RUTL3Urh2JgbAF3Zsd_0C1daGPTal96Z8_W3O1M4pAk0ksx62Gxi94DgIOJf0KnpJ9nnxM7IKDE0bh5Et_f7LLFfRZm_Zx3avjefSUiUVw4sA6hVmd7LgL2iTvIE84SYW7SFjsuF0_r6PfhXXRkoL95Djx9ZJQB04OYQ.czv0FYnyhWwcfKILYoKIyA'
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(link),
        connectToDevTools: true,
        // headers: {
        //     authorization: `Bearer ${token}`,
        // },
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
