import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaBed, FaSnowflake, FaFan, FaArrowUp, FaArrowDown, 
  FaChartLine, FaTicketAlt, FaTrash, FaTrain, FaPlus,
  FaToilet, FaDoorOpen, FaWalking, FaHistory, FaPrint 
} from 'react-icons/fa';

const FONT_URL = "https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap";
import bgTrainImage from './bg-head.png'; 

const TRAIN_BG_IMAGE = bgTrainImage; 

const THEME = {
  primary: '#B28237', // สีทอง รฟท.
  secondary: '#F5F5F5',
  textMain: '#444',
  seatAvailable: '#fff', 
  seatTaken: '#e0e0e0',
  seatSelected: '#B28237', 
  seatBorder: '#B28237',
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { fontFamily: "'Sarabun', sans-serif", color: THEME.textMain, minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fdfdfd' },
  navbar: { backgroundColor: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'sticky' as 'sticky', top: 0, zIndex: 1000 },
  logo: { fontSize: '28px', fontWeight: 'bold', color: THEME.primary, cursor: 'pointer', letterSpacing: '1px' },
  navMenu: { display: 'flex', gap: '25px', color: '#666', fontWeight: 500, cursor: 'pointer', fontSize: '16px' },
  hero: { 
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${TRAIN_BG_IMAGE}')`, 
    backgroundSize: 'cover', backgroundPosition: 'center', 
    padding: '100px 20px', textAlign: 'center', minHeight: '500px',
    display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center', alignItems: 'center', color: '#fff'
  },
  heroTitle: { fontSize: '3.5rem', fontWeight: 'bold', textShadow: '0px 4px 15px rgba(0,0,0,0.5)', marginBottom: '10px' },
  heroSubtitle: { fontSize: '1.2rem', textShadow: '0px 2px 10px rgba(0,0,0,0.5)' },
  searchWidget: { backgroundColor: '#fff', borderRadius: '15px', padding: '30px', width: '100%', maxWidth: '1000px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', marginTop: '-60px' },
  btnGold: { backgroundColor: THEME.primary, color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontWeight: 'bold', width: '100%', transition: '0.3s', fontSize: '16px', boxShadow: '0 4px 6px rgba(178, 130, 55, 0.3)' },
  seatBtn: { width: '45px', height: '45px', border: `1px solid ${THEME.seatBorder}`, borderRadius: '8px', margin: '4px', fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: '0.2s' },
  trainCarriage: { backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '20px', padding: '20px', position: 'relative' as 'relative', minWidth: '340px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
};

// DATA: สถานีรถไฟจริง
const STATIONS = [
  { id: 1, name: 'กรุงเทพอภิวัฒน์ (Bang Sue)', km: 0, region: 'Central' },
  { id: 2, name: 'ดอนเมือง (Don Mueang)', km: 22, region: 'Central' },
  { id: 3, name: 'รังสิต (Rangsit)', km: 30, region: 'Central' },
  { id: 5, name: 'อยุธยา (Ayutthaya)', km: 71, region: 'Central' },
  { id: 6, name: 'แก่งคอย (Kaeng Khoi)', km: 125, region: 'Central' },
  { id: 101, name: 'ลพบุรี (Lop Buri)', km: 133, region: 'North' },
  { id: 102, name: 'นครสวรรค์ (Nakhon Sawan)', km: 246, region: 'North' },
  { id: 103, name: 'พิจิตร (Phichit)', km: 347, region: 'North' },
  { id: 104, name: 'พิษณุโลก (Phitsanulok)', km: 389, region: 'North' },
  { id: 105, name: 'อุตรดิตถ์ (Uttaradit)', km: 485, region: 'North' },
  { id: 106, name: 'ศิลาอาสน์ (Sila At)', km: 487, region: 'North' },
  { id: 107, name: 'เด่นชัย (Den Chai)', km: 529, region: 'North' },
  { id: 108, name: 'นครลำปาง (Nakhon Lampang)', km: 642, region: 'North' },
  { id: 109, name: 'ขุนตาน (Khun Tan)', km: 683, region: 'North' },
  { id: 110, name: 'ลำพูน (Lamphun)', km: 729, region: 'North' },
  { id: 111, name: 'เชียงใหม่ (Chiang Mai)', km: 751, region: 'North' },
  { id: 201, name: 'สระบุรี (Saraburi)', km: 113, region: 'NE' },
  { id: 202, name: 'ปากช่อง (Pak Chong)', km: 180, region: 'NE' },
  { id: 203, name: 'นครราชสีมา (Nakhon Ratchasima)', km: 264, region: 'NE' },
  { id: 204, name: 'บุรีรัมย์ (Buriram)', km: 376, region: 'NE' },
  { id: 205, name: 'สุรินทร์ (Surin)', km: 420, region: 'NE' },
  { id: 206, name: 'ศรีสะเกษ (Si Sa Ket)', km: 515, region: 'NE' },
  { id: 207, name: 'อุบลราชธานี (Ubon Ratchathani)', km: 575, region: 'NE' },
  { id: 208, name: 'ขอนแก่น (Khon Kaen)', km: 450, region: 'NE' },
  { id: 209, name: 'อุดรธานี (Udon Thani)', km: 569, region: 'NE' },
  { id: 210, name: 'หนองคาย (Nong Khai)', km: 621, region: 'NE' },
  { id: 301, name: 'นครปฐม (Nakhon Pathom)', km: 64, region: 'South' },
  { id: 302, name: 'ราชบุรี (Ratchaburi)', km: 117, region: 'South' },
  { id: 303, name: 'เพชรบุรี (Phetchaburi)', km: 167, region: 'South' },
  { id: 304, name: 'หัวหิน (Hua Hin)', km: 229, region: 'South' },
  { id: 305, name: 'ประจวบคีรีขันธ์ (Prachuap Khiri Khan)', km: 318, region: 'South' },
  { id: 306, name: 'ชุมพร (Chumphon)', km: 485, region: 'South' },
  { id: 307, name: 'สุราษฎร์ธานี (Surat Thani)', km: 651, region: 'South' },
  { id: 308, name: 'ชุมทางทุ่งสง (Thung Song)', km: 773, region: 'South' },
  { id: 309, name: 'นครศรีธรรมราช (Nakhon Si Thammarat)', km: 832, region: 'South' },
  { id: 310, name: 'พัทลุง (Phatthalung)', km: 862, region: 'South' },
  { id: 311, name: 'หาดใหญ่ (Hat Yai)', km: 945, region: 'South' },
  { id: 312, name: 'ยะลา (Yala)', km: 1055, region: 'South' },
  { id: 313, name: 'สุไหงโก-ลก (Sungai Kolok)', km: 1159, region: 'South' },
  { id: 401, name: 'ฉะเชิงเทรา (Chachoengsao)', km: 61, region: 'East' },
  { id: 402, name: 'ปราจีนบุรี (Prachin Buri)', km: 122, region: 'East' },
  { id: 403, name: 'พัทยา (Pattaya)', km: 155, region: 'East' },
  { id: 404, name: 'จุกเสม็ด/สัตหีบ (Chuk Samet)', km: 184, region: 'East' },
  { id: 405, name: 'อรัญประเทศ (Aranyaprathet)', km: 255, region: 'East' },
];

const DEFAULT_TRAINS = [
    { id: 'EXP_51', name: 'ด่วน 51 (Express)', time: '22:00', type: 'Sleep', basePrice: 0.8 },
    { id: 'SP_9', name: 'ด่วนพิเศษ 9 (Uttrawithi)', time: '18:10', type: 'Sleep_AC', basePrice: 1.5 },
];

const CLASS_OPTIONS = [
    { id: '1_AC_SL', name: 'ชั้น 1 นั่ง/นอน แอร์', factor: 2.5, icon: <FaBed/> },
    { id: '2_AC_SL', name: 'ชั้น 2 นั่ง/นอน แอร์', factor: 1.7, icon: <FaBed/> },
    { id: '2_AC_ST', name: 'ชั้น 2 นั่ง แอร์', factor: 1.3, icon: <FaSnowflake/> },
    { id: '2_FAN', name: 'ชั้น 2 พัดลม', factor: 1.0, icon: <FaFan/> },
    { id: '3_FAN', name: 'ชั้น 3 พัดลม', factor: 0.6, icon: <FaFan/> },
];

const loadState = (key: string, defaultValue: any) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
};

// --- Sub-Components (Move outside main App to prevent re-render focus loss) ---
// ✅ FIX: ใส่ type any ให้ props เพื่อแก้ error ตัวแดง

const RenderSeat = ({ row, n, takenSeats, currentSelectedSeats, setCurrentSelectedSeats, searchParams }: any) => {
    const seatNum = (row * 4) + n;
    const isTaken = takenSeats.includes(seatNum);
    const isSelected = currentSelectedSeats.includes(seatNum);
    return (
      <button key={n} disabled={isTaken}
          style={{ ...styles.seatBtn, backgroundColor: isTaken ? THEME.seatTaken : (isSelected ? THEME.seatSelected : THEME.seatAvailable), color: isSelected || isTaken ? '#fff' : THEME.textMain, cursor: isTaken ? 'not-allowed' : 'pointer' }}
          onClick={() => isSelected ? setCurrentSelectedSeats(currentSelectedSeats.filter((s: number) => s !== seatNum)) : (currentSelectedSeats.length < searchParams.passengers ? setCurrentSelectedSeats([...currentSelectedSeats, seatNum]) : alert('ครบจำนวนแล้ว'))}
      > {seatNum} </button>
    );
};

const SeatMap = ({ takenSeats, currentSelectedSeats, setCurrentSelectedSeats, searchParams }: any) => (
  <div className="d-flex flex-column align-items-center">
      <div className="d-flex align-items-center gap-2 mb-3 text-secondary"><FaArrowUp/> <span>หัวขบวน (Front)</span></div>
      <div style={styles.trainCarriage}>
         <div className="d-flex justify-content-between mb-4 pb-3 border-bottom text-secondary">
             <div className="d-flex gap-2 align-items-center"><FaToilet size={20}/> <span>ห้องน้ำ</span></div>
             <div className="d-flex gap-2 align-items-center"><FaDoorOpen size={20}/> <span>ทางขึ้น-ลง</span></div>
         </div>
         <div className="d-flex flex-column gap-2 align-items-center">
            {Array.from({length: 10}).map((_, row) => (
                <div key={row} className="d-flex gap-4">
                    <div className="d-flex gap-1">{[1, 2].map(n => <RenderSeat key={n} row={row} n={n} takenSeats={takenSeats} currentSelectedSeats={currentSelectedSeats} setCurrentSelectedSeats={setCurrentSelectedSeats} searchParams={searchParams} />)}</div>
                    <div className="d-flex align-items-center justify-content-center" style={{width: '40px', color: '#ccc', fontSize: '10px'}}>
                        <span style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}><FaWalking/> WALK</span>
                    </div>
                    <div className="d-flex gap-1">{[3, 4].map(n => <RenderSeat key={n} row={row} n={n} takenSeats={takenSeats} currentSelectedSeats={currentSelectedSeats} setCurrentSelectedSeats={setCurrentSelectedSeats} searchParams={searchParams} />)}</div>
                </div>
            ))}
         </div>
      </div>
  </div>
);

