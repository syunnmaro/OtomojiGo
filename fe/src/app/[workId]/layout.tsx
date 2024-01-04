'use client'

import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
import PartList from '@/components/atom/partList'
import SidebarWork from '@/components/atom/SidebarWork'
import { EditorHeader } from '@/components/atom/Header'

export default function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { workId: string }
}) {
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
                                <SidebarWork workId={params.workId} />

                                <p className="border-b pt-5 " />
                                <PartList workId={params.workId} />
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
