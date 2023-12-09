import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRecordRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const student = await ctx.db.student.findUnique({
      where: {
        userId: ctx.session?.user.id,
      },
    });
    return ctx.db.courseRecord.findMany({
      where: {
        studentId: student?.id,
      },
      include: {
        course: true,
      },
    });
  }),

  getAllByCourseId: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.courseRecord.findMany({
        where: {
          ...input,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        courseIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.db.student.findUnique({
        where: {
          userId: ctx.session?.user.id,
        },
      });
      return ctx.db.courseRecord.createMany({
        data: input.courseIds.map((courseId: string) => ({
          studentId: student?.id,
          courseId,
        })),
      });
    }),

  updateByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        payTime: z.date().optional(),
        payed: z.boolean().optional(),
        signed: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.courseRecord.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: {
          payTime: input.payTime,
          payed: input.payed,
          signed: input.signed,
        },
      });
    }),

  deleteByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.courseRecord.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
});
