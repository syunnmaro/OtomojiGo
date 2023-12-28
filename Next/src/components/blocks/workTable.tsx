'use client'

import React from 'react'
import WorkRow from '@/components/atom/WorkRow'
import { useMutation } from '@apollo/client'
import { CreateWorkDocument, GetWorksDocument } from '@/../graphql/dist/client'
import { CreateWorkOutput } from '@/types/queryResult'
import { useSession } from 'next-auth/react'

const CREATE_WORK_OPTIMISTIC_RESPONSE = {
    createWork: {
        id: '1',
        name: '新しい作品',
        createdAt: Date.now(),
    },
}

function WorkTable({ works }) {
    const { data } = useSession()
    const userId = data?.user.id
    const [createWork] = useMutation<CreateWorkOutput>(CreateWorkDocument, {
        variables: { authorID: userId },
        update(cache, { data }) {
            const newWork = data?.createWork
            const query = GetWorksDocument
            cache.updateQuery(
                { query, variables: { id: userId } },
                (result) => ({
                    getUserById: {
                        id: userId,
                        works: [...result.getUserById.works, newWork],
                    },
                })
            )
        },
    })

    const handleCreateWork = () => {
        createWork({
            optimisticResponse: CREATE_WORK_OPTIMISTIC_RESPONSE,
        })
    }

    return (
        <div className="mx-auto flex flex-col py-5">
            <div className="flex items-center justify-end py-5">
                <button
                    className="btn btn-md mt-6 items-center rounded-full bg-teal-500 px-6 py-3.5 text-2xl font-bold text-white"
                    onClick={() => handleCreateWork()}
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
                                <th className="px-6 py-3">作成日</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {works &&
                                works.map((work) => (
                                    <WorkRow
                                        key={work.id}
                                        name={work.name}
                                        id={work.id}
                                        created_at={work.createdAt}
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
