import React, { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import menuItems from "../datasets/menu_items.json";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import Icon from '@mui/material/Icon';
import MenuIcon from '@mui/icons-material/Menu';
import { grey, red } from "@mui/material/colors";

export default function ScreenSkeleton(props: Record<string, JSX.Element>) {
  const { children, topMenuLeftElement, topMenuRightElement } = props;

  const auth = useAuth();
  const location = useLocation();

  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [submenuOpen, setSubMenuOpen] = useState(menuItems.map(() => false));
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleLeftMenu = () => setLeftMenuOpen(!leftMenuOpen);

  const handleUserMenuOpen = () => setMenuIsOpen(true);
  const handleUserMenuClose = () => setMenuIsOpen(false);

  const handleSubMenuOpen = ({ index }: { index: number }) => {
    const states = submenuOpen.map((state, i) =>
      index === i ? !state : state
    );

    setSubMenuOpen(states);
  };

  const selectedRoute = ({ route }: { route: string }) =>
    route === location.pathname;

  const parseFormName = ({ name }: { name: string }) => {
    const urlParam = name.toLowerCase().replaceAll(/\s+/gi, "-");

    return encodeURIComponent(urlParam);
  };

  const getUserFirstLetter = () => {
    const auth = JSON.parse(localStorage.getItem("t")!);

    return auth.email.chatAt(0).toUpperCase();
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: ({ zIndex }) => zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleLeftMenu}>
             <MenuIcon />
            </IconButton>
            <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
              <Box component="div">{topMenuLeftElement}</Box>
            </Stack>
            <>
              {topMenuRightElement}
              <>
                <IconButton
                  ref={anchorRef}
                  onClick={handleUserMenuOpen}
                  sx={{ p: 0, ml: 2 }}
                >
                  {/* <AvatarIcon>{getUserFirstLetter()}</AvatarIcon> */}
                  <Menu
                    anchorEl={anchorRef.current}
                    open={menuIsOpen}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem
                      onClick={() => auth.logOut}
                      sx={{ color: red[600] }}
                    >
                      <ListItemIcon>
                        <Icon fontSize="small" sx={{ color: red[600] }}>
                          logout
                        </Icon>
                      </ListItemIcon>
                      <ListItemText>Sair</ListItemText>
                    </MenuItem>
                  </Menu>
                </IconButton>
              </>
            </>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="main"
        sx={{ pb: 8, bgcolor: "rgba(0,0,0,0.05)", minHeight: "100vh" }}
      >
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

const AvatarIcon = styled(Avatar)(() => ({
    backgroundColor: grey[50],
    color: grey[700],
}));
