import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-analysis-report-backend-zh1s.vercel.app",
});

export const analyzeResume = async (file) => {
  try {
    console.log("1. analyzeResume started");
    console.log("2. File:", file);

    const formData = new FormData();

    formData.append("file", file);

    console.log("3. Sending request to backend...");

    const response = await API.post("/api/resumes/analyze", formData);

    console.log("4. Response received:");
    console.log(response);

    console.log("5. Response data:");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Axios error:");
    console.error(error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    if (error.request) {
      console.error("Request was sent but no response received:");
      console.error(error.request);
    }

    console.error("Message:", error.message);

    throw error;
  }
};
