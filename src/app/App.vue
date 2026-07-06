<script setup lang="ts">
import { NConfigProvider, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu, NMessageProvider } from "naive-ui";
import DashboardPage from "../features/dashboard/DashboardPage.vue";

const menuOptions = [
  { label: "Overview", key: "overview" },
  { label: "Assets", key: "assets" },
  { label: "Jobs", key: "jobs" },
  { label: "Settings", key: "settings" },
];
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <NLayout has-sider class="app-shell">
        <NLayoutSider bordered width="232" class="app-sidebar">
          <div class="brand">Naive Console</div>
          <NMenu :options="menuOptions" default-value="overview" />
        </NLayoutSider>
        <NLayout>
          <NLayoutHeader bordered class="app-header">Media workspace</NLayoutHeader>
          <NLayoutContent class="app-main">
            <DashboardPage />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>
