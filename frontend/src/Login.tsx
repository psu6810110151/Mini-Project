import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // สลับโหมด Login/Register

  const handleSubmit = async () => {
    try {
      // ถ้าเป็นโหมดสมัคร ให้ยิงไป /users, ถ้า Login ยิงไป /auth/login
      const url = isRegister 
        ? 'http://localhost:3000/users' 
        : 'http://localhost:3000/auth/login';
        
      const payload = isRegister 
        ? { username, password, email: `${username}@test.com` } // สมมติ email ให้เลยง่ายๆ
        : { username, password };

      const response = await axios.post(url, payload);

      if (isRegister) {
        alert('✅ สมัครสมาชิกสำเร็จ! กรุณา Login');
        setIsRegister(false); // กลับไปหน้า Login
      } else {
        alert('🎉 Login สำเร็จ! Token: ' + response.data.access_token);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('❌ ทำรายการไม่สำเร็จ: ' + (isRegister ? 'ชื่อซ้ำหรือข้อมูลผิด' : 'ชื่อหรือรหัสผ่านผิด'));
    }
  };

  return (
    <div className="p-8 border rounded-lg shadow-xl max-w-sm mx-auto mt-20 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
      </h2>
      
      <input
        className="block w-full p-3 border mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="block w-full p-3 border mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className={`w-full text-white p-3 rounded font-bold transition duration-200 ${
          isRegister ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isRegister ? 'ยืนยันการสมัคร' : 'Login'}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
         onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'มีบัญชีแล้ว? กลับไป Login' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
      </p>
    </div>
  );
}