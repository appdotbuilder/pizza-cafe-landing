
import { serial, text, pgTable, timestamp, numeric, integer, boolean } from 'drizzle-orm/pg-core';

export const menuItemsTable = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  image_url: text('image_url'),
  is_featured: boolean('is_featured').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const galleryImagesTable = pgTable('gallery_images', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  image_url: text('image_url').notNull(),
  alt_text: text('alt_text').notNull(),
  display_order: integer('display_order').default(0).notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const contactInfoTable = pgTable('contact_info', {
  id: serial('id').primaryKey(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  email: text('email').notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const openingHoursTable = pgTable('opening_hours', {
  id: serial('id').primaryKey(),
  day_of_week: text('day_of_week').notNull(),
  open_time: text('open_time').notNull(),
  close_time: text('close_time').notNull(),
  is_closed: boolean('is_closed').default(false).notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type MenuItem = typeof menuItemsTable.$inferSelect;
export type NewMenuItem = typeof menuItemsTable.$inferInsert;
export type GalleryImage = typeof galleryImagesTable.$inferSelect;
export type NewGalleryImage = typeof galleryImagesTable.$inferInsert;
export type ContactInfo = typeof contactInfoTable.$inferSelect;
export type NewContactInfo = typeof contactInfoTable.$inferInsert;
export type OpeningHours = typeof openingHoursTable.$inferSelect;
export type NewOpeningHours = typeof openingHoursTable.$inferInsert;

// Export all tables for proper query building
export const tables = {
  menuItems: menuItemsTable,
  galleryImages: galleryImagesTable,
  contactInfo: contactInfoTable,
  openingHours: openingHoursTable
};
