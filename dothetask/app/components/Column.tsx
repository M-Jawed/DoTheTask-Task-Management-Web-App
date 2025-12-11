export default async function Column({children}: {children: React.ReactNode}){
    return (
        <div>
            This a column
            <div>
                {children}
            </div>
        </div>
    )
}