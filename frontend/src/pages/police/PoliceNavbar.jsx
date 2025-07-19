import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Box
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CellTowerIcon from '@mui/icons-material/CellTower';

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon/>, path: "/dashboard" },
  { label: "Crime Map", icon: <LocationOnIcon />, path: "/crimedashboardmap" },
  { label: "Crime Reports", icon: <SummarizeIcon/>, path: "/crimereports" },
  { label: "Broadcast Message", icon: <CellTowerIcon/>, path: "/broadcast" },
  { label: "Settings", icon: <SettingsIcon />, path: "/psettings" },
];

const PoliceNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentIndex = () => {
    return navItems.findIndex((item) => location.pathname.startsWith(item.path));
  };

  const [value, setValue] = React.useState(getCurrentIndex());

  const handleNav = (index, path) => {
    setValue(index);
    navigate(path);
  };

  return (
    <>
      {isMobile ? (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            bgcolor: "#020240",
          }}
          elevation={3}
        >
          <BottomNavigation
            sx={{
              bgcolor: "#020240",
              "& .Mui-selected": {
                color: "#00ffea",
              },
              "& .MuiBottomNavigationAction-root": {
                color: "white",
              },
            }}
            showLabels
            value={value}
            onChange={(event, newValue) =>
              handleNav(newValue, navItems[newValue].path)
            }
          >
            {navItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 300,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 300,
              boxSizing: "border-box",
              bgcolor: "#020240",
              color: "white",
            },
          }}
        >
          <Box sx={{ mt: 2 }}>
            <List>
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleNav(index, item.path)}
                    sx={{
                      bgcolor: isActive ? "#00ffea33" : "transparent",
                      "&:hover": {
                        bgcolor: "#00ffea22",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: isActive ? "#00ffea" : "white" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        sx: { color: isActive ? "#00ffea" : "white" },
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default PoliceNavbar;
