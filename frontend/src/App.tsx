import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- Configuration & Assets ---
const API_URL = 'http://localhost:3000';
const FONT_URL = "https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap";

// --- Theme Colors ---
const THEME = {
  primary: '#B28237',
  secondary: '#F5F5F5',
  textMain: '#333333',
  textGold: '#8e6e38',
  bgOverlay: 'rgba(0,0,0,0.1)',
  seatAvailable: '#E0B050', 
  seatTaken: '#cfcfcf',     
};

// --- CSS Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "'Sarabun', sans-serif", color: THEME.textMain, minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  navbar: { backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '15px 40px', position: 'sticky' as 'sticky', top: 0, zIndex: 1000 },
  logo: { fontSize: '32px', fontWeight: 'bold', color: THEME.primary, letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },
  navMenu: { display: 'flex', gap: '30px', fontWeight: 500, fontSize: '16px' },
  navItem: { cursor: 'pointer', color: '#555', transition: 'color 0.3s' },
  hero: { backgroundImage: "url('/bg-head.png')", backgroundColor: '#888', backgroundSize: 'cover', backgroundPosition: 'center', height: '550px', display: 'flex', flexDirection: 'column' as 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' as 'relative' },
  heroTitle: { color: '#fff', fontSize: '48px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '30px', marginTop: '-50px' },
  searchWidget: { backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', width: '90%', maxWidth: '1100px', padding: '40px 30px', position: 'relative' as 'relative', marginTop: '20px' },
  btnGold: { backgroundColor: THEME.primary, color: '#fff', border: 'none', borderRadius: '5px', padding: '12px 25px', fontSize: '18px', fontWeight: 'bold', width: '100%', cursor: 'pointer', transition: '0.3s' },
  modalOverlay: { position: 'fixed' as 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: '10px', padding: '40px', width: '400px', position: 'relative' as 'relative' },
  carriageContainer: { display: 'flex', overflowX: 'auto' as 'auto', padding: '40px 20px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', gap: '20px' },
  seatBtn: { width: '50px', height: '50px', border: 'none', borderRadius: '8px', display: 'flex', flexDirection: 'column' as 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '5px', position: 'relative' as 'relative', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
};

export default function App() {
  const [page, setPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [stations, setStations] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [takenSeats, setTakenSeats] = useState<number[]>([]);
  
  // ✅ เพิ่มข้อมูลจำลอง: ตั๋วเก่าที่เคยเดินทางไปแล้ว (ปี 2023) เพื่อให้เห็นตัวอย่าง History
  const [myTickets, setMyTickets] = useState<any[]>([
    { id: 999, trainName: 'ด่วนพิเศษ 9 (อุตราวิถี)', seat: 5, date: '2023-12-01', price: 1100, status: 'completed' }
  ]);
  
  const [searchParams, setSearchParams] = useState({ origin: '', dest: '', date: '' });
  const [authForm, setAuthForm] = useState({ username: '', password: '', email: '' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = FONT_URL; link.rel = 'stylesheet';
    document.head.appendChild(link);
    axios.get(`${API_URL}/stations`).then(res => setStations(res.data)).catch(err=>console.log(err));
  }, []);

  const handleAuth = async () => {
    try {
      if (authForm.username && authForm.password) {
        if (authMode === 'register') {
           alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
           setAuthMode('login');
        } else {
           setUser({ username: authForm.username, id: 1 });
           setShowAuth(false);
        }
      } else { alert('กรุณากรอกข้อมูลให้ครบถ้วน'); }
    } catch (e) { alert('เกิดข้อผิดพลาด'); }
  };

  const handleSearch = async () => {
    if(!searchParams.origin || !searchParams.dest || !searchParams.date) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    setResults([
        { id: 1, trainName: 'ด่วนพิเศษ 9 (อุตราวิถี)', startTime: '18:00', arrivalTime: '06:00', price: 1100 },
        { id: 2, trainName: 'ด่วน 51', startTime: '22:00', arrivalTime: '08:00', price: 850 }
    ]);
  };

  const selectTrain = (train: any) => {
    if (!user) { alert('กรุณาเข้าสู่ระบบเพื่อจองตั๋ว'); setShowAuth(true); return; }
    setSelectedTrain(train);
    // เช็คว่าในรอบนี้ (Session นี้) เราจองอะไรไปแล้วบ้าง จะได้ขึ้นสีเทา
    const alreadyBookedByMe = myTickets.filter(t => t.id === train.id && t.date === searchParams.date).map(t => t.seat);
    setTakenSeats(alreadyBookedByMe); 
    setPage('seat');
  };

  const bookSeat = (seatNum: number) => {
    if (takenSeats.includes(seatNum)) { alert("ที่นั่งนี้ถูกจองไปแล้วครับ"); return; }
    if (window.confirm(`ยืนยันการจองที่นั่ง ${seatNum}?`)) {
      alert('จองตั๋วสำเร็จ!');
      setTakenSeats([...takenSeats, seatNum]);
      // เพิ่มตั๋วใหม่เข้า List
      setMyTickets([...myTickets, { ...selectedTrain, seat: seatNum, date: searchParams.date, id: Date.now(), status: 'active' }]);
      setPage('history');
    }
  };

  // ✅ ฟังก์ชันแยกประเภทตั๋ว (ปัจจุบัน vs อดีต)
  const getSortedTickets = () => {
    const today = new Date().setHours(0,0,0,0);
    const active = myTickets.filter(t => new Date(t.date).getTime() >= today);
    const history = myTickets.filter(t => new Date(t.date).getTime() < today);
    return { active, history };
  };

  const Navbar = () => (
    <nav style={styles.navbar} className="d-flex justify-content-between align-items-center">
      <div style={styles.logo} onClick={() => setPage('home')}>CoE Ticket</div>
      <div style={styles.navMenu} className="d-none d-md-flex">
        <span style={styles.navItem} onClick={() => setPage('home')}>หน้าแรก</span>
        {/* ✅ แก้ไข: เพิ่ม onClick ให้กดไปหน้าประวัติได้ */}
        <span style={styles.navItem} onClick={() => setPage('history')}>ประวัติการซื้อ</span>
        <span style={styles.navItem}>ติดต่อเรา</span>
      </div>
      <div>
        {user ? (
          <span className="fw-bold text-secondary">👤 {user.username} <small className="text-danger ms-2" style={{cursor:'pointer'}} onClick={()=>setUser(null)}>(ออก)</small></span>
        ) : (
          <button className="btn btn-outline-warning rounded-pill px-4" onClick={() => setShowAuth(true)}>เข้าสู่ระบบ / สมัครสมาชิก</button>
        )}
      </div>
    </nav>
  );

  // ส่วนแสดงรายการตั๋ว
  const TicketCard = ({ t, isHistory }: { t: any, isHistory?: boolean }) => (
    <div className={`card p-4 mb-3 border-0 shadow-sm ${isHistory ? 'bg-light' : ''}`} style={{ borderLeft: isHistory ? '5px solid #999' : `5px solid ${THEME.primary}` }}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
           <h4 style={{ color: isHistory ? '#666' : THEME.primary, marginBottom: '5px' }}>{t.trainName}</h4>
           <div className="text-muted mb-2">📅 วันที่: <strong>{t.date}</strong></div>
           <div className="h5">💺 ที่นั่งหมายเลข: <span className="badge bg-warning text-dark">{t.seat}</span></div>
        </div>
        <div className="text-end">
          <h3 style={{ color: isHistory ? '#999' : '#d9534f' }}>{t.price} ฿</h3>
          {isHistory ? (
            <span className="badge bg-secondary">เดินทางแล้ว</span>
          ) : (
            <span className="badge bg-success">รอการเดินทาง</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <Navbar />

      {showAuth && (
        <div style={styles.modalOverlay} onClick={() => setShowAuth(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <h3 className="text-center mb-4" style={{color: THEME.primary}}>{authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h3>
            <input className="form-control mb-3" placeholder="ชื่อผู้ใช้งาน" value={authForm.username} onChange={e => setAuthForm({...authForm, username: e.target.value})} />
            {authMode === 'register' && <input className="form-control mb-3" type="email" placeholder="อีเมล" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} />}
            <input className="form-control mb-3" type="password" placeholder="รหัสผ่าน" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
            <button style={styles.btnGold} onClick={handleAuth}>{authMode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}</button>
            <div className="text-center mt-3"><small className="text-muted" style={{cursor:'pointer'}} onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>{authMode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}</small></div>
          </div>
        </div>
      )}

      {page === 'home' && (
        <>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>การรถไฟแห่ง CoE (CoE Railway)</h1>
            <div style={styles.searchWidget}>
              <div className="row g-3">
                <div className="col-md-3"><label className="form-label text-muted small">ต้นทาง</label><select className="form-select" onChange={e => setSearchParams({...searchParams, origin: e.target.value})}><option>เลือกต้นทาง</option>{stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                <div className="col-md-3"><label className="form-label text-muted small">ปลายทาง</label><select className="form-select" onChange={e => setSearchParams({...searchParams, dest: e.target.value})}><option>เลือกปลายทาง</option>{stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                <div className="col-md-3"><label className="form-label text-muted small">วันเดินทาง</label><input type="date" className="form-control" onChange={e => setSearchParams({...searchParams, date: e.target.value})} /></div>
                <div className="col-md-3 d-flex align-items-end"><button style={styles.btnGold} onClick={handleSearch}>ค้นหา</button></div>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            {results.map(r => (
              <div key={r.id} className="card border-0 shadow-sm mb-3 p-4">
                <div className="row align-items-center">
                  <div className="col-2 text-center"><h5 className="text-muted m-0">ขบวน</h5><h2 style={{color: THEME.primary}}>{r.trainName.split(' ')[0] || '109'}</h2></div>
                  <div className="col-6"><span className="h4">{r.startTime}</span> <span className="text-muted mx-2">➡</span> <span className="h4">{r.arrivalTime}</span></div>
                  <div className="col-2 text-center"><h3 className="text-danger m-0">{r.price} ฿</h3></div>
                  <div className="col-2"><button className="btn btn-outline-warning w-100" onClick={() => selectTrain(r)}>เลือก</button></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {page === 'seat' && (
        <div className="container mt-5">
           <button className="btn btn-light mb-3" onClick={() => setPage('home')}>⬅ ย้อนกลับ</button>
           <h3 className="mb-4">เลือกที่นั่ง: {selectedTrain.trainName}</h3>
           <div className="d-flex justify-content-center gap-4 mb-4">
             <div className="d-flex align-items-center gap-2"><div style={{width:20,height:20,background:THEME.seatAvailable,borderRadius:4}}></div> ว่าง</div>
             <div className="d-flex align-items-center gap-2"><div style={{width:20,height:20,background:THEME.seatTaken,borderRadius:4}}></div> ไม่ว่าง (จองแล้ว)</div>
           </div>
           <div style={styles.carriageContainer}>
              {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className="d-flex flex-column gap-2">
                    <div className="d-flex gap-2">
                       <button disabled={takenSeats.includes(i*4+1)} style={{...styles.seatBtn, backgroundColor: takenSeats.includes(i*4+1)?THEME.seatTaken:THEME.seatAvailable, cursor: takenSeats.includes(i*4+1)?'not-allowed':'pointer'}} onClick={()=>bookSeat(i*4+1)}>{i*4+1}</button>
                       <button disabled={takenSeats.includes(i*4+2)} style={{...styles.seatBtn, backgroundColor: takenSeats.includes(i*4+2)?THEME.seatTaken:THEME.seatAvailable, cursor: takenSeats.includes(i*4+2)?'not-allowed':'pointer'}} onClick={()=>bookSeat(i*4+2)}>{i*4+2}</button>
                    </div>
                    <div style={{height:30}}></div>
                    <div className="d-flex gap-2">
                       <button disabled={takenSeats.includes(i*4+3)} style={{...styles.seatBtn, backgroundColor: takenSeats.includes(i*4+3)?THEME.seatTaken:THEME.seatAvailable, cursor: takenSeats.includes(i*4+3)?'not-allowed':'pointer'}} onClick={()=>bookSeat(i*4+3)}>{i*4+3}</button>
                       <button disabled={takenSeats.includes(i*4+4)} style={{...styles.seatBtn, backgroundColor: takenSeats.includes(i*4+4)?THEME.seatTaken:THEME.seatAvailable, cursor: takenSeats.includes(i*4+4)?'not-allowed':'pointer'}} onClick={()=>bookSeat(i*4+4)}>{i*4+4}</button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* ✅ HISTORY PAGE: ปรับปรุงใหม่ตามที่ขอ */}
      {page === 'history' && (
        <div className="container mt-5 pb-5">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>🎟 ตั๋วของฉัน (My Tickets)</h2>
              <button className="btn btn-outline-secondary" onClick={() => setPage('home')}>กลับหน้าหลัก</button>
           </div>

           {myTickets.length === 0 ? (
             <div className="text-center mt-5 p-5 bg-light rounded" style={{color: '#888'}}>
                <h3>🚫 คุณยังไม่มีประวัติการซื้อ</h3>
                <p>ลองค้นหาเที่ยวรถไฟและจองตั๋วดูสิครับ!</p>
                <button className="btn btn-primary mt-3" onClick={() => setPage('home')}>จองตั๋วเลย</button>
             </div>
           ) : (
             <>
                {/* 1. ตั๋วเร็วๆ นี้ */}
                <h5 className="mb-3 text-primary">⚡ ตั๋วเดินทางเร็วๆ นี้</h5>
                {getSortedTickets().active.length > 0 ? (
                   getSortedTickets().active.map((t, idx) => <TicketCard key={idx} t={t} />)
                ) : (
                   <p className="text-muted">ไม่มีการเดินทางเร็วๆ นี้</p>
                )}

                <hr className="my-5" />

                {/* 2. ประวัติการเดินทางที่ผ่านมา */}
                <h5 className="mb-3 text-secondary">📜 ประวัติการเดินทางที่ผ่านมา</h5>
                {getSortedTickets().history.length > 0 ? (
                   getSortedTickets().history.map((t, idx) => <TicketCard key={idx} t={t} isHistory />)
                ) : (
                   <p className="text-muted">ยังไม่มีประวัติการเดินทางในอดีต</p>
                )}
             </>
           )}
        </div>
      )}
    </div>
  );
}