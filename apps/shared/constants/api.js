// API constants
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  PROJECTS: "/api/projects",
  CONTACT: "/api/contact",
  STATS: "/api/stats",
  FAQS: "/api/faqs",
  RESUME: "/api/resume",
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    USERS: "/api/auth/users",
    CREATE_USER: "/api/auth/users",
  },
};
