import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const paymentRecordRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.paymentRecord.findMany();
  }),
});
