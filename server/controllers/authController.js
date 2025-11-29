const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        console.log('📝 [REGISTER] New registration attempt');
        console.log('📝 [REGISTER] Request body:', { ...req.body, password: '***' });

        const { name, email, password, role, institution_id } = req.body;

        console.log('🔍 [REGISTER] Checking if user exists:', email);
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('❌ [REGISTER] User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('✅ [REGISTER] Creating new user...');
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            institution_id
        });

        if (user) {
            console.log('✅ [REGISTER] User created successfully:', user.email);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            console.log('❌ [REGISTER] Failed to create user');
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('❌ [REGISTER] Error:', error.message);
        console.error('❌ [REGISTER] Stack:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log('🔐 [LOGIN] Login attempt');
        const { email, password } = req.body;
        console.log('🔐 [LOGIN] Email:', email);

        console.log('🔍 [LOGIN] Finding user...');
        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ [LOGIN] User not found:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('🔍 [LOGIN] User found, verifying password...');
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (user && isPasswordValid) {
            console.log('✅ [LOGIN] Login successful:', email);
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            console.log('❌ [LOGIN] Invalid password for:', email);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('❌ [LOGIN] Error:', error.message);
        console.error('❌ [LOGIN] Stack:', error.stack);
        res.status(500).json({ message: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = { registerUser, loginUser };
