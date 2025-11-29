import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAttendance, useMarkAttendance } from '../hooks/useAttendance';

const Attendance = () => {
    const { data: students = [], isLoading: loading, isError, error } = useAttendance();
    const markAttendanceMutation = useMarkAttendance();

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [localAttendance, setLocalAttendance] = useState<Record<string, 'present' | 'absent'>>({});

    const toggleAttendance = (id: string) => {
        setLocalAttendance(prev => ({
            ...prev,
            [id]: prev[id] === 'present' ? 'absent' : 'present'
        }));
    };

    const handleSave = async () => {
        try {
            await markAttendanceMutation.mutateAsync({
                date: selectedDate,
                attendance: localAttendance
            });
            alert('Attendance saved successfully!');
        } catch (error) {
            console.error('Error saving attendance:', error);
            alert('Failed to save attendance');
        }
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
                        disabled={markAttendanceMutation.isPending}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                        {markAttendanceMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <span>Save Attendance</span>}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{(error as Error).message || 'Failed to load students'}</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="font-semibold text-gray-900">Class List</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {students.map((student) => {
                            const status = localAttendance[student._id] || student.status || 'absent';
                            return (
                                <div key={student._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                            {student.name[0]}
                                        </div>
                                        <span className="font-medium text-gray-900">{student.name}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleAttendance(student._id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${status === 'present'
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                    >
                                        {status === 'present' ? (
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
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
