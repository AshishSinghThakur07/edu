import { Clock, User, Loader2 } from 'lucide-react';
import { useTimetable } from '../hooks/useTimetable';

const Timetable = () => {
    const { data: schedule = [], isLoading: loading, isError, error } = useTimetable();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Weekly Timetable</h1>
                <p className="text-gray-500">View your class schedule</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{(error as Error).message || 'Failed to load timetable'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {days.map(day => (
                        <div key={day} className="space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-2">{day}</h3>
                            <div className="space-y-3">
                                {schedule
                                    .filter(item => item.day === day)
                                    .sort((a, b) => a.start_time.localeCompare(b.start_time))
                                    .map(item => (
                                        <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="font-bold text-indigo-600 mb-1">{(item.class_id as any).name}</div>
                                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                                <Clock size={14} className="mr-1" />
                                                {item.start_time} - {item.end_time}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <User size={14} className="mr-1" />
                                                {(item.teacher_id as any).name}
                                            </div>
                                        </div>
                                    ))}
                                {schedule.filter(item => item.day === day).length === 0 && (
                                    <div className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded-lg">
                                        No classes
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timetable;
