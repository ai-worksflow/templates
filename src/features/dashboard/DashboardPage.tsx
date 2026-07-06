import { Box, Button, Card, CardContent, Chip, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { getUsageRatio, usageMetrics } from "./dashboard-model";

export function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box className="page-heading">
        <Box>
          <Typography variant="h4" component="h1">
            Workspace overview
          </Typography>
          <Typography color="text.secondary">Material UI template for SaaS dashboards and product consoles.</Typography>
        </Box>
        <Button variant="contained">Invite member</Button>
      </Box>

      <Box className="metric-grid">
        {usageMetrics.map((metric) => (
          <Card key={metric.key}>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography color="text.secondary">{metric.label}</Typography>
                <Typography variant="h4">{metric.value}</Typography>
                <LinearProgress variant="determinate" value={getUsageRatio(metric) * 100} />
                <Chip size="small" label={`${Math.round(getUsageRatio(metric) * 100)}% used`} />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Workspace settings</Typography>
            <Box className="form-grid">
              <TextField label="Workspace name" defaultValue="Acme Platform" />
              <TextField label="Region" defaultValue="us-east" />
            </Box>
            <Box>
              <Button variant="contained">Save changes</Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
