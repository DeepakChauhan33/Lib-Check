import { useState, useEffect } from "react";

import socket from "../services/socket";

import { getReports } from "../services/reportService";

import RateLibraryModal from "../components/RateLibraryModal";

import MainLayout from "../layout/MainLayout";

import OverallStatus from "../components/OverallStatus";
import StatusCard from "../components/StatusCard";

import RecentReports from "../components/RecentReports";
import OverallRating from "../components/OverallRating";

function Dashboard() {

  const [reports, setReports] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const [error, setError] = useState("");

  const [isRateModalOpen, setIsRateModalOpen] = useState(false);




  const calculateOverallRating = () => {
    if (reports.length === 0) {
      return 0;
    }

    let total = 0;

    reports.forEach((report) => {
      total +=
        report.wifi +
        report.water +
        report.ac +
        report.electricity +
        report.rain;
    });

    const totalParameters = reports.length * 5;

    return (total / totalParameters).toFixed(1);
  };




  const overallRating = calculateOverallRating();



  const handleRateLibrary = () => {
    setIsRateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRateModalOpen(false);
  };




  const fetchReports = async (isBackgroundRefresh = false) => {
    try {
      if (isBackgroundRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError("");

      const data = await getReports();

      setReports(data.reports);
    } catch (error) {
      console.error("REPORT ERROR:", error);

      setError(error.message);
    } finally {
      if (isBackgroundRefresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };


  useEffect(() => {
    fetchReports();

    const handleReportCreated = (report) => {
      console.log("New report received:", report);

      fetchReports(true);
    };

    socket.on("reportCreated", handleReportCreated);

    return () => {
      socket.off("reportCreated", handleReportCreated);
    };
  }, []);




  const calculateAverage = (parameter) => {
    if (reports.length === 0) {
      return 0;
    }

    const total = reports.reduce(
      (sum, report) => sum + (Number(report[parameter]) || 0),
      0
    );

    return (total / reports.length).toFixed(1);
  };









  const wifiRating = calculateAverage("wifi");
  const waterRating = calculateAverage("water");
  const acRating = calculateAverage("ac");
  const electricityRating = calculateAverage("electricity");
  const rainRating = calculateAverage("rain");


  const getStatus = (rating) => {
    const value = Number(rating);

    if (value === 0) {
      return "No Data";
    }

    if (value >= 4.5) {
      return "Excellent";
    }

    if (value >= 3.5) {
      return "Good";
    }

    if (value >= 2.5) {
      return "Average";
    }

    return "Poor";
  };




  const getLastUpdated = () => {
    if (reports.length === 0) {
      return "No reports yet";
    }

    const latestReport = reports.reduce((latest, report) => {
      if (!latest) {
        return report;
      }

      return new Date(report.createdAt) > new Date(latest.createdAt)
        ? report
        : latest;
    }, null);

    return formatTimeAgo(latestReport.createdAt);
  };





  const formatTimeAgo = (date) => {
    const now = new Date();
    const reportDate = new Date(date);

    const differenceInSeconds = Math.floor(
      (now - reportDate) / 1000
    );

    if (differenceInSeconds < 60) {
      return "Updated just now";
    }

    const differenceInMinutes = Math.floor(
      differenceInSeconds / 60
    );

    if (differenceInMinutes < 60) {
      return `Updated ${differenceInMinutes} ${differenceInMinutes === 1 ? "minute" : "minutes"
        } ago`;
    }

    const differenceInHours = Math.floor(
      differenceInMinutes / 60
    );

    if (differenceInHours < 24) {
      return `Updated ${differenceInHours} ${differenceInHours === 1 ? "hour" : "hours"
        } ago`;
    }

    const differenceInDays = Math.floor(
      differenceInHours / 24
    );

    return `Updated ${differenceInDays} ${differenceInDays === 1 ? "day" : "days"
      } ago`;
  };








  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading library status...
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

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Library Status
          </h1>

          {isRefreshing && (
            <p className="mt-1 text-xs text-slate-400">
              Updating...
            </p>
          )}
        </div>

        <button
          onClick={handleRateLibrary}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 sm:w-auto"
        >
          Rate Library
        </button>

      </div>



      {/* Overall Status */}
      <div className="mt-6 rounded-md">
        <OverallStatus
          rating={Number(overallRating)}
          lastUpdated={getLastUpdated()}
        />
      </div>

      {/* Status Cards */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

        <StatusCard
          name="Wi-Fi"
          type="wifi"
          rating={wifiRating}
          status={getStatus(wifiRating)}
        />

        <StatusCard
          name="Water"
          type="water"
          rating={waterRating}
          status={getStatus(waterRating)}
        />

        <StatusCard
          name="AC"
          type="ac"
          rating={acRating}
          status={getStatus(acRating)}
        />

        <StatusCard
          name="Electricity"
          type="electricity"
          rating={electricityRating}
          status={getStatus(electricityRating)}
        />

        <StatusCard
          name="Rain"
          type="rain"
          rating={rainRating}
          status={getStatus(rainRating)}
        />

      </div>


      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        <OverallRating
          rating={overallRating}
          totalReports={reports.length}
        />

        <RateLibraryModal
          isOpen={isRateModalOpen}
          onClose={handleCloseModal}
          onSubmitted={fetchReports}
        />

      </div>

      {/* Recent Reports */}
      <RecentReports reports={reports} />

    </MainLayout>
  );
}

export default Dashboard;