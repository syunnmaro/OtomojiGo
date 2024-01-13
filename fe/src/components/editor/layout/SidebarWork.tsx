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
    // TODO cacheが聞いていない
    const { data, loading } = useQuery<
        GetWorkNameQuery,
        GetWorkNameQueryVariables
    >(GetWorkNameDocument, {
        variables: { workId },
    })
    const workName = data?.getWorkById?.name as string
    const [name, setName] = useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkMutation,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, {
        variables: { name, workId },

        update(cache: ApolloCache<undefined>, { data: result }) {
            new CacheMutation(cache).getWorks().update(result!.updateWork)
        },
    })
    if (loading)
        return <p className="h-12 w-auto animate-pulse rounded bg-slate-200" />
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
