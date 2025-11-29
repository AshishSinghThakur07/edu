import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsAPI } from '../utils/api';
import { JobPosting } from '../types';

export const useJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const { data } = await jobsAPI.getAll();
            return data as JobPosting[];
        },
    });
};

export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            jobsAPI.apply(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });
};
