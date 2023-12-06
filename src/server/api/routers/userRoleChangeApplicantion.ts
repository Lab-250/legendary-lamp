import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRoleChangeApplicantionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.notice.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        destType: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session) {
        return null;
      }
      return ctx.db.userRoleChangeApplicantion.create({
        data: {
          ...input,
          userId: ctx.session?.user.id,
        },
      });
    }),
});
