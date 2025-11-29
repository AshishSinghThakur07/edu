import { useState, useEffect } from 'react';
import { dashboardAPI } from '../utils/api';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [stats, setStats] = useState({
        upcomingClasses: 0,
        assignmentsDue: 0,
        attendancePercentage: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await dashboardAPI.getStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">
                    Hello, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Welcome to your {user?.role?.toLowerCase() || 'student'} dashboard.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-700">Upcoming Classes</h3>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.upcomingClasses}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-700">Assignments Due</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">{stats.assignmentsDue}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-700">Attendance</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">{stats.attendancePercentage}%</p>
                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="text-gray-400 text-center py-10">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
