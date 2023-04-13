<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from './components/BaseHeader.vue'
</script>

<template>
  <div class="bg-green-400 h-screen">
    <BaseHeader/>
    <RouterView />
  </div>
</template>

