export default function Loading() {
    return (
        <div className="flex items-center absolute top-96 right-[40rem]  justify-center">
            <div className="flex items-center  justify-center space-x-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <span className="text-primary font-medium">Loading...</span>
            </div>
        </div>
    )
}