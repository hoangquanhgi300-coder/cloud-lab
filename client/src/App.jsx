import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [students, setStudents] = useState([]);

  // Lấy danh sách sinh viên từ Backend
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

  // Xử lý Form và Thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

  // Hàm xử lý Xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      try {
        await fetch(`https://obscure-giggle-p7gvpgxv76wgf65wj-5000.app.github.dev/api/students/${id}`, {
          method: 'DELETE',
        });
        alert("Xóa thành công!");
        fetchStudents(); // Cập nhật lại danh sách mượt mà
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  // Hàm xử lý Sửa sinh viên (Cập nhật tên)
  const handleEdit = async (id, currentName) => {
    const newName = window.prompt("Nhập tên mới cho sinh viên:", currentName);
    if (newName && newName.trim() !== "") {
      try {
        await fetch(`https://obscure-giggle-p7gvpgxv76wgf65wj-5000.app.github.dev/api/students/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        });
        alert("Cập nhật thành công!");
        fetchStudents(); // Cập nhật lại danh sách mượt mà
      } catch (error) {
        console.error("Lỗi khi sửa:", error);
      }
    }
  };

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
        <button type="submit" style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>
          Thêm Sinh Viên
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>THAO TÁC</th> {/* Thêm cột Thao tác */}
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td style={{ display: 'flex', gap: '5px' }}> {/* Cột chứa 2 nút */}
                  <button 
                    onClick={() => handleEdit(student._id, student.name)}
                    style={{ cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(student._id)}
                    style={{ cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">Chưa có dữ liệu sinh viên nào...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App