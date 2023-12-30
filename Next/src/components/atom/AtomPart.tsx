'use client'

import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { PartAndWorkDropdown } from './PartAndWorkDropdown'
import {
    DeletePartDocument,
    DeletePartMutation,
    DeletePartMutationVariables,
    UpdatePartDocument,
    UpdatePartMutation,
    UpdatePartMutationVariables,
} from '../../../graphql/dist/client'

function AtomPart({
    id,
    name,
    workId,
}: {
    id: string
    name: string
    workId: string
}) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [title, setTitle] = React.useState(name)
    const selectedPartId = useSelectedLayoutSegment()
    const editHandler = () => {
        setIsEditing(!isEditing)
    }
    const [updatePart, { data: updatePartResult }] = useMutation<
        UpdatePartMutation,
        UpdatePartMutationVariables
    >(UpdatePartDocument, { variables: { name: title, partId: id } })
    const [deletePart, { data: deletePartResult }] = useMutation<
        DeletePartMutation,
        DeletePartMutationVariables
    >(DeletePartDocument, { variables: { partId: id } })

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
                editHandler={() => editHandler()}
                handleDeleteWork={() => deletePart()}
            />
        </div>
    )
}

export default AtomPart
