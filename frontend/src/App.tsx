import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SearchPage from "./SearchPage"; // 👈 เพิ่มบรรทัดนี้ถ้ายังไม่มี

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [currentPage, setCurrentPage] = useState<string>("DASHBOARD"); // สำหรับสลับหน้า

  // ตรวจสอบ Token ทุกครั้งที่ App โหลด
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    // ไม่ต้องรับ token ตรงนี้แล้วเพราะใน Login.tsx เราสั่งเก็บลง localStorage ไปแล้ว
    setIsLoggedIn(true);
    setCurrentPage("DASHBOARD");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentPage("DASHBOARD"); // รีเซ็ตหน้ากลับไปเริ่มต้น
  };

  // ฟังก์ชันช่วยเลือกว่าจะแสดงหน้าไหน
  const renderPage = () => {
    if (!isLoggedIn) return <Login onLoginSuccess={handleLoginSuccess} />;

    switch (currentPage) {
      case "SEARCH":
        return <SearchPage onBack={() => setCurrentPage("DASHBOARD")} />;
      case "DASHBOARD":
      default:
        return (
          <Dashboard 
            onLogout={handleLogout} 
            onGoToSearch={() => setCurrentPage("SEARCH")} // 👈 ส่งฟังก์ชันไปให้ปุ่มใน Dashboard
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderPage()}
    </div>
  );
}

export default App;