import { Star } from "lucide-react";

function ReportItem({ report }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">

      {/* User + Time */}
      <div className="flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-900">
            {report.user}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {report.time}
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center gap-1">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold text-slate-700">
            {report.rating}
          </span>
        </div>

      </div>

      {/* Parameter Ratings */}
      <div className="mt-4 flex flex-wrap gap-2">

        <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
          Wi-Fi {report.wifi}
        </span>

        <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
          Water {report.water}
        </span>

        <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
          AC {report.ac}
        </span>

        <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
          Electricity {report.electricity}
        </span>

        <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
          Rain {report.rain}
        </span>

      </div>

      {/* Comment */}
      {report.comment && (
        <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">
          "{report.comment}"
        </p>
      )}

    </div>
  );
}

export default ReportItem;