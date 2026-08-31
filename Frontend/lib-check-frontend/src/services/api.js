const API_URL = import.meta.env.VITE_API_URL;

async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return {};
}


// Login user

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
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


// Register user

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(
        data.message || "Registration failed"
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


// Get currently logged-in user

export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${API_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to get user"
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


// Logout user

export async function logoutUser(token) {
  try {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await getResponseData(response);

    if (!response.ok) {
      throw new Error(
        data.message || "Logout failed"
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