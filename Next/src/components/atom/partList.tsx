'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AtomPart from '@/components/atom/AtomPart'
import { useMutation } from '@apollo/client'
import {
    CreatePartDocument,
    CreatePartMutation,
    CreatePartMutationVariables,
} from '@/../graphql/dist/client'

function PartList({ parts, workId }: { parts: any; workId: string }) {
    const [createPart, { data, loading, error }] = useMutation<
        CreatePartMutation,
        CreatePartMutationVariables
    >(CreatePartDocument, { variables: { workId } })

    return (
        <>
            <div className="flex items-center justify-between py-4 font-bold">
                <p>パート一覧</p>
                <button
                    type="button"
                    className="px-1 hover:rounded-s-sm hover:bg-gray-100"
                    onClick={() => createPart()}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul>
                {parts &&
                    parts.map(({ id, name }) => (
                        <AtomPart
                            id={id}
                            name={name}
                            workId={workId}
                            key={id}
                        />
                    ))}
            </ul>
        </>
    )
}

export default PartList
