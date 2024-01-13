import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'

// ログインボタン
export function LoginButton() {
    const { loginWithRedirect, error } = useAuth0()
    console.log(error)
    return (
        <button
            type="button"
            className="btn-lg rounded bg-teal-500 px-6 py-2 text-2xl font-bold text-white hover:bg-emerald-700 md:px-20"
            onClick={() => loginWithRedirect()}
        >
            ログインする
        </button>
    )
}

// export function LogoutButton() {
//     return (
//         <button style={{ marginRight: 10 }} onClick={() => signOut()}>
//             Sign Out
//         </button>
//     )
// }

export function WorksButton() {
    return (
        <div className="btn-lg rounded bg-teal-500 px-6 py-2 text-2xl font-bold text-white hover:bg-emerald-700 md:px-20">
            <Link href="/works">エディターに行く</Link>
        </div>
    )
}
