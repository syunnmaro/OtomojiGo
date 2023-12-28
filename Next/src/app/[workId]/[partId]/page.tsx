import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import AtomBlock from '@/components/atom/AtomBlock'
import { getServerSession } from 'next-auth/next'
import { OPTIONS } from '@/lib/authOptions'
import { getClient } from '@/lib/ApolloClient'
import {GetBlocksDocument} from '../../../../graphql/dist/client'

const Page = async ({
    params,
}: {
    params: { workId: string; partId: string }
}) => {
    const query = GetBlocksDocument
    const session = await getServerSession(OPTIONS)
    const { data } = await getClient().query({
        query,
        variables: { partId: params.partId },
    })
    const blocks= data?.getPartById.blocks
    return (
        <div className="mt-10 flex w-full  justify-center overflow-scroll bg-gray-50">
            <div className="w-3/6 ">
                <div className="">
                    {blocks.map((block, index) => (
                        <AtomBlock
                            key={block.id}
                            blockData={block}
                        />
                    ))}
                </div>
                <div className="flex justify-center p-2">
                    <button
                        type="button"
                        className="rounded bg-teal-600 px-4 py-2 font-bold text-white hover:bg-teal-700"

                    >
                        ブロックを追加
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page
