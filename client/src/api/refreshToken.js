export const RefreshToken = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    sessionStorage.setItem("token", data.accessToken);
    return data;
  } catch {
    window.location.href = "/login";
  }
};
