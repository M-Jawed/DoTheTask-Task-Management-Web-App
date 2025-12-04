export default async function boardSlug({params} : {params: Promise<{boardSlug: string}>}){
    const {boardSlug} = await params
    return <h1>This is the {boardSlug} </h1>
}