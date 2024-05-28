import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreCardSkeleton() {
    return (
        <div className="w-full p-4 rounded-md shadow">
            <div className="grid grid-cols-[1fr,110px] items-start gap-4 space-y-0">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Skeleton className="h-8 w-32 rounded" />
                    <Separator orientation="vertical" className="h-[20px]" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            </div>
            <div className="mt-4 flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-4 w-20 ml-2" />
                </div>
                <div className="flex items-center">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-4 w-20 ml-2" />
                </div>
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
}