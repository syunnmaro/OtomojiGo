import '@fortawesome/fontawesome-svg-core/styles.css'
import { UserDropdown } from '@/components/atom/PartAndWorkDropdown'
import React from 'react'
import PartList from '@/components/atom/partList'
import SidebarWork from '@/components/atom/SidebarWork'
import { EditorHeader } from '@/components/atom/Header'
import { cookies } from 'next/headers'
import { Error } from '@/components/atom/Error'
import { getServerSession } from 'next-auth/next'
import { part, work } from '@/../prisma/generated/zod'

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { workId: string }
}) {
    let response = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${params.workId}/parts`,
        {
            headers: {
                Cookie: cookies()
                    .getAll()
                    .map(({ name, value }) => `${name}=${value}`)
                    .join(';'),
            },
        }
    )
    if (!response.ok) {
        const jsonResponse = await response.json()
        return (
            <Error
                status={response.status}
                statusText={response.statusText}
                message={jsonResponse.message}
             />
        )
    }
    const parts: part[] = await response.json()
    response = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${params.workId}`,
        {
            headers: {
                Cookie: cookies()
                    .getAll()
                    .map(({ name, value }) => `${name}=${value}`)
                    .join(';'),
            },
        }
    )
    if (!response.ok) {
        const jsonResponse = await response.json()
        return (
            <Error
                status={response.status}
                statusText={response.statusText}
                message={jsonResponse.message}
             />
        )
    }
    const work: work = await response.json()
    const session = await getServerSession()
    if (!session) {
        return (
            <Error
                status={401}
                statusText="Unauthorized"
                message="You are not authorized to access this page"
             />
        )
    }
    return (
        <div className="h-screen">
            <header>
                <EditorHeader workId={work.id} />
            </header>

            <div className="flex h-full bg-gray-50  text-2xl font-medium text-gray-600">
                <div className="flex">
                    <aside
                        className="text-gray-600P h-auto w-80 border-r bg-white font-medium"
                    >
                        <div className="bg-white p-5  rtl:border-l rtl:border-r-0 ">
                            <nav>
                                <SidebarWork work={work} />

                                <p className="border-b pt-5 " />
                                <PartList
                                    partsData={parts}
                                    workId={params.workId}
                                 />
                            </nav>
                        </div>
                        <div className="mt-auto">
                            <UserDropdown userIconURL={session.user.image} />
                        </div>
                    </aside>
                </div>
                {children}
            </div>
        </div>
    )
}
