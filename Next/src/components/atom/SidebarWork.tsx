'use client'

import React, { useState } from 'react'
import {useMutation} from "@apollo/client";
import {CreateWorkDocument} from "../../../graphql/dist/client";
import {useSession} from "next-auth/react";

function SidebarWork({ workName }: { workName: string }) {
    const {data} =useSession()
    const userId = data?.user.id
    const [name, setName] = useState(workName)
    const updatePartName = async (newName: string) => {

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
