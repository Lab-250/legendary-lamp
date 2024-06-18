import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import type { Lecturer, Course, Executor } from "@prisma/client";
import { api } from "@/utils/api";
import { getRoleName } from "@/utils/role";
import { UserRole } from "@/common/config";

const CourseForm: React.FC<{
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  setLecturerName: React.Dispatch<React.SetStateAction<string>>;
  setExecutorName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ course, setCourse, setLecturerName, setExecutorName }) => {
  const { data: lecturer } = api.lecturer.getAll.useQuery();
  const { data: executor } = api.executor.getAll.useQuery();

  const handleInputChange = (value: string | number, filedName: string) => {
    setCourse({
      ...course,
      [filedName]: value,
    });
  };

  const [lecturerIndex, setLecturerIndex] = React.useState<number | null>(null);
  const [executorIndex, setExecutorIndex] = React.useState<number | null>(null);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        课程信息
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            onChange={(e) => handleInputChange(e.target.value, "name")}
            value={course?.name ?? ""}
            label="课程名称"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            type="number"
            onChange={(e) => handleInputChange(Number(e.target.value), "price")}
            value={course?.price ?? ""}
            label="课程价格"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="place"
            name="place"
            onChange={(e) => handleInputChange(e.target.value, "place")}
            value={course?.place ?? ""}
            label="课程地点"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="time"
            name="time"
            onChange={(e) => handleInputChange(e.target.value, "time")}
            value={course?.time ?? ""}
            label="课程时间"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="lecturer-label">
              {getRoleName(UserRole.LECTURER)}
            </InputLabel>
            <Select
              labelId="lecturer-label"
              id="lecturer"
              name="lecturer"
              onChange={(e) => {
                handleInputChange(
                  lecturer?.at(Number(e.target.value))?.id ?? "",
                  "lecturerId",
                );
                setLecturerName(
                  lecturer?.at(Number(e.target.value))?.name ?? "",
                );
                setLecturerIndex(Number(e.target.value));
              }}
              value={lecturerIndex}
              variant="standard"
            >
              {lecturer?.map((item: Lecturer, index: number) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="executor-label">
              {getRoleName(UserRole.EXECUTOR)}
            </InputLabel>
            <Select
              labelId="executor-label"
              id="executor"
              name="executor"
              onChange={(e) => {
                handleInputChange(
                  executor?.at(Number(e.target.value))?.id ?? "",
                  "executorId",
                );
                setExecutorName(
                  executor?.at(Number(e.target.value))?.name ?? "",
                );
                setExecutorIndex(Number(e.target.value));
              }}
              value={executorIndex}
              variant="standard"
            >
              {executor?.map((item: Executor, index: number) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CourseForm;
