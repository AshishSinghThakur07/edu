import { useState, useEffect } from 'react';
import { assignmentsAPI } from '../utils/api';
import { FileText, Upload, Plus, Loader2, CheckCircle } from 'lucide-react';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const isStudent = user?.role === 'STUDENT';
    const isTeacher = user?.role === 'TEACHER';

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const { data } = await assignmentsAPI.getAll();
            setAssignments(data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (submissionFile) {
                formData.append('file', submissionFile);
            }

            await assignmentsAPI.submit(selectedAssignment._id, formData);

            // Update local state
            setAssignments(assignments.map(a =>
                a._id === selectedAssignment._id ? { ...a, status: 'submitted' } : a
            ));

            setShowSubmitModal(false);
            setSubmissionFile(null);
            setSelectedAssignment(null);
            alert('Assignment submitted successfully!');
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit assignment');
        }
    };

    const openSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setShowSubmitModal(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                    <p className="text-gray-500">Track and submit your classwork</p>
                </div>
                {isTeacher && (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                        <Plus size={20} />
                        <span>Create Assignment</span>
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FileText className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">No assignments yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                                        {assignment.class_id?.name || 'Class'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{assignment.title}</h3>
                                <p className="text-gray-600 text-sm">{assignment.description}</p>
                            </div>

                            <div className="flex items-center">
                                {assignment.status === 'submitted' ? (
                                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                                        <CheckCircle size={20} />
                                        <span className="font-medium">Submitted</span>
                                    </div>
                                ) : (
                                    isStudent && (
                                        <button
                                            onClick={() => openSubmitModal(assignment)}
                                            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                                        >
                                            <Upload size={18} />
                                            <span>Submit</span>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Submit Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Assignment</h2>
                        <p className="text-gray-600 mb-4 text-sm">
                            Submitting for: <span className="font-semibold">{selectedAssignment?.title}</span>
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setSubmissionFile(e.target.files[0])}
                                />
                            </div>
                            {submissionFile && (
                                <div className="text-sm text-indigo-600 flex items-center">
                                    <FileText size={16} className="mr-2" />
                                    {submissionFile.name}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowSubmitModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!submissionFile}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit Work
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
