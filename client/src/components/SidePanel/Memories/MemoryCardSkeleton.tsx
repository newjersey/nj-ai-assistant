import { Skeleton } from '@librechat/client';

<<<<<<< HEAD
/** Mirrors MemoryCard: key + token pill on the first row, value + date on the second */
=======
/** Mirrors MemoryCard: key + agent badge on the first row, value + date on the second */
>>>>>>> upstream/main
export default function MemoryCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
<<<<<<< HEAD
        <div key={i} className="rounded-lg border border-border-light px-3 py-2.5">
=======
        <div key={i} className="rounded-lg px-3 py-2.5">
>>>>>>> upstream/main
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <Skeleton className="h-4 flex-1 rounded" />
            <Skeleton className="h-3 w-20 shrink-0 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
