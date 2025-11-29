import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { Role } from '@prisma/client';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('📝 [REGISTER] New registration attempt');

        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            console.log('❌ [REGISTER] Validation failed:', validation.error.format());
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }

        const { name, email, password, role, institution_id } = validation.data;

        console.log('🔍 [REGISTER] Checking if user exists:', email);
        const userExists = await prisma.user.findUnique({ where: { email } });

        if (userExists) {
            console.log('❌ [REGISTER] User already exists:', email);
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('✅ [REGISTER] Creating new user...');
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role as Role,
                institutionId: institution_id
            }
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
    } catch (error: any) {
        console.error('❌ [REGISTER] Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('🔐 [LOGIN] Login attempt');

        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
            return;
        }

        const { email, password } = validation.data;
        console.log('🔐 [LOGIN] Email:', email);

        console.log('🔍 [LOGIN] Finding user...');
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log('❌ [LOGIN] User not found:', email);
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        console.log('🔍 [LOGIN] User found, verifying password...');
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
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
    } catch (error: any) {
        console.error('❌ [LOGIN] Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};
