// eslint-disable-next-line max-classes-per-file
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
    Node,
    Scalars,
} from '@/../graphql/dist/client'

export type Work = Node & {
    __typename?: 'Work'
    authorID: Scalars['ID']
    createdAt: Scalars['Time']
    id: Scalars['ID']
    name: Scalars['String']
    updatedAt: Scalars['Time']
}
export type Block = Node & {
    __typename?: 'Block'
    authorID: Scalars['String']
    duration: Scalars['Int']
    id: Scalars['ID']
    partID: Scalars['ID']
    pitch: Scalars['Int']
    speaker: Scalars['String']
    speed: Scalars['Float']
    texts: Scalars['String']
    volume: Scalars['Float']
}

export type Part = Node & {
    __typename?: 'Part'
    authorID: Scalars['String']
    createdAt: Scalars['Time']
    id: Scalars['ID']
    name: Scalars['String']
    workID: Scalars['ID']
}

// Clear
// CreateWork
class Mutation<T1 extends Work | Part | Block> {
    private readonly generateQuery: (works: T1[]) => void

    private readonly cachedData: T1[]

    constructor(
        generateQuery: (newWillCachedData: T1[]) => void,
        cachedData: T1[]
    ) {
        this.generateQuery = generateQuery
        this.cachedData = cachedData
    }

    create(newContent: T1) {
        const { cachedData } = this
        this.generateQuery([...cachedData, newContent])
    }

    delete(id: string) {
        this.generateQuery(this!.cachedData!.filter((work) => work.id !== id))
    }

    update(newContent: T1) {
        this.generateQuery(
            this.cachedData!.map((work) =>
                work.id === newContent.id ? newContent : work
            )
        )
    }
}

export default class CacheMutation {
    private readonly cache: ApolloCache<unknown>

    constructor(cache: ApolloCache<unknown>) {
        this.cache = cache
    }

    getWorks() {
        const data = this.cache.readQuery<
            GetWorksQuery,
            GetWorksQueryVariables
        >({
            query: GetWorksDocument,
        })
        const writeQuery = (works: Work[]) => {
            const newData: GetWorksQuery = {
                ...data,
                getUserFromUserId: {
                    ...data!.getUserFromUserId,
                    works,
                },
            }
            return this.cache.writeQuery<GetWorksQuery, GetWorksQueryVariables>(
                {
                    query: GetWorksDocument,
                    data: newData,
                }
            )
        }
        return new Mutation<Work>(
            (works) => writeQuery(works),
            data!.getUserFromUserId!.works!
        )
    }

    // 引数入れたらworksを編集できる関数

    getParts(workId: string) {
        const data = this.cache.readQuery<
            GetPartsQuery,
            GetPartsQueryVariables
        >({
            query: GetPartsDocument,
            variables: {
                workId,
            },
        })
        const writeQuery = (parts: Part[]) => {
            const newData: GetPartsQuery = {
                ...data,
                getWorkById: {
                    ...data!.getWorkById,
                    parts,
                },
            }
            return this.cache.writeQuery<GetPartsQuery, GetPartsQueryVariables>(
                {
                    query: GetPartsDocument,
                    data: newData,
                    variables: { workId },
                }
            )
        }
        return new Mutation<Part>(
            (newPart) => writeQuery(newPart),
            data!.getWorkById!.parts!
        )
    }

    getBlocks(partId: string) {
        const data = this.cache.readQuery<
            GetBlocksQuery,
            GetBlocksQueryVariables
        >({
            query: GetBlocksDocument,
            variables: {
                partId,
            },
        })

        const writeQuery = (blocks: Block[]) => {
            const newData: GetBlocksQuery = {
                ...data,
                getPartById: {
                    ...data!.getPartById,
                    blocks,
                },
            }
            return this.cache.writeQuery<
                GetBlocksQuery,
                GetBlocksQueryVariables
            >({
                query: GetBlocksDocument,
                data: newData,
                variables: { partId },
            })
        }
        return new Mutation<Block>(
            (blocks) => writeQuery(blocks),
            data!.getPartById!.blocks!
        )
    }
}
