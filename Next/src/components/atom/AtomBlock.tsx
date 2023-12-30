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


function AtomBlock({block}) {
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
                        <BlockDropdown/>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li key={block.id} className="z-0 bg-white">
                        <div className="ml-8 mr-8 flex">
                            <textarea
                                className="w-full outline-none"
                                value={block.texts}
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
