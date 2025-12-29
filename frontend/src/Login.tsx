import { useState } from 'react';
import axios from 'axios';

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
      } else {
        // เก็บ Token (ถ้า Backend ส่งมา)
        if (data.access_token) localStorage.setItem('token', data.access_token);
        onLoginSuccess(); 
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'เกิดข้อผิดพลาด';
      // ถ้า Error 23505 หรือ Duplicate จะโชว์แจ้งเตือนที่เข้าใจง่าย
      alert(`❌ ${isRegister ? 'สมัครสมาชิกไม่สำเร็จ' : 'Login ไม่สำเร็จ'}: ${msg}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border rounded-lg shadow-xl max-w-sm mx-auto mt-20 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
      </h2>
      
      <input
        className="block w-full p-3 border mb-3 rounded focus:ring-2 focus:ring-blue-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="block w-full p-3 border mb-6 rounded focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={handleSubmit}
        className={`w-full text-white p-3 rounded font-bold transition ${
          loading ? 'bg-gray-400' : isRegister ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'กำลังประมวลผล...' : isRegister ? 'ยืนยันการสมัคร' : 'Login'}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
         onClick={() => {
           setIsRegister(!isRegister);
           setUsername(''); // ล้างค่าเมื่อสลับโหมด
           setPassword('');
         }}>
        {isRegister ? 'มีบัญชีแล้ว? กลับไป Login' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
      </p>
    </div>
  );
}