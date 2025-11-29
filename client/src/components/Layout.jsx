import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LayoutDashboard, User, LogOut, BookOpen, Calendar, CheckCircle, FileText, Briefcase } from 'lucide-react';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Mock auth state - replace with real context later
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (location.pathname === '/login' || location.pathname === '/register') {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/courses', label: 'Courses', icon: BookOpen },
        { path: '/timetable', label: 'Timetable', icon: Calendar },
        { path: '/attendance', label: 'Attendance', icon: CheckCircle },
        { path: '/assignments', label: 'Assignments', icon: FileText },
        { path: '/jobs', label: 'Jobs', icon: Briefcase },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-full flex flex-col">
                    <div className="p-6 flex items-center justify-between border-b">
                        <div className="flex items-center space-x-2 text-indigo-600">
                            <GraduationCap size={32} />
                            <span className="text-xl font-bold">EduManage</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t">
                        <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.role || 'Guest'}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-gray-900">EduManage</span>
                    <div className="w-6" /> {/* Spacer for centering */}
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
