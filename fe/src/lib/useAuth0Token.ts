import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function useAuth0Token() {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()
    const [accessToken, setAccessToken] = useState(null)

    useEffect(() => {
        const fetchToken = async () => {
            // JWTを取得して状態に保存する
            const token = await getAccessTokenSilently()
            console.log(token)
            setAccessToken(token)
        }

        // ログイン済みの場合のみJWTを取得する
        if (isAuthenticated) {
            fetchToken()
        }
        console.log(accessToken)
    }, [isAuthenticated, user?.sub])

    return accessToken
}
