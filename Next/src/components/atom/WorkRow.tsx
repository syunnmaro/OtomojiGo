'use client'

import { useRouter } from 'next/navigation'
import { PartAndWorkDropdown } from '@/components/atom/PartAndWorkDropdown'
import React from 'react'
import { useMutation } from '@apollo/client'
import {DeleteWorkOutput, UpdateWorkOutput} from '@/types/queryResult'
import {
    DeleteWorkDocument, DeleteWorkMutationVariables,
    GetWorksDocument,
    UpdateWorkDocument,
    UpdateWorkMutationVariables
} from '@/../graphql/dist/client'

function WorkRow({
    name,
    id,
    created_at,
}: {
    name: string
    id: string
    created_at: string
}) {
    const router = useRouter()
    const [isEditing, setIsEditing] = React.useState(false)
    const [title, setTitle] = React.useState(name)
    const [updateWork] = useMutation<UpdateWorkOutput,UpdateWorkMutationVariables>(UpdateWorkDocument, {
        // update(cache, { data }) {
        //     const newWork = data?.updateWork
        //     const query = GetWorksDocument
        //     cache.updateQuery(
        //         { query, variables: { id: '1' } },
        //         (result) => (
        //             console.log(result),
        //             {
        //                 getUserById: {
        //                     id: '1',
        //                     works: result.getUserById.works.map((work) => {
        //                         work?.id === newWork?.id
        //                             ? newWork?.name
        //                             : work.name
        //                     }),
        //                 },
        //             }
        //         )
        //     )
        // },

    })
    const [deleteWork] = useMutation<DeleteWorkOutput,DeleteWorkMutationVariables>(DeleteWorkDocument, {
    })
    const editHandler = () => {
        setIsEditing(!isEditing)
    }



    return (
        <tr
            className="z-0 border-b bg-white font-medium text-gray-900 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
            key={id}
        >
            {isEditing ? (
                <td
                    className="whitespace-nowrap px-6  py-4 dark:text-white"
                    onBlur={() => {
                        updateWork({ variables: { name: title ,workId:id} })
                        editHandler()
                    }}
                >
                    <input
                        type="text"
                        defaultValue={title}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className="border-2 border-teal-600 p-0.5 focus:outline-none"
                    />
                </td>
            ) : (
                <td
                    className="whitespace-nowrap px-6  py-4 dark:text-white"
                    onClick={() => router.push(id)}
                >
                    {title}
                </td>
            )}

            <td className="px-6 py-4" onClick={() => router.push(id)}>
                {created_at}
            </td>
            <td>
                <PartAndWorkDropdown
                    handleDeleteWork={() => deleteWork({variables:{workId:id}})}
                    editHandler={() => editHandler()}
                />
            </td>
        </tr>
    )
}

export default WorkRow
