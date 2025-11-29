import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, Save, Loader2 } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock profile data - in real app, fetch from /api/profile
    const [profileData, setProfileData] = useState({
        bio: 'Passionate learner and aspiring developer.',
        year: 2023,
        course: 'Computer Science',
        phone: '+1 234 567 890'
    });

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setIsEditing(false);
        // In real app: await axios.put('/api/profile', profileData);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end space-x-6">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                                    {user.name?.[0] || 'U'}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name || 'User Name'}</h1>
                                <p className="text-gray-500">{user.role || 'Role'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${isEditing
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                <>
                                    <Save size={18} />
                                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Mail size={20} />
                                        <span>{user.email || 'email@example.com'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Phone size={20} />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1 w-full"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            />
                                        ) : (
                                            <span>{profileData.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <BookOpen size={20} />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1 w-full"
                                                value={profileData.course}
                                                onChange={(e) => setProfileData({ ...profileData, course: e.target.value })}
                                            />
                                        ) : (
                                            <span>{profileData.course}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Calendar size={20} />
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="border rounded px-2 py-1 w-full"
                                                value={profileData.year}
                                                onChange={(e) => setProfileData({ ...profileData, year: parseInt(e.target.value) })}
                                            />
                                        ) : (
                                            <span>Year {profileData.year}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
                                {isEditing ? (
                                    <textarea
                                        className="w-full border rounded-lg p-3"
                                        rows="4"
                                        value={profileData.bio}
                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">
                                        {profileData.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
