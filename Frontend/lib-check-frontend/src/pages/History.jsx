import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layout/MainLayout";
import { getReports } from "../services/reportService";

function History() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getReports();

        setReports(data.reports || []);
      } catch (error) {
        console.error("HISTORY ERROR:", error);

        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const sortedReports = useMemo(() => {
    return [...reports].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reports]);

  const filteredReports = useMemo(() => {
    if (filter === "all") {
      return sortedReports;
    }

    return sortedReports.filter((report) => {
      const rating = calculateReportRating(report);

      if (filter === "excellent") {
        return rating >= 4.5;
      }

      if (filter === "good") {
        return rating >= 3.5 && rating < 4.5;
      }

      if (filter === "average") {
        return rating >= 2.5 && rating < 3.5;
      }

      return rating < 2.5;
    });
  }, [sortedReports, filter]);

  const overallRating = calculateOverallRating(reports);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading report history...
          </p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Report History
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View previous library condition reports.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <SummaryCard
          label="Total Reports"
          value={reports.length}
        />

        <SummaryCard
          label="Average Rating"
          value={`${overallRating} / 5`}
        />

      </div>

      {/* Filter */}
      {reports.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">

          <FilterButton
            label="All"
            value="all"
            activeFilter={filter}
            setFilter={setFilter}
          />

          <FilterButton
            label="Excellent"
            value="excellent"
            activeFilter={filter}
            setFilter={setFilter}
          />

          <FilterButton
            label="Good"
            value="good"
            activeFilter={filter}
            setFilter={setFilter}
          />

          <FilterButton
            label="Average"
            value="average"
            activeFilter={filter}
            setFilter={setFilter}
          />

          <FilterButton
            label="Poor"
            value="poor"
            activeFilter={filter}
            setFilter={setFilter}
          />

        </div>
      )}

      {/* Reports */}
      {filteredReports.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            No reports found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Try changing the filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filteredReports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}


function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}


function FilterButton({
  label,
  value,
  activeFilter,
  setFilter,
}) {
  const isActive = activeFilter === value;

  return (
    <button
      onClick={() => setFilter(value)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        }`}
    >
      {label}
    </button>
  );
}


function ReportCard({ report }) {
  const overallRating = calculateReportRating(report);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-medium text-slate-800">
            {report.submittedBy?.name || "Library Member"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {formatDate(report.createdAt)}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xl font-semibold text-slate-900">
            {overallRating}
            <span className="text-sm font-normal text-slate-400">
              {" "}
              / 5
            </span>
          </p>

          <p className="text-xs text-slate-400">
            Overall
          </p>
        </div>

      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">

        <RatingItem
          label="Wi-Fi"
          value={report.wifi}
        />

        <RatingItem
          label="Water"
          value={report.water}
        />

        <RatingItem
          label="AC"
          value={report.ac}
        />

        <RatingItem
          label="Electricity"
          value={report.electricity}
        />

        <RatingItem
          label="Rain"
          value={report.rain}
        />

      </div>
    </div>
  );
}


function RatingItem({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value} / 5
      </p>
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

  return Number((total / 5).toFixed(1));
}


function calculateOverallRating(reports) {
  if (reports.length === 0) {
    return "0.0";
  }

  const total = reports.reduce((sum, report) => {
    return sum + calculateReportRating(report);
  }, 0);

  return (total / reports.length).toFixed(1);
}


function formatDate(date) {
  if (!date) {
    return "Unknown time";
  }

  return new Date(date).toLocaleString();
}


export default History;