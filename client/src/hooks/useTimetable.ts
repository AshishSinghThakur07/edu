import { useQuery } from '@tanstack/react-query';
import { timetableAPI } from '../utils/api';
import { Timetable } from '../types';

export const useTimetable = () => {
    return useQuery({
        queryKey: ['timetable'],
        queryFn: async () => {
            const { data } = await timetableAPI.getSchedule();
            return data as Timetable[];
        },
    });
};
