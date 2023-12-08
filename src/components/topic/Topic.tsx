import { Button, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";

import { api } from "@/utils/api";
import { UserRole } from "@/common/config";

import type { Course, Topic as TopicType } from "@prisma/client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const Topic: React.FC = () => {
  // session
  const { data: session } = useSession();

  // api
  // course api
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: courses, refetch: refetchCourses } =
    api.course.getAll.useQuery();

  // state
  const [course, setCourse] = useState<Course | null>(courses?.at(0) ?? null);

  // api
  // notice api
  const { data: topics, refetch: refetchTopics } =
    api.topic.getAllByCourseId.useQuery({
      courseId: course?.id ?? "",
    });
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  // state
  const [topic, setTopic] = useState<{
    title: string | null;
    content: string | null;
    courseId: string | null;
    grade: number | null;
  }>({
    title: null,
    content: null,
    courseId: null,
    grade: null,
  });
  const [value, setValue] = useState<number | null>(5);

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
                        <BubbleChartOutlinedIcon />
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
          {session?.user?.role == UserRole.STUDENT && (
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
                    {"发送 " + course?.name + " 课程评价"}
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="评价标题"
                    rows={1}
                    value={topic.title ?? ""}
                    onChange={(e) => {
                      setTopic({
                        ...topic,
                        title: e.target.value,
                      });
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <Typography component="legend">评价分数</Typography>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                  <TextField
                    id="outlined-multiline-static"
                    label="评价内容"
                    multiline
                    rows={4}
                    value={topic.content ?? ""}
                    onChange={(e) => {
                      setTopic({
                        ...topic,
                        content: e.target.value,
                      });
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        createTopic.mutate({
                          title: topic?.title ?? "",
                          content: topic?.content ?? "",
                          grade: value ?? 0,
                          courseId: course?.id ?? "",
                        });
                        setTopic({
                          title: null,
                          content: null,
                          grade: null,
                          courseId: null,
                        });
                        setValue(5);
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
                <Typography variant="h6">
                  {course?.name + " 课程评价"}
                </Typography>
                {topics?.map((topic: TopicType) => {
                  return (
                    <Paper sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5">{topic?.title}</Typography>
                          <Rating
                            name="read-only"
                            value={topic?.grade}
                            readOnly
                          />
                        </Box>
                        <Typography variant="body1">
                          {topic?.content}
                        </Typography>
                      </Box>
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

export default Topic;
