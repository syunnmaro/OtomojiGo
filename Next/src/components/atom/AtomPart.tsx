'use client'

import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { PartAndWorkDropdown } from './PartAndWorkDropdown'

function AtomPart({
    id,
    name,
    workId,
    handleDeletePart,
}: {
    id: string
    name: string
    workId: string
    handleDeletePart: () => void
}) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [title, setTitle] = React.useState(name)
    const selectedPartId = useSelectedLayoutSegment()
    const editHandler = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div
            className={`relative flex items-center p-2 ${
                selectedPartId === id ? 'bg-gray-100' : 'bg-white'
            }`}
            key={id}
        >
            {isEditing ? (
                <li
                    className="my-2 flex w-auto items-center text-2xl"
                    key={id}
                    onBlur={async () => {
                        editHandler()
                        // await updatePart(id, title)
                    }}
                >
                    <input
                        type="text"
                        defaultValue={name}
                        aria-selected="true"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-64 border-2 border-teal-600 focus:outline-none"
                    />
                </li>
            ) : (
                <Link
                    href={`/${workId}/${id}`}
                    className="flex-1 hover:bg-gray-100"
                >
                    <li
                        className="my-2 flex w-auto items-center text-2xl"
                        key={id}
                    >
                        <span>{title}</span>
                    </li>
                </Link>
            )}

            <PartAndWorkDropdown
                handleDeleteWork={() => handleDeletePart()}
                editHandler={() => editHandler()}
            />
        </div>
    )
}

export default AtomPart
