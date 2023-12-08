import * as React from "react";
import { useSession } from "next-auth/react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import type { User } from "@prisma/client";

import DataTable from "@/components/course/DataTable";
import { UserRole } from "@/common/config";
import { api } from "@/utils/api";
import { getRoleName } from "@/utils/role";

const UserManagement: React.FC = () => {
  // session
  const { data: session } = useSession();

  // api
  // course api
  const { data: users, refetch: refetchUsers } = api.user.getAll.useQuery();
  const deleteUsers = api.user.deleteByIds.useMutation({
    onSuccess: () => {
      void refetchUsers();
    },
  });

  // state
  const [selectionModel, setSelectionModel] = React.useState<number[] | null>(
    null,
  );

  return (
    <Grid container spacing={3}>
      {(session?.user?.role == UserRole.ADMIN ||
        session?.user?.role == UserRole.STUDENT) && (
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "rows",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<EditOutlinedIcon />}
                onClick={() => {}}
              >
                修改用户
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => {
                  deleteUsers.mutate({
                    ids:
                      users
                        ?.filter(
                          (e: User, i: number) =>
                            selectionModel?.includes(i + 1),
                        )
                        .map((e: User) => e.id) ?? [],
                  });
                  setSelectionModel(null);
                }}
              >
                删除用户
              </Button>
            </Stack>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DataTable
            rows={
              users?.map((item: User, index: number) => ({
                id: index + 1,
                name: item.name,
                email: item.email,
                phone: item.phone,
                role: getRoleName(item.role ?? null),
              })) ?? {}
            }
            columns={[
              {
                field: "id",
                headerName: "编号",
                width: 80,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "name",
                headerName: "用户名称",
                width: 200,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "email",
                headerName: "用户邮箱",
                width: 220,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "phone",
                headerName: "用户手机号",
                width: 220,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "role",
                headerName: "用户职责",
                width: 200,
                align: "center",
                headerAlign: "center",
              },
            ]}
            setSelectionModel={setSelectionModel}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserManagement;
