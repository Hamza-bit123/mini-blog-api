import { RefreshToken } from "./refreshToken";

export const fetchWithAuth = async (url, options = {}) => {
  let token = sessionStorage.getItem("token");
  try {
    let response = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    });
    if (response.status === 401 || response.status === 403) {
      token = RefreshToken().accessToken;
      response = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` },
      });
    }
    return response;
  } catch (error) {
    console.log("error:" + error);
    console.log("Check your connection");
  }
};
