function RecentReports({ reports = [] }) {
  const recentReports = [...reports]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 px-5 py-5 sm:px-6">

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Reports
          </h2>

          <p className="mt-1 text-md text-slate-600">
            Latest library condition reports
          </p>
        </div>

        {reports.length > 5 && (
          <span className="text-md font-semibold text-black">
            {reports.length} reports
          </span>
        )}

      </div>


      {/* Empty State */}
      {recentReports.length === 0 ? (
        <div className="px-5 py-12 text-center sm:px-6">

          <p className="text-sm font-medium text-slate-700">
            No reports yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Be the first person to rate the library.
          </p>

        </div>
      ) : (

        <div>
          {recentReports.map((report, index) => (
            <ReportItem
              key={report._id}
              report={report}
              isLast={index === recentReports.length - 1}
            />
          ))}
        </div>

      )}

    </section>
  );
}


function ReportItem({ report, isLast }) {
  const overallRating = calculateOverallRating(report);

  const userName =
    report.submittedBy?.name || "Library Member";

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  return (
    <div
      className={`px-5 py-5 sm:px-6 ${!isLast ? "border-b border-slate-100" : ""
        }`}
    >

      {/* User + Overall Rating */}
      <div className="flex items-start justify-between gap-4 ">

        <div className="flex min-w-0 items-center gap-3">

          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            {initials}
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-slate-800">
              {userName}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {formatDate(report.createdAt)}
            </p>

          </div>

        </div>


        {/* Overall Rating */}
        <div className="shrink-0 text-right">

          <p className="text-lg font-semibold text-slate-900">
            {overallRating}
            <span className="text-xs font-normal text-slate-900">
              {" "}
              / 5
            </span>
          </p>

          <p className="text-[12px] text-slate-900 font-medium">
            Overall
          </p>

        </div>

      </div>


      {/* Individual Ratings */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">

        <Rating
          label="Wi-Fi"
          value={report.wifi}
        />

        <Rating
          label="Water"
          value={report.water}
        />

        <Rating
          label="AC"
          value={report.ac}
        />

        <Rating
          label="Electricity"
          value={report.electricity}
        />

        <Rating
          label="Rain"
          value={report.rain}
        />

      </div>

    </div>
  );
}


function Rating({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-3 border-b border-gray-200 shadow">

      <p className="text-[11px] font-medium text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">

        <p className="text-sm font-semibold text-slate-800">
          {value}
        </p>

        <span className="text-[11px] text-slate-400">
          / 5
        </span>

      </div>

    </div>
  );
}


function calculateOverallRating(report) {
  const total =
    Number(report.wifi || 0) +
    Number(report.water || 0) +
    Number(report.ac || 0) +
    Number(report.electricity || 0) +
    Number(report.rain || 0);

  return (total / 5).toFixed(1);
}


function formatDate(date) {
  if (!date) {
    return "Unknown time";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default RecentReports;