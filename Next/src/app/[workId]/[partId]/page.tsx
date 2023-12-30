'use client'

import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import AtomBlock from '@/components/atom/AtomBlock'
import {
    CreateBlockDocument,
    CreateBlockInput,
    CreateBlockMutationVariables,
    GetBlocksDocument,
    GetBlocksQuery,
    GetBlocksQueryVariables,
} from '@/../graphql/dist/client'
import { useMutation, useQuery } from '@apollo/client'

function Page({ params }: { params: { workId: string; partId: string } }) {
    const { loading, error, data } = useQuery<
        GetBlocksQuery,
        GetBlocksQueryVariables
    >(GetBlocksDocument, { variables: { partId: params.partId } })
    const blocks = data?.getPartById?.blocks

    const [createBlock] = useMutation<
        CreateBlockInput,
        CreateBlockMutationVariables
    >(CreateBlockDocument, {
        variables: { partId: params.partId },
    })

    return (
        <div className="mt-10 flex w-full  justify-center overflow-scroll bg-gray-50">
            <div className="w-3/6 ">
                <div className="">
                    {blocks?.map((block, index) => (
                        <AtomBlock key={block.id} block={block} />
                    ))}
                </div>
                <div className="flex justify-center p-2">
                    <button
                        type="button"
                        className="rounded bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"
                        onClick={() => {
                            createBlock()
                        }}
                    >
                        ブロックを追加
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page
