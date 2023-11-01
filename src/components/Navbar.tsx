import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { ProductTitle } from "../consts/productData";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { TopNavButtons } from "../consts/navItems";
import React from "react";

export interface NavbarProps {
  onMenuBarClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Navbar = (props: NavbarProps) => {
  const TopBarData = TopNavButtons;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.onMenuBarClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {ProductTitle}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ButtonGroup variant="text" aria-label="text button group">
          {TopBarData.map((data) => {
            return (
              <Button
                key={data.id}
                target="_blank"
                href={data.route}
                color="inherit"
                startIcon={React.createElement(data.icon)}
              >
                {data.label}
              </Button>
            );
          })}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
