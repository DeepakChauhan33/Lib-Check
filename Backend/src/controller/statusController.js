const { getIO } = require("../config/socket");

const { createReport, getCurrentStatus, getAllReports } = require("../services/statusService");



const createStatus = async (req, res) => {
  try {
    const report = await createReport(
      req.body,
      req.user.userId
    );

    // Notify all connected users about the new report
    const io = getIO();

    io.emit("reportCreated", report);

    return res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getStatus = async (req, res) => {
  try {

    const result = await getCurrentStatus();

    return res.status(200).json({
      success: true,
      ...result
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



const getReports = async (req, res) => {

  try {

    const reports = await getAllReports();

    return res.status(200).json({
      success: true,
      reports
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}





module.exports = {
  createStatus,
  getStatus,
  getReports
}