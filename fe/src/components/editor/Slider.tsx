import * as Slider from '@radix-ui/react-slider'
import React from 'react'

export function BlockSettingPopoverSlider({
    min,
    max,
    step = 1,
    value,
    onValueChange,
}: {
    min: number
    max: number
    step?: number
    value: number
    onValueChange: (volume: number) => void
}) {
    return (
        <Slider.Root
            className="relative flex h-5 w-[200px] touch-none select-none items-center py-5"
            min={min}
            max={max}
            step={step}
            value={[value]}
            onValueChange={(vol) => onValueChange(vol[0])}
        >
            <Slider.Track className="relative h-[5px] grow rounded-full bg-gray-200">
                <Slider.Range className="absolute h-full rounded-full bg-teal-400" />
            </Slider.Track>

            <Slider.Thumb
                className="block h-5 w-5 rounded-[10px] bg-teal-400 "
                aria-label="Volume"
            />
        </Slider.Root>
    )
}

export function BlockSettingPopoverInput({
    value,
    onChange,
}: {
    value: number
    onChange: (value: number) => void
}) {
    return (
        <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={value}
            className="w-10 outline-none outline-gray-100"
            onChange={(e) => onChange(Number(e.target.value))}
        />
    )
}
