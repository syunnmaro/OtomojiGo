import React from 'react'

export default function LoadingWorkTable() {
    return (
        <div className="mx-auto flex  flex-col py-5">
            <div className="flex items-center justify-end py-5">
                <button
                    type="button"
                    className="btn btn-md mt-6 rounded-full bg-slate-200 px-16 py-8 "
                />
            </div>
            <div className="flex flex-col">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <p className="h-4 animate-pulse rounded bg-slate-200" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <p className="h-4 animate-pulse rounded bg-slate-200" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <p className="h-4 animate-pulse rounded bg-slate-200" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {}
                            <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-6 py-4"
                                >
                                    <p className="mb-2 h-4 animate-pulse rounded bg-slate-200" />
                                    <p className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                                </th>
                                <td className="px-6 py-4">
                                    <p className="mb-2 h-4 animate-pulse rounded bg-slate-200" />
                                    <p className="h-4 animate-pulse rounded bg-slate-200" />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="h-4 animate-pulse rounded bg-slate-200" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
