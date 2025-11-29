import { useState } from 'react';
import { BookOpen, Plus, Loader2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCourses, useCreateCourse } from '../hooks/useCourses';
import { courseSchema, CourseForm } from '../lib/schemas';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

const Courses = () => {
    const { data: courses = [], isLoading: loading, isError, error } = useCourses();
    const createCourseMutation = useCreateCourse();

    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CourseForm>({
        resolver: zodResolver(courseSchema),
    });

    const handleCreateCourse = async (data: CourseForm) => {
        try {
            await createCourseMutation.mutateAsync(data);
            setShowAddModal(false);
            reset();
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
                <Button onClick={() => setShowAddModal(true)} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus size={20} className="mr-2" />
                    Add Course
                </Button>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : isError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                    <p className="text-red-600">{(error as Error).message || 'Failed to load courses'}</p>
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
                        <Card key={course._id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                        <BookOpen size={24} />
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                        {(course.institution_id as any)?.name || 'Institution'}
                                    </span>
                                </div>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0">
                                <Button variant="link" className="text-indigo-600 p-0 h-auto font-medium hover:text-indigo-800">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleCreateCourse)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                {...register('title')}
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                className={errors.description ? 'border-red-500' : ''}
                                rows={3}
                            />
                            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                                {isSubmitting ? 'Creating...' : 'Create Course'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Courses;
