import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Image from 'next/image'
import { Cross2Icon } from '@radix-ui/react-icons'

export default function EditorHeader({ workId }: { workId: string }) {
    const [value, setValue] = useState('left')

    return (
        <nav className="border-color-black border-b py-2.5 ">
            <header>
                <div className="flex">
                    <Link
                        className="mx-5 items-center py-3 text-lg font-bold hover:bg-gray-200"
                        href="/works"
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size="2xl"
                            color="#4a5568"
                        />
                        <span className=" text-gray-600">作品一覧に戻る</span>
                    </Link>
                    <div className="ml-auto flex items-center">
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button
                                    type="button"
                                    className="rounded-lg border-2 border-teal-500 px-6  py-3.5 text-center font-bold text-teal-500 focus:outline-none focus:ring-4"
                                >
                                    音声をエクスポート
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80 " />
                                <Dialog.Content className=" fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px]  bg-white p-[25px] text-lg font-bold text-gray-700 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                    <Dialog.Title className=" text-2xl ">
                                        音声をエクスポートする
                                    </Dialog.Title>
                                    <div className="">
                                        <p className=" mt-8 text-gray-600">
                                            分割方法
                                        </p>
                                        <ToggleGroup.Root
                                            className="bg-mauve6 inline-flex space-x-2 rounded"
                                            type="single"
                                            value={value}
                                            defaultValue="left"
                                            aria-label="Text alignment"
                                            onValueChange={(value) =>
                                                setValue(value)
                                            }
                                        >
                                            <ToggleGroup.Item
                                                className=" rounded-xl border-2  border-gray-300 radix-state-on:border-teal-600"
                                                value="left"
                                                aria-label="center aligned "
                                            >
                                                <div className=" p-5 shadow-lg ">
                                                    <Image
                                                        width="224"
                                                        height="252"
                                                        className="w-full"
                                                        src="/noSeparatePart.webp"
                                                        alt="Sunset in the mountains"
                                                    />
                                                    <p className="font-medium">
                                                        パートごとに分割しない
                                                    </p>
                                                </div>
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item
                                                className=" rounded-xl border-2  border-gray-300 radix-state-on:border-teal-600"
                                                value="center"
                                                aria-label="center aligned "
                                            >
                                                <div className=" p-5 shadow-lg ">
                                                    <Image
                                                        width="224"
                                                        height="252"
                                                        className="w-full"
                                                        src="/separatePart.webp"
                                                        alt="Sunset in the mountains"
                                                    />
                                                    <p className="font-medium">
                                                        パートごとに分割する
                                                    </p>
                                                </div>
                                            </ToggleGroup.Item>
                                        </ToggleGroup.Root>
                                    </div>
                                    <div className="mt-[25px] flex justify-end">
                                        <Link
                                            className="btn justyfy-center inline-flex h-[35px] items-center rounded-[4px] bg-teal-600 px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                                            href={`${
                                                process.env
                                                    .NEXT_PUBLIC_VERCEL_URL
                                            }/api/works/${workId}/synthesize?separate=${
                                                value === 'left' ? 'no' : 'yes'
                                            }`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <p className=" text-2xl font-bold text-white">
                                                音声を作成する
                                            </p>
                                        </Link>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button
                                            type="button"
                                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                            aria-label="Close"
                                        >
                                            <Cross2Icon />
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                </div>
            </header>
        </nav>
    )
}
