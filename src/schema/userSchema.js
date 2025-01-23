import z from 'zod';

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    role: z.enum(['user', 'admin']).optional(),
});

export const validateUserData = (object)=>{
    return userSchema.safeParse(object);
}
