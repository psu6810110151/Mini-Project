import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBed, FaSnowflake, FaFan, FaArrowUp, FaArrowDown, FaToilet, FaDoorOpen, FaUsers, FaChartLine, FaTicketAlt, FaTrash } from 'react-icons/fa';

// ----------------------------------------------------
// 🔥 Import รูปภาพ
// ----------------------------------------------------
import bgHeadImage from './bg-head.png'; 

const FONT_URL = "https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap";
const TRAIN_BG_IMAGE = bgHeadImage; 

// --- Theme Colors ---
const THEME = {
  primary: '#B28237', 
  secondary: '#F5F5F5',
  textMain: '#444',
  seatAvailable: '#fff', 
  seatTaken: '#e0e0e0',
  seatSelected: '#B28237', 
  seatBorder: '#B28237',
  adminSidebar: '#2c3e50',
  success: '#198754',
  danger: '#dc3545'
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "'Sarabun', sans-serif", color: THEME.textMain, minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfd' },
  navbar: { backgroundColor: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'sticky' as 'sticky', top: 0, zIndex: 1000 },
  logo: { fontSize: '28px', fontWeight: 'bold', color: THEME.primary, cursor: 'pointer', letterSpacing: '1px' },
  navMenu: { display: 'flex', gap: '25px', color: '#666', fontWeight: 500, cursor: 'pointer', fontSize: '16px' },
  hero: { 
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${TRAIN_BG_IMAGE}')`, 
    backgroundSize: 'cover', backgroundPosition: 'center', 
    padding: '100px 20px', textAlign: 'center' as 'text-align', minHeight: '500px',
    display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center', alignItems: 'center', color: '#fff'
  },
  heroTitle: { fontSize: '3.5rem', fontWeight: 'bold', textShadow: '0px 4px 15px rgba(0,0,0,0.5)', marginBottom: '10px' },
  heroSubtitle: { fontSize: '1.5rem', fontWeight: 300, marginBottom: '40px', opacity: 0.9 },
  searchWidget: { backgroundColor: '#fff', borderRadius: '15px', padding: '30px', width: '100%', maxWidth: '1000px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', marginTop: '-60px' },
  btnGold: { backgroundColor: THEME.primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontWeight: 'bold', width: '100%', transition: '0.3s', fontSize: '16px', boxShadow: '0 4px 6px rgba(178, 130, 55, 0.3)' },
  seatBtn: { width: '45px', height: '45px', border: `1px solid ${THEME.seatBorder}`, borderRadius: '8px', margin: '4px', fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: '0.2s' },
  trainCarriage: { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '20px', padding: '30px', position: 'relative' as 'relative', minWidth: '340px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  adminCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }
};

// --- Data ---
const STATIONS = [
  { id: 1, name: 'กรุงเทพอภิวัฒน์ (Bang Sue)', km: 0 },
  { id: 2, name: 'ดอนเมือง', km: 22 },
  { id: 3, name: 'อยุธยา', km: 71 },
  { id: 4, name: 'ลพบุรี', km: 133 },
  { id: 5, name: 'นครสวรรค์', km: 246 },
  { id: 6, name: 'พิษณุโลก', km: 389 },
  { id: 7, name: 'อุตรดิตถ์', km: 485 },
  { id: 8, name: 'เชียงใหม่', km: 751 },
];

const TRAIN_TYPES = [
    { id: 'EXP_51', name: 'ด่วน 51 (Express)', time: '22:00', type: 'Sleep', basePrice: 0.8 },
    { id: 'SP_9', name: 'ด่วนพิเศษ 9 (Uttrawithi)', time: '18:10', type: 'Sleep_AC', basePrice: 1.5 },
    { id: 'SP_7', name: 'ด่วนพิเศษ 7 (Diesel)', time: '08:30', type: 'Seat_AC', basePrice: 1.2 },
    { id: 'ORD_109', name: 'เร็ว 109 (Rapid)', time: '13:45', type: 'Fan', basePrice: 0.5 },
];

const CLASS_OPTIONS = [
    { id: '1_AC_SL', name: 'ชั้น 1 นั่ง/นอน แอร์', factor: 2.5, icon: <FaBed/> },
    { id: '2_AC_SL', name: 'ชั้น 2 นั่ง/นอน แอร์', factor: 1.7, icon: <FaBed/> },
    { id: '2_AC_ST', name: 'ชั้น 2 นั่ง แอร์', factor: 1.3, icon: <FaSnowflake/> },
    { id: '2_FAN', name: 'ชั้น 2 พัดลม', factor: 1.0, icon: <FaFan/> },
    { id: '3_FAN', name: 'ชั้น 3 พัดลม', factor: 0.6, icon: <FaFan/> },
];

// --- Helper ---
const loadState = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};

