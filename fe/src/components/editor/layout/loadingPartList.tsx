import React from 'react'

export default function LoadingPartList() {
    return (
        <>
            <div className="flex items-center justify-between py-4 font-bold">
                <p className="h-6 w-44 animate-pulse rounded bg-slate-200" />
                <button
                    aria-label="読み込み中のパートを追加ボタン"
                    type="button"
                    className="btn btn-md  h-6 w-6 rounded-full bg-slate-200 "
                />
            </div>
            <div className="flex h-16 w-auto items-center border-2 border-gray-50 shadow-md">
                <div className="ml-4 h-5 w-48 animate-pulse bg-slate-200" />
                <div className="mx-1 ml-auto h-8 w-3 rounded-2xl bg-slate-200" />
            </div>
        </>
    )
}
