import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../utils/api';
import { User } from '../types';

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await userAPI.getProfile();
            return data;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<User>) => userAPI.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};
