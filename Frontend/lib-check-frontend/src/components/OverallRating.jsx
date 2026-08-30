import { Star } from "lucide-react";

function OverallRating({ rating, totalReports }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        Overall Rating
      </p>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-3xl font-semibold text-slate-900">
            {rating}
          </span>

          <span className="text-sm text-slate-400">
            / 5
          </span>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Based on {totalReports} recent reports
      </p>
    </div>
  );
}

export default OverallRating;