'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AtomPart from '@/components/atom/AtomPart'

function PartList({ partsData, workId }: { partsData; workId: string }) {
    const [parts, setParts] = useState(partsData)

    return (
        <>
            <div className="flex items-center justify-between py-4 font-bold">
                <p>パート一覧</p>
                <button
                    className="px-1 hover:rounded-s-sm hover:bg-gray-100"
                    // onClick={async () =>
                    //     await createPart(workId).then((createdPart) =>
                    //         setParts([...parts, createdPart])
                    //     )
                    // }
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul>
                {parts &&
                    parts.map((part) => (
                        <AtomPart
                            id={part.id}
                            name={part.name}
                            workId={workId}
                            key={part.id}
                            handleDeletePart={() => {
                                setParts((prevParts) =>
                                    prevParts.filter(
                                        (prevPart) => part.id !== prevPart.id
                                    )
                                )
                                // deletePart(part.id)
                            }}
                        />
                    ))}
            </ul>
        </>
    )
}

export default PartList
