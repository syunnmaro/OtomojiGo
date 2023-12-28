'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

// ログインボタン
export function LoginButton() {
    return (
        <button
            className="btn btn-lg btn-accent leading-2 flex flex-col items-center px-6 py-2 normal-case shadow-xl md:px-20"
            onClick={() =>
                signIn('google', { callbackUrl: 'http://localhost:3000/works' })
            }
        >
            Sign in
        </button>
    )
}

// ログアウトボタン
export function LogoutButton() {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    )
}

export function WorksButton() {
    return (
        <div className="btn-lg rounded bg-teal-500 px-6 py-2 text-2xl font-bold text-white hover:bg-emerald-700 md:px-20">
            <Link href="/works">エディターに行く</Link>
        </div>
    )
}
