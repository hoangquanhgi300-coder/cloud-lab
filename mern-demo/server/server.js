global.crypto = require('crypto');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Đã thêm thư viện cors
const Student = require('./models/Student'); 

const app = express();

// Câu 58: Cấu hình CORS linh hoạt cho Production
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Hoặc truyền origin cụ thể
    }
  },
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 5000;

// Ket noi MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Ket noi MongoDB Atlas thanh cong!'))
    .catch((err) => console.error('Loi ket noi MongoDB:', err));

app.get('/api/hello', (req, res) => {
    res.send('Xac nhan Backend dang hoat dong.');
});

// Câu 36. API GET: Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Câu 37. API POST: Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Câu 38. API PUT: Cập nhật thông tin sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Câu 39. API DELETE: Xóa sinh viên theo ID
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Xoa sinh vien thanh cong!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server dang chay tren port ${port}`);
});