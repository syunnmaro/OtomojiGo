import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import WorkEllipsisItem from '@/components/works/WorkEllipsisItem'
import {
    UpdateWorkDocument,
    UpdateWorkMutation,
    UpdateWorkMutationVariables,
} from '../../../graphql/dist/client'

function WorkRow({
    workName,
    workId,
    updatedAtStr,
}: {
    workName: string
    workId: string
    updatedAtStr: string
}) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkMutation,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, {
        variables: { name, workId },

        update(cache, { data }) {
            const newWork = data?.updateWork
            const authorId = data?.updateWork?.authorID as string
            new CacheMutation(cache).getWorks(authorId).update(newWork)
        },
    })

    const updatedAt = new Date(updatedAtStr)

    return (
        <tr
            className="z-0 border-b bg-white font-medium text-gray-900 hover:bg-gray-200 "
            key={workId}
        >
            {isEditing ? (
                <td
                    className="whitespace-nowrap px-6  py-4"
                    onBlur={() => {
                        updateWork()
                        setIsEditing(!isEditing)
                    }}
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-teal-600 p-0.5 focus:outline-none"
                    />
                </td>
            ) : (
                <td
                    className="whitespace-nowrap px-6  py-4"
                    onClick={() => router.push(workId)}
                >
                    {name}
                </td>
            )}

            <td className="px-6 py-4" onClick={() => router.push(workId)}>
                {`${updatedAt.getFullYear()}年${
                    updatedAt.getMonth() + 1
                }月${updatedAt.getDate()}日${updatedAt.getMinutes()}`}
            </td>
            <td>
                <WorkEllipsisItem
                    editHandler={() => setIsEditing(!isEditing)}
                    workId={workId}
                />
            </td>
        </tr>
    )
}

export default WorkRow
