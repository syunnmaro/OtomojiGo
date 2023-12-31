import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
    GetWorkNameDocument,
    GetWorkNameQuery,
    GetWorkNameQueryVariables,
    UpdateWorkDocument,
    UpdateWorkMutation,
    UpdateWorkMutationVariables,
} from '@/../graphql/dist/client'

import CacheMutation from '@/lib/CacheMutation'

// Test().createCacheMutation().workUpdate()

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
            new CacheMutation(cache)
                .works(data?.updateWork?.authorID as string)
                .update(data?.updateWork)
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
