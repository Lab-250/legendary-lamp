import * as React from "react";
import { useSession } from "next-auth/react";

import PaymentIcon from "@mui/icons-material/Payment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import DataTable from "@/components/course/DataTable";

import { UserRole } from "@//common/config";
import { api } from "@/utils/api";
import type { GridRowSelectionModel } from "@mui/x-data-grid";

const MyCourse: React.FC = () => {
  // session
  const { data: session } = useSession();

  // api
  // course api
  const { data: courses, refetch: refetchCourses } =
    api.courseRecord.getAll.useQuery();
  const updateCourseRecord = api.courseRecord.updateByIds.useMutation({
    onSuccess: () => {
      void refetchCourses();
    },
  });
  const deleteCourseRecord = api.courseRecord.deleteByIds.useMutation({
    onSuccess: () => {
      void refetchCourses();
    },
  });

  // state
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "rows",
          }}
        >
          {session?.user?.role == UserRole.STUDENT && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<AssignmentTurnedInOutlinedIcon />}
                onClick={() => {
                  updateCourseRecord.mutate({
                    ids:
                      courses
                        ?.filter(
                          (e, i: number) => selectionModel?.includes(i + 1),
                        )
                        .map((e) => e.id) ?? [],
                    signed: true,
                  });
                  setSelectionModel([]);
                }}
              >
                课程签到
              </Button>
              <Button
                variant="outlined"
                startIcon={<PaymentIcon />}
                onClick={() => {
                  updateCourseRecord.mutate({
                    ids:
                      courses
                        ?.filter(
                          (e, i: number) => selectionModel?.includes(i + 1),
                        )
                        .map((e) => e.id) ?? [],
                    payed: true,
                  });
                  setSelectionModel([]);
                }}
              >
                课程缴费
              </Button>
              <Button
                variant="outlined"
                startIcon={<ExitToAppIcon />}
                onClick={() => {
                  deleteCourseRecord.mutate({
                    ids:
                      courses
                        ?.filter(
                          (e, i: number) => selectionModel?.includes(i + 1),
                        )
                        .map((e) => e.id) ?? [],
                  });
                  setSelectionModel([]);
                }}
              >
                退选课程
              </Button>
            </Stack>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DataTable
            rows={
              courses?.map((item, index: number) => ({
                id: index + 1,
                time: item.course?.time,
                name: item.course?.name,
                price: item.course?.price,
                place: item.course?.place,
                payed: item.payed ? "已缴费" : "未缴费",
                signed: item.signed ? "已签到" : "未签到",
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
                headerName: "名称",
                width: 220,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "time",
                headerName: "时间",
                width: 180,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "place",
                headerName: "地点",
                width: 270,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "price",
                headerName: "价格",
                type: "number",
                width: 100,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "payed",
                headerName: "缴费情况",
                width: 100,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "signed",
                headerName: "签到情况",
                width: 100,
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

export default MyCourse;
