import { Loader2 } from "lucide-react";

/** Simple loading indicator used while fetching data */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-zinc-400">
      <Loader2 className="h-10 w-10 animate-spin text-amber-400" aria-hidden />
      <p>Loading movies...</p>
    </div>
  );
}

export default LoadingSpinner;
