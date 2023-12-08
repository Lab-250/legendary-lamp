import * as React from "react";
import { useSession } from "next-auth/react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Avatar, Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { UserRole, appConfig } from "@/common/config";
import type { User } from "@prisma/client";
import { api } from "@/utils/api";
import { getRoleName } from "@/utils/role";

const Profile = () => {
  // session
  const { data: session } = useSession();

  const [user, setUser] = React.useState<User | null>(null);

  const { data: userData, refetch: refetchUserData } = api.user.get.useQuery();

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
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              gap: "40px",
            }}
          >
            <Typography
              gutterBottom
            >{`用户名：${session?.user.name}`}</Typography>

            <Typography gutterBottom>{`用户职责：${getRoleName(
              session?.user.role ?? null,
            )}`}</Typography>
            <Typography
              gutterBottom
            >{`用户邮箱：${session?.user.email}`}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom>{`用户头像：`}</Typography>
              <Avatar
                alt="User Avatar"
                src={session?.user.image ?? appConfig.DEFAULT_AVATAR}
              />
            </Box>

            <Typography
              gutterBottom
            >{`用户电话号码：${userData?.phone}`}</Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <TextField
                id="time"
                name="time"
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value,
                  });
                }}
                value={user?.name ?? ""}
                label="用户名"
                variant="standard"
              />
              <Button variant="outlined" onClick={() => {}}>
                更改用户名
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <TextField
                id="time"
                name="time"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
                value={user?.name ?? ""}
                label="用户邮箱"
                variant="standard"
              />
              <Button variant="outlined" onClick={() => {}}>
                更改用户邮箱
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <TextField
                id="time"
                name="time"
                onChange={(e) => {
                  setUser({
                    ...user,
                    image: e.target.value,
                  });
                }}
                value={user?.name ?? ""}
                label="用户头像链接"
                variant="standard"
              />
              <Button variant="outlined" onClick={() => {}}>
                更改用户头像
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <TextField
                id="time"
                name="time"
                onChange={(e) => {
                  setUser({
                    ...user,
                    phone: e.target.value,
                  });
                }}
                value={user?.name ?? ""}
                label="用户电话号码"
                variant="standard"
              />
              <Button variant="outlined" onClick={() => {}}>
                更改用户电话号码
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
