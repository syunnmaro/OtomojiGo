import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AtomPart from '@/components/atom/AtomPart'
import { useMutation, useQuery } from '@apollo/client'
import {
    CreatePartDocument,
    CreatePartMutation,
    CreatePartMutationVariables,
    GetPartsDocument,
    GetPartsQuery,
    GetPartsQueryVariables,
} from '@/../graphql/dist/client'
import CacheMutation from '@/lib/CacheMutation'

function PartList({ workId }: { workId: string }) {
    const { data } = useQuery<GetPartsQuery, GetPartsQueryVariables>(
        GetPartsDocument,
        {
            variables: { workId },
        }
    )
    const parts = data?.getWorkById.parts

    const [createPart] = useMutation<
        CreatePartMutation,
        CreatePartMutationVariables
    >(CreatePartDocument, {
        variables: { workId },

        update(cache, { data: createPartResult }) {
            const newPart = createPartResult!.createPart
            new CacheMutation(cache).parts(workId).create(newPart)
            // ID に他のIDが入らないようにする
        },
    })

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
                            partId={id}
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
