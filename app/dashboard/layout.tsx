

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex h-screen md:overflow-hidden md:flex-row flex-col ">
            <div className="w-full md:w-64 flex-none">
            
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    )
}