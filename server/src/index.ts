
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import {
  createMenuItemInputSchema,
  createGalleryImageInputSchema,
  updateContactInfoInputSchema,
  updateOpeningHoursInputSchema
} from './schema';

// Import handlers
import { getMenuItems } from './handlers/get_menu_items';
import { getFeaturedMenuItems } from './handlers/get_featured_menu_items';
import { createMenuItem } from './handlers/create_menu_item';
import { getGalleryImages } from './handlers/get_gallery_images';
import { createGalleryImage } from './handlers/create_gallery_image';
import { getContactInfo } from './handlers/get_contact_info';
import { updateContactInfo } from './handlers/update_contact_info';
import { getOpeningHours } from './handlers/get_opening_hours';
import { updateOpeningHours } from './handlers/update_opening_hours';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Menu item routes
  getMenuItems: publicProcedure
    .query(() => getMenuItems()),
  getFeaturedMenuItems: publicProcedure
    .query(() => getFeaturedMenuItems()),
  createMenuItem: publicProcedure
    .input(createMenuItemInputSchema)
    .mutation(({ input }) => createMenuItem(input)),

  // Gallery routes
  getGalleryImages: publicProcedure
    .query(() => getGalleryImages()),
  createGalleryImage: publicProcedure
    .input(createGalleryImageInputSchema)
    .mutation(({ input }) => createGalleryImage(input)),

  // Contact info routes
  getContactInfo: publicProcedure
    .query(() => getContactInfo()),
  updateContactInfo: publicProcedure
    .input(updateContactInfoInputSchema)
    .mutation(({ input }) => updateContactInfo(input)),

  // Opening hours routes
  getOpeningHours: publicProcedure
    .query(() => getOpeningHours()),
  updateOpeningHours: publicProcedure
    .input(updateOpeningHoursInputSchema)
    .mutation(({ input }) => updateOpeningHours(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
