import { useState, useEffect } from 'react';
import { jobsAPI } from '../utils/api';
import { Briefcase, MapPin, Clock, Search, Loader2, Upload } from 'lucide-react';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const isStudent = user?.role === 'STUDENT';

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await jobsAPI.getAll();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (resumeFile) {
                formData.append('resume', resumeFile);
            }
            formData.append('coverLetter', coverLetter);

            await jobsAPI.apply(selectedJob._id, formData);

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

    const openApplyModal = (job) => {
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
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
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
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                            {job.type}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Posted: {new Date(job.posted_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                                    <p className="text-indigo-600 font-medium text-sm mb-3">
                                        {job.institution_id?.name || 'Institution'}
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
                                        <button
                                            onClick={() => openApplyModal(job)}
                                            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Apply Now
                                        </button>
                                    ) : (
                                        <button className="w-full md:w-auto border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                            View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Apply for Position</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            {selectedJob?.title} at {selectedJob?.institution_id?.name}
                        </p>

                        <form onSubmit={handleApply} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resume / CV</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                    />
                                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                    <p className="text-sm text-gray-500">
                                        {resumeFile ? resumeFile.name : 'Upload PDF or DOCX'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    rows="4"
                                    placeholder="Why are you a good fit for this role?"
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!resumeFile}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
