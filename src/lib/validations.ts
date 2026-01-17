import { z } from 'zod';

// Phone validation: Indian format (10 digits, optionally with country code)
const phoneRegex = /^(\+91)?[6-9]\d{9}$/;

// Pincode validation: Indian format (6 digits)
const pincodeRegex = /^\d{6}$/;

// Custom Order Form Schema
export const customOrderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  occasion: z
    .string()
    .min(1, 'Please select an occasion'),
  budget: z
    .string()
    .min(1, 'Please select a budget range'),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .transform(val => val || ''),
});

export type CustomOrderFormData = z.infer<typeof customOrderSchema>;

// Checkout Form Schema
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .trim()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: z
    .string()
    .trim()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be less than 100 characters'),
  pincode: z
    .string()
    .trim()
    .regex(pincodeRegex, 'Please enter a valid 6-digit pincode'),
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .transform(val => val || ''),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Utility function to sanitize text input (removes potential XSS)
export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};
