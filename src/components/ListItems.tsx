import * as React from "react";
import { useSession } from "next-auth/react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import { Page } from "./Dashboard";
import { UserRole } from "@/common/config";

const ListDashboardItems: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}> = ({ setPage }) => {
  const { data: session } = useSession();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => setPage(Page.Dashboard)}>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="课程管理" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.MyCourse)}>
        <ListItemIcon>
          <LayersOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="我的课程stu+lec+exe" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.Notice)}>
        <ListItemIcon>
          <LibraryBooksOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="通知公告" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.Topic)}>
        <ListItemIcon>
          <BubbleChartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="评价反馈" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.User)}>
        <ListItemIcon>
          <PersonAddAlt1OutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="职责变更user" />
      </ListItemButton>

      {session?.user?.role == UserRole.ADMIN && (
        <ListItemButton onClick={() => setPage(Page.UserCheck)}>
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="职责审核" />
        </ListItemButton>
      )}

      <ListItemButton onClick={() => setPage(Page.Data)}>
        <ListItemIcon>
          <InsertChartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="统计数据" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.Profile)}>
        <ListItemIcon>
          <AssignmentIndOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="个人资料" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListDashboardItems;
