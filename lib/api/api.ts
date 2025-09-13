import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// create nextServer axios instance
export const nextServer = axios.create({
  baseURL: `${NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true, // allow sending cookies
});
