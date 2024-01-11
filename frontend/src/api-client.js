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
