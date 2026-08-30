function RecentReports({ reports }) {
  const recentReports = [...reports]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Reports
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Latest library condition reports
        </p>
      </div>

      {/* Reports */}
      {recentReports.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-slate-500">
            No reports yet.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Be the first person to rate the library.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">

          {recentReports.map((report) => (
            <div
              key={report._id}
              className="px-5 py-4"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {report.submittedBy?.name || "Library Member"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(report.createdAt)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {calculateReportRating(report)}
                  </p>

                  <p className="text-xs text-slate-400">
                    Overall
                  </p>
                </div>

              </div>

              {/* Parameter ratings */}
              <div className="mt-3 grid grid-cols-5 gap-2">

                <RatingValue
                  label="Wi-Fi"
                  value={report.wifi}
                />

                <RatingValue
                  label="Water"
                  value={report.water}
                />

                <RatingValue
                  label="AC"
                  value={report.ac}
                />

                <RatingValue
                  label="Electricity"
                  value={report.electricity}
                />

                <RatingValue
                  label="Rain"
                  value={report.rain}
                />

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}


function calculateReportRating(report) {
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

  return new Date(date).toLocaleString();
}


function RatingValue({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 px-2 py-2 text-center">
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">
        {value}/5
      </p>
    </div>
  );
}


export default RecentReports;