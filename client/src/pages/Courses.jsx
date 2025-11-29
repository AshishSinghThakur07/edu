import { useState, useEffect } from 'react';
import { coursesAPI } from '../utils/api';
import { BookOpen, Plus, Loader2, Search } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await coursesAPI.getAll();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load courses');
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const { data } = await coursesAPI.create(newCourse);
            setCourses([...courses, data]);
            setShowAddModal(false);
            setNewCourse({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create course');
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <p className="text-gray-500">Manage your institution's courses</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Course</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{error}</p>
                    <button onClick={fetchCourses} className="mt-4 text-indigo-600 hover:text-indigo-800">
                        Try Again
                    </button>
                </div>
            ) : filteredCourses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BookOpen className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">
                        {searchTerm ? 'No courses found matching your search.' : 'No courses yet. Create your first course!'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                    <BookOpen size={24} />
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                    {course.institution_id?.name || 'Institution'}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2">{course.description}</p>
                            <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                                <span className="text-gray-500">Course</span>
                                <button className="text-indigo-600 font-medium hover:text-indigo-800">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Course Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Course</h2>
                        <form onSubmit={handleCreateCourse} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    rows="3"
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
