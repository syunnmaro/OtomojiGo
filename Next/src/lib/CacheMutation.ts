import { ApolloCache } from '@apollo/client'
import {
    GetBlocksDocument,
    GetBlocksQuery,
    GetBlocksQueryVariables,
    GetPartsDocument,
    GetPartsQuery,
    GetPartsQueryVariables,
    GetWorksDocument,
    GetWorksQuery,
    GetWorksQueryVariables,
} from '@/../graphql/dist/client'

type ContentArray =
    | GetWorksQuery['getUserById']['works']
    | GetPartsQuery['getWorkById']['parts']
    | GetBlocksQuery['getPartById']['blocks']

// Clear
// CreateWork
class Test {
    private readonly generateQuery: (works: ContentArray) => ContentArray

    private readonly cachedData: ContentArray

    constructor(
        generateQuery: (works: ContentArray) => ContentArray,
        cachedData: ContentArray
    ) {
        this.generateQuery = generateQuery
        this.cachedData = cachedData
    }

    create<T2>(newWork: T2) {
        console.log(this.cachedData)
        this.generateQuery([...this!.cachedData!, newWork])
    }

    delete(id: string) {
        this.generateQuery(this!.cachedData!.filter((work) => work.id !== id))
    }

    update<T2>(newWork: T2) {
        this.generateQuery(
            this.cachedData!.map((work) =>
                work.id === newWork.id ? newWork : work
            )
        )
    }
}

export default class CacheMutation {
    private readonly cache: ApolloCache<any>

    constructor(cache: ApolloCache<any>) {
        this.cache = cache
    }

    works(authorId: string) {
        const data = this.cache.readQuery<
            GetWorksQuery,
            GetWorksQueryVariables
        >({
            query: GetWorksDocument,
            variables: {
                id: authorId,
            },
        })
        const writeQuery = (works: GetWorksQuery['getUserById']['works']) => {
            const newData = {
                ...data,
                getUserById: {
                    ...data!.getUserById,
                    works,
                },
            }
            return this.cache.writeQuery<GetWorksQuery, GetWorksQueryVariables>(
                {
                    query: GetWorksDocument,
                    data: newData,
                    variables: { id: authorId },
                }
            )
        }
        return new Test((works) => writeQuery(works), data!.getUserById.works)
    }

    // 引数入れたらworksを編集できる関数

    parts(workId: string) {
        const data = this.cache.readQuery<
            GetPartsQuery,
            GetPartsQueryVariables
        >({
            query: GetPartsDocument,
            variables: {
                workId,
            },
        })
        const writeQuery = (parts: GetPartsQuery['getWorkById']['parts']) => {
            data!.getWorkById.parts = parts
            return this.cache.writeQuery<GetPartsQuery, GetPartsQueryVariables>(
                {
                    query: GetPartsDocument,
                    data: {
                        getWorkById: {
                            id: workId,
                            parts,
                        },
                    },
                    variables: { workId },
                }
            )
        }
        return new Test((parts) => writeQuery(parts), data!.getWorkById.parts)
    }

    blocks(partId: string) {
        const data = this.cache.readQuery<
            GetBlocksQuery,
            GetBlocksQueryVariables
        >({
            query: GetBlocksDocument,
            variables: {
                partId,
            },
        })

        const writeQuery = (
            blocks: GetBlocksQuery['getPartById']['blocks']
        ) => {
            data!.getPartById.blocks = blocks
            return this.cache.writeQuery<
                GetBlocksQuery,
                GetBlocksQueryVariables
            >({
                query: GetBlocksDocument,
                data: {
                    getPartById: {
                        id: partId,
                        blocks,
                    },
                },
                variables: { partId },
            })
        }
        return new Test(data?.getPartById.blocks, (blocks) =>
            writeQuery(blocks)
        )
    }
}
