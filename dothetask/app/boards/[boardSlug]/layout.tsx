import BoardContextProvider from "@/app/components/BoardContextProvider";

export default async function boardSlugLayout({params, children}: {params: Promise<{boardSlug: string}>, children: React.ReactNode}){
    const {boardSlug} = await params
    return <BoardContextProvider boardSlug={boardSlug}>
        {children}
    </BoardContextProvider>
}