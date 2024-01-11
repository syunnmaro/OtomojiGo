import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { BlockSettingDropDownTrigger } from '@/assets/css/PartAndWorkDropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import {
    Block,
    UpdateBlockDocument,
    UpdateBlockMutation,
    UpdateBlockMutationVariables,
} from '../../../graphql/dist/client'

function BlockDurationItem({
    time,
    onClick,
}: {
    time: number
    onClick: () => void
}) {
    return (
        <Dialog.Close asChild>
            <button
                type="button"
                className="m-1 flex items-center rounded-2xl py-1.5 text-center font-bold text-gray-600 hover:bg-gray-100 hover:outline-none"
                onClick={() => {
                    onClick()
                }}
            >
                <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: '#475569' }}
                    size="lg"
                />
                <p className="px-2 text-xl">{time}s</p>
            </button>
        </Dialog.Close>
    )
}

export default function DurationDialog({ block }: { block: Block }) {
    const [duration, setDuration] = useState(block.duration)
    const [updateBlock] = useMutation<
        UpdateBlockMutation,
        UpdateBlockMutationVariables
    >(UpdateBlockDocument, {
        variables: { blockId: block.id, duration },
        update(cache, { data }) {
            new CacheMutation(cache)
                .getBlocks(data?.updateBlock.partID)
                .update(data!.updateBlock)
        },
    })
    return (
        <div className="group flex w-full justify-center bg-white">
            <Dialog.Root
                onOpenChange={(open) => {
                    if (!open) {
                        updateBlock()
                    }
                }}
            >
                <Dialog.Trigger asChild>
                    <button
                        type="button"
                        className={`${BlockSettingDropDownTrigger} opacity-0 group-hover:opacity-100`}
                    >
                        {duration !== 0 ? `${duration}s` : '間隔を指定'}
                    </button>
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
                            <BlockDurationItem
                                time={1}
                                onClick={() => setDuration(1)}
                            />
                            <BlockDurationItem
                                time={1}
                                onClick={() => setDuration(1)}
                            />
                            <BlockDurationItem
                                time={10}
                                onClick={() => setDuration(10)}
                            />

                            <BlockDurationItem
                                time={20}
                                onClick={() => setDuration(20)}
                            />
                        </div>
                        <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-400" />
                        <div>
                            <p className="py-2 font-bold text-gray-600">
                                カスタム
                            </p>
                            <div className="flex">
                                <input
                                    type="number"
                                    className="h-10 w-64 rounded-xl border-[2px] border-gray-200 focus:border-teal-500 focus:outline-none"
                                    onChange={(e) =>
                                        setDuration(Number(e.target.value))
                                    }
                                />
                                <Dialog.Close asChild>
                                    <button
                                        type="button"
                                        className="mx-4 h-10 rounded-xl border-2 border-teal-500 bg-white px-4 py-2  font-bold text-teal-500"
                                    >
                                        追加
                                    </button>
                                </Dialog.Close>
                            </div>
                        </div>

                        <Dialog.Close asChild>
                            <button
                                type="button"
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[20px] top-[20px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
