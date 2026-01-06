import axios from 'axios';

// ✅ เปลี่ยน URL เป็น Port 3000 (Default NestJS) หรือตามที่คุณรันจริง
const API_URL = 'http://localhost:3005';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: แนบ Token ไปกับทุก Request
api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    // ถ้ามีการใช้ Token จริงๆ ให้ดึงจาก localStorage.getItem('token')
    // แต่ในโปรเจกต์นี้เราอาจจะไม่ได้ใช้ JWT เต็มรูปแบบใน Code ตัวอย่าง
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getStations = () => api.get('/stations');
export const searchTrains = (originId: number, destId: number, includePast: boolean) => 
  api.get(`/search?origin=${originId}&dest=${destId}&includePast=${includePast}`);

// Admin: เพิ่มรถ
export const addTrain = (data: any) => api.post('/trains', data);

// Booking
export const bookTicket = (data: any) => api.post('/book', data);

export default api;