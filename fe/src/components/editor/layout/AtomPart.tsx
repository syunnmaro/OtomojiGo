'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import PartEllipsisItem from '@/components/editor/layout/PartEllipsisItem'
import {
    UpdatePartDocument,
    UpdatePartMutation,
    UpdatePartMutationVariables,
} from '../../../../graphql/dist/client'

function AtomPart({
    partId,
    name,
    workId,
}: {
    partId: string
    name: string
    workId: string
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(name)
    const selectedPartId = useSelectedLayoutSegment()
    const editHandler = () => {
        setIsEditing(!isEditing)
    }

    const [updatePart] = useMutation<
        UpdatePartMutation,
        UpdatePartMutationVariables
    >(UpdatePartDocument, {
        variables: { partId, name: title },
        update(cache, { data: updatePartResult }) {
            const newPart = updatePartResult!.updatePart
            new CacheMutation(cache).getParts(workId).update(newPart)
        },
    })

    return (
        <div
            className={`relative flex items-center p-2 ${
                selectedPartId === partId ? 'bg-gray-100' : 'bg-white'
            }`}
            key={partId}
        >
            {isEditing ? (
                <li
                    className="my-2 flex w-auto items-center text-2xl"
                    key={partId}
                    onBlur={async () => {
                        editHandler()
                        updatePart()
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
                    href={`/${workId}/${partId}`}
                    className="flex-1 hover:bg-gray-100"
                >
                    <li
                        className="my-2 flex w-auto items-center text-2xl"
                        key={partId}
                    >
                        <span>{title}</span>
                    </li>
                </Link>
            )}

            <PartEllipsisItem
                editHandler={() => editHandler()}
                workId={workId}
                partId={partId}
            />
        </div>
    )
}

export default AtomPart
