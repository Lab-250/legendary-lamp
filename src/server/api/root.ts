import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "./routers/example";
import { courseRouter } from "./routers/course";
import { executorRouter } from "./routers/executor";
import { lecturerRouter } from "./routers/lecturer";
import { noticeRouter } from "./routers/notice";
import { userRoleChangeApplicantionRouter } from "./routers/userRoleChangeApplicantion";
import { topicRouter } from "./routers/topic";
import { paymentRecordRouter } from "./routers/paymentRecord";
import { studentRouter } from "./routers/student";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  example: exampleRouter,
  executor: executorRouter,
  lecturer: lecturerRouter,
  notice: noticeRouter,
  paymentRecord: paymentRecordRouter,
  student: studentRouter,
  topic: topicRouter,
  userRoleChangeApplicantion: userRoleChangeApplicantionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
