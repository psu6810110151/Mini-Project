import { useState, useEffect } from 'react';
import api from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface Station {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  pnr: string;
  travelDate: string;
  seatNumber: string;
  status: string;
  user: { username: string };
  schedule: {
    trainName: string;
    price: number;
    priceMultiplier: number;
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<Station[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // State สำหรับฟอร์มเพิ่มรถ
  const [formData, setFormData] = useState({
    trainName: '',
    source: '',      // <--- ต้องมีตัวนี้
    destination: '', // <--- ต้องมีตัวนี้
    departureTime: '',
    type: 'fan',
    priceMultiplier: 1.0,
    basePrice: 500
  });

  // โหลดข้อมูลเมื่อเข้าหน้าเว็บ
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. ดึงรายชื่อสถานี (เพื่อเอามาใส่ใน Dropdown)
      const resStations = await api.get('/stations');
      setStations(resStations.data);

      // 2. ดึงข้อมูลการจอง
      const resBookings = await api.get('/all-bookings');
      setBookings(resBookings.data);
    } catch (error) {
      console.error(error);
      toast.error('โหลดข้อมูลไม่สำเร็จ');
    }
  };

  // คำนวณยอดขายรวม
  const totalSales = bookings.reduce((sum, b) => {
    const price = Math.round(b.schedule.price * (b.schedule.priceMultiplier || 1));
    return sum + price;
  }, 0);

  // ฟังก์ชันลบการจอง
  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบรายการนี้ใช่ไหม?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('ลบรายการสำเร็จ');
      fetchData();
    } catch (err) {
      toast.error('ลบไม่สำเร็จ');
    }
  };

  // จัดการ Form Input
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ส่งข้อมูลไป Backend
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // เช็คว่าเลือกต้นทางปลายทางหรือยัง
    if (!formData.source || !formData.destination) {
      toast.error('กรุณาเลือกต้นทางและปลายทาง');
      return;
    }

    const loading = toast.loading('กำลังบันทึก...');

    try {
      await api.post('/trains', {
        ...formData,
        price: Number(formData.basePrice),
        priceMultiplier: Number(formData.priceMultiplier)
      });
      
      toast.success('เพิ่มขบวนรถสำเร็จ!', { id: loading });
      // Reset Form
      setFormData({
        trainName: '', 
        source: '',       // reset
        destination: '',  // reset
        departureTime: '', 
        type: 'fan', 
        priceMultiplier: 1.0, 
        basePrice: 500
      });
    } catch (error) {
      console.error(error);
      toast.error('เกิดข้อผิดพลาดในการบันทึก', { id: loading });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <Toaster />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          ⚙️ Admin Dashboard
        </h1>
        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 font-semibold border px-4 py-2 rounded-lg bg-white">
           กลับหน้าหลัก
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 text-2xl">📊</div>
          <div>
            <p className="text-gray-500 text-sm">ยอดขายรวม</p>
            <p className="text-2xl font-bold text-gray-800">{totalSales.toLocaleString()} ฿</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600 text-2xl">🎟️</div>
          <div>
            <p className="text-gray-500 text-sm">ตั๋วที่ขายแล้ว</p>
            <p className="text-2xl font-bold text-gray-800">{bookings.length} ใบ</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600 text-2xl">🚆</div>
          <div>
            <p className="text-gray-500 text-sm">จัดการระบบ</p>
            <p className="text-2xl font-bold text-gray-800">Train & Ticket</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Left Column: Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">รายการจองล่าสุด</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
                <tr>
                  <th className="p-3">PNR</th>
                  <th className="p-3">User</th>
                  <th className="p-3">ขบวน</th>
                  <th className="p-3">ราคา</th>
                  <th className="p-3">สถานะ</th>
                  <th className="p-3 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => {
                   const finalPrice = Math.round(b.schedule.price * (b.schedule.priceMultiplier || 1));
                   return (
                    <tr key={b.id}>
                      <td className="p-3 font-mono font-bold text-gray-800">{b.pnr || '-'}</td>
                      <td className="p-3">{b.user?.username}</td>
                      <td className="p-3">
                        <div className="font-bold">{b.schedule.trainName}</div>
                        <div className="text-xs text-gray-400">{dayjs(b.travelDate).format('DD/MM/YYYY')}</div>
                      </td>
                      <td className="p-3 font-bold">{finalPrice} ฿</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          {b.status || 'Confirmed'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handleDelete(b.id)}
                          className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                   );
                })}
              </tbody>
            </table>
            {bookings.length === 0 && <div className="text-center p-8 text-gray-400">ยังไม่มีรายการจอง</div>}
          </div>
        </div>

        {/* Right Column: Add Train Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="bg-blue-600 text-white -m-6 mb-6 p-4 rounded-t-2xl flex items-center gap-2">
            <span className="text-xl">➕</span>
            <h2 className="text-lg font-bold">เพิ่มเที่ยวรถใหม่</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. ชื่อขบวน */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อขบวน</label>
              <input 
                name="trainName" 
                placeholder="เช่น ด่วนพิเศษ 85" 
                value={formData.trainName} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            {/* ======================================================= */}
            {/* จุดที่เพิ่ม: ช่องเลือกต้นทาง และ ปลายทาง (อยู่ตรงนี้!!!) */}
            {/* ======================================================= */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
               {/* Dropdown ต้นทาง */}
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">🚩 ต้นทาง</label>
                  <select 
                    name="source" 
                    value={formData.source} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- เลือก --</option>
                    {stations.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
               </div>

               {/* Dropdown ปลายทาง */}
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">🏁 ปลายทาง</label>
                  <select 
                    name="destination" 
                    value={formData.destination} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- เลือก --</option>
                    {stations.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
               </div>
            </div>
            {/* ======================================================= */}

            {/* 3. เวลาออก */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">เวลาออกเดินทาง</label>
              <input 
                type="datetime-local" 
                name="departureTime" 
                value={formData.departureTime} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg text-sm" 
              />
            </div>

            {/* 4. ประเภท & ตัวคูณ */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">ประเภท</label>
                   <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                      <option value="fan">รถพัดลม</option>
                      <option value="air">รถแอร์</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">ตัวคูณราคา</label>
                   <input 
                     type="number" step="0.1" 
                     name="priceMultiplier" 
                     value={formData.priceMultiplier} 
                     onChange={handleChange} 
                     className="w-full p-2 border border-gray-300 rounded-lg text-sm" 
                   />
                </div>
            </div>

            {/* 5. ราคาฐาน */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">ราคาพื้นฐาน (บาท)</label>
               <input 
                 type="number" 
                 name="basePrice" 
                 value={formData.basePrice} 
                 onChange={handleChange} 
                 className="w-full p-2 border border-gray-300 rounded-lg" 
               />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-blue-700 transition transform active:scale-95">
              บันทึกเที่ยวรถ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}