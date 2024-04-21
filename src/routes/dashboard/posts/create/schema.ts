import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(2).max(50),
	content: z.string().min(2).max(500)
});

export type FormSchema = typeof formSchema;
