<script setup lang="ts">
	import { computed } from "vue";
  import TunePage from './TunePage.vue'
  import convertTune from "../convertTune.ts";

  const props = defineProps<{
    name: string,
    spec: any,
  }>();

	const layout = computed(() => {
    return convertTune(props.name, props.spec);
	});
</script>

<template>
  <TunePage v-for="_, pageno in layout.pages" :layout="layout" :pageno="pageno" />
</template>
