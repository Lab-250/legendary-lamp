import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { type Course } from "@prisma/client";

const Review: React.FC<{
  course: Course;
}> = ({ course }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        课程信息
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{course.name}</Typography>
          <Typography gutterBottom>{course.price.toFixed(2)}</Typography>
          <Typography gutterBottom>{course.place}</Typography>
          <Typography gutterBottom>{course.time}</Typography>
          <Typography gutterBottom>{course.lecturerId}</Typography>
          <Typography gutterBottom>{course.executorId}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
