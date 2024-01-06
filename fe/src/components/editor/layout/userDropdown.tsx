import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@radix-ui/themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function UserDropdown({
    userIconURL,
}: {
    userIconURL: string | null | undefined
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="mx-5 flex select-none items-center text-center text-gray-600">
                <img
                    src={`${userIconURL}`}
                    alt="userIcon"
                    className="w-12 rounded-full  hover:opacity-70"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 w-40 rounded-xl bg-white text-xl ">
                <DropdownMenu.Item className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none">
                    <Button variant="soft" className="p-0.5 outline-none ">
                        <div className="flex items-center justify-between">
                            <FontAwesomeIcon icon={faGear} size="xl" />
                            <p className="text-center">設定</p>
                        </div>
                    </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                    onClick={() => signOut()}
                >
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        style={{ color: '#f87171' }}
                    />
                    <p className="text-red-400">ログアウト</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
