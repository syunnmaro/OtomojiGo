import { HttpLink } from '@apollo/client'
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(
    () =>
        new NextSSRApolloClient({
            cache: new NextSSRInMemoryCache(),
            connectToDevTools: true,
            link: new HttpLink({
                uri: 'http://localhost:8080/query',
            }),
        })
)
