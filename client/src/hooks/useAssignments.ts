import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsAPI } from '../utils/api';
import { Assignment } from '../types';

export const useAssignments = () => {
    return useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const { data } = await assignmentsAPI.getAll();
            return data as Assignment[];
        },
    });
};

export const useSubmitAssignment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            assignmentsAPI.submit(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
        },
    });
};
