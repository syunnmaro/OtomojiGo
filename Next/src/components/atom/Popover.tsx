import React, { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDownUpAcrossLine,
    faGauge,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'
import * as Slider from '@radix-ui/react-slider'
import { block } from '@/../prisma/generated/zod'

export const SpeedPopover = ({
    block,
    updateSpeed,
}: {
    block: block
    updateSpeed: (speed: number) => void
}) => {
    const [sliderValue, setSliderValue] = React.useState(block.speed)
    const [title, setTitle] = React.useState(block.speed)
    const changeTitle = (value: number) => {
        setTitle(value)
    }
    return (
        <>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button
                        type="button"
                        className="mx-1 rounded-3xl bg-white px-3 text-center text-xs  font-medium  text-gray-600 hover:bg-gray-200"
                    >
                        <FontAwesomeIcon icon={faGauge} />X{title}
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        className="PopoverContent rounded-xl bg-white shadow-2xl"
                        sideOffset={5}
                    >
                        <div className="">
                            <div className="py-2.5">
                                <span>速度</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    value={sliderValue}
                                    className="w-10 outline-none outline-gray-100 "
                                    onChange={(e) =>
                                        setSliderValue(Number(e.target.value))
                                    }
                                    onBlur={(e) =>
                                        changeTitle(Number(e.target.value))
                                    }
                                />
                            </div>
                            <Slider.Root
                                className="relative flex h-5 w-[200px] touch-none select-none items-center py-5"
                                min={0.25}
                                max={4.0}
                                step={0.01}
                                value={[sliderValue]}
                                onValueChange={(vol) => setSliderValue(vol[0])}
                                onValueCommit={(vol) => {
                                    changeTitle(vol[0])
                                    updateSpeed(vol[0])
                                }}
                            >
                                <Slider.Track className="relative h-[5px] grow rounded-full bg-gray-200">
                                    <Slider.Range className="absolute h-full rounded-full bg-teal-400" />
                                </Slider.Track>

                                <Slider.Thumb
                                    className="block h-5 w-5 rounded-[10px] bg-teal-400 "
                                    aria-label="Volume"
                                />
                            </Slider.Root>
                            <hr className="h-0.5 border-t-0 bg-neutral-200 opacity-100" />
                            <div className="p-2 text-2xl font-medium text-gray-500">
                                <button
                                    onClick={() => {
                                        setSliderValue(1.2)
                                        changeTitle(1.2)
                                        updateSpeed(1.2)
                                    }}
                                >
                                    <p className=" ">高校標準程度</p>
                                </button>
                            </div>
                            <div className="p-2 text-2xl font-medium text-gray-500">
                                <button
                                    onClick={() => {
                                        setSliderValue(1.2)
                                        changeTitle(1.2)
                                        updateSpeed(1.2)
                                    }}
                                >
                                    <p className=" ">中学標準程度</p>
                                </button>
                            </div>
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </>
    )
}

export const VolumePopover = ({
    block,
    updateVolume,
}: {
    block: block
    updateVolume: (volume: number) => void
}) => {
    const [title, setTitle] = useState(block.volume)
    const [value, setValue] = useState(block.volume)

    const changeValue = (value: number) => {
        setValue(value)
    }
    const changeTitle = (value: number) => {
        setTitle(value)
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    className="mx-1 rounded-3xl bg-white px-3 text-center text-xs  font-medium  text-gray-600 hover:bg-gray-200"
                >
                    <FontAwesomeIcon icon={faVolumeHigh} />
                    {title}%
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="PopoverContent rounded-xl bg-white shadow-2xl"
                    sideOffset={5}
                >
                    <div className="">
                        <div className="py-2.5">
                            <span>音量</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                value={value}
                                className="w-10 outline-none outline-gray-100"
                                onChange={(e) =>
                                    changeValue(Number(e.target.value))
                                }
                                onBlur={(e) =>
                                    changeTitle(Number(e.target.value))
                                }
                            />
                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <Slider.Root
                            className="relative flex h-5 w-[200px] touch-none select-none items-center py-5"
                            min={0}
                            max={100}
                            step={1}
                            value={[value]}
                            onValueChange={(vol) => changeValue(vol[0])}
                            onValueCommit={(vol) => {
                                changeTitle(vol[0])
                                updateVolume(vol[0])
                            }}
                        >
                            <Slider.Track className="relative h-[5px] grow rounded-full bg-gray-200">
                                <Slider.Range className="absolute h-full rounded-full bg-teal-400" />
                            </Slider.Track>

                            <Slider.Thumb
                                className="block h-5 w-5 rounded-[10px] bg-teal-400 "
                                aria-label="Volume"
                            />
                        </Slider.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
export const PitchPopover = ({
    block,
    updatePitch,
}: {
    block: block
    updatePitch: (pitch: number) => void
}) => {
    const [value, setValue] = React.useState(block.pitch)
    const [title, setTitle] = React.useState(block.pitch)

    const changeValue = (value: number) => {
        setValue(value)
    }
    const changeTitle = (value: number) => {
        setTitle(value)
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    className="mx-1 rounded-3xl bg-white px-3 text-center text-xs  font-medium  text-gray-600 hover:bg-gray-200"
                >
                    <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
                    {title}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="PopoverContent rounded-xl bg-white shadow-2xl"
                    sideOffset={5}
                >
                    <div className="">
                        <div className="py-2.5">
                            <span>ピッチ</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                value={value}
                                className="w-10 outline-none outline-gray-100"
                                onChange={(e) =>
                                    changeValue(Number(e.target.value))
                                }
                                onBlur={(e) =>
                                    changeTitle(Number(e.target.value))
                                }
                            />
                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <Slider.Root
                            className="relative flex h-5 w-[200px] touch-none select-none items-center py-5"
                            min={-20}
                            max={20}
                            step={1}
                            value={[value]}
                            onValueChange={(vol) => changeValue(vol[0])}
                            onValueCommit={(vol) => {
                                changeTitle(vol[0])
                                updatePitch(vol[0])
                            }}
                        >
                            <Slider.Track className="relative h-[5px] grow rounded-full bg-gray-200">
                                <Slider.Range className="absolute h-full rounded-full bg-teal-400" />
                            </Slider.Track>

                            <Slider.Thumb
                                className="block h-5 w-5 rounded-[10px] bg-teal-400 "
                                aria-label="Volume"
                            />
                        </Slider.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
