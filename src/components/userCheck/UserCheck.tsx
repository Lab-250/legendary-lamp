import * as React from "react";
import { useSession } from "next-auth/react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import type { User, UserRoleChangeApplicantion } from "@prisma/client";

import DataTable from "@/components/course/DataTable";
import { UserRole } from "@/common/config";
import { api } from "@/utils/api";
import { getRoleName } from "@/utils/role";
import type { GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";

const UserCheck: React.FC = () => {
  // session
  const { data: session } = useSession();

  // api
  const {
    data: userRoleChangeApplicantion,
    refetch: refetchUserRoleChangeApplicantion,
  } = api.userRoleChangeApplicantion.getAll.useQuery();
  const deleteUserRoleChangeApplicantions =
    api.userRoleChangeApplicantion.deleteByIds.useMutation({
      onSuccess: () => {
        void refetchUserRoleChangeApplicantion();
      },
    });
  const createDestRole = api.user.createDestRole.useMutation({
    onSuccess: () => {
      void refetchUserRoleChangeApplicantion();
    },
  });

  // state
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  return (
    <Grid container spacing={3}>
      {session?.user?.role == UserRole.ADMIN && (
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
                color="success"
                startIcon={<CheckOutlinedIcon />}
                onClick={() => {
                  if (selectionModel) {
                    for (const e of selectionModel as number[]) {
                      createDestRole.mutate({
                        applicantId:
                          userRoleChangeApplicantion?.at(e - 1)?.id ?? "",
                        userId:
                          userRoleChangeApplicantion?.at(e - 1)?.userId ?? "",
                        destType:
                          userRoleChangeApplicantion?.at(e - 1)?.destType ?? "",
                      });
                    }
                    setSelectionModel([]);
                  }
                }}
              >
                同意变更
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {
                  if (selectionModel) {
                    deleteUserRoleChangeApplicantions.mutate({
                      ids: selectionModel.map(
                        (e: GridRowId) =>
                          userRoleChangeApplicantion?.at((e as number) - 1)
                            ?.id ?? "",
                      ),
                    });
                    setSelectionModel([]);
                  }
                }}
              >
                拒绝变更
              </Button>
            </Stack>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DataTable
            rows={
              userRoleChangeApplicantion?.map(
                (
                  item: UserRoleChangeApplicantion & {
                    user: User;
                  },
                  index: number,
                ) => ({
                  id: index + 1,
                  name: item.user.name,
                  email: item.user.email,
                  phone: item.user.phone,
                  role: getRoleName(item.user.role ?? null),
                  destType: getRoleName(item.destType ?? null),
                }),
              ) ?? {}
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
                headerName: "当前职责",
                width: 160,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "destType",
                headerName: "变更职责目标",
                width: 160,
                align: "center",
                headerAlign: "center",
              },
            ]}
            selectModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserCheck;
