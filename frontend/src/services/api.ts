import axios from 'axios';

// ชี้ไปที่ Backend ของเรา (Port 3003)
const API_URL = 'http://localhost:3003';

export const api = axios.create({
  baseURL: API_URL,
});

// ฟังก์ชันสำหรับเรียกดูข้อมูลรถไฟ
export const getTrains = async () => {
  const response = await api.get('/trains');
  return response.data;
};

// ฟังก์ชันสำหรับเรียกดูข้อมูลสถานี
export const getStations = async () => {
  const response = await api.get('/stations');
  return response.data;
};