import { z } from 'zod';

export const signUpformSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  // custom validation for password confirmation
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpFormType = z.infer<typeof signUpformSchema>;
