import { Loader2 } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Dashboard = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const { data: stats = { upcomingClasses: 0, assignmentsDue: 0, attendancePercentage: 0 }, isLoading: loading } = useDashboardStats();

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Hello, {user?.name || 'User'}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Welcome to your {user?.role?.toLowerCase() || 'student'} dashboard.
                    </p>
                </CardContent>
            </Card>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-700">Upcoming Classes</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.upcomingClasses}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-700">Assignments Due</h3>
                            <p className="text-3xl font-bold text-orange-500 mt-2">{stats.assignmentsDue}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-700">Attendance</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">{stats.attendancePercentage}%</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card className="min-h-[300px]">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-gray-400 text-center py-10">
                        No recent activity to show.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
