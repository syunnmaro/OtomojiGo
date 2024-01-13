import React from 'react'

export default function LoadingBlockList() {
    return (
        <div className="mt-10 flex w-full  justify-center overflow-scroll bg-gray-50">
            <div className="w-3/6 ">
                <div className="">
                    <div className="mt-10 h-40 animate-pulse bg-white shadow-xl">
                        <div>
                            <button
                                aria-label="LoadingBlock"
                                type="button"
                                className="h-12 w-24 animate-pulse rounded-3xl bg-slate-200"
                            />
                            <button
                                aria-label="LoadingBlock"
                                type="button"
                                className="h-12 w-24 animate-pulse rounded-3xl bg-slate-200"
                            />
                            <button
                                aria-label="LoadingBlock"
                                type="button"
                                className="h-12 w-24 animate-pulse rounded-3xl bg-slate-200"
                            />
                        </div>
                        <div>
                            <p className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
                            <p className="h-6 w-44 animate-pulse rounded bg-slate-200" />
                            <p className="h-6 w-44 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <button
                        aria-label="LoadingBlock"
                        type="button"
                        className="h-14 w-44 rounded bg-gray-200 px-4 py-2 font-bold"
                    />
                </div>
            </div>
        </div>
    )
}
