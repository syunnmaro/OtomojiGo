'use client'

import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { PartAndWorkDropdown } from './PartAndWorkDropdown'
import { DeletePartDocument, DeletePartMutation, DeletePartMutationVariables, GetBlocksDocument, GetPartsDocument, GetPartsQuery, GetPartsQueryVariables, UpdatePartDocument, UpdatePartMutation, UpdatePartMutationVariables } from '../../../graphql/dist/client'

function AtomPart({ partId, name, workId }: { partId: string; name: string; workId: string }) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [title, setTitle] = React.useState(name)
    const selectedPartId = useSelectedLayoutSegment()
    const editHandler = () => {
        setIsEditing(!isEditing)
    }

    const [updatePart] = useMutation<UpdatePartMutation, UpdatePartMutationVariables>(UpdatePartDocument, {
        variables: { partId, name: title },

        update(cache, { data: updatePartResult }) {
            const newPart = updatePartResult!.updatePart
            const query = GetPartsDocument
            cache.updateQuery<GetPartsQuery, GetPartsQueryVariables>({ query, variables: { workId } }, (result) => {
                if (!result) throw new Error('Result is null')
                return {
                    getWorkById: {
                        id: partId,
                        parts: result.getWorkById.parts?.map((part) => (part.id === newPart.id ? newPart : part)),
                    },
                }
            })
        },
    })

    const [deletePart] = useMutation<DeletePartMutation, DeletePartMutationVariables>(DeletePartDocument, {
        variables: { partId },
        update(cache) {
            const query = GetPartsDocument
            cache.updateQuery<GetPartsQuery, GetPartsQueryVariables>({ query, variables: { workId } }, (result) => {
                if (!result) throw new Error('Result is null')
                return {
                    getWorkById: {
                        id: workId,
                        parts: result.getWorkById.parts?.filter((part) => part.id !== partId),
                    },
                }
            })
        },
    })

    return (
        <div className={`relative flex items-center p-2 ${selectedPartId === partId ? 'bg-gray-100' : 'bg-white'}`} key={partId}>
            {isEditing ? (
                <li
                    className="my-2 flex w-auto items-center text-2xl"
                    key={partId}
                    onBlur={async () => {
                        editHandler()
                        updatePart()
                    }}
                >
                    <input type="text" defaultValue={name} aria-selected="true" value={title} onChange={(e) => setTitle(e.target.value)} className="w-64 border-2 border-teal-600 focus:outline-none" />
                </li>
            ) : (
                <Link href={`/${workId}/${partId}`} className="flex-1 hover:bg-gray-100">
                    <li className="my-2 flex w-auto items-center text-2xl" key={partId}>
                        <span>{title}</span>
                    </li>
                </Link>
            )}

            <PartAndWorkDropdown editHandler={() => editHandler()} handleDeleteWork={() => deletePart()} />
        </div>
    )
}

export default AtomPart
