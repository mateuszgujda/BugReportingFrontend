import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../interfaces/colorModeContexts";
import { IconButton, useTheme } from "@mui/material";
import { MainNavItems } from "../consts/navItems";

export interface DrawerProps {
  bIsOpen: boolean;
  drawerToggle : () => void
  ColorModeContext: React.Context<ColorModeContext>;
  drawerWidth: number;
}

export default function NavDrawer(props: DrawerProps) {
  const colorMode = React.useContext(props.ColorModeContext);
  const theme = useTheme();
  const drawerOptions = MainNavItems; 

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {drawerOptions.map((option, index) => (
            <ListItem key={option.id} disablePadding>
              <ListItemButton href={option.route}>
                <ListItemIcon>
                  {React.createElement(option.icon)}
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
    </>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={props.bIsOpen}
        onClose={props.drawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
