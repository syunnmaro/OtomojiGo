import React, { PropsWithChildren } from 'react'

export default function Header({ children }: PropsWithChildren) {
    return (
        <header>
            <nav className="border-color-black border-b bg-gray-600 py-4">
                <div className="mx-auto flex max-w-screen-xl">{children}</div>
            </nav>
        </header>
    )
}
