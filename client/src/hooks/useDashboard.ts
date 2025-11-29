import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../utils/api';

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const { data } = await dashboardAPI.getStats();
            return data;
        },
    });
};
