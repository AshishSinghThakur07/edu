import { useState } from 'react';
import { FileText, Upload, Plus, Loader2, CheckCircle } from 'lucide-react';
import { Assignment } from '../types';
import { useAssignments, useSubmitAssignment } from '../hooks/useAssignments';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

const Assignments = () => {
    const { data: assignments = [], isLoading: loading, isError, error } = useAssignments();
    const submitAssignmentMutation = useSubmitAssignment();

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [submissionFile, setSubmissionFile] = useState<File | null>(null);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isStudent = user?.role === 'STUDENT';
    const isTeacher = user?.role === 'TEACHER';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAssignment || !submissionFile) return;

        try {
            const formData = new FormData();
            formData.append('file', submissionFile);

            await submitAssignmentMutation.mutateAsync({
                id: selectedAssignment._id,
                formData
            });

            setShowSubmitModal(false);
            setSubmissionFile(null);
            setSelectedAssignment(null);
            alert('Assignment submitted successfully!');
        } catch (error) {
            console.error('Error submitting assignment:', error);
            alert('Failed to submit assignment');
        }
    };

    const openSubmitModal = (assignment: Assignment) => {
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
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus size={20} className="mr-2" />
                        Create Assignment
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{(error as Error).message || 'Failed to load assignments'}</p>
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FileText className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">No assignments yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {assignments.map((assignment) => (
                        <Card key={assignment._id} className="flex flex-col md:flex-row justify-between gap-4 p-6">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                                        {(assignment.class_id as any)?.name || 'Class'}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{assignment.title}</h3>
                                <p className="text-gray-600 text-sm">{assignment.description}</p>
                            </div>

                            <div className="flex items-center">
                                {assignment.status === 'SUBMITTED' ? (
                                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                                        <CheckCircle size={20} />
                                        <span className="font-medium">Submitted</span>
                                    </div>
                                ) : (
                                    isStudent && (
                                        <Button onClick={() => openSubmitModal(assignment)} className="bg-indigo-600 hover:bg-indigo-700">
                                            <Upload size={18} className="mr-2" />
                                            Submit
                                        </Button>
                                    )
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <p className="text-sm text-gray-500">
                            Submitting for: <span className="font-semibold text-gray-900">{selectedAssignment?.title}</span>
                        </p>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                            <Input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSubmissionFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </div>
                        {submissionFile && (
                            <div className="text-sm text-indigo-600 flex items-center bg-indigo-50 p-2 rounded">
                                <FileText size={16} className="mr-2" />
                                {submissionFile.name}
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowSubmitModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!submissionFile || submitAssignmentMutation.isPending}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {submitAssignmentMutation.isPending ? 'Submitting...' : 'Submit Work'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Assignments;
