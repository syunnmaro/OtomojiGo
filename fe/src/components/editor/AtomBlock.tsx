'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { synthesize } from '@/lib/utils'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import DurationDialog from '@/components/editor/DurationDialog'
import BlockSettingHeader from '@/components/editor/BlockSettingHeader'
import {
    Block,
    DeleteBlockDocument,
    DeleteBlockMutation,
    DeleteBlockMutationVariables,
} from '../../../graphql/dist/client'

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
                    <BlockSettingHeader.Speaker block={block} />
                    <BlockSettingHeader.Pitch block={block} />
                    <BlockSettingHeader.Speed block={block} />
                    <BlockSettingHeader.Volume block={block} />
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
