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
    DeleteWorkDocument,
    DeleteWorkMutation,
    DeleteWorkMutationVariables,
} from '../../../graphql/dist/client'

export default function WorkEllipsisItem({
    editHandler,
    workId,
}: {
    editHandler: () => void
    workId: string
}) {
    const [deleteWork] = useMutation<
        DeleteWorkMutation,
        DeleteWorkMutationVariables
    >(DeleteWorkDocument, {
        variables: { workId },
        update(cache) {
            new CacheMutation(cache).getWorks().delete(workId)
        },
        optimisticResponse: { deleteWork: null },
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
                    onClick={() => deleteWork()}
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
