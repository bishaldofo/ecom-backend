import { z } from 'zod';

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity cannot be negative')
    .min(1, 'Quantity is required'),
  inStock: z.boolean(),
});

const variantsValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().array(),
  variants: z.array(variantsValidationSchema).min(1, 'Variants are required'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
