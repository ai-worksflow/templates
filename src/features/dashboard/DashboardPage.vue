<script setup lang="ts">
import { NButton, NCard, NGi, NGrid, NProgress, NSpace, NTag } from "naive-ui";
import { getIncompleteJobs, jobs, type JobStatus } from "./dashboard-model";

function tagType(job: JobStatus): "success" | "warning" | "error" | "info" {
  if (job.state === "Done") return "success";
  if (job.state === "Failed") return "error";
  if (job.state === "Running") return "info";
  return "warning";
}
</script>

<template>
  <NSpace vertical size="large" class="page-stack">
    <div class="page-heading">
      <div>
        <h1>Media operations</h1>
        <p>Naive UI template for themeable dashboards, video jobs, and SaaS consoles.</p>
      </div>
      <NButton type="primary">Upload asset</NButton>
    </div>

    <NGrid :x-gap="16" :y-gap="16" responsive="screen" cols="1 s:1 m:3">
      <NGi>
        <NCard title="Assets">1,284 active</NCard>
      </NGi>
      <NGi>
        <NCard title="Running jobs">{{ getIncompleteJobs(jobs).length }} in progress</NCard>
      </NGi>
      <NGi>
        <NCard title="Moderation">23 queued</NCard>
      </NGi>
    </NGrid>

    <NCard title="Processing queue">
      <div class="job-list">
        <article v-for="job in jobs" :key="job.id" class="job-row">
          <div>
            <h3>{{ job.name }}</h3>
            <NProgress type="line" :percentage="job.progress" :show-indicator="false" />
          </div>
          <NTag :type="tagType(job)">{{ job.state }}</NTag>
        </article>
      </div>
    </NCard>
  </NSpace>
</template>
