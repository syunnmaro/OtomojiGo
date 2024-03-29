'use client'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { LoginButton, WorksButton } from '@/components/elements/Buttons'
import Link from 'next/link'
import Header from '@/components/elements/Header'
import { useAuth0 } from '@auth0/auth0-react'

function HomePage() {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    return (
        <>
            <Header>
                <div className="">
                    <Link href="/" className="text-3xl text-white">
                        Otomoji
                    </Link>
                </div>
            </Header>
            <div className="mx-auto max-w-screen-xl font-medium text-gray-600">
                <section className="text-center">
                    <h1 className="mt-12 text-5xl font-extrabold leading-normal md:leading-normal lg:leading-normal">
                        リスニングテストをたったの10分で <br />
                        文字を打つだけで作成
                    </h1>
                    <p className="mt-6 text-xl font-semibold text-gray-400">
                        Otomjiはテキストベースの音声生成サービスです。
                        <br />
                        直感的な操作で簡単に問題を作成できます。
                    </p>
                    <div className="mt-8 flex flex-col items-center">
                        {isAuthenticated ? <WorksButton /> : <LoginButton />}
                    </div>
                    <button type="button" onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                </section>
            </div>
        </>
    )
}

export default HomePage
