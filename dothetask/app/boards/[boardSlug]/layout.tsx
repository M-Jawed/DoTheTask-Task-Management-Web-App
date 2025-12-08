import Header from "@/app/components/Header"

export default async function boardSlugLayout({params, children}: {params: Promise<{boardSlug: string}>, children: React.ReactNode}){
    const {boardSlug} = await params
    return <div className="flex flex-col w-full h-screen">
        <Header boardSlug={boardSlug} />
        {children}
        </div>

}