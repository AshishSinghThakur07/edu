import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, BookOpen, Save, Loader2 } from 'lucide-react';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';

const Profile = () => {
    const { data: userProfile, isLoading: loading } = useProfile();
    const updateProfileMutation = useUpdateProfile();

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        bio: '',
        year: new Date().getFullYear(),
        course: '',
        phone: ''
    });

    useEffect(() => {
        if (userProfile) {
            setProfileData({
                bio: userProfile.bio || '',
                year: userProfile.year || new Date().getFullYear(),
                course: userProfile.course || '',
                phone: userProfile.phone || ''
            });
        }
    }, [userProfile]);

    const handleSave = async () => {
        try {
            await updateProfileMutation.mutateAsync(profileData);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
        );
    }

    const displayUser = userProfile || JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card className="overflow-hidden">
                <div className="h-32 bg-indigo-600"></div>
                <CardContent className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end space-x-6">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                                    {displayUser.name?.[0] || 'U'}
                                </div>
                            </div>
                            <div className="mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{displayUser.name || 'User Name'}</h1>
                                <p className="text-gray-500">{displayUser.role || 'Role'}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={updateProfileMutation.isPending}
                            variant={isEditing ? "default" : "secondary"}
                            className={isEditing ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                        >
                            {updateProfileMutation.isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Mail size={20} />
                                        <span>{displayUser.email || 'email@example.com'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Phone size={20} />
                                        {isEditing ? (
                                            <Input
                                                type="text"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                placeholder="Phone Number"
                                            />
                                        ) : (
                                            <span>{profileData.phone || 'No phone number'}</span>
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
                                            <Input
                                                type="text"
                                                value={profileData.course}
                                                onChange={(e) => setProfileData({ ...profileData, course: e.target.value })}
                                                placeholder="Course / Major"
                                            />
                                        ) : (
                                            <span>{profileData.course || 'No course details'}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Calendar size={20} />
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                value={profileData.year}
                                                onChange={(e) => setProfileData({ ...profileData, year: parseInt(e.target.value) })}
                                                placeholder="Year"
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
                                    <Textarea
                                        rows={4}
                                        value={profileData.bio}
                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                        placeholder="Tell us about yourself"
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">
                                        {profileData.bio || 'No bio available.'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
