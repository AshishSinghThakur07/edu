import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceAPI } from '../utils/api';

export interface StudentAttendance {
    _id: string;
    name: string;
    status: 'present' | 'absent';
}

export const useAttendance = () => {
    return useQuery({
        queryKey: ['attendance'],
        queryFn: async () => {
            const { data } = await attendanceAPI.getRecords();
            return data as StudentAttendance[];
        },
    });
};

export const useMarkAttendance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => attendanceAPI.mark(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
        },
    });
};
