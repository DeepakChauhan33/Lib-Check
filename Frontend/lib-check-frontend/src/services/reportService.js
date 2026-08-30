const API_URL = "http://localhost:8000";

export async function getReports() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/report`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reports");
  }

  return data;
}

export async function createReport(ratings) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ratings),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit report");
  }

  return data;
}