import React, { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@radix-ui/themes'
import {
    faClock,
    faEllipsisV,
    faGear,
    faPen,
    faRightFromBracket,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog'

export function PartAndWorkDropdown({
    handleDeleteWork,
    editHandler,
}: {
    handleDeleteWork: () => void
    editHandler: () => void
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="soft"
                    className="rounded-full p-0.5 hover:bg-gray-100"
                >
                    <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-40 w-40 rounded-xl bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
                <DropdownMenu.Item
                    className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                    onClick={() => editHandler()}
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: '#475569' }}
                    />
                    <p>編集</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                    onClick={() => handleDeleteWork()}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: '#f87171' }}
                    />
                    <p className="text-red-400">削除</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export function UserDropdown({
    userIconURL,
}: {
    userIconURL: string | null | undefined
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="mx-5  flex select-none   items-center text-center text-gray-600">
                <img
                    src={`${userIconURL}`}
                    alt="userIcon"
                    className="w-12 rounded-full  hover:opacity-70"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 w-40 rounded-xl bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
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

export function BlockDropdown({ deleteBlock }: { deleteBlock: () => void }) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="p-0.5">
                <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 w-40 rounded-xl bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
                <DropdownMenu.Item
                    className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                    onClick={() => deleteBlock()}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: '#f87171' }}
                    />
                    <p className="text-red-400">削除</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

const jpStandardSpeaker = [
    'ja-JP-Standard-A',
    'ja-JP-Standard-B',
    'ja-JP-Standard-C',
    'ja-JP-Standard-D',
]
const usStandardSpeaker = [
    'en-US-Standard-A',
    'en-US-Standard-B',
    'en-US-Standard-C',
    'en-US-Standard-D',
    'en-US-Standard-E',
    'en-US-Standard-F',
    'en-US-Standard-G',
    'en-US-Standard-H',
    'en-US-Standard-I',
    'en-US-Standard-J',
]

export function SpeakerDropDown({ block }: { block }) {
    const [speaker, setSpeaker] = useState(block.speaker)
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="mx-1 rounded-3xl bg-white px-3 text-center text-xs  font-medium text-gray-600 hover:bg-gray-200">
                <p>{speaker}</p>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 w-40 rounded-xl bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none ">
                        日本語
                        <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white ">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            {jpStandardSpeaker.map(
                                (speakerName: string, index: number) => (
                                    <DropdownMenu.Item
                                        key={index}
                                        className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                        onClick={() => {
                                            setSpeaker(speakerName)
                                        }}
                                    >
                                        <p>{speakerName.split('-')[3]}</p>
                                    </DropdownMenu.Item>
                                )
                            )}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="text-violet11 data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none ">
                        アメリカ英語
                        <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white ">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            {usStandardSpeaker.map(
                                (speakerName: string, index: number) => (
                                    <DropdownMenu.Item
                                        className="m-1 flex items-center justify-between rounded-2xl px-7 py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                        onClick={() => {
                                            setSpeaker(speakerName)
                                            console.log(speakerName)
                                        }}
                                    >
                                        <p>{speakerName.split('-')[3]}</p>
                                    </DropdownMenu.Item>
                                )
                            )}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export function DurationDialog({ block }: { block }) {
    const [duration, setDuration] = useState(block.duration)

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {duration !== 0 ? (
                    <button className="rounded-3xl border-2 border-teal-500 bg-white px-4 py-2 font-bold text-teal-500  opacity-0 group-hover:opacity-100">
                        {duration}s
                    </button>
                ) : (
                    <button className="rounded-3xl border-2 border-teal-500 bg-white px-4 py-2 font-bold text-teal-500  opacity-0 group-hover:opacity-100">
                        間隔を指定
                    </button>
                )}
            </Dialog.Trigger>
            <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-600 bg-opacity-80 " />
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold text-gray-600">
                        ブロック間の間隔を追加
                    </Dialog.Title>
                    <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-400" />
                    <div className="">
                        <Dialog.Close asChild>
                            <div
                                className="m-1 flex items-center rounded-2xl py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                onClick={(e) => {
                                    setDuration(1)
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ color: '#475569' }}
                                    size="lg"
                                />
                                <p className="px-2 text-xl">1s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div
                                className="m-1 flex items-center rounded-2xl py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                onClick={(e) => {
                                    setDuration(5)
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ color: '#475569' }}
                                    size="lg"
                                />
                                <p className="px-2 text-xl">5s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div
                                className="m-1 flex items-center rounded-2xl py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                onClick={(e) => {
                                    setDuration(10)
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ color: '#475569' }}
                                    size="lg"
                                />
                                <p className="px-2 text-xl">10s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div
                                className="m-1 flex items-center rounded-2xl py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                                onClick={(e) => {
                                    setDuration(15)
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faClock}
                                    style={{ color: '#475569' }}
                                    size="lg"
                                />
                                <p className="px-2 text-xl">15s</p>
                            </div>
                        </Dialog.Close>
                    </div>
                    <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-400" />
                    <div>
                        <p className="py-2 font-bold text-gray-600">カスタム</p>
                        <div className="flex">
                            <input
                                type="number"
                                className="h-10 w-64 rounded-xl border-[2px] border-gray-200 focus:border-teal-500 focus:outline-none"
                                onChange={(e) =>
                                    setDuration(Number(e.target.value))
                                }
                            />
                            <Dialog.Close asChild>
                                <button className="mx-4 h-10 rounded-xl border-2 border-teal-500 bg-white px-4 py-2  font-bold text-teal-500">
                                    追加
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[20px] top-[20px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
