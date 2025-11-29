import { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Attendance = () => {
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState([
        { _id: '1', name: 'Alice Johnson', status: 'present' },
        { _id: '2', name: 'Bob Smith', status: 'absent' },
        { _id: '3', name: 'Charlie Brown', status: 'present' },
        { _id: '4', name: 'Diana Prince', status: 'present' },
    ]);

    const toggleAttendance = (id) => {
        setStudents(students.map(student => {
            if (student._id === id) {
                return { ...student, status: student.status === 'present' ? 'absent' : 'present' };
            }
            return student;
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        alert('Attendance saved successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
                    <p className="text-gray-500">Mark daily attendance for your class</p>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="date"
                        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Save Attendance</span>}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="font-semibold text-gray-900">Class List - CS101</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {students.map((student) => (
                        <div key={student._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                    {student.name[0]}
                                </div>
                                <span className="font-medium text-gray-900">{student.name}</span>
                            </div>
                            <button
                                onClick={() => toggleAttendance(student._id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${student.status === 'present'
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}
                            >
                                {student.status === 'present' ? (
                                    <>
                                        <CheckCircle size={20} />
                                        <span>Present</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={20} />
                                        <span>Absent</span>
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
