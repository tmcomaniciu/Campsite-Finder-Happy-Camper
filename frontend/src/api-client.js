// import { RegisterFormData } from "./pages/Register";
// import { SignInFormData } from "./pages/SignIn";

const REACT_APP_API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const register = async (formData) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const SignIn = async (formData) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/api/auth/validate-token`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error signing out");
  }
};

export const addMyCampsite = async (campsiteFormData) => {
  try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/api/my-campsites`, {
      method: "POST",
      credentials: "include",
      body: campsiteFormData,
    });

    if (!response.ok) {
      const responseBody = await response.json();
      console.error(responseBody); // Log the detailed error response
      throw new Error(responseBody.message || "Failed to add campsite");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
