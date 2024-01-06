'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React, { useState } from 'react'
import {
    faClock,
    faEllipsisV,
    faPlay,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
    PitchPopover,
    SpeakerDropDown,
    SpeedPopover,
    VolumePopover,
} from '@/components/editor/BlockSettingHeader'
import {
    BlockSettingDropDownTrigger,
    StandardDropDownContent,
    StandardDropDownItem,
} from '@/assets/css/PartAndWorkDropdown'
import { synthesize } from '@/lib/utils'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import {
    Block,
    DeleteBlockDocument,
    DeleteBlockMutation,
    DeleteBlockMutationVariables,
} from '../../../graphql/dist/client'

function BlockDropdown({ deleteBlock }: { deleteBlock: () => void }) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="p-0.5">
                <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={`${StandardDropDownContent} `}>
                <DropdownMenu.Item
                    className={StandardDropDownItem}
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

function DurationDialog({ block }: { block: Block }) {
    const [duration, setDuration] = useState(block.duration)

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div
                    className={`${BlockSettingDropDownTrigger} opacity-0 group-hover:opacity-100`}
                >
                    {duration === 0 ? `${duration}s` : '間隔を指定'}
                </div>
            </Dialog.Trigger>
            <Dialog.Overlay className=" fixed inset-0 bg-gray-600 bg-opacity-80 " />
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 fixed inset-0 " />
                <Dialog.Content className=" fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]  focus:outline-none">
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

function AtomBlock({ block, partId }: { block: Block; partId: string }) {
    const [deleteBlock] = useMutation<
        DeleteBlockMutation,
        DeleteBlockMutationVariables
    >(DeleteBlockDocument, {
        variables: { blockId: block.id },
        update(cache) {
            new CacheMutation(cache).getBlocks(partId).delete(block.id)
        },
    })
    // TODO implement update func

    return (
        <div className="mt-10 shadow-xl">
            <div className="bg-gray-300 p-4">
                <div className="mr-8 flex">
                    <SpeakerDropDown block={block} />
                    <VolumePopover block={block} />
                    <SpeedPopover block={block} />
                    <PitchPopover block={block} />

                    <div className="ml-auto">
                        <BlockDropdown deleteBlock={() => deleteBlock()} />
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li key={block.id} className="z-0 bg-white">
                        <div className="ml-8 mr-8 flex">
                            <textarea
                                className="w-full outline-none"
                                defaultValue={block.texts}
                            />
                            <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                            <button
                                type="button"
                                onClick={() => {
                                    synthesize(
                                        block.texts,
                                        block.pitch,
                                        block.speaker,
                                        block.volume,
                                        block.speed
                                    ).then((audio) => {
                                        audio?.play()
                                    })
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    className="ml-auto p-0.5 hover:bg-gray-200"
                                />
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="group flex w-full justify-center bg-white ">
                    <DurationDialog block={block} />
                </div>
            </div>
        </div>
    )
}

export default AtomBlock
