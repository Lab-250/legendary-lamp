import * as React from "react";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Page } from "../Dashboard";

const User: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}> = ({ setPage }) => {
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
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1OutlinedIcon />}
              onClick={() => {
                setPage(Page.CreateStudent);
              }}
            >
              申请变更为学生
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1OutlinedIcon />}
              onClick={() => {
                setPage(Page.CreateLecturer);
              }}
            >
              申请变更为讲师
            </Button>

            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1OutlinedIcon />}
              onClick={() => {
                setPage(Page.CreateExecutor);
              }}
            >
              申请变更为执行人
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default User;
