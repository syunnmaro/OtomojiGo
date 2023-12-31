import { useRouter } from 'next/navigation'
import { PartAndWorkDropdown } from '@/components/atom/PartAndWorkDropdown'
import React from 'react'
import { useMutation } from '@apollo/client'
import {
    DeleteWorkDocument,
    DeleteWorkMutation,
    DeleteWorkMutationVariables,
    UpdateWorkDocument,
    UpdateWorkMutation,
    UpdateWorkMutationVariables,
} from '@/../graphql/dist/client'
import CacheMutation from '@/lib/CacheMutation'

function WorkRow({
    workName,
    workId,
    created_at,
}: {
    workName: string
    workId: string
    created_at: string
}) {
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const [name, setName] = React.useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkMutation,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, {
        variables: { name, workId },

        update(cache, { data }) {
            const newWork = data?.updateWork
            const authorId = data?.updateWork?.authorID as string
            new CacheMutation(cache).works(authorId).update(newWork)
        },
    })
    const [deleteWork] = useMutation<
        DeleteWorkMutation,
        DeleteWorkMutationVariables
    >(DeleteWorkDocument, {
        variables: { workId },
        update(cache) {
            new CacheMutation(cache)
                .works('55081fd5-fb09-4c55-9423-8b234103cd5c')
                .delete(workId)
        },
    })
    const editHandler = () => {
        setIsEditing(!isEditing)
    }

    return (
        <tr
            className="z-0 border-b bg-white font-medium text-gray-900 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
            key={workId}
        >
            {isEditing ? (
                <td
                    className="whitespace-nowrap px-6  py-4 dark:text-white"
                    onBlur={() => {
                        updateWork()
                        editHandler()
                    }}
                >
                    <input
                        type="text"
                        defaultValue={name}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        className="border-2 border-teal-600 p-0.5 focus:outline-none"
                    />
                </td>
            ) : (
                <td
                    className="whitespace-nowrap px-6  py-4 dark:text-white"
                    onClick={() => router.push(workId)}
                >
                    {name}
                </td>
            )}

            <td className="px-6 py-4" onClick={() => router.push(workId)}>
                {created_at}
            </td>
            <td>
                <PartAndWorkDropdown
                    handleDeleteWork={() => deleteWork()}
                    editHandler={() => editHandler()}
                />
            </td>
        </tr>
    )
}

export default WorkRow
