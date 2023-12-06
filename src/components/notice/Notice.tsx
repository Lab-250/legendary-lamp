import { Button, Grid, Paper } from "@mui/material";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TextField from "@mui/material/TextField";

import { api } from "@/utils/api";

const Notice: React.FC = () => {
  // api
  // course api
  const { data: courses, refetch: refetchCourses } =
    api.course.getAll.useQuery();

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {courses.map((course) => {
                return (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LibraryBooksIcon />
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
      <Grid item xs={9}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="公告内容"
            multiline
            rows={4}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined">发送</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Notice;
