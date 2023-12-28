export type GetWorkOutput = {
    id: string
    works: {
        id: string
        name: string
        createdAt: Date
    }
}

export type CreateWorkOutput = {
    createWork: {
        id: string
        name: string
        createdAt: number
    }
}

export type UpdateWorkOutput = {
    updateWork: {
        name: string
        id: string
        __typename: string
    }
}
