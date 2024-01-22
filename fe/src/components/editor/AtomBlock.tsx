'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client'
import CacheMutation, { Block } from '@/lib/CacheMutation'
import DurationDialog from '@/components/editor/DurationDialog'
import BlockSettingHeader from '@/components/editor/BlockSettingHeader'
import BlockDropdown from '@/components/editor/BlockEllipsisItem'
import {
    DeleteBlockDocument,
    DeleteBlockMutation,
    DeleteBlockMutationVariables,
} from '../../../graphql/dist/client'
import {synthesizeForPlay} from "@/lib/SynthesizeAudio";

function AtomBlock({ block, partId }: { block: Block; partId: string }) {
    const [deleteBlock] = useMutation<
        DeleteBlockMutation,
        DeleteBlockMutationVariables
    >(DeleteBlockDocument, {
        variables: { blockId: block.id },
        update(cache) {
            new CacheMutation(cache).getBlocks(partId).delete(block.id)
        },
        optimisticResponse: {
            deleteBlock: null,
        },
    })
    // TODO implement update func



    return (
        <div className="mt-10 shadow-xl">
            <div className="bg-gray-300 p-4">
                <div className="mr-8 flex">
                    <BlockSettingHeader.Speaker block={block} />
                    <BlockSettingHeader.Pitch block={block} />
                    <BlockSettingHeader.Speed block={block} />
                    <BlockSettingHeader.Volume block={block} />
                    <div className="ml-auto">
                        <BlockDropdown deleteBlock={() => deleteBlock()} />
                    </div>
                </div>
            </div>
            <div>
                <div className="z-0 bg-white">
                    <div className="ml-8 mr-8 flex">
                        <textarea
                            className="w-full outline-none"
                            defaultValue={block.texts}
                        />
                        <button aria-label="再生" type="button">
                            <FontAwesomeIcon
                                icon={faPlay}
                                className="ml-auto p-0.5 hover:bg-gray-200"
                                onClick={()=>synthesizeForPlay(block).then((res) => res.blob())
                                    .then((blob) => {
                                        const audio = new Audio(URL.createObjectURL(blob))
                                        audio.play()
                                    })}
                            />
                        </button>
                    </div>
                </div>
                <div className="group flex w-full justify-center bg-white ">
                    <DurationDialog block={block} />
                </div>
            </div>
        </div>
    )
}

export default AtomBlock
