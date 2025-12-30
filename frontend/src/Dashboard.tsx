import { useEffect, useState } from 'react';
import axios from 'axios';

// 1. ต้องประกาศ Interface เพื่อบอกว่า Dashboard รับค่าอะไรมาจาก App.tsx บ้าง
interface DashboardProps {
  onLogout: () => void;
  onGoToSearch: () => void;
}

interface Station { id: number; name: string; province: string; }
interface Train { id: number; name: string; total_seats: number; }

// 2. ใส่ Props เข้าไปในฟังก์ชัน Dashboard
export default function Dashboard({ onLogout, onGoToSearch }: DashboardProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStation = await axios.get('http://localhost:3003/stations');
        const resTrain = await axios.get('http://localhost:3003/trains');
        setStations(Array.isArray(resStation.data) ? resStation.data : []);
        setTrains(Array.isArray(resTrain.data) ? resTrain.data : []);
      } catch (error) {
        console.error("โหลดข้อมูลไม่สำเร็จ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* 3. ส่วนหัวที่มีปุ่มกดสลับหน้าและปุ่ม Logout */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-600">🚄 ระบบจองตั๋วรถไฟ</h1>
        <div className="space-x-3">
          <button 
            onClick={onGoToSearch} // 👈 ใช้ฟังก์ชันที่รับมาจาก App.tsx
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            🔍 ค้นหาเที่ยวรถ
          </button>
          <button 
            onClick={onLogout} // 👈 ใช้ฟังก์ชันที่รับมาจาก App.tsx
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">📍 รายชื่อสถานี ({stations.length})</h2>
          <ul className="space-y-2">
            {stations.map((st) => (
              <li key={st.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>{st.name}</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{st.province}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">🚆 ขบวนรถไฟ ({trains.length})</h2>
          <ul className="space-y-2">
            {trains.map((tr) => (
              <li key={tr.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>{tr.name}</span>
                <span className="text-sm text-blue-600 font-semibold">{tr.total_seats} ที่นั่ง</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}