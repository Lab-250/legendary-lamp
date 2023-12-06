import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const studentRouter = createTRPCRouter({
  getStudentInCurrentSession: publicProcedure.query(({ ctx }) => {
    return ctx.db.student.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        course: true,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        sex: z.string(),
        checkTime: z.string(),
        company: z.string(),
        post: z.string(),
        level: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.student.create({
        data: {
          ...input,
          userId: ctx.session?.user.id,
        },
      });
    }),
});
