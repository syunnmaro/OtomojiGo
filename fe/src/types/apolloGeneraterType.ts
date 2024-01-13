// ```ts
// function SidebarWork({ workId }: { workId: string }) {
//
//     //fetchData
//     const { data } = useQuery<GetWorkNameQuery, GetWorkNameQueryVariables>(
//         GetWorkNameDocument,
//         {
//             variables: { workId },
//         }
//     )
//     const workName = data?.getWorkById?.name || ''
//
//
//     const [name, setName] = useState(workName)
//     const [updateWork] = useMutation<
//         UpdateWorkMutation,
//         UpdateWorkMutationVariables
//     >(UpdateWorkDocument, {
//         variables: { name, workId },
//
//         update(cache: ApolloCache<any>, { data }) {
//             new CacheMutation(cache)
//                 .works(data?.updateWork?.authorID as string)
//                 .update(data?.updateWork)
//         },
//     })
//
//     return (
//         <div></>
//     )
// }
//
// ```
//
// もう一つの課題として、Apolloは状態管理ライブラリーって言ったと思うんだけど、キャッシュを更新するとUIの値も更新されます。
// いままではuseStateっていうsetnameによってnameが更新されるとUIが更新されるっていうReactのhookを使ってたけど、ApolloによってUsestateが必要なくなった。
// CacheMutationの引数にはcacheが必要だけどcacheはUpdate(cache,{data})でしか受け取れないから
