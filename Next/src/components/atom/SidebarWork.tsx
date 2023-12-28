'use client'

import React, { useState } from 'react'

function SidebarWork({ workName }: { workName: string }) {
    const [name, setName] = useState(workName)
    const updatePartName = async (newName: string) => {
        // try {
        //     const workData: { name: string } = {
        //         name: newName,
        //     }
        //     const response = await fetch(
        //         `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${work.id}`,
        //         {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(workData),
        //         }
        //     )
        //     if (response.ok) {
        //         const res = await response.json()
        //         setName(res.name)
        //     }
        // } catch (error) {
        //     console.error('Failed to create work:', error)
        // }
    }
    return (
        <input
            className="w-full p-2 text-3xl outline-none hover:outline-gray-300"
            defaultValue={name}
            onBlur={() => updatePartName(name)}
            onChange={(e) => setName(e.target.value)}
        />
    )
}

export default SidebarWork
