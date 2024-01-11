import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AtomPart from '@/components/editor/layout/AtomPart'
import { useMutation, useQuery } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import { ulid } from 'ulid'
import LoadingPartList from '@/components/editor/layout/loadingPartList'
import {
    CreatePartDocument,
    CreatePartMutation,
    CreatePartMutationVariables,
    GetPartsDocument,
    GetPartsQuery,
    GetPartsQueryVariables,
} from '../../../../graphql/dist/client'

function PartList({ workId }: { workId: string }) {
    const { data, loading } = useQuery<GetPartsQuery, GetPartsQueryVariables>(
        GetPartsDocument,
        {
            variables: { workId },
        }
    )
    const [createPart] = useMutation<
        CreatePartMutation,
        CreatePartMutationVariables
    >(CreatePartDocument, {
        variables: { workId },

        update(cache, { data: createPartResult }) {
            const newPart = createPartResult!.createPart
            new CacheMutation(cache).getParts(workId).create(newPart)
            // TODO ID に他のIDが入らないようにする
        },
        optimisticResponse: {
            createPart: {
                id: ulid(),
                authorID: '55081fd5-fb09-4c55-9423-8b234103cd5c',
                workID: workId,
                name: '新しいパート111111',
                createdAt: Date.now(),
                __typename: 'Part',
            },
        },
    })
    if (loading) return <LoadingPartList />
    const partsDesc = data
        ? [...data!.getWorkById!.parts!].sort((a, b) =>
              a.createdAt < b.createdAt ? -1 : 1
          )
        : undefined
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
                {partsDesc?.map(({ id, name }) => (
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
