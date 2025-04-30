<script setup lang="ts">
  const props = defineProps<{
    data: any,
    sizing: any,
  }>();
</script>

<template>
  <tr><td :colspan="sizing.ncols">memory aid 1</td></tr>
  <tr><td :colspan="sizing.ncols">memory aid 2</td></tr>
</template>
