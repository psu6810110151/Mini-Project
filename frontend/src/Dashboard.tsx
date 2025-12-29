import { useEffect, useState } from 'react';
import axios from 'axios';

interface Station { id: number; name: string; province: string; }
interface Train { id: number; name: string; total_seats: number; }

export default function Dashboard() {
  const [stations, setStations] = useState<Station[]>([]);
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStation = await axios.get('http://localhost:3003/stations');
        const resTrain = await axios.get('http://localhost:3003/trains');
        
        // ตรวจสอบว่าเป็น Array ก่อนจะเซตค่า
        setStations(Array.isArray(resStation.data) ? resStation.data : []);
        setTrains(Array.isArray(resTrain.data) ? resTrain.data : []);
      } catch (error) {
        console.error("โหลดข้อมูลไม่สำเร็จ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">🚄 ระบบจองตั๋วรถไฟ (Dashboard)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รายชื่อสถานี */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">📍 รายชื่อสถานี ({stations.length})</h2>
          <ul className="space-y-2">
            {stations.length > 0 ? stations.map((st) => (
              <li key={st.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>{st.name}</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{st.province}</span>
              </li>
            )) : <li className="text-gray-400">ไม่มีข้อมูลสถานี</li>}
          </ul>
        </div>

        {/* ขบวนรถไฟ */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">🚆 ขบวนรถไฟ ({trains.length})</h2>
          <ul className="space-y-2">
            {trains.length > 0 ? trains.map((tr) => (
              <li key={tr.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>{tr.name}</span>
                <span className="text-sm text-blue-600 font-semibold">{tr.total_seats} ที่นั่ง</span>
              </li>
            )) : <li className="text-gray-400">ไม่มีข้อมูลรถไฟ</li>}
          </ul>
        </div>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }} 
          className="px-6 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}