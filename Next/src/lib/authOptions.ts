import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getClient } from '@/lib/ApolloClient'
import {
    CreateUserDocument,
    GetUserFromGoogleIdDocument,
} from '../../graphql/dist/client'

export const OPTIONS: NextAuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        // jwt作成時にCoockieに保存する内容を定義
        jwt: async ({ token, user, account, trigger, profile }) => {
            if (user) {
                token.user = user
                const query = GetUserFromGoogleIdDocument
                try {
                    const { data } = await getClient().query({
                        query,
                        variables: { googleId: user.id },
                    })
                    token.id = data.user.id
                    token.GoogleId = user.id
                } catch (e) {
                    const mutation = CreateUserDocument
                    const { data } = await getClient().mutate({
                        mutation,
                        variables: { googleID: user.id },
                    })
                    token.id = data.createUser.id
                    token.GoogleId = user.id
                    return token
                }
            }
            return token
        },

        async session({ session, token, user }) {
            // @ts-ignore
            session.user.id = token.id
            // @ts-ignore
            session.user.googleId = token.GoogleId
            return session
        },
    },
}
