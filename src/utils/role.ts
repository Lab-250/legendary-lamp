import { UserRole } from "@/common/config";

export const getRoleName = (role: UserRole | string | null) => {
  switch (role) {
    case UserRole.STUDENT:
      return "学生";
    case UserRole.LECTURER:
      return "教师";
    case UserRole.EXECUTOR:
      return "教务员";
    case UserRole.ADMIN:
      return "校园管理员";
    case UserRole.USER:
      return "普通用户";
    default:
      return "未知";
  }
};
