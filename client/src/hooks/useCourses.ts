import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../utils/api';
import { Course } from '../types';

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const { data } = await coursesAPI.getAll();
            return data as Course[];
        },
    });
};

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newCourse: { title: string; description: string }) => coursesAPI.create(newCourse),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};
