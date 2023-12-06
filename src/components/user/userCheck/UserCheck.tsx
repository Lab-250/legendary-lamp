import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { type Course, type Executor, type Lecturer } from "@prisma/client";

import DataTable from "@/components/course/DataTable";

import { UserRole } from "@/common/config";
import { api } from "@/utils/api";
import { Page } from "@/components/Dashboard";

const UserCheck = ({ setPage }) => {
  // session
  const { data: session } = useSession();
  // router
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  // api
  // course api
  const { data: courses, refetch: refetchCourses } =
    api.course.getAll.useQuery();
  const deleteCourse = api.course.deleteByIds.useMutation({
    onSuccess: () => {
      void refetchCourses();
    },
  });

  // state
  const [selectionModel, setSelectionModel] = React.useState<number[] | null>(
    null,
  );
  const [open, setOpen] = React.useState(true);

  // function
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
              {session?.user?.role == UserRole.ADMIN && (
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={() => {
                    setPage(Page.CreateCourse);
                  }}
                >
                  新建课程
                </Button>
              )}
              {session?.user?.role == UserRole.STUDENT && (
                <Button
                  variant="outlined"
                  startIcon={<BookmarkAddOutlinedIcon />}
                  onClick={() => {}}
                >
                  申请选课
                </Button>
              )}
              {session?.user?.role == UserRole.ADMIN && (
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={() => {
                    deleteCourse.mutate({
                      ids:
                        courses
                          ?.filter(
                            (e: Course, i: number) =>
                              selectionModel?.includes(i + 1),
                          )
                          .map((e: Course) => e.id) ?? [],
                    });
                  }}
                >
                  删除课程
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DataTable
            rows={
              courses?.map(
                (
                  item: Course & {
                    executor: Executor | null;
                    lecturer: Lecturer | null;
                  },
                  index: number,
                ) => ({
                  id: index + 1,
                  time: item.time,
                  name: item.name,
                  price: item.price,
                  place: item.place,
                  income: item.income,
                  executor: item.executor?.name,
                  lecturer: item.lecturer?.name,
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
                field: "executor",
                headerName: "执行人",
                width: 100,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "lecturer",
                headerName: "讲师",
                width: 100,
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

export default UserCheck;
