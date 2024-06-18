import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { type Course } from "@prisma/client";

import { UserRole } from "@/common/config";
import { getRoleName } from "@/utils/role";

const Review: React.FC<{
  course: Course;
  lecturerName: string;
  executorName: string;
}> = ({ course, lecturerName, executorName }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        课程信息
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{`课程名称：${course.name}`}</Typography>
          <Typography gutterBottom>{`课程价格：${course.price.toFixed(
            2,
          )}`}</Typography>
          <Typography gutterBottom>{`课程地点：${course.place}`}</Typography>
          <Typography gutterBottom>{`课程时间：${course.time}`}</Typography>
          <Typography gutterBottom>{`${getRoleName(
            UserRole.LECTURER,
          )}：${lecturerName}`}</Typography>
          <Typography gutterBottom>{`${getRoleName(
            UserRole.EXECUTOR,
          )}：${executorName}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
