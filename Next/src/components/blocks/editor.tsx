'use client'

import React, { useState } from 'react'
import AtomBlock from '@/components/atom/AtomBlock'
import { GoogleSpeaker } from '@/components/types'
import { block } from '../../../prisma/generated/zod'
import { createBlock, deleteBlock } from '@/lib/callApi'

const Editor = ({
    blocksData,
    partId,
}: {
    blocksData: block[]
    partId: string
}) => {
    const [blocks, setBlocks] = useState(
        Array.isArray(blocksData) ? blocksData : []
    )

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return
        if (direction === 'down' && index === blocks.length - 1) return
        const newBlocks = blocks
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        const temp = newBlocks[swapIndex]
        newBlocks[swapIndex] = newBlocks[index]
        newBlocks[index] = temp
        setBlocks(newBlocks)
    }

    return (
    )
}

export default Editor
