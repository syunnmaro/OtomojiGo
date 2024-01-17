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

    const synthesize = () => {
        fetch('http://localhost:8080/synthesize?format=base64', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "authorization":'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhBUTF5Q1lGRzROMGVjblMtVElpViJ9.eyJpc3MiOiJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODI4NDIyMzk3MzE1NDM3MjEyOSIsImF1ZCI6WyJodHRwczovL2Rldi1iY2NmdG9xNDBncjI2c3B1LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtYmNjZnRvcTQwZ3IyNnNwdS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzA1NDU3NDcwLCJleHAiOjE3MDU1NDM4NzAsImF6cCI6Inp6OHYyWmxGSHJ1S2Y5WTV0aFM0MEk4OGcwb2UxTGNhIiwic2NvcGUiOiJvcGVuaWQgcmVhZDpjdXJyZW50X3VzZXIifQ.AZ1J3uinSINylxOnK_Ceu0EJUESsSMXIdleBPBI_6x-AaSoPKgpYPHlS2y5yAwCNr3TrbYY7TOUBCHW1Gph-QLJtbbaE25jdibjQw49EIhM0ng5aAQlJJLNaiDG05Dn5eP50DW7P9DEMOAgqftZpOZeMGZKPymspDVSqs6gnq4MV2fL3JDipE1D9pHmQ7teSSrdWI9s6VdFQMGZk8WTs2M5dtrfi-m7dBzJ91UPPFcXumt2FCmQsZTrxW_UpMx1WTj9PQ1h4S_7LIiinF6sKyN92PZb_XIbNAyMiYzeeE2EPLsWsh_0OXq0B_G8DnSikIrg_eFHga1rskTaQFeH80g',

            },
            body: JSON.stringify({
                texts: block.texts,
                speaker: block.speaker,
                speed: block.speed,
                pitch: block.pitch,
                volume: block.volume,
            }),
        })
            .then((res) => res.blob())
            .then((blob) => {
                const audio = new Audio(URL.createObjectURL(blob))
                audio.play()
        })
    }

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
                                onClick={()=>synthesize()}
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
