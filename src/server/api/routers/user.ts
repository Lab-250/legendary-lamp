import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  deleteByIds: adminProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
