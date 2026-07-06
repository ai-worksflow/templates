<script setup lang="ts">
import { workRecords, type WorkRecord } from "./dashboard-model";

function riskType(record: WorkRecord): "success" | "warning" | "danger" {
  return record.risk === "High" ? "danger" : record.risk === "Medium" ? "warning" : "success";
}
</script>

<template>
  <div class="page-stack">
    <div class="page-heading">
      <div>
        <h1>Operations overview</h1>
        <p>Element Plus template for Vue admin systems and enterprise workflows.</p>
      </div>
      <el-button type="primary">Create record</el-button>
    </div>

    <el-row :gutter="16">
      <el-col :xs="24" :md="8">
        <el-card>
          <el-statistic title="Active workflows" :value="142" />
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card>
          <el-statistic title="Pending approvals" :value="38" />
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card>
          <el-statistic title="Risk alerts" :value="9" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :xs="24" :lg="16">
        <el-card header="Work queue">
          <el-table :data="workRecords" style="width: 100%">
            <el-table-column prop="title" label="Task" />
            <el-table-column prop="owner" label="Owner" width="140" />
            <el-table-column label="Risk" width="120">
              <template #default="{ row }">
                <el-tag :type="riskType(row)">{{ row.risk }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" width="120" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card header="Quick action">
          <el-form label-position="top">
            <el-form-item label="Record name">
              <el-input placeholder="Enter a task or resource" />
            </el-form-item>
            <el-form-item label="Owner">
              <el-input placeholder="Team or person" />
            </el-form-item>
            <el-button type="primary" class="full-width">Submit</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
