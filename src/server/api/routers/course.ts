import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Course } from "@prisma/client";

export const courseRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.course.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany({
      include: {
        executor: true,
        lecturer: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        time: z.string(),
        place: z.string(),
        price: z.number(),
        income: z.number(),
        lecturerId: z.string(),
        executorId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.course.create({
        data: input,
      });
    }),

  updateById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        time: z.string(),
        place: z.string(),
        price: z.number(),
        income: z.number(),
        lecturerId: z.string(),
        executorId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.course.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.course.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteByIds: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.course.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  statistics: publicProcedure
    .output(
      z.array(
        z.object({
          name: z.string(),
          selected: z.number(),
          price: z.number(),
          income: z.number(),
          payed: z.number(),
          signed: z.number(),
          commented: z.number(),
          grade: z.number(),
          notice: z.number(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      const courses = await ctx.db.course.findMany({
        include: {},
      });

      const result = await Promise.all(
        courses.map(async (item: Course) => {
          const selected = await ctx.db.courseRecord.count({
            where: {
              courseId: item.id,
            },
          });
          const payed = await ctx.db.courseRecord.count({
            where: {
              courseId: item.id,
              payed: true,
            },
          });
          const signed = await ctx.db.courseRecord.count({
            where: {
              courseId: item.id,
              signed: true,
            },
          });
          const commented = await ctx.db.topic.count({
            where: {
              courseId: item.id,
            },
          });
          const result = await ctx.db.topic.aggregate({
            where: {
              courseId: item.id,
            },
            _avg: {
              grade: true,
            },
          });
          const notice = await ctx.db.notice.count({
            where: {
              courseId: item.id,
            },
          });
          return {
            name: item.name,
            selected,
            price: item.price.toNumber(),
            income: item.price.toNumber() * payed,
            payed,
            signed,
            commented,
            grade: result._avg.grade ?? 0,
            notice,
          };
        }),
      );

      return result;
    }),
});
