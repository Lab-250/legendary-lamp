import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { UserRole } from "@/common/config";

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
        role: z.string().optional(),
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

  createDestRole: adminProcedure
    .input(
      z.array(
        z.object({
          userId: z.string(),
          destType: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      input.forEach((item) => {
        if (item.destType === UserRole.STUDENT) {
          return ctx.db.student.create({
            data: {
              userId: item.userId,
            },
          });
        } else if (item.destType === UserRole.LECTURER) {
          return ctx.db.lecturer.create({
            data: {
              userId: item.userId,
            },
          });
        } else if (item.destType === UserRole.EXCUTOR) {
          return ctx.db.executor.create({
            data: {
              userId: item.userId,
            },
          });
        }
      });
    }),
});
