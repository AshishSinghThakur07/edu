import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    const isAuthenticated = () => {
        return !!user && !!localStorage.getItem('token');
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        hasRole,
        isStudent: user?.role === 'STUDENT',
        isTeacher: user?.role === 'TEACHER',
        isHR: user?.role === 'HR',
        isAdmin: user?.role === 'ADMIN',
    };
};
