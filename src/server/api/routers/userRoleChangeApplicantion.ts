import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const userRoleChangeApplicantionRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.userRoleChangeApplicantion.count({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.db.userRoleChangeApplicantion.findMany({
      include: {
        user: true,
      },
    });
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

  deleteById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.userRoleChangeApplicantion.delete({
        where: {
          ...input,
        },
      });
    }),

  deleteByIds: adminProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.userRoleChangeApplicantion.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
});
