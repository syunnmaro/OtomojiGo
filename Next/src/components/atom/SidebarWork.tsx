'use client'

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
    UpdateWorkDocument,
    UpdateWorkMutationVariables,
} from '@/../graphql/dist/client'
import { UpdateWorkOutput } from '@/types/queryResult'

function SidebarWork({
    workName,
    workId,
}: {
    workName: string
    workId: string
}) {
    const [name, setName] = useState(workName)
    const [updateWork] = useMutation<
        UpdateWorkOutput,
        UpdateWorkMutationVariables
    >(UpdateWorkDocument, { variables: { name, workId } })
    return (
        <input
            className="w-full p-2 text-3xl outline-none hover:outline-gray-300"
            defaultValue={name}
            onBlur={() => updateWork()}
            onChange={(e) => setName(e.target.value)}
        />
    )
}

export default SidebarWork
