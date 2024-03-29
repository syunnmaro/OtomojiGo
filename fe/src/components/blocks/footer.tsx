import React from 'react'

function Footer() {
    return (
        <footer className="rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl p-10 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                    © 2023{' '}
                    <a href="https://flowbite.com/" className="hover:underline">
                        Otomoji
                    </a>
                    . All Rights Reserved.
                </span>
                <ul className="mt-3 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a
                            href="/test"
                            className="mr-4 hover:underline md:mr-6"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="/test"
                            className="mr-4 hover:underline md:mr-6"
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            href="/test"
                            className="mr-4 hover:underline md:mr-6"
                        >
                            Licensing
                        </a>
                    </li>
                    <li>
                        <a href="/tets" className="hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
