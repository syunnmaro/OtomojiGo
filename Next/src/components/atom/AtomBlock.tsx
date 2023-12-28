'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React, { useState } from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import {
    PitchPopover,
    SpeedPopover,
    VolumePopover,
} from '@/components/atom/Popover'
import {
    BlockDropdown,
    DurationDialog,
    SpeakerDropDown,
} from '@/components/atom/PartAndWorkDropdown'
import { synthesize } from '@/lib/utils'


function AtomBlock({
    blockData,


}: {
    blockData


}) {
    const [block, setBlock] = useState(blockData)
    const [isLoading, setIsLoading] = useState(false) // Add this line
    const deleteBlock=()=>{}
    return (
        <div className="mt-10 shadow-xl">
            <div className="bg-gray-300 p-4">
                <div className="mr-8 flex">
                    <SpeakerDropDown
                        block={block}
                    />
                    <VolumePopover
                        block={block}

                    />
                    <SpeedPopover
                        block={block}
                    />
                    <PitchPopover
                        block={block}

                    />

                    <div className="ml-auto">
                        <BlockDropdown
                            handleDelete={() => deleteBlock()}
                         />
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li key={block.id} className="z-0 bg-white">
                        <div className="ml-8 mr-8 flex">
                            <textarea
                                className="w-full outline-none"
                                onBlur={async () => {

                                }}
                                onChange={(e) => {
                                    setBlock({
                                        ...block,
                                        texts: e.target.value,
                                    })
                                }}
                                value={block.texts}
                            />
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLoading(true)
                                        synthesize(
                                            block.texts,
                                            block.pitch,
                                            block.speaker,
                                            block.volume,
                                            block.speed
                                        ).then((audio) => {
                                            setIsLoading(false)
                                            audio?.play()
                                        })
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlay}
                                        className="ml-auto p-0.5 hover:bg-gray-200"
                                    />
                                </button>
                            )}
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
