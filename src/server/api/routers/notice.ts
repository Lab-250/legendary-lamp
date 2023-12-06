import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const noticeRouter = createTRPCRouter({
  getAllByCourseId: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.notice.findMany({
        where: {
          ...input,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        courseId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session) {
        return null;
      }
      return ctx.db.notice.create({
        data: {
          ...input,
          userId: ctx.session?.user.id,
        },
      });
    }),
});
