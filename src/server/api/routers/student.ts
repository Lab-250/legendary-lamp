import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";

export const studentRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.findUnique({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        course: true,
      },
    });
  }),

  createMany: adminProcedure
    .input(
      z.array(
        z.object({
          userId: z.string(),
          name: z.string().optional(),
          sex: z.string().optional(),
          checkTime: z.string().optional(),
          company: z.string().optional(),
          post: z.string().optional(),
          level: z.string().optional(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.student.createMany({
        data: input,
      });
    }),
});
