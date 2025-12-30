import { useState } from 'react';
import axios from 'axios';

// ปรับให้รับ onLoginSuccess แบบไม่ต้องมี Parameter เพราะเราเก็บ localStorage ในนี้แล้ว
export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) return alert('กรุณากรอกข้อมูลให้ครบ');
    
    setLoading(true);
    try {
      const BASE_URL = 'http://localhost:3003';
      const url = isRegister ? `${BASE_URL}/users` : `${BASE_URL}/auth/login`;
      
      const payload = isRegister 
        ? { username, password, email: `${username}@test.com`, role: 'USER' }
        : { username, password };

      const { data } = await axios.post(url, payload);

      if (isRegister) {
        alert('✅ สมัครสมาชิกสำเร็จ! ระบบจะสลับไปหน้า Login');
        setIsRegister(false);
        setPassword(''); // ล้างรหัสผ่านเพื่อความปลอดภัย
      } else {
        // 1. เก็บ Token ลง LocalStorage
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          // 2. แจ้ง App.tsx ว่า Login สำเร็จแล้วนะ
          onLoginSuccess(); 
        } else {
          alert('❌ ไม่ได้รับ Access Token กรุณาลองใหม่');
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์';
      alert(`❌ ${isRegister ? 'สมัครสมาชิกไม่สำเร็จ' : 'Login ไม่สำเร็จ'}: ${msg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันช่วยให้กด Enter แล้วส่งฟอร์มได้
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="p-8 border rounded-lg shadow-xl max-w-sm mx-auto mt-20 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isRegister ? '🚆 สมัครสมาชิกใหม่' : '🚄 เข้าสู่ระบบ'}
      </h2>
      
      <div onKeyDown={handleKeyDown}> {/* ครอบไว้เพื่อดักปุ่ม Enter */}
        <input
          className="block w-full p-3 border mb-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block w-full p-3 border mb-6 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full text-white p-3 rounded font-bold transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : isRegister ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'กำลังประมวลผล...' : isRegister ? 'ยืนยันการสมัคร' : 'Login'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-blue-500 transition"
         onClick={() => {
           setIsRegister(!isRegister);
           setUsername('');
           setPassword('');
         }}>
        {isRegister ? 'มีบัญชีแล้ว? กลับไปหน้า Login' : 'ยังไม่มีบัญชี? สมัครสมาชิกที่นี่'}
      </p>
    </div>
  );
}