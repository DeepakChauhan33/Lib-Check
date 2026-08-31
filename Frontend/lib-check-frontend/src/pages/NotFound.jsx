import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">

        <p className="text-sm font-medium text-blue-600">
          LibCheck
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-tight text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-slate-800">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Go to Dashboard
        </Link>

      </div>
    </div>
  );
}

export default NotFound;