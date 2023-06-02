import { NextApiRequest } from 'next';
import { object, string, TypeOf } from 'zod';

export const CreateUserSchema = object({
    id: string().optional(),
    email: string({ required_error: 'Email is required' })
        .email('Invalid email'),
    password: string({ required_error: 'Password is required' })
        .min(6, 'Password must be more than 8 characters')
        .max(30, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' })
        .nonempty({ message: 'Please confirm your password' }),
    role: string({ required_error: 'Role is required' })
        .nonempty({ message: 'Role is required' })
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

export const UpdateUserSchema = object({
    id: string().optional(),
    email: string({ required_error: 'Email is required' })
        .email('Invalid email'),
    role: string({ required_error: 'Role is required' })
        .nonempty({ message: 'Role is required' })
});

export interface CreateUserApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateUserSchema>;
}