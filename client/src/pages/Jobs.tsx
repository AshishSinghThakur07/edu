import { useState, FormEvent } from 'react';
import { Briefcase, MapPin, Clock, Search, Loader2, Upload } from 'lucide-react';
import { JobPosting } from '../types';
import { useJobs, useApplyJob } from '../hooks/useJobs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

const Jobs = () => {
    const { data: jobs = [], isLoading: loading, isError, error } = useJobs();
    const applyJobMutation = useApplyJob();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState('');

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isStudent = user?.role === 'STUDENT';

    const handleApply = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedJob || !resumeFile) return;

        try {
            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('coverLetter', coverLetter);

            await applyJobMutation.mutateAsync({
                id: selectedJob._id,
                formData
            });

            setShowApplyModal(false);
            setResumeFile(null);
            setCoverLetter('');
            setSelectedJob(null);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Failed to submit application');
        }
    };

    const openApplyModal = (job: JobPosting) => {
        setSelectedJob(job);
        setShowApplyModal(true);
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Career Opportunities</h1>
                    <p className="text-gray-500">Find and apply for campus jobs</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search jobs..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{(error as Error).message || 'Failed to load jobs'}</p>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Briefcase className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">
                        {searchTerm ? 'No jobs found matching your search.' : 'No job postings available.'}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredJobs.map((job) => (
                        <Card key={job._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                                {job.type}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                Posted: {new Date(job.posted_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                                        <p className="text-indigo-600 font-medium text-sm mb-3">
                                            {(job.institution_id as any)?.name || 'Institution'}
                                        </p>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <MapPin size={16} className="mr-1" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock size={16} className="mr-1" />
                                                Closes: {new Date(job.closing_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {isStudent ? (
                                            <Button onClick={() => openApplyModal(job)} className="bg-indigo-600 hover:bg-indigo-700">
                                                Apply Now
                                            </Button>
                                        ) : (
                                            <Button variant="outline">
                                                View Details
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Apply for Position</DialogTitle>
                        <p className="text-sm text-gray-500">
                            {selectedJob?.title} at {(selectedJob?.institution_id as any)?.name}
                        </p>
                    </DialogHeader>
                    <form onSubmit={handleApply} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="resume">Resume / CV</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <Input
                                    id="resume"
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setResumeFile(e.target.files[0]);
                                        }
                                    }}
                                />
                                <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                <p className="text-sm text-gray-500">
                                    {resumeFile ? resumeFile.name : 'Upload PDF or DOCX'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                            <Textarea
                                id="coverLetter"
                                rows={4}
                                placeholder="Why are you a good fit for this role?"
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!resumeFile || applyJobMutation.isPending}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {applyJobMutation.isPending ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Jobs;
