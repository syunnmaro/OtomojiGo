import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import {
    StandardDropDownContent,
    StandardDropDownItem,
} from '@/assets/css/PartAndWorkDropdown'
import React from 'react'

export default function BlockDropdown({
    deleteBlock,
}: {
    deleteBlock: () => void
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="p-0.5">
                <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={`${StandardDropDownContent} `}>
                <DropdownMenu.Item
                    className={StandardDropDownItem}
                    onClick={() => deleteBlock()}
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
