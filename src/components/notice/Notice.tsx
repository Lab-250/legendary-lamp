import { Button, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import TextField from "@mui/material/TextField";

import { api } from "@/utils/api";
import { UserRole } from "@/common/config";

import { type Course, Notice } from "@prisma/client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const Notice: React.FC = () => {
  // session
  const { data: session } = useSession();

  // api
  // course api
  const { data: courses, refetch: refetchCourses } =
    api.course.getAll.useQuery();

  // state
  const [course, setCourse] = useState<Course | null>(courses?.at(0) ?? null);

  // api
  // notice api
  const { data: notices, refetch: refetchNotices } =
    api.notice.getAllByCourseId.useQuery({
      courseId: course?.id ?? "",
    });
  const createNotice = api.notice.create.useMutation({
    onSuccess: () => {
      void refetchNotices();
    },
  });

  // state
  const [notice, setNotice] = useState<{
    title: string | null;
    content: string | null;
    courseId: string | null;
  }>({
    title: null,
    content: null,
    courseId: null,
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              {courses?.map((course: Course) => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setCourse(course);
                      }}
                    >
                      <ListItemIcon>
                        <LibraryBooksOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={course.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Paper>
      </Grid>
      <Grid item xs={9} spacing={3}>
        <Grid container spacing={3}>
          {(session?.user?.role == UserRole.ADMIN ||
            session?.user?.role == UserRole.EXCUTOR) && (
            <Grid item xs={12} alignItems="flex-start" spacing={3}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Typography variant="h6">
                    {"发送 " +
                      course?.name +
                      " 课程通知（经理和执行人可以发送通知）"}
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="通知标题"
                    rows={1}
                    value={notice.title ?? ""}
                    onChange={(e) => {
                      setNotice({
                        ...notice,
                        title: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="通知内容"
                    multiline
                    rows={4}
                    value={notice.content ?? ""}
                    onChange={(e) => {
                      setNotice({
                        ...notice,
                        content: e.target.value,
                      });
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        createNotice.mutate({
                          title: notice?.title ?? "",
                          content: notice?.content ?? "",
                          courseId: course?.id ?? "",
                        });
                        setNotice({
                          title: null,
                          content: null,
                          courseId: null,
                        });
                      }}
                    >
                      发送
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} alignItems="flex-start" spacing={3}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  {course?.name + " 课程通知"}
                </Typography>
                {notices?.map((notice: Notice) => {
                  return (
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h5" gutterBottom>
                        {notice?.title}
                      </Typography>
                      <Typography variant="body1">{notice?.content}</Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Notice;
