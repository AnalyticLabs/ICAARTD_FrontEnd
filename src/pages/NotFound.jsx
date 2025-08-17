import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-8">
      <Ghost size={64} className="text-indigo-500 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
}
