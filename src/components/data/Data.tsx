import * as React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import DataTable from "@/components/course/DataTable";

import { api } from "@/utils/api";
import type { GridRowSelectionModel } from "@mui/x-data-grid";

const Data: React.FC = () => {
  // api
  // course api
  const { data: courses, refetch: refetchCourses } =
    api.course.statistics.useQuery();

  // state
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DataTable
            rows={
              courses?.map((item, index: number) => ({
                ...item,
                id: index + 1,
              })) ?? {}
            }
            columns={[
              {
                field: "id",
                headerName: "编号",
                width: 95,
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
                field: "selected",
                headerName: "选课人数",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "price",
                headerName: "课程价格",
                type: "number",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "income",
                headerName: "课程收入",
                width: 95,
                type: "number",
                align: "center",
                headerAlign: "center",
              },
              {
                field: "payed",
                headerName: "缴费人数",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "signed",
                headerName: "签到人数",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "commented",
                headerName: "评价人数",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "grade",
                headerName: "评价平均分",
                width: 110,
                align: "center",
                headerAlign: "center",
              },
              {
                field: "notice",
                headerName: "通知数量",
                width: 95,
                align: "center",
                headerAlign: "center",
              },
            ]}
            selectModel={selectionModel}
            setSelectionModel={setSelectionModel}
            checkboxSelection={false}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Data;
