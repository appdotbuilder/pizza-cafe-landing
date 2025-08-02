
import { z } from 'zod';

// Menu item schema
export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image_url: z.string().nullable(),
  is_featured: z.boolean(),
  created_at: z.coerce.date()
});

export type MenuItem = z.infer<typeof menuItemSchema>;

// Gallery image schema
export const galleryImageSchema = z.object({
  id: z.number(),
  title: z.string(),
  image_url: z.string(),
  alt_text: z.string(),
  display_order: z.number().int(),
  is_active: z.boolean(),
  created_at: z.coerce.date()
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

// Contact info schema
export const contactInfoSchema = z.object({
  id: z.number(),
  phone: z.string(),
  address: z.string(),
  email: z.string().email(),
  updated_at: z.coerce.date()
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

// Opening hours schema
export const openingHoursSchema = z.object({
  id: z.number(),
  day_of_week: z.string(),
  open_time: z.string(),
  close_time: z.string(),
  is_closed: z.boolean(),
  updated_at: z.coerce.date()
});

export type OpeningHours = z.infer<typeof openingHoursSchema>;

// Input schemas for creating/updating
export const createMenuItemInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  image_url: z.string().nullable().optional(),
  is_featured: z.boolean().optional()
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemInputSchema>;

export const createGalleryImageInputSchema = z.object({
  title: z.string(),
  image_url: z.string(),
  alt_text: z.string(),
  display_order: z.number().int().optional(),
  is_active: z.boolean().optional()
});

export type CreateGalleryImageInput = z.infer<typeof createGalleryImageInputSchema>;

export const updateContactInfoInputSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional()
});

export type UpdateContactInfoInput = z.infer<typeof updateContactInfoInputSchema>;

export const updateOpeningHoursInputSchema = z.object({
  day_of_week: z.string(),
  open_time: z.string().optional(),
  close_time: z.string().optional(),
  is_closed: z.boolean().optional()
});

export type UpdateOpeningHoursInput = z.infer<typeof updateOpeningHoursInputSchema>;
