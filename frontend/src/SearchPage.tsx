import { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchPageProps {
  onBack: () => void;
}

export default function SearchPage({ onBack }: SearchPageProps) {
  const [stations, setStations] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [originId, setOriginId] = useState('');
  const [destinationId, setDestinationId] = useState('');

  // 1. โหลดรายชื่อสถานีมาใส่ใน Dropdown
 useEffect(() => {
  const fetchStations = async () => {
    try {
      const res = await axios.get('http://localhost:3003/stations');
      console.log("สถานีที่ดึงมาได้:", res.data); // 👈 เปิด Console เช็คดูว่าข้อมูลมาไหม
      
      // ตรวจสอบว่าเป็น Array หรือไม่ก่อนเซตค่า
      if (Array.isArray(res.data)) {
        setStations(res.data);
      } else {
        console.error("ข้อมูลสถานีไม่ใช่รูปแบบ Array");
      }
    } catch (err) {
      console.error("ดึงข้อมูลสถานีผิดพลาด:", err);
    }
  };
  fetchStations();
}, []);

  // 2. ฟังก์ชันค้นหาตารางเดินรถ
  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:3003/schedules');
      // กรองข้อมูลเฉพาะต้นทางและปลายทางที่เลือก
      const filtered = res.data.filter((s: any) => 
        s.origin?.id === Number(originId) && s.destination?.id === Number(destinationId)
      );
      setSchedules(filtered);
    } catch (error) {
      alert('ค้นหาไม่สำเร็จ');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button onClick={onBack} className="mb-6 text-blue-600 font-semibold hover:underline">
        ← กลับไปหน้าหลัก
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">🔍 ค้นหาเที่ยวรถไฟ</h1>

      {/* ฟอร์มเลือกสถานี */}
      <div className="bg-white p-6 rounded-xl shadow-lg border flex flex-wrap gap-4 items-end justify-center mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">สถานีต้นทาง</label>
          <select 
            className="p-2 border rounded-md w-64"
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
          >
            <option value="">เลือกสถานีต้นทาง</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="text-2xl mb-1">➔</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">สถานีปลายทาง</label>
          <select 
            className="p-2 border rounded-md w-64"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            <option value="">เลือกสถานีปลายทาง</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white px-8 py-2 rounded-md font-bold hover:bg-blue-700 transition"
        >
          ค้นหา
        </button>
      </div>

      {/* แสดงผลลัพธ์การค้นหา */}
      <div className="grid gap-4">
        {schedules.length > 0 ? schedules.map((sch) => (
          <div key={sch.id} className="bg-white p-6 rounded-lg shadow border flex justify-between items-center">
            <div>
              <div className="text-xl font-bold text-blue-700">{sch.train?.name}</div>
              <div className="text-gray-600">
                {sch.origin?.name} ({sch.departure_time}) ➔ {sch.destination?.name} ({sch.arrival_time})
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-orange-600">{sch.price} THB</div>
              <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                จองที่นั่ง
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-400 mt-10 italic">
            ไม่พบเที่ยวรถในเส้นทางที่เลือก หรือกรุณากดปุ่มค้นหา
          </div>
        )}
      </div>
    </div>
  );
}