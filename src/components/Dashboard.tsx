import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListDashboardItems from "./ListItems";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

import { type Course, type Executor, type Lecturer } from "@prisma/client";

import DataTable from "./course/DataTable";
import Checkout from "./course/Checkout";
import User from "./user/User";
import Copyright from "./Copyright";
import Notice from "./notice/Notice";
import Topic from "./topic/Topic";
import UserCheck from "./user/userCheck/UserCheck";
import Data from "./data/Data";
import MyCourse from "./course/myCourse/MyCourse";

import { UserRole, appConfig } from "../common/config";
import { api } from "@/utils/api";
import Profile from "./profile/Profile";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export enum Page {
  Dashboard,
  MyCourse,
  CreateCourse,
  User,
  UserCheck,
  Notice,
  Topic,
  Data,
  Profile,
}

export default function Dashboard() {
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
  const [page, setPage] = React.useState<Page>(Page.Dashboard);

  // function
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // page
  const switchPage = (page: Page) => {
    if (page === Page.Dashboard) {
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
    } else if (page === Page.MyCourse) {
      return <MyCourse />;
    } else if (page === Page.User) {
      return <User />;
    } else if (page === Page.UserCheck) {
      return <UserCheck setPage={setPage} />;
    } else if (page === Page.CreateCourse) {
      return (
        <Checkout
          refetchCourses={refetchCourses}
          setDataTableView={setPage}
        ></Checkout>
      );
    } else if (page === Page.Notice) {
      return <Notice />;
    } else if (page === Page.Topic) {
      return <Topic />;
    } else if (page === Page.Data) {
      return <Data />;
    } else if (page === Page.Profile) {
      return <Profile />;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {appConfig.APP_TITLE}
            </Typography>
            {session ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src={session?.user.image ?? appConfig.DEFAULT_AVATAR}
                />
                <Typography>{session?.user.email ?? ""}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    void signOut();
                  }}
                >
                  登出
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    void signIn();
                  }}
                >
                  登录
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListDashboardItems setPage={setPage} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {switchPage(page)}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
