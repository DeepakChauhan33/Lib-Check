const API_URL = import.meta.env.VITE_API_URL;


async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return {};
}


// Get all reports

export async function getReports() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(`${API_URL}/report`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch reports"
      );
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Please try again."
      );
    }

    throw error;
  }
}


// Create a new report

export async function createReport(ratings) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await fetch(`${API_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ratings),
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to submit report"
      );
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Please try again."
      );
    }

    throw error;
  }
}