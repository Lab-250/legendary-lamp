import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getSessionUser: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),
  getAllUsers: adminProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});
