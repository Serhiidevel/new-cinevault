import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  message: string;
};

/** Shows API or network errors in a consistent way */
function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage;
