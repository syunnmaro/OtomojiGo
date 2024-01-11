import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import CacheMutation from '@/lib/CacheMutation'
import * as Popover from '@radix-ui/react-popover'
import {
    BlockSettingDropDownTrigger,
    StandardDropDownContent,
    StandardDropDownItem,
} from '@/assets/css/PartAndWorkDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDownUpAcrossLine,
    faGauge,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import BlockSettingContent, {
    PopoverItem,
} from '@/components/editor/BlockSettingContent'
import {
    Block,
    UpdateBlockDocument,
    UpdateBlockMutation,
    UpdateBlockMutationVariables,
} from '../../../graphql/dist/client'

const blockSettingPopoverContent = 'rounded-xl bg-white shadow-2xl'

export default function BlockSettingHeader({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-gray-300 p-4">
            <div className="mr-8 flex">{children}</div>
        </div>
    )
}

BlockSettingHeader.Speed = function SpeedPopover({ block }: { block: Block }) {
    const defaultSpeed = block.speed
    const [sliderValue, setSliderValue] = useState(defaultSpeed)
    const [title, setTitle] = useState(defaultSpeed)
    const [updateBlock] = useMutation<
        UpdateBlockMutation,
        UpdateBlockMutationVariables
    >(UpdateBlockDocument, {
        variables: { blockId: block.id, speed: sliderValue },
        update(cache, { data }) {
            new CacheMutation(cache)
                .getBlocks(data?.updateBlock.partID)
                .update(data!.updateBlock)
        },
    })
    const handleClose = () => {
        if (sliderValue !== defaultSpeed) {
            setTitle(sliderValue)
            updateBlock()
        }
    }
    return (
        <Popover.Root
            onOpenChange={(open) => {
                if (!open) handleClose()
            }}
        >
            <Popover.Trigger asChild>
                <button
                    type="button"
                    className="mx-1 rounded-3xl bg-white px-3 text-center text-xs  font-medium  text-gray-600 hover:bg-gray-200"
                >
                    <FontAwesomeIcon icon={faGauge} />X{title}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={blockSettingPopoverContent}>
                    <div className="py-2.5">
                        <span>速度</span>
                        <BlockSettingContent.Input
                            onChange={(vol: number) => setSliderValue(vol)}
                            value={sliderValue}
                        />
                    </div>
                    <BlockSettingContent.Slider
                        min={0.25}
                        max={4.0}
                        step={0.01}
                        onValueChange={(volume: number) =>
                            setSliderValue(volume)
                        }
                        value={sliderValue}
                    />
                    <hr className="h-0.5 border-t-0 bg-neutral-200 opacity-100" />
                    <PopoverItem
                        onClick={() => {
                            setSliderValue(1.2)
                        }}
                    >
                        <p>高校標準程度</p>
                    </PopoverItem>
                    <PopoverItem
                        onClick={() => {
                            setSliderValue(1.2)
                        }}
                    >
                        <p>中学標準程度</p>
                    </PopoverItem>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

BlockSettingHeader.Volume = function VolumePopover({
    block,
}: {
    block: Block
}) {
    const defaultVolume = block.volume
    const [committedValue, setCommittedValue] = useState(defaultVolume)
    const [value, setValue] = useState(defaultVolume)
    const [updateBlock] = useMutation<
        UpdateBlockMutation,
        UpdateBlockMutationVariables
    >(UpdateBlockDocument, {
        variables: { blockId: block.id, volume: value },
        update(cache, { data }) {
            new CacheMutation(cache)
                .getBlocks(data?.updateBlock.partID)
                .update(data!.updateBlock)
        },
    })
    const handleClose = () => {
        if (value !== defaultVolume) {
            setCommittedValue(value)
            updateBlock()
        }
    }
    return (
        <Popover.Root
            onOpenChange={(open) => {
                if (!open) handleClose()
            }}
        >
            <Popover.Trigger asChild>
                <button type="button" className={BlockSettingDropDownTrigger}>
                    <FontAwesomeIcon icon={faVolumeHigh} />
                    {committedValue}%
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={blockSettingPopoverContent}>
                    <div className="py-2.5">
                        <span>音量</span>
                        <BlockSettingContent.Input
                            onChange={(vol: number) => setValue(vol)}
                            value={value}
                        />
                    </div>
                    <hr className="h-0.5 border-t-0 bg-neutral-200 " />
                    <BlockSettingContent.Slider
                        min={0}
                        max={100}
                        onValueChange={(volume: number) => setValue(volume)}
                        value={value}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

BlockSettingHeader.Pitch = function PitchPopover({ block }: { block: Block }) {
    const defaultPItch = block.pitch
    const [value, setValue] = useState(defaultPItch)
    const [committedValue, setCommittedValue] = useState(defaultPItch)
    const [updateBlock] = useMutation<
        UpdateBlockMutation,
        UpdateBlockMutationVariables
    >(UpdateBlockDocument, {
        variables: { blockId: block.id, pitch: value },
        update(cache, { data }) {
            new CacheMutation(cache)
                .getBlocks(data?.updateBlock.partID)
                .update(data!.updateBlock)
        },
    })
    const handleClose = () => {
        setCommittedValue(value)
        updateBlock()
    }

    return (
        <Popover.Root
            onOpenChange={(open) => {
                if (!open) handleClose()
            }}
        >
            <Popover.Trigger asChild>
                <button type="button" className={BlockSettingDropDownTrigger}>
                    <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
                    {committedValue}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className={blockSettingPopoverContent}>
                    <div className="py-2.5">
                        <span>ピッチ</span>
                        <BlockSettingContent.Input
                            onChange={(vol: number) => setValue(vol)}
                            value={value}
                        />
                    </div>
                    <hr className="h-0.5 border-t-0 bg-neutral-200 " />
                    <BlockSettingContent.Slider
                        min={0}
                        max={100}
                        onValueChange={(volume: number) => setValue(volume)}
                        value={value}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

const jpStandardSpeaker = [
    'ja-JP-Standard-A',
    'ja-JP-Standard-B',
    'ja-JP-Standard-C',
    'ja-JP-Standard-D',
]
const usStandardSpeaker = [
    'en-US-Standard-A',
    'en-US-Standard-B',
    'en-US-Standard-C',
    'en-US-Standard-D',
    'en-US-Standard-E',
    'en-US-Standard-F',
    'en-US-Standard-G',
    'en-US-Standard-H',
    'en-US-Standard-I',
    'en-US-Standard-J',
]

BlockSettingHeader.Speaker = function SpeakerDropDown({
    block,
}: {
    block: Block
}) {
    const [value, setValue] = useState(block.speaker)
    const [updateBlock] = useMutation<
        UpdateBlockMutation,
        UpdateBlockMutationVariables
    >(UpdateBlockDocument, {
        variables: { blockId: block.id, speaker: value },
        update(cache, { data }) {
            new CacheMutation(cache)
                .getBlocks(data?.updateBlock.partID)
                .update(data!.updateBlock)
        },
    })
    return (
        // TODO CoeFont命名参考
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className={BlockSettingDropDownTrigger}>
                <p>{value}</p>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={StandardDropDownContent}>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className={StandardDropDownItem}>
                        日本語
                        <div className="ml-auto pl-12">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="min-w-[220px] rounded-md bg-white "
                            sideOffset={2}
                        >
                            {jpStandardSpeaker.map((speakerName: string) => (
                                <DropdownMenu.Item
                                    key={speakerName}
                                    className={StandardDropDownItem}
                                    onClick={() => {
                                        setValue(speakerName)
                                        updateBlock()
                                    }}
                                >
                                    <p>{speakerName.split('-')[3]}</p>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none ">
                        アメリカ英語
                        <div className="text-mauve11 ml-auto pl-[20px]">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className=" min-w-[220px] rounded-md bg-white p-[5px]"
                            sideOffset={2}
                        >
                            {usStandardSpeaker.map((speakerName: string) => (
                                <DropdownMenu.Item
                                    key={speakerName}
                                    className={StandardDropDownItem}
                                    onClick={() => {
                                        setValue(speakerName)
                                        updateBlock()
                                    }}
                                >
                                    <p>{speakerName.split('-')[3]}</p>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
