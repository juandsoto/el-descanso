import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Drawer,
  useTheme,
} from "@mui/material";
import Logo from "./Logo";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PaidIcon from "@mui/icons-material/Paid";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/index";
import ThemeSwitch from "./ThemeSwitch";
import Avatar from "./Avatar";

interface LayoutProps {
  children?: JSX.Element | JSX.Element[] | string;
}

interface RightProps {
  username: string;
}

const UserLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Box
      sx={{
        color: "text.primary",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      {children}
    </Box>
  );
};

export const UserLayoutLeft = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100vh",
        width: "200px",
        display: { xs: "none", md: "flex" },
        boxShadow: "1px 0 10px rgba(0,0,0,0.2)",
        padding: ".5rem",
        borderRadius: "20px",
        bgcolor: "background.default",
      }}
    >
      <Sidebar hasTitle={false} />
    </Box>
  );
};

export const UserLayoutRight = (
  props: LayoutProps & RightProps
): JSX.Element => {
  const [showNav, setShowNav] = React.useState(false);
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: { xs: "0px", md: "200px" },
          width: { xs: "100%", md: "calc(100% - 200px)" },
          padding: ".6rem",
          paddingBottom: "40px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              letterSpacing: "0.2rem",
              color: "primary.main",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            {props.username}
          </Typography>
          <DehazeIcon
            sx={{
              display: { xs: "flex", md: "none" },
              cursor: "pointer",
            }}
            onClick={() => setShowNav(true)}
            fontSize="large"
            width="100%"
            htmlColor={theme.palette.primary.main}
          />
        </Stack>
        <Divider />
        {props.children}
      </Box>
      <Drawer anchor="right" open={showNav} onClose={() => setShowNav(false)}>
        <Sidebar hasTitle={true} />
      </Drawer>
    </>
  );
};

const navigation = [
  {
    title: "administrador",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    title: "recepcionista",
    icon: <AssignmentIndIcon />,
  },
  {
    title: "gerente",
    icon: <ManageAccountsIcon />,
  },
  {
    title: "cajero",
    icon: <PaidIcon />,
  },
];

interface SidebarProps {
  hasTitle?: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const active = location.pathname.split("/")[2];

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        gap={2}
      >
        <Logo hasTitle={props.hasTitle} />
        <Avatar />
      </Box>
      {user.rol === "administrador" && (
        <Stack alignItems="center">
          <Typography variant="h5" component="h4" color="primary.main">
            Perfiles
          </Typography>
          <List
            sx={{
              width: "100%",
            }}
          >
            {navigation.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  justifyContent: "center",
                  borderLeft:
                    item.title === active
                      ? `3px solid ${theme.palette.primary.main}`
                      : "",
                }}
              >
                <Link
                  to={`/el-descanso/${item.title}`}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "auto" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        textTransform: "capitalize",
                        color: theme.palette.text.primary,
                      }}
                      primary={item.title}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
      <ThemeSwitch />
    </Box>
  );
};

export default UserLayout;
