import { Header } from '@/components/atom/Header'
import Link from 'next/link'
import WorkTable from '@/components/blocks/workTable'
import React from 'react'
import { getClient } from '@/lib/ApolloClient'
import { getServerSession } from 'next-auth/next'
import { OPTIONS } from '@/lib/authOptions'
import { GetWorksDocument } from '../../../graphql/dist/client'

export default async function SelectWorkPage() {
    const query = GetWorksDocument
    const session = await getServerSession(OPTIONS)
    const { data } = await getClient().query({
        query,
        variables: { id: session.user.id },
    })
    return (
        <>
            <Header>
                <div className="flex justify-between">
                    <Link href="/" className="text-3xl text-white ">
                        Otomoji
                    </Link>
                </div>
            </Header>
            <div className="mx-auto max-w-screen-xl font-medium text-gray-600 ">
                <WorkTable works={data?.getUserById?.works} />
            </div>
        </>
    )
}
