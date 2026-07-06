<script setup lang="ts">
import { DataBoard, Document, Setting } from "@element-plus/icons-vue";
import DashboardPage from "../features/dashboard/DashboardPage.vue";
</script>

<template>
  <el-config-provider namespace="el">
    <el-container class="app-shell">
      <el-aside class="app-sidebar" width="232px">
        <div class="brand">Vue Admin</div>
        <el-menu default-active="dashboard">
          <el-menu-item index="dashboard">
            <el-icon><DataBoard /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="records">
            <el-icon><Document /></el-icon>
            <span>Records</span>
          </el-menu-item>
          <el-menu-item index="settings">
            <el-icon><Setting /></el-icon>
            <span>Settings</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="app-header">Enterprise console</el-header>
        <el-main class="app-main">
          <DashboardPage />
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>
