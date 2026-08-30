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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
            <Icon size={19} />
          </div>

          <h3 className="text-sm font-medium text-slate-700">
            {name}
          </h3>
        </div>

        <span className="text-xs font-medium text-slate-400">
          5
        </span>

      </div>

      <div className="mt-5 flex items-end justify-between">

        <div>
          <p className="text-2xl font-semibold text-slate-900">
            {rating}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            out of 5
          </p>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          {status}
        </span>

      </div>

    </div>
  );
}

export default StatusCard;