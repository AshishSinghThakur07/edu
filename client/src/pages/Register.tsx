import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authAPI } from '../utils/api';
import { GraduationCap, User, Mail, Lock, Building2, Loader2 } from 'lucide-react';
import { registerSchema, RegisterForm } from '../lib/schemas';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'STUDENT'
        }
    });

    const onSubmit = async (data: RegisterForm) => {
        setError('');
        try {
            const { data: response } = await authAPI.register(data);
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <GraduationCap size={32} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>Join your educational institution</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="pl-10">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="TEACHER">Teacher</SelectItem>
                                                <SelectItem value="HR">HR</SelectItem>
                                                <SelectItem value="ADMIN">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <div className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Sign In
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
