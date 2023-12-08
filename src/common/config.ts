import { env } from "@/env.mjs";

export const appConfig = {
  APP_TITLE: "浩奇培训信息管理系统",
  DEFAULT_AVATAR:
    "https://i.pinimg.com/564x/fc/c3/ca/fcc3ca23eac89ce1a9a0bed4ff9babfa.jpg",
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  LECTURER = "LECTURER",
  EXECUTOR = "EXECUTOR",
  STUDENT = "STUDENT",
}
