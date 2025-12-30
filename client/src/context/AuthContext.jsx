import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    // Initial check (optional, but requested flow seems to imply fresh login mostly)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const showNotification = (msg, type, icon) => {
        setNotification({ msg, type, icon });
        setTimeout(() => setNotification(null), 3000);
    };

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const userData = { username: res.data.username, token: res.data.token };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // Optional persistence

            // "Green background, white text, Loading up icon"
            showNotification(`${username} logged in successfully`, 'success', '⬆️');
            return true;
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        const username = user?.username || 'User';
        setUser(null);
        localStorage.removeItem('user');
        // "Red background, white text, Loading down icon"
        showNotification(`${username} logged out successfully`, 'error', '⬇️');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, notification }}>
            {children}
            {notification && (
                <div className={`notification ${notification.type === 'success' ? 'notification-success' : 'notification-error'}`}>
                    <span>{notification.icon}</span>
                    <span>{notification.msg}</span>
                </div>
            )}
        </AuthContext.Provider>
    );
};
