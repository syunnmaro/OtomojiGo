import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {
    StandardDropDownContent,
    StandardDropDownItem,
} from '@/assets/css/PartAndWorkDropdown'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import {
    DeletePartDocument,
    DeletePartMutation,
    DeletePartMutationVariables,
} from '../../../../graphql/dist/client'

export default function PartEllipsisItem({
    editHandler,
    workId,
    partId,
}: {
    editHandler: () => void
    workId: string
    partId: string
}) {
    const [deletePart] = useMutation<
        DeletePartMutation,
        DeletePartMutationVariables
    >(DeletePartDocument, {
        variables: { partId },
        update(cache) {
            new CacheMutation(cache).getParts(workId).delete(partId)
        },
        optimisticResponse: {
            deletePart: null,
        },
    })
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className="rounded-full p-0.5 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={StandardDropDownContent}>
                <DropdownMenu.Item
                    className={StandardDropDownItem}
                    onClick={() => editHandler()}
                >
                    <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: '#475569' }}
                    />
                    <p>編集</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    className={StandardDropDownItem}
                    onClick={() => deletePart()}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: '#f87171' }}
                    />
                    <p className="text-red-400">削除</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
