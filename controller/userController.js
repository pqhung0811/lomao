const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    // Lấy dữ liệu từ body của request
    const { username, email, password } = req.body;

    try {
      // Kiểm tra xem email đã được đăng ký trước đó hay chưa
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash password trước khi lưu vào database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo mới một user và lưu vào database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    // Lấy dữ liệu từ body của request
    const { email, password } = req.body;

    try {
      // Tìm user theo email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Kiểm tra xem password có đúng không bằng cách so sánh với hashed password trong database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Tạo JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};
