import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
    GetWorkNameDocument,
    GetWorkNameQuery,
    GetWorkNameQueryVariables,
    GetWorksQuery,
    UpdateWorkDocument,
    UpdateWorkMutation,
    UpdateWorkMutationVariables,
} from '@/../graphql/dist/client'
import { updateCache } from '@/lib/utils'

function SidebarWork({ workId }: { workId: string }) {
    const { data } = useQuery<GetWorkNameQuery, GetWorkNameQueryVariables>(
        GetWorkNameDocument,
        {
            variables: { workId },
        }
    )
    const workName = data?.getWorkById?.name || ''
    const [name, setName] = useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkMutation,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, {
        variables: { name, workId },

        update(cache, { data }) {
            const newWork = data?.updateWork
            const authorId = data?.updateWork?.authorID as string
            const mutate = (
                result: GetWorksQuery
            ): GetWorksQuery['getUserById']['works'] =>
                result!.getUserById!.works!.map((work) =>
                    work.id === newWork?.id ? newWork : work
                )
            updateCache({ cache, authorId, mutate })
        },
    })

    return (
        <input
            className="w-full p-2 text-3xl outline-none hover:outline-gray-300"
            defaultValue={workName}
            onBlur={() => updateWork()}
            onChange={(e) => setName(e.target.value)}
        />
    )
}

export default SidebarWork
