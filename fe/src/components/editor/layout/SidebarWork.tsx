import React, { useState } from 'react'
import { ApolloCache, useMutation, useQuery } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import {
    GetWorkNameDocument,
    GetWorkNameQuery,
    GetWorkNameQueryVariables,
    UpdateWorkDocument,
    UpdateWorkMutation,
    UpdateWorkMutationVariables,
} from '../../../../graphql/dist/client'

// Test().createCacheMutation().workUpdate()

function SidebarWork({ workId }: { workId: string }) {
    // TODO getWorkにしてキャッシュから取得させる
    const { data } = useQuery<GetWorkNameQuery, GetWorkNameQueryVariables>(
        GetWorkNameDocument,
        {
            variables: { workId },
        }
    )
    // TODO cache問題
    const workName = data?.getWorkById?.name as string
    const [name, setName] = useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkMutation,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, {
        variables: { name, workId },

        update(cache: ApolloCache<any>, { data }) {
            new CacheMutation(cache)
                .getWorks(data?.updateWork?.authorID as string)
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
