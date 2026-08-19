import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [students, setStudents] = useState([]);

  // CÂU 47: Lấy danh sách sinh viên từ Backend
  const fetchStudents = async () => {
    try {
      const response = await fetch('https://obscure-giggle-p7gvpgxv76wgf65wj-5000.app.github.dev/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 48 & 49: Xử lý Form và gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Đã sửa 'mssv' thành 'studentId' để khớp 100% với Database của bạn
    const newStudent = { studentId: mssv, name: name, email: email };
    
    try {
      await fetch('https://obscure-giggle-p7gvpgxv76wgf65wj-5000.app.github.dev/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      
      setMssv(''); 
      setName(''); 
      setEmail('');
      
      fetchStudents();
      alert("Đã thêm sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>QUẢN LÝ SINH VIÊN (REACT FRONTEND)</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" placeholder="MSSV" required
          value={mssv} onChange={(e) => setMssv(e.target.value)} 
        />
        <input 
          type="text" placeholder="Họ tên" required
          value={name} onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" placeholder="Email" required
          value={email} onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 15px' }}>
          Thêm Sinh Viên
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                {/* Đã sửa chỗ hiển thị thành student.studentId */}
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">Chưa có dữ liệu sinh viên nào...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App