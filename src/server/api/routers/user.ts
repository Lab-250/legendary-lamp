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
      z.object({
        applicantId: z.string(),
        userId: z.string(),
        destType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, destType } = input;
      if (
        destType !== UserRole.STUDENT &&
        destType !== UserRole.LECTURER &&
        destType !== UserRole.EXECUTOR
      ) {
        return { success: false, message: "Invalid role" };
      }
      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
      });
      // 开启一个事务
      // 1. 更新用户角色
      // 2. 创建对应角色的记录
      // 3. 删除申请记录
      await ctx.db.$transaction([
        ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            role: destType,
          },
        }),
        destType === UserRole.STUDENT
          ? ctx.db.student.create({ data: { userId, name: user?.name } })
          : destType === UserRole.LECTURER
            ? ctx.db.lecturer.create({ data: { userId, name: user?.name } })
            : ctx.db.executor.create({ data: { userId, name: user?.name } }),
        ctx.db.userRoleChangeApplicantion.delete({
          where: { id: input.applicantId },
        }),
      ]);
      return { success: true };
    }),
});
