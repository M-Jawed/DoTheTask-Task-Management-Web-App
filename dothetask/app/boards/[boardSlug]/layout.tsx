import Header from "@/app/components/Header";
import BoardContextProvider from "@/app/components/BoardContextProvider";

export default async function boardSlugLayout({
  params,
  children,
}: {
  params: Promise<{ boardSlug: string }>;
  children: React.ReactNode;
}) {
  const { boardSlug } = await params;
  return (
    <BoardContextProvider boardSlug={boardSlug}>
      <div className="flex flex-col w-full h-screen scrollbar-hide overflow-y-auto overflow-x-auto">
        <Header boardSlug={boardSlug} />
        {children}
      </div>
    </BoardContextProvider>
  );
}
