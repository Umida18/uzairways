import { notification } from "antd";
import { NavigateFunction } from "react-router-dom";

export const handleApiError = (error: any, navigate: NavigateFunction) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        notification.error({
          message: "Session Expired",
          description:
            "Your session has ended or your login is invalid. Please log in again to continue.",
        });
        // Clear the invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        // Redirect to the login page
        navigate("/login");
        break;
      case 403:
        notification.error({
          message: "Access Denied",
          description:
            "You do not have the necessary permissions to access this resource.",
        });
        break;
      default:
        notification.error({
          message: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
    }
  } else if (error.request) {
    notification.error({
      message: "Connection Issue",
      description:
        "We couldn't reach the server. Please check your internet connection and try again.",
    });
  } else {
    notification.error({
      message: "Application Error",
      description:
        "An unknown error occurred. Please refresh the page or contact support.",
    });
  }
};
