import { useEffect, useState } from 'react';
import { getTrains } from './services/api';

// สร้าง Type ให้ตรงกับข้อมูล
interface Train {
  id: number;
  name: string;
  total_seats: number;
}

function App() {
  const [trains, setTrains] = useState<Train[]>([]);

  // ฟังก์ชันดึงข้อมูลเมื่อเปิดหน้าเว็บ
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getTrains();
      setTrains(data);
    } catch (error) {
      console.error("เชื่อมต่อไม่ได้:", error);
      alert("เชื่อมต่อ Backend ไม่ได้! เช็คว่ารัน Port 3003 หรือยัง?");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🚄 ระบบจองตั๋วรถไฟ</h1>
      <hr />
      
      <h2>รายการรถไฟ (จาก Database)</h2>
      {trains.length === 0 ? (
        <p>... ยังไม่มีข้อมูลรถไฟ (Database ว่างเปล่า) ...</p>
      ) : (
        <ul>
          {trains.map((train) => (
            <li key={train.id}>
              <b>{train.name}</b> (ที่นั่ง: {train.total_seats})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;