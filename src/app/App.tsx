import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import WorkspacesOutlined from "@mui/icons-material/WorkspacesOutlined";
import { Box, CssBaseline, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { DashboardPage } from "../features/dashboard/DashboardPage";

const theme = createTheme({
  palette: {
    primary: { main: "#1769aa" },
    secondary: { main: "#2e7d32" },
    background: { default: "#f5f7fb" },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

const navItems = [
  { label: "Overview", icon: <DashboardOutlined /> },
  { label: "Workspaces", icon: <WorkspacesOutlined /> },
  { label: "Settings", icon: <SettingsOutlined /> },
];

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-shell">
        <Drawer variant="permanent" className="app-drawer" PaperProps={{ className: "app-drawer-paper" }}>
          <Toolbar>
            <Typography variant="h6">SaaS Console</Typography>
          </Toolbar>
          <List>
            {navItems.map((item) => (
              <ListItemButton key={item.label} selected={item.label === "Overview"}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box component="main" className="app-main">
          <DashboardPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
