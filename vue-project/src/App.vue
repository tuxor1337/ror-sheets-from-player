<script setup lang="ts">
import { ref } from 'vue'
import Tune from './components/Tune.vue'
import RAW_TUNES from "./defaultTunes.ts";

const tune = ref(Object.keys(RAW_TUNES)[4]);
</script>

<template>
  <header>
    <select v-model="tune">
      <option v-for="(_, name) in RAW_TUNES" :key="name">{{name}}</option>
    </select>
  </header>

  <main>
    <Tune :name="tune" :spec="RAW_TUNES[tune]" />
  </main>
</template>
