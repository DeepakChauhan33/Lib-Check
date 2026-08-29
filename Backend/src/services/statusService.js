// Import User model
const StatusReport = require('../models/statusReport');


// creating status report in DB

const createReport = async (stausData, userId) => {

  const report = await StatusReport.create({
    ...stausData,
    submittedBy: userId
  });

  return {
    id: report._id,
    wifi: report.wifi,
    water: report.water,
    ac: report.ac,
    electricity: report.electricity,
    rain: report.rain,
    submittedBy: report.submittedBy,
    createdAt: report.createdAt
  }
}







const getCurrentStatus = async () => {

  // Current time
  const now = new Date();

  // Time 30 minutes ago
  const thirtyMinutesAgo = new Date(
    now.getTime() - 2 * 60 * 60 * 1000
  );


  // Get all recent reports
  const recentReports = await StatusReport.find({
    createdAt: {
      $gte: thirtyMinutesAgo
    }
  });


  // Get reports to display to the user
  const reports = await StatusReport.find()
    .populate("submittedBy", "name")
    .sort({ createdAt: -1 })
    .limit(20);


  // Default average
  let average = {
    wifi: 0,
    water: 0,
    ac: 0,
    electricity: 0,
    rain: 0
  };


  // Calculate average only if recent reports exist
  if (recentReports.length > 0) {

    let wifiTotal = 0;
    let waterTotal = 0;
    let acTotal = 0;
    let electricityTotal = 0;
    let rainTotal = 0;


    recentReports.forEach((report) => {

      wifiTotal += report.wifi;
      waterTotal += report.water;
      acTotal += report.ac;
      electricityTotal += report.electricity;
      rainTotal += report.rain;

    });


    average = {
      wifi: wifiTotal / recentReports.length,
      water: waterTotal / recentReports.length,
      ac: acTotal / recentReports.length,
      electricity: electricityTotal / recentReports.length,
      rain: rainTotal / recentReports.length
    };

  }


  return {
    average,
    recentReportCount: recentReports.length,
    reports
  };

}









const getAllReports = async () => {

  console.log("Mongo state:", StatusReport.db.readyState);

  const now = new Date();

  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  );

  const reports = await StatusReport.find({
    createdAt: {
      $gte: twentyFourHoursAgo
    }
  })
    .populate("submittedBy", "name")
    .sort({ createdAt: -1 });

  return reports;

}


module.exports = {
  createReport,
  getCurrentStatus,
  getAllReports

}