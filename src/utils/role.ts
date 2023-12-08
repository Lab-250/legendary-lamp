import { UserRole } from "@/common/config";

export const getRoleName = (role: UserRole | string | null) => {
  switch (role) {
    case UserRole.STUDENT:
      return "学生";
    case UserRole.LECTURER:
      return "讲师";
    case UserRole.EXCUTOR:
      return "执行人";
    case UserRole.ADMIN:
      return "经理";
    case UserRole.USER:
      return "普通用户";
    default:
      return "未知";
  }
};