export default function App() {
  // --- State ---
  const [page, setPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => 
      loadState('coe_users', [{ username: 'admin', password: '123', role: 'admin' }, { username: 'user', password: '123', role: 'user' }])
  );
  const [currentUser, setCurrentUser] = useState<any>(() => loadState('coe_current_user', null));
  const [bookings, setBookings] = useState<any[]>(() => loadState('coe_bookings', []));

  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [searchParams, setSearchParams] = useState({ origin: '', dest: '', date: '', passengers: 1 });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [takenSeats, setTakenSeats] = useState<number[]>([]);
  const [currentSelectedSeats, setCurrentSelectedSeats] = useState<number[]>([]);

  // --- Effects ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = FONT_URL; link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => { localStorage.setItem('coe_users', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { localStorage.setItem('coe_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => {
      if(currentUser) localStorage.setItem('coe_current_user', JSON.stringify(currentUser));
      else localStorage.removeItem('coe_current_user');
  }, [currentUser]);

  // --- Functions ---
  const handleAuth = () => {
      if (!authForm.username || !authForm.password) return alert("กรุณากรอกข้อมูลให้ครบ");
      if (authMode === 'register') {
          if (registeredUsers.find(u => u.username === authForm.username)) return alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
          const newUser = { username: authForm.username, password: authForm.password, role: 'user' };
          setRegisteredUsers([...registeredUsers, newUser]);
          setCurrentUser({ username: newUser.username, role: newUser.role });
          setShowAuth(false); setAuthForm({ username: '', password: '' });
      } else {
          const user = registeredUsers.find(u => u.username === authForm.username && u.password === authForm.password);
          if (user) { 
              setCurrentUser({ username: user.username, role: user.role }); 
              setShowAuth(false); setAuthForm({ username: '', password: '' }); 
              // ถ้าเป็น admin ให้เด้งไปหน้า admin ทันที
              if (user.role === 'admin') setPage('admin_dashboard');
          } else { 
              alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); 
          }
      }
  };

  const logout = () => { setCurrentUser(null); setPage('home'); };

  const handleSearch = () => {
    if(!searchParams.origin || !searchParams.dest || !searchParams.date) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    const results: any[] = [];
    TRAIN_TYPES.forEach(train => {
        let availableClasses = CLASS_OPTIONS;
        if (train.type === 'Fan') availableClasses = CLASS_OPTIONS.filter(c => c.id.includes('FAN') || c.id === '2_AC_ST');
        if (train.type === 'Sleep_AC') availableClasses = CLASS_OPTIONS.filter(c => c.id.includes('AC'));
        
        availableClasses.forEach(cls => {
            const s1 = STATIONS.find(s => s.id === parseInt(searchParams.origin));
            const s2 = STATIONS.find(s => s.id === parseInt(searchParams.dest));
            const dist = s1 && s2 ? Math.abs(s1.km - s2.km) : 0;
            const price = Math.round((dist * 0.5 * train.basePrice * cls.factor)); 
            if(dist > 0) results.push({ ...train, classInfo: cls, price: price, travelTime: '12 ชม.' });
        });
    });
    setSearchResults(results);
  };

  const selectTicket = (item: any) => {
      if (!currentUser) { setShowAuth(true); return; }
      setSelectedTrain(item); setCurrentSelectedSeats([]);
      const taken = bookings.filter(b => b.date === searchParams.date && b.trainId === item.id && b.classId === item.classInfo.id && b.status !== 'cancelled').flatMap(b => b.seats);
      setTakenSeats(taken);
      setPage('seat');
  };

  const confirmBooking = () => {
      const totalPrice = selectedTrain.price * searchParams.passengers;
      if(!confirm(`ยืนยันการจอง ${searchParams.passengers} ที่นั่ง\nราคารวม ${totalPrice} บาท?`)) return;
      const newBooking = {
          id: Date.now(), pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
          user: currentUser.username, trainId: selectedTrain.id, trainName: selectedTrain.name,
          classId: selectedTrain.classInfo.id, className: selectedTrain.classInfo.name,
          date: searchParams.date, time: selectedTrain.time,
          origin: STATIONS.find(s => s.id == parseInt(searchParams.origin))?.name,
          dest: STATIONS.find(s => s.id == parseInt(searchParams.dest))?.name,
          seats: currentSelectedSeats, carriage: 4, price: totalPrice, status: 'confirmed', timestamp: new Date()
      };
      setBookings([...bookings, newBooking]);
      alert("✅ จองตั๋วสำเร็จ!");
      setPage('history');
  };

  const cancelTicket = (booking: any, isAdmin = false) => {
      if (!isAdmin) {
          const diffDays = (new Date(booking.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
          if (diffDays < 1) { alert("❌ ไม่สามารถยกเลิกได้ (ต้องแจ้งล่วงหน้า 1 วัน)"); return; }
      }
      if (confirm("ยืนยันการยกเลิกตั๋ว?")) {
          setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'cancelled' } : b));
          alert("ยกเลิกเรียบร้อยแล้ว");
      }
  };

  const resetSystem = () => { if(confirm('⚠️ ล้างข้อมูลระบบ?')) { localStorage.clear(); window.location.reload(); } }

  // --- Components ---
  const SeatMap = () => (
    <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center gap-2 mb-3 text-secondary"><FaArrowUp/> <span>หัวขบวน</span></div>
        <div style={styles.trainCarriage}>
           <div className="d-flex flex-column gap-2 align-items-center">
              {Array.from({length: 10}).map((_, row) => (
                  <div key={row} className="d-flex gap-4">
                      <div className="d-flex gap-1">{[1, 2].map(n => renderSeat(row, n))}</div>
                      <div className="d-flex align-items-center justify-content-center" style={{width: '30px', color: '#ccc', fontSize: '10px'}}><span style={{writingMode: 'vertical-rl'}}>WALK</span></div>
                      <div className="d-flex gap-1">{[3, 4].map(n => renderSeat(row, n))}</div>
                  </div>
              ))}
              <div className="mt-4 pt-3 border-top w-100 d-flex justify-content-around align-items-center bg-light rounded p-2">
                 <div className="d-flex flex-column align-items-center text-muted"><FaToilet size={20} className="mb-1"/><span style={{fontSize: '11px'}}>ห้องน้ำ</span></div>
                 <div style={{width: '1px', height: '30px', backgroundColor: '#ddd'}}></div>
                 <div className="d-flex flex-column align-items-center text-muted"><FaDoorOpen size={20} className="mb-1"/><span style={{fontSize: '11px'}}>ทางลง</span></div>
              </div>
           </div>
        </div>
        <div className="d-flex align-items-center gap-2 mt-3 text-secondary"><FaArrowDown/> <span>ท้ายขบวน</span></div>
    </div>
  );

  const renderSeat = (row: number, n: number) => {
      const seatNum = (row * 4) + n;
      const isTaken = takenSeats.includes(seatNum);
      const isSelected = currentSelectedSeats.includes(seatNum);
      return (
        <button key={n} disabled={isTaken}
            style={{ ...styles.seatBtn, backgroundColor: isTaken ? THEME.seatTaken : (isSelected ? THEME.seatSelected : THEME.seatAvailable), color: isSelected || isTaken ? '#fff' : THEME.textMain, cursor: isTaken ? 'not-allowed' : 'pointer' }}
            onClick={() => isSelected ? setCurrentSelectedSeats(currentSelectedSeats.filter(s => s !== seatNum)) : (currentSelectedSeats.length < searchParams.passengers ? setCurrentSelectedSeats([...currentSelectedSeats, seatNum]) : alert('ครบจำนวนแล้ว'))}
        > {seatNum} </button>
      );
  };

  // --- Admin Dashboard Component ---
  const AdminDashboard = () => {
      const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0);
      const totalBookings = bookings.length;
      const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

      return (
          <div className="container mt-4 mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="fw-bold" style={{color: THEME.primary}}>⚙️ Admin Dashboard (จัดการหลังบ้าน)</h2>
                  <button className="btn btn-outline-secondary" onClick={() => setPage('home')}>กลับหน้าหลัก</button>
              </div>

              {/* Stats Cards */}
              <div className="row g-4 mb-5">
                  <div className="col-md-4">
                      <div style={styles.adminCard}>
                          <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning"><FaChartLine size={24}/></div>
                          <div><div className="text-muted small">ยอดขายรวม</div><h4 className="m-0 fw-bold">{totalRevenue.toLocaleString()} ฿</h4></div>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div style={styles.adminCard}>
                          <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success"><FaTicketAlt size={24}/></div>
                          <div><div className="text-muted small">ตั๋วที่ขายแล้ว</div><h4 className="m-0 fw-bold">{activeBookings} ใบ</h4></div>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div style={styles.adminCard}>
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaUsers size={24}/></div>
                          <div><div className="text-muted small">การจองทั้งหมด</div><h4 className="m-0 fw-bold">{totalBookings} รายการ</h4></div>
                      </div>
                  </div>
              </div>

              {/* Bookings Table */}
              <div className="card border-0 shadow-sm" style={{borderRadius: '15px', overflow: 'hidden'}}>
                  <div className="card-header bg-white py-3"><h5 className="m-0 fw-bold">รายการจองทั้งหมด (All Bookings)</h5></div>
                  <div className="table-responsive">
                      <table className="table table-hover mb-0 align-middle">
                          <thead className="bg-light">
                              <tr>
                                  <th className="py-3 ps-4">PNR</th>
                                  <th>User</th>
                                  <th>ขบวน</th>
                                  <th>วันที่/เวลา</th>
                                  <th>ที่นั่ง</th>
                                  <th>ราคา</th>
                                  <th>สถานะ</th>
                                  <th className="text-end pe-4">จัดการ</th>
                              </tr>
                          </thead>
                          <tbody>
                              {[...bookings].reverse().map((b, i) => (
                                  <tr key={i}>
                                      <td className="ps-4 fw-bold">{b.pnr}</td>
                                      <td><span className="badge bg-light text-dark border">👤 {b.user}</span></td>
                                      <td>{b.trainName}<br/><small className="text-muted">{b.className}</small></td>
                                      <td>{b.date}<br/><small className="text-muted">{b.time}</small></td>
                                      <td>{b.seats.join(', ')}</td>
                                      <td className="fw-bold">{b.price} ฿</td>
                                      <td>
                                          {b.status === 'confirmed' 
                                            ? <span className="badge bg-success bg-opacity-10 text-success">ชำระแล้ว</span>
                                            : <span className="badge bg-secondary">ยกเลิก</span>
                                          }
                                      </td>
                                      <td className="text-end pe-4">
                                          {b.status === 'confirmed' && (
                                              <button className="btn btn-sm btn-outline-danger" onClick={() => cancelTicket(b, true)}>
                                                  <FaTrash/> ยกเลิก
                                              </button>
                                          )}
                                      </td>
                                  </tr>
                              ))}
                              {bookings.length === 0 && <tr><td colSpan={8} className="text-center py-5 text-muted">ยังไม่มีข้อมูลการจอง</td></tr>}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => setPage('home')}>CoE Ticket</div>
        <div className="d-none d-md-flex" style={styles.navMenu}>
             <span onClick={() => setPage('home')}>หน้าแรก</span>
             <span onClick={() => currentUser && setPage('history')}>ประวัติการซื้อ</span>
             {currentUser?.role === 'admin' && (
                 <span onClick={() => setPage('admin_dashboard')} className="text-danger fw-bold">⚙️ จัดการระบบ</span>
             )}
        </div>
        <div>
            {currentUser ? (
                <div className="dropdown">
                    <button className="btn btn-outline-warning fw-bold rounded-pill px-3" onClick={() => currentUser.role === 'admin' ? setPage('admin_dashboard') : setPage('history')}>
                        {currentUser.role === 'admin' ? '🛡️ Admin' : `👤 ${currentUser.username}`}
                    </button>
                    <button className="btn btn-link text-muted ms-2 small text-decoration-none" onClick={logout}>ออก</button>
                </div>
            ) : (
                <button className="btn btn-outline-warning rounded-pill px-4 fw-bold" onClick={() => setShowAuth(true)}>เข้าสู่ระบบ / สมัครสมาชิก</button>
            )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuth && (
        <div style={{position: 'fixed', top:0, left:0, right:0, bottom:0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowAuth(false)}>
            <div style={{backgroundColor: 'white', padding: '40px', borderRadius: '20px', width: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}} onClick={e => e.stopPropagation()}>
                <h3 className="text-center mb-4 fw-bold" style={{color: THEME.primary}}>{authMode === 'login' ? 'ยินดีต้อนรับ' : 'สมัครสมาชิกใหม่'}</h3>
                <input className="form-control mb-3 p-3 bg-light border-0" placeholder="ชื่อผู้ใช้งาน" value={authForm.username} onChange={e => setAuthForm({...authForm, username: e.target.value})} />
                <input className="form-control mb-4 p-3 bg-light border-0" type="password" placeholder="รหัสผ่าน" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
                <button style={styles.btnGold} onClick={handleAuth}>{authMode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียนทันที'}</button>
                <div className="mt-4 text-center">
                    <span className="text-muted small" style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                        {authMode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิกที่นี่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
                    </span>
                </div>
            </div>
        </div>
      )}

      {/* Pages Switcher */}
      {page === 'admin_dashboard' && currentUser?.role === 'admin' ? <AdminDashboard /> : (
        <>
            {page === 'home' && (
                <div className="flex-grow-1 pb-5">
                    <div style={styles.hero}>
                        <h1 style={styles.heroTitle}>CoE Railway</h1> 
                        <p style={styles.heroSubtitle}>บริการจองตั๋วรถไฟออนไลน์ สะดวก รวดเร็ว ปลอดภัย</p>
                    </div>
                    
                    <div className="container d-flex flex-column align-items-center">
                        <div style={styles.searchWidget}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label fw-bold text-muted small">ต้นทาง</label>
                                    <select className="form-select border-0 bg-light py-3" value={searchParams.origin} onChange={e => setSearchParams({...searchParams, origin: e.target.value})}>
                                        <option value="">-- เลือกต้นทาง --</option>
                                        {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold text-muted small">ปลายทาง</label>
                                    <select className="form-select border-0 bg-light py-3" value={searchParams.dest} onChange={e => setSearchParams({...searchParams, dest: e.target.value})}>
                                        <option value="">-- เลือกปลายทาง --</option>
                                        {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold text-muted small">วันเดินทาง</label>
                                    <input type="date" className="form-control border-0 bg-light py-3" value={searchParams.date} onChange={e => setSearchParams({...searchParams, date: e.target.value})} />
                                </div>
                                <div className="col-md-3 d-flex align-items-end">
                                    <button style={styles.btnGold} onClick={handleSearch}>🔍 ค้นหาเที่ยวรถ</button>
                                </div>
                            </div>
                            <div className="mt-3 row g-3">
                                <div className="col-md-3">
                                    <label className="form-label fw-bold text-muted small">ผู้โดยสาร (คน)</label>
                                    <input type="number" min="1" className="form-control border-0 bg-light py-2" value={searchParams.passengers} onChange={e => setSearchParams({...searchParams, passengers: parseInt(e.target.value) || 1})} />
                                </div>
                            </div>
                        </div>

                        <div className="w-100 px-2 mt-5" style={{maxWidth: '1000px'}}>
                            {searchResults.length > 0 && <h4 className="mb-4 text-secondary">เที่ยวรถที่ว่าง (Available Trains)</h4>}
                            {searchResults.map((r, i) => (
                                <div key={i} className="card border-0 shadow-sm mb-4 overflow-hidden" style={{borderRadius: '15px'}}>
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 text-center border-end">
                                                <h3 className="m-0 fw-bold" style={{color: THEME.primary}}>{r.time}</h3>
                                                <small className="text-muted">เวลาออก</small>
                                            </div>
                                            <div className="col-md-4 ps-4">
                                                <h5 className="mb-1 fw-bold">{r.name}</h5>
                                                <span className="badge bg-light text-dark border me-2">{r.classInfo.name}</span>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-2 text-muted">
                                                    <span className="fs-5">{r.classInfo.icon}</span>
                                                    <small>{r.travelTime}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-end">
                                                <h3 className="text-danger fw-bold">{r.price} ฿</h3>
                                                <button className="btn btn-outline-warning w-100 mt-2 rounded-pill" onClick={() => selectTicket(r)}>เลือกที่นั่ง</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="text-center mt-5 opacity-25 hover-opacity-100">
                        <button className="btn btn-sm btn-outline-danger" onClick={resetSystem}>⚠️ Reset System</button>
                    </div>
                </div>
            )}

            {page === 'seat' && selectedTrain && (
                <div className="container mt-4 mb-5 flex-grow-1">
                    <button className="btn btn-link text-muted mb-3 text-decoration-none" onClick={() => setPage('home')}>❮ ย้อนกลับ</button>
                    <div className="row g-5">
                        <div className="col-md-4 order-md-2">
                            <div className="card p-4 border-0 shadow-sm sticky-top" style={{top: '100px', borderRadius: '20px'}}>
                                <h4 className="mb-4 fw-bold text-center" style={{color: THEME.primary}}>สรุปรายการจอง</h4>
                                <div className="d-flex justify-content-between mb-2"><span>ขบวน</span><strong className="text-end">{selectedTrain.name}</strong></div>
                                <div className="d-flex justify-content-between mb-2"><span>ประเภท</span><strong className="text-end">{selectedTrain.classInfo.name}</strong></div>
                                <div className="d-flex justify-content-between mb-2"><span>วันที่</span><strong>{searchParams.date}</strong></div>
                                <div className="d-flex justify-content-between mb-4"><span>ผู้โดยสาร</span><strong>{searchParams.passengers} ท่าน</strong></div>
                                <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                                    <small>ที่นั่ง:</small>
                                    <span className="fw-bold text-success">{currentSelectedSeats.length > 0 ? currentSelectedSeats.join(', ') : '-'}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
                                    <span className="h5 mb-0">ราคารวม</span>
                                    <span className="h3 mb-0 text-danger">{selectedTrain.price * searchParams.passengers} ฿</span>
                                </div>
                                <button style={styles.btnGold} disabled={currentSelectedSeats.length !== searchParams.passengers} onClick={confirmBooking}>ยืนยันการจอง</button>
                            </div>
                        </div>
                        <div className="col-md-8 order-md-1">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h4 className="text-center mb-4">เลือกที่นั่ง</h4>
                                <SeatMap />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {page === 'history' && currentUser && (
                <div className="container mt-5 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>🎟 ตั๋วของฉัน</h3>
                        <button className="btn btn-light" onClick={() => setPage('home')}>กลับหน้าหลัก</button>
                    </div>
                    <div className="alert alert-info border-0 shadow-sm">💡 สามารถยกเลิกตั๋วก่อนเดินทาง 1 วัน</div>
                    {bookings.filter(b => b.user === currentUser.username).map((ticket, idx) => (
                        <div key={idx} className="card border-0 shadow-sm mb-3" style={{borderRadius: '15px', borderLeft: `8px solid ${ticket.status === 'cancelled' ? '#999' : THEME.primary}`}}>
                            <div className="card-body p-4">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <h5 className="fw-bold text-dark mb-1">{ticket.trainName}</h5>
                                        <p className="mb-2 text-muted small">📅 {ticket.date} | ⏰ {ticket.time}</p>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="badge bg-light text-dark border">PNR: {ticket.pnr}</span>
                                            <span className="badge bg-success bg-opacity-10 text-success border border-success">ที่นั่ง: {ticket.seats.join(', ')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-5 text-end">
                                        {ticket.status === 'cancelled' ? <span className="badge bg-secondary fs-6 px-3 py-2">ยกเลิกแล้ว</span> : (
                                            <>
                                                <h3 className="text-danger fw-bold mb-2">{ticket.price} ฿</h3>
                                                <button className="btn btn-sm btn-outline-danger px-3" onClick={() => cancelTicket(ticket)}>ยกเลิก</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
      )}
    </div>
  );
}