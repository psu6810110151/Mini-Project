import Login from './Login'; // Import มา

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        🚄 ระบบจองตั๋วรถไฟ (Mini-Project)
      </h1>
      
      {/* วาง Component Login ตรงนี้ */}
      <Login /> 
    </div>
  );
}

export default App;