// ✅ Separated AdminDashboard Component
const AdminDashboard = ({ bookings, trains, setPage, newTrain, setNewTrain, handleAddTrain, handleDeleteTrain, cancelTicket }: any) => {
    const totalRevenue = bookings.filter((b: any) => b.status === 'confirmed').reduce((sum: number, b: any) => sum + b.price, 0);
    const activeBookings = bookings.filter((b: any) => b.status === 'confirmed').length;

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold" style={{color: THEME.primary}}>⚙️ Admin Dashboard</h2>
                <button className="btn btn-outline-secondary" onClick={() => setPage('home')}>กลับหน้าหลัก</button>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div style={{...styles.trainCarriage, padding: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning"><FaChartLine size={24}/></div>
                        <div><div className="text-muted small">ยอดขายรวม</div><h4 className="m-0 fw-bold">{totalRevenue.toLocaleString()} ฿</h4></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div style={{...styles.trainCarriage, padding: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success"><FaTicketAlt size={24}/></div>
                        <div><div className="text-muted small">ตั๋วที่ขายแล้ว</div><h4 className="m-0 fw-bold">{activeBookings} ใบ</h4></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div style={{...styles.trainCarriage, padding: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaTrain size={24}/></div>
                        <div><div className="text-muted small">จำนวนเที่ยวรถ</div><h4 className="m-0 fw-bold">{trains.length} ขบวน</h4></div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px', overflow: 'hidden'}}>
                        <div className="card-header bg-white py-3"><h5 className="m-0 fw-bold">รายการจองล่าสุด</h5></div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light text-secondary small">
                                    <tr><th>PNR</th><th>User</th><th>ขบวน</th><th>ราคา</th><th>สถานะ</th><th>จัดการ</th></tr>
                                </thead>
                                <tbody>
                                    {[...bookings].reverse().slice(0, 5).map((b: any, i: number) => (
                                        <tr key={i}>
                                            <td className="fw-bold">{b.pnr}</td>
                                            <td>{b.user}</td>
                                            <td>{b.trainName}<br/><small className="text-muted">{b.date} {b.time}</small></td>
                                            <td className="fw-bold">{b.price} ฿</td>
                                            <td><span className={`badge bg-${b.status === 'confirmed' ? 'success' : 'secondary'}`}>{b.status}</span></td>
                                            <td>{b.status === 'confirmed' && <button className="btn btn-sm btn-outline-danger" onClick={() => cancelTicket(b, true)}><FaTrash/></button>}</td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && <tr><td colSpan={6} className="text-center py-4">ไม่มีข้อมูล</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px', overflow: 'hidden'}}>
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="m-0 fw-bold text-primary">จัดการเที่ยวรถ (Manage Trains)</h5>
                            <span className="badge bg-primary rounded-pill">{trains.length} ขบวน</span>
                        </div>
                        <div className="table-responsive" style={{maxHeight: '400px', overflowY: 'auto'}}>
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light text-secondary small sticky-top">
                                    <tr>
                                        <th>ชื่อขบวน</th>
                                        <th>เวลา</th>
                                        <th>ประเภท</th>
                                        <th>ราคาฐาน</th>
                                        <th>จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trains.map((t: any, i: number) => (
                                        <tr key={i}>
                                            <td className="fw-bold">{t.name}</td>
                                            <td>{t.time} น.</td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    {t.type === 'Fan' ? 'รถพัดลม' : t.type === 'Seat_AC' ? 'นั่งแอร์' : t.type.includes('Sleep') ? 'นอนแอร์' : t.type}
                                                </span>
                                            </td>
                                            <td>x{t.basePrice}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger" 
                                                    onClick={() => handleDeleteTrain(t.id)}
                                                    title="ลบเที่ยวรถนี้"
                                                >
                                                    <FaTrash/> ลบ
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {trains.length === 0 && <tr><td colSpan={5} className="text-center py-4">ไม่มีข้อมูลเที่ยวรถ</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px'}}>
                        <div className="card-header bg-primary text-white py-3"><h5 className="m-0 fw-bold"><FaPlus className="me-2"/> เพิ่มเที่ยวรถใหม่</h5></div>
                        <div className="card-body">
                            <div className="mb-2">
                                <label className="small text-muted">ชื่อขบวน</label>
                                <input className="form-control" value={newTrain.name} onChange={e => setNewTrain({...newTrain, name: e.target.value})} placeholder="เช่น ด่วน 85" />
                            </div>

                            <div className="row g-2 mb-2">
                                <div className="col-6">
                                    <label className="small text-muted">ต้นทาง</label>
                                    <select className="form-select" value={newTrain.origin} onChange={e => setNewTrain({...newTrain, origin: e.target.value})}>
                                        <option value="">เลือก</option>
                                        {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="small text-muted">ปลายทาง</label>
                                    <select className="form-select" value={newTrain.dest} onChange={e => setNewTrain({...newTrain, dest: e.target.value})}>
                                        <option value="">เลือก</option>
                                        {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="small text-muted">เวลาออก</label>
                                <input type="time" className="form-control" value={newTrain.time} onChange={e => setNewTrain({...newTrain, time: e.target.value})} />
                            </div>
                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <label className="small text-muted">ประเภท</label>
                                    <select className="form-select" value={newTrain.type} onChange={e => setNewTrain({...newTrain, type: e.target.value})}>
                                        <option value="Fan">รถพัดลม</option>
                                        <option value="Seat_AC">นั่งแอร์</option>
                                        <option value="Sleep_AC">นอนแอร์</option>
                                        <option value="Sleep">นอน/นั่ง</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="small text-muted">ตัวคูณราคา</label>
                                    <input type="number" step="0.1" className="form-control" value={newTrain.basePrice} onChange={e => setNewTrain({...newTrain, basePrice: parseFloat(e.target.value)})} />
                                </div>
                            </div>
                            <button className="btn btn-primary w-100 fw-bold" onClick={handleAddTrain}>บันทึกเที่ยวรถ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => 
      loadState('coe_users', [{ username: 'admin', password: '123', role: 'admin' }, { username: 'test1', password: '123', role: 'user' }])
  );
  const [currentUser, setCurrentUser] = useState<any>(() => loadState('coe_current_user', null));
  const [bookings, setBookings] = useState<any[]>(() => loadState('coe_bookings', []));
  const [trains, setTrains] = useState<any[]>(() => loadState('coe_trains', DEFAULT_TRAINS)); 

  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [searchParams, setSearchParams] = useState({ origin: '', dest: '', date: '', passengers: 1 });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [takenSeats, setTakenSeats] = useState<number[]>([]);
  const [currentSelectedSeats, setCurrentSelectedSeats] = useState<number[]>([]);
  
  const [includePast, setIncludePast] = useState(false);
  const [newTrain, setNewTrain] = useState({ name: '', time: '', type: 'Fan', basePrice: 1.0, origin: '', dest: '' });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = FONT_URL; link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => { localStorage.setItem('coe_users', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { localStorage.setItem('coe_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('coe_trains', JSON.stringify(trains)); }, [trains]);
  useEffect(() => {
      if(currentUser) localStorage.setItem('coe_current_user', JSON.stringify(currentUser));
      else localStorage.removeItem('coe_current_user');
  }, [currentUser]);

  const handleAuth = () => {
      if (!authForm.username || !authForm.password) return alert("กรุณากรอกข้อมูลให้ครบ");
      if (authMode === 'register') {
          if (registeredUsers.find((u: any) => u.username === authForm.username)) return alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
          const newUser = { username: authForm.username, password: authForm.password, role: 'user' };
          setRegisteredUsers([...registeredUsers, newUser]);
          setCurrentUser({ username: newUser.username, role: newUser.role });
          setShowAuth(false); setAuthForm({ username: '', password: '' });
      } else {
          const user = registeredUsers.find((u: any) => u.username === authForm.username && u.password === authForm.password);
          if (user) { 
              setCurrentUser({ username: user.username, role: user.role }); 
              setShowAuth(false); setAuthForm({ username: '', password: '' }); 
              if (user.role === 'admin') setPage('admin_dashboard');
          } else { 
              alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); 
          }
      }
  };

  const logout = () => { setCurrentUser(null); setPage('home'); };

  // ✅✅✅ Phase 12: ฟังก์ชันพิมพ์ตั๋ว ✅✅✅
  const handlePrintTicket = (ticket: any) => {
    const printWindow = window.open('', '', 'width=600,height=600');
    if(printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Ticket - ${ticket.pnr}</title>
              <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap" rel="stylesheet">
              <style>
                body { font-family: 'Sarabun', sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9; }
                .ticket { 
                    border: 2px dashed #B28237; 
                    padding: 30px; 
                    max-width: 500px; 
                    margin: 0 auto; 
                    background: white; 
                    border-radius: 15px; 
                    position: relative;
                }
                .header { color: #B28237; margin-bottom: 20px; font-size: 24px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                .row { display: flex; justify-content: space-between; margin-bottom: 10px; text-align: left; }
                .label { font-weight: bold; color: #555; }
                .value { color: #000; font-weight: 500; }
                .price { font-size: 28px; color: #d9534f; font-weight: bold; margin-top: 20px; }
                .footer { margin-top: 30px; font-size: 12px; color: #999; }
                .logo { font-size: 40px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="ticket">
                <div class="logo">🚆</div>
                <div class="header">CoE Railway Ticket</div>
                
                <div class="row">
                    <span class="label">PNR (รหัสการจอง):</span>
                    <span class="value">${ticket.pnr}</span>
                </div>
                <div class="row">
                    <span class="label">Passenger (ผู้โดยสาร):</span>
                    <span class="value">${ticket.user}</span>
                </div>
                <div class="row">
                    <span class="label">Train (ขบวน):</span>
                    <span class="value">${ticket.trainName}</span>
                </div>
                <div class="row">
                    <span class="label">Date (วันที่):</span>
                    <span class="value">${ticket.date} | ${ticket.time}</span>
                </div>
                <div class="row">
                    <span class="label">Route (เส้นทาง):</span>
                    <span class="value">${ticket.origin} ➝ ${ticket.dest}</span>
                </div>
                <div class="row">
                    <span class="label">Seats (ที่นั่ง):</span>
                    <span class="value">${ticket.seats.join(', ')}</span>
                </div>
                
                <div class="price">${ticket.price} THB</div>
                
                <div class="footer">Thank you for choosing CoE Railway.<br/>ขอให้มีความสุขกับการเดินทาง</div>
              </div>
              <script>
                 window.onload = function() { window.print(); window.close(); }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
    }
  };

  const handleSearch = () => {
    if(!searchParams.origin || !searchParams.dest || !searchParams.date) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    if(searchParams.origin === searchParams.dest) return alert('ต้นทางและปลายทางต้องไม่เหมือนกัน');

    const results: any[] = [];
    const now = new Date(); // เวลาปัจจุบัน
    const searchDateObj = new Date(searchParams.date);
    searchDateObj.setHours(0,0,0,0);
    const todayObj = new Date();
    todayObj.setHours(0,0,0,0);

    const isToday = searchDateObj.getTime() === todayObj.getTime();
    const isPastDate = searchDateObj.getTime() < todayObj.getTime();

    trains.forEach((train: any) => {
        let availableClasses = CLASS_OPTIONS;
        if (train.type === 'Fan') availableClasses = CLASS_OPTIONS.filter(c => c.id.includes('FAN') || c.id === '2_AC_ST');
        if (train.type === 'Seat_AC') availableClasses = CLASS_OPTIONS.filter(c => c.id.includes('AC') || c.id.includes('FAN'));
        if (train.type === 'Sleep_AC') availableClasses = CLASS_OPTIONS.filter(c => c.id.includes('AC'));
        if (train.type === 'Sleep') availableClasses = CLASS_OPTIONS; 

        availableClasses.forEach(cls => {
            const s1 = STATIONS.find(s => s.id === parseInt(searchParams.origin));
            const s2 = STATIONS.find(s => s.id === parseInt(searchParams.dest));
            
            const dist = s1 && s2 ? Math.abs(s1.km - s2.km) : 0;
            
            if(dist > 0) {
                 const price = Math.round((dist * 0.5 * train.basePrice * cls.factor)) + 50; 
                 const speed = (train.name.includes('ด่วน') || train.name.includes('Special')) ? 75 : 55;
                 const totalMinutes = Math.round((dist / speed) * 60) + 20; 
                 const hrs = Math.floor(totalMinutes / 60);
                 const mins = totalMinutes % 60;
                 const realTravelTime = hrs > 0 ? `${hrs} ชม. ${mins} น.` : `${mins} น.`;

                 let isDeparted = false;
                 if (isPastDate) {
                     isDeparted = true; 
                 } else if (isToday) {
                     const [th, tm] = train.time.split(':').map(Number);
                     const trainTime = new Date();
                     trainTime.setHours(th, tm, 0, 0);
                     if (trainTime < now) isDeparted = true;
                 }

                 results.push({ 
                     ...train, 
                     classInfo: cls, 
                     price: price, 
                     travelTime: realTravelTime,
                     isDeparted: isDeparted 
                 });
            }
        });
    });

    const finalResults = includePast ? results : results.filter(r => !r.isDeparted);
    setSearchResults(finalResults.sort((a,b) => a.time.localeCompare(b.time)));
  };

  const selectTicket = (item: any) => {
      if (item.isDeparted) return alert("❌ รถขบวนนี้ออกเดินทางไปแล้ว");
      if (!currentUser) { setShowAuth(true); return; }
      setSelectedTrain(item); setCurrentSelectedSeats([]);
      const taken = bookings.filter((b: any) => b.date === searchParams.date && b.trainId === item.id && b.classId === item.classInfo.id && b.status !== 'cancelled').flatMap((b: any) => b.seats);
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
          setBookings(bookings.map((b: any) => b.id === booking.id ? { ...b, status: 'cancelled' } : b));
      }
  };

  const handleAddTrain = () => {
      if(!newTrain.name || !newTrain.time) return alert("กรุณากรอกชื่อและเวลา");
      
      const id = "TR_" + Math.random().toString(36).substr(2, 5).toUpperCase();
      const trainToAdd = { ...newTrain, id: id };
      setTrains([...trains, trainToAdd]);
      setNewTrain({ name: '', time: '', type: 'Fan', basePrice: 1.0, origin: '', dest: '' });
      alert("เพิ่มเที่ยวรถเรียบร้อย!");
  };

  const handleDeleteTrain = (id: string) => {
      if(confirm("ต้องการลบเที่ยวรถนี้ใช่หรือไม่?")) {
          setTrains(trains.filter((t: any) => t.id !== id));
      }
  };

  const resetSystem = () => { if(confirm('⚠️ ล้างข้อมูลระบบ?')) { localStorage.clear(); window.location.reload(); } }

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
      {page === 'admin_dashboard' && currentUser?.role === 'admin' ? (
          <AdminDashboard 
              bookings={bookings} 
              trains={trains} 
              setPage={setPage} 
              newTrain={newTrain} 
              setNewTrain={setNewTrain} 
              handleAddTrain={handleAddTrain} 
              handleDeleteTrain={handleDeleteTrain} 
              cancelTicket={cancelTicket} 
          />
      ) : (
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
                                    <label className="form-label fw-bold text-muted small">ต้นทาง (Origin)</label>
                                    <select className="form-select border-0 bg-light py-3" value={searchParams.origin} onChange={e => setSearchParams({...searchParams, origin: e.target.value})}>
                                        <option value="">-- เลือกต้นทาง --</option>
                                        {STATIONS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label fw-bold text-muted small">ปลายทาง (Destination)</label>
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
                                {/* Checkbox Phase 10 */}
                                <div className="col-md-4 d-flex align-items-center pt-4">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="includePast" 
                                            checked={includePast}
                                            onChange={(e) => setIncludePast(e.target.checked)}
                                        />
                                        <label className="form-check-label text-secondary small pt-1" htmlFor="includePast">
                                            แสดงเที่ยวรถย้อนหลัง (Show Past Trips)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-100 px-2 mt-5" style={{maxWidth: '1000px'}}>
                            {searchResults.length > 0 && <h4 className="mb-4 text-secondary">เที่ยวรถที่ว่าง (Available Trains)</h4>}
                            {searchResults.map((r, i) => (
                                <div key={i} className={`card border-0 shadow-sm mb-4 overflow-hidden ${r.isDeparted ? 'bg-light opacity-75' : ''}`} style={{borderRadius: '15px'}}>
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 text-center border-end">
                                                <h3 className="m-0 fw-bold" style={{color: r.isDeparted ? '#999' : THEME.primary}}>{r.time}</h3>
                                                <small className="text-muted">{r.isDeparted ? 'ออกไปแล้ว' : 'เวลาออก'}</small>
                                            </div>
                                            <div className="col-md-4 ps-4">
                                                <h5 className="mb-1 fw-bold">{r.name}</h5>
                                                <span className="badge bg-light text-dark border me-2">{r.classInfo.name}</span>
                                                {r.isDeparted && <span className="badge bg-secondary">Departed</span>}
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-2 text-muted">
                                                    <span className="fs-5">{r.classInfo.icon}</span>
                                                    <small>{r.travelTime}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-end">
                                                <h3 className={`fw-bold ${r.isDeparted ? 'text-muted' : 'text-danger'}`}>{r.price} ฿</h3>
                                                <button 
                                                    className={`btn w-100 mt-2 rounded-pill ${r.isDeparted ? 'btn-secondary disabled' : 'btn-outline-warning'}`} 
                                                    onClick={() => selectTicket(r)}
                                                    disabled={r.isDeparted}
                                                >
                                                    {r.isDeparted ? 'ไม่ว่าง' : 'เลือกที่นั่ง'}
                                                </button>
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
                                <h4 className="text-center mb-4">เลือกที่นั่ง (Carriage Layout)</h4>
                                <SeatMap 
                                    takenSeats={takenSeats} 
                                    currentSelectedSeats={currentSelectedSeats} 
                                    setCurrentSelectedSeats={setCurrentSelectedSeats} 
                                    searchParams={searchParams} 
                                />
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
                    {bookings.filter((b: any) => b.user === currentUser.username).map((ticket: any, idx: number) => (
                        <div key={idx} className="card border-0 shadow-sm mb-3" style={{borderRadius: '15px', borderLeft: `8px solid ${ticket.status === 'cancelled' ? '#999' : THEME.primary}`}}>
                            <div className="card-body p-4">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <h5 className="fw-bold text-dark mb-1">{ticket.trainName}</h5>
                                        <p className="mb-2 text-muted small">📅 {ticket.date} | ⏰ {ticket.time}</p>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="badge bg-light text-dark border">PNR: {ticket.pnr}</span>
                                            <span className="badge bg-success bg-opacity-10 text-success border border-success">ที่นั่ง: {ticket.seats.join(', ')}</span>
                                            <span className="badge bg-info bg-opacity-10 text-info border border-info">{ticket.origin} ➝ {ticket.dest}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-5 text-end">
                                        {ticket.status === 'cancelled' ? <span className="badge bg-secondary fs-6 px-3 py-2">ยกเลิกแล้ว</span> : (
                                            <>
                                                <h3 className="text-danger fw-bold mb-2">{ticket.price} ฿</h3>
                                                <div className="d-flex justify-content-end gap-2">
                                                    {/* ✅✅✅ ปุ่มพิมพ์ตั๋ว (Phase 12) ✅✅✅ */}
                                                    <button className="btn btn-sm btn-outline-primary px-3" onClick={() => handlePrintTicket(ticket)}>
                                                        <FaPrint /> พิมพ์ตั๋ว
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger px-3" onClick={() => cancelTicket(ticket)}>ยกเลิก</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {bookings.filter((b: any) => b.user === currentUser.username).length === 0 && (
                        <div className="text-center py-5 text-muted">ท่านยังไม่มีประวัติการจองตั๋ว</div>
                    )}
                </div>
            )}
        </>
      )}
    </div>
  );
}