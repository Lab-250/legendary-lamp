import * as React from "react";
import { useSession } from "next-auth/react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

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
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="课程管理" />
      </ListItemButton>

      {(session?.user?.role == UserRole.STUDENT ||
        session?.user?.role == UserRole.LECTURER ||
        session?.user?.role == UserRole.EXCUTOR) && (
        <ListItemButton onClick={() => setPage(Page.MyCourse)}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="我的课程" />
        </ListItemButton>
      )}

      <ListItemButton onClick={() => setPage(Page.Notice)}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="通知公告" />
      </ListItemButton>

      <ListItemButton onClick={() => setPage(Page.Topic)}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="评价反馈" />
      </ListItemButton>

      {session?.user?.role == UserRole.USER && (
        <ListItemButton onClick={() => setPage(Page.User)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="职责变更" />
        </ListItemButton>
      )}

      {session?.user?.role == UserRole.ADMIN && (
        <ListItemButton onClick={() => setPage(Page.UserCheck)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="职责审核" />
        </ListItemButton>
      )}

      <ListItemButton onClick={() => setPage(Page.Data)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="统计数据" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListDashboardItems;
