'use client'

import { Header } from '@/components/elements/Header'
import Link from 'next/link'
import WorkTable from '@/components/works/workTable'
import React from 'react'

export default function SelectWorkPage() {
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
                <WorkTable />
            </div>
        </>
    )
}
