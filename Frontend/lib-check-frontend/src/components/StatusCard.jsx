import {
  Wifi,
  Droplets,
  Wind,
  Zap,
  CloudRain,
} from "lucide-react";

const icons = {
  wifi: Wifi,
  water: Droplets,
  ac: Wind,
  electricity: Zap,
  rain: CloudRain,
};

function StatusCard({ name, rating, status, type }) {
  const Icon = icons[type];

  return (
    <div
      className="
        group
        rounded-2xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:p-5
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          {/* Icon */}
          <div
            className="
              shrink-0
              rounded-lg
              bg-slate-100
              p-2
              text-slate-600
              transition-all
              duration-400
              ease-in-out
              group-hover:scale-110
              group-hover:rotate-3
              group-hover:bg-[#7c7c7c]
              group-hover:text-white
            "
          >
            <Icon size={18} />
          </div>

          <h3 className="truncate text-sm font-medium text-slate-700">
            {name}
          </h3>

        </div>

        <span className="shrink-0 text-xs text-slate-800">
          / 5
        </span>

      </div>

      {/* Rating */}
      <div className="mt-5 flex items-end justify-between gap-3">

        <div>
          <p className="text-2xl font-semibold text-slate-900">
            {rating}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Average rating
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${status === "Excellent"
            ? "bg-green-50 text-green-700"
            : status === "Good"
              ? "bg-green-50 text-green-700"
              : status === "Average"
                ? "bg-yellow-50 text-yellow-700"
                : status === "No Data"
                  ? "bg-slate-100 text-slate-500"
                  : "bg-red-50 text-red-700"
            }`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}

export default StatusCard;