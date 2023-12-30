import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import PartList from '@/components/atom/partList'
import SidebarWork from '@/components/atom/SidebarWork'
import { EditorHeader } from '@/components/atom/Header'
import { getServerSession } from 'next-auth/next'
import { OPTIONS } from '@/lib/authOptions'
import { getClient } from '@/lib/ApolloClient'
import {
    GetWorkNameAndPartsDocument,
    GetWorkNameAndPartsQuery,
    GetWorkNameAndPartsQueryVariables,
} from '@/../graphql/dist/client'

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { workId: string }
}) {
    const query = GetWorkNameAndPartsDocument
    const session = await getServerSession(OPTIONS)
    const { data, error } = await getClient().query<
        GetWorkNameAndPartsQuery,
        GetWorkNameAndPartsQueryVariables
    >({
        query,
        variables: { workId: params.workId },
    })
    const workName = data?.getWorkById?.name as string
    const parts = data?.getWorkById?.parts
    return (
        <div className="h-screen">
            <header>
                <EditorHeader workId={params.workId} />
            </header>

            <div className="flex h-full bg-gray-50  text-2xl font-medium text-gray-600">
                <div className="flex">
                    <aside className="text-gray-600P h-auto w-80 border-r bg-white font-medium">
                        <div className="bg-white p-5  rtl:border-l rtl:border-r-0 ">
                            <nav>
                                <SidebarWork
                                    workName={workName}
                                    workId={params.workId}
                                />

                                <p className="border-b pt-5 " />
                                <PartList
                                    parts={parts}
                                    workId={params.workId}
                                />
                            </nav>
                        </div>
                        <div className="mt-auto">
                            {/* <UserDropdown userIconURL={session.user.image} /> */}
                        </div>
                    </aside>
                </div>
                {children}
            </div>
        </div>
    )
}
