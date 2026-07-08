import axios from "axios";

const API_URL = "http://localhost:8888";

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export function getTokenData(): { id: number; login: string; role: string } | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const base64 = token.split(".")[1];
        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch {
        return null;
    }
}

export default API_URL;