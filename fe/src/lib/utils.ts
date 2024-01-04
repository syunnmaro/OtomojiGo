import { ApolloCache } from '@apollo/client'
import {
    GetWorksDocument,
    GetWorksQuery,
    GetWorksQueryVariables,
} from '../../graphql/dist/client'

export const synthesize = async (
    text: string,
    pitch: number,
    speaker: string,
    volume: number,
    speed: number
) => {
    const data: {
        text: string
        pitch: number
        speaker: string
        volume: number
        speed: number
    } = {
        text,
        pitch,
        speaker,
        volume,
        speed,
    }
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/synthesize`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        if (response.ok) {
            const body = await response.text()
            return new Audio(`data:audio/wav;base64,${body}`)
        }
    } catch (error) {
        throw error
    }
}

export const updateCache = ({
    cache,
    authorId,
    mutate,
}: {
    cache: ApolloCache<any>
    authorId: string
    mutate: (result: GetWorksQuery) => GetWorksQuery['getUserById']['works']
}) => {
    const query = GetWorksDocument
    cache.updateQuery<GetWorksQuery, GetWorksQueryVariables>(
        { query, variables: { id: authorId } },
        (result) => {
            if (!result) throw new Error('Result is null')
            return {
                getUserById: {
                    id: authorId,
                    works: mutate(result),
                },
            }
        }
    )
    return true
}
