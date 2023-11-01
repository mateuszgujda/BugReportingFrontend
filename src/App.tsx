import * as React from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import NavDrawer from "./components/Drawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./consts/routes";
import {
  PaletteMode,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import { getDesignTokens } from "./theme";
import { ColorModeContext } from "./interfaces/colorModeContexts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const ColorPaletteContext = React.createContext<ColorModeContext>({
  toggleColorMode: () => {},
});

export default function App() {
  const [mobileDrawerActive, setMobileDrawerActive] = React.useState(false);

  const RoutingRoutes = AppRoutes;

  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const drawerWidth = 240;

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ColorPaletteContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Navbar
                onMenuBarClick={() => {
                  setMobileDrawerActive(!mobileDrawerActive);
                }}
              />
              <NavDrawer
                bIsOpen={mobileDrawerActive}
                ColorModeContext={ColorPaletteContext}
                drawerToggle={() => {
                  setMobileDrawerActive(!mobileDrawerActive);
                }}
                drawerWidth={drawerWidth}
              />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                <Toolbar />
                <Routes>
                  {RoutingRoutes.map((data, index) => {
                    return (
                      <Route
                        key={index}
                        path={data.url}
                        element={data.element}
                      ></Route>
                    );
                  })}
                </Routes>
              </Box>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </ColorPaletteContext.Provider>
    </LocalizationProvider>
  );
}
