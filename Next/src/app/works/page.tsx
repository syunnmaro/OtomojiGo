'use client'

import { Header } from '@/components/atom/Header'
import Link from 'next/link'
import WorkTable from '@/components/blocks/workTable'
import React from 'react'

import {
    GetWorksDocument,
    GetWorksQuery,
    GetWorksQueryVariables,
} from '@/../graphql/dist/client'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

export default function SelectWorkPage() {
    const session = useSession()
    const { data } = useQuery<GetWorksQuery, GetWorksQueryVariables>(
        GetWorksDocument,
        {
            variables: { id: session?.data?.user.id as string },
        }
    )
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
                <WorkTable
                    works={data?.getUserById ? data?.getUserById.works : []}
                />
            </div>
        </>
    )
}
