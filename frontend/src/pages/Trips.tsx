import { useEffect, useState } from 'react';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // ⚠️ แนะนำให้ลง npm install dayjs

export default function Trips() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  
  // Search State
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [includePast, setIncludePast] = useState(false); // ✅ Checkbox ดูย้อนหลัง

  useEffect(() => {
    // โหลดสถานีสำหรับ Dropdown
    api.get('/stations').then(res => setStations(res.data));
  }, []);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!origin || !dest) return toast.error('กรุณาเลือกต้นทางและปลายทาง');
    
    const loading = toast.loading('กำลังค้นหา...');
    try {
      // ✅ ส่ง includePast ไปด้วย
      const res = await api.get(`/search?origin=${origin}&dest=${dest}&includePast=${includePast}`);
      setSchedules(res.data);
      toast.dismiss(loading);
      if (res.data.length === 0) toast('ไม่พบเที่ยวรถ', { icon: '🔍' });
    } catch (err) {
      toast.error('ค้นหาไม่สำเร็จ');
    }
  };

  const handleBook = async (scheduleId: number) => {
    // เช็ค Login แบบง่ายๆ
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      toast.error('กรุณาเข้าสู่ระบบก่อนจอง');
      return navigate('/login');
    }
    const user = JSON.parse(userStr);

    // ⚠️ ในระบบจริงควรมีหน้าเลือกที่นั่ง (Seat Selection)
    // ตรงนี้ขอใช้ prompt รับเลขที่นั่งเพื่อทดสอบ API
    const seatNumber = prompt("ระบุเลขที่นั่งที่ต้องการ (เช่น A1):");
    if (!seatNumber) return;

    try {
      await api.post('/book', {
        userId: user.id,
        scheduleId: scheduleId,
        date: dayjs().format('YYYY-MM-DD'), // จองวันปัจจุบันเป็นตัวอย่าง
        seatNumber: seatNumber
      });
      toast.success('จองสำเร็จ! 🎉');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'จองไม่สำเร็จ');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <Toaster />
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">🚆 จองตั๋วรถไฟ</h1>
          <p className="text-slate-500">เลือกเส้นทางของคุณเลย</p>
        </div>
        <div className="space-x-2">
           <button onClick={() => navigate('/admin')} className="bg-slate-700 text-white px-4 py-2 rounded-lg">Admin</button>
           <button onClick={() => navigate('/login')} className="bg-red-100 text-red-600 px-4 py-2 rounded-lg">Logout</button>
        </div>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-1">ต้นทาง</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="">เลือกสถานี</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-1">ปลายทาง</label>
          <select value={dest} onChange={(e) => setDest(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="">เลือกสถานี</option>
            {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        
        {/* ✅ Checkbox Phase 10 */}
        <div className="flex items-center pb-3">
            <input 
              type="checkbox" 
              checked={includePast} 
              onChange={(e) => setIncludePast(e.target.checked)} 
              className="w-5 h-5 mr-2"
            />
            <span className="text-slate-700">แสดงเที่ยวรถย้อนหลัง</span>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg font-bold h-10">ค้นหาเที่ยวรถ</button>
      </form>

      {/* Results */}
      <div className="space-y-4">
        {schedules.map((item) => {
          // คำนวณราคาสุทธิ
          const finalPrice = Math.round(item.price * item.priceMultiplier);
          const isPast = dayjs(item.startTime, 'HH:mm').isBefore(dayjs()); // เทียบเวลาง่ายๆ

          return (
            <div key={item.id} className={`flex justify-between items-center bg-white p-6 rounded-xl border ${isPast ? 'opacity-60 bg-slate-50' : 'shadow-sm'}`}>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{item.trainName}</h3>
                <div className="text-slate-500 mt-1 flex gap-4">
                  <span>🕒 ออก: {item.startTime} น.</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.type === 'air' ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700'}`}>
                    {item.type === 'air' ? 'รถปรับอากาศ' : 'รถพัดลม'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">฿{finalPrice}</div>
                <button 
                  onClick={() => handleBook(item.id)}
                  disabled={isPast && !includePast} // ถ้าผ่านไปแล้วกดไม่ได้ (หรือเปิดให้กดถ้าต้องการ)
                  className={`mt-2 px-6 py-2 rounded-lg font-bold text-white ${isPast ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isPast ? 'ออกเดินทางแล้ว' : 'จองตั๋ว'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}