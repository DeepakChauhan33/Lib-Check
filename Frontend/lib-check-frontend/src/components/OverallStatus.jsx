function OverallStatus({ rating, lastUpdated }) {
  const getStatus = () => {
    if (rating >= 4.5) {
      return {
        title: "Excellent",
        description: "All library conditions look excellent.",
        color: "bg-green-500",
      };
    }

    if (rating >= 3.5) {
      return {
        title: "Good to Go",
        description: "Current library conditions look good.",
        color: "bg-green-500",
      };
    }

    if (rating >= 2.5) {
      return {
        title: "Fair",
        description: "Some library conditions may need attention.",
        color: "bg-yellow-500",
      };
    }

    return {
      title: "Poor Conditions",
      description: "Library conditions may not be ideal right now.",
      color: "bg-red-500",
    };
  };

  const status = getStatus();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Library Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${status.color}`}
            />

            <h2 className="text-2xl font-semibold text-slate-900">
              {status.title}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {status.description}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs text-slate-600 ">
            Overall rating
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {rating}
            <span className="text-sm font-normal text-slate-600 ">
              {" "}
              / 5
            </span>
          </p>

          {lastUpdated && (
            <p className="mt-1 text-xs text-slate-600 ">
              {lastUpdated}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default OverallStatus;