'use client'

import React from 'react'
import WorkRow from '@/components/works/WorkRow'
import { useMutation, useQuery } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import LoadingWorkTable from '@/components/works/loadingWorkTable'
import {
    CreateWorkDocument,
    CreateWorkMutation,
    CreateWorkMutationVariables,
    GetWorksDocument,
    GetWorksQuery,
    GetWorksQueryVariables,
} from '../../../graphql/dist/client'

function WorkTable() {
    const { data, loading } = useQuery<GetWorksQuery, GetWorksQueryVariables>(
        GetWorksDocument,
        {
            variables: { id: '55081fd5-fb09-4c55-9423-8b234103cd5c' },
            fetchPolicy: 'cache-first',
        }
    )

    const [createWork] = useMutation<
        CreateWorkMutation,
        CreateWorkMutationVariables
    >(CreateWorkDocument, {
        update(cache, { data: createWorkResult }) {
            const newWork = createWorkResult!.createWork
            const authorId = createWorkResult!.createWork.authorID as string
            new CacheMutation(cache).getWorks(authorId).create(newWork)
        },
        // Todo optimisticResponseを検討
        // Todo order
    })

    if (loading) return <LoadingWorkTable />
    const worksDes = [...data!.getUserById!.works!].sort((a, b) =>
        a.updatedAt < b.updatedAt ? -1 : 1
    )
    return (
        <div className="mx-auto flex flex-col py-5">
            <div className="flex items-center justify-end py-5">
                <button
                    type="button"
                    className="btn btn-md mt-6 items-center rounded-full bg-teal-500 px-6 py-3.5 text-2xl font-bold text-white"
                    onClick={() => createWork()}
                >
                    新規作成
                </button>
            </div>
            <div className="flex flex-col">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 ">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">タイトル</th>
                                <th className="px-6 py-3">更新日</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {worksDes &&
                                worksDes.map((work) => (
                                    <WorkRow
                                        key={work.id}
                                        workName={work.name}
                                        workId={work.id}
                                        updatedAtStr={work.updatedAt}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WorkTable
