<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  pattern: any
  sizing: any
}>()

const name = computed(() => props.pattern?.name || props.name)
const n_extra_lines = computed(() => props.pattern?.subtitle_extra_lines || 0)
const n_text_lines = computed(() => props.pattern.text.rows)
const n_pre_cols = computed(() => (name.value == false ? 0 : 6))
</script>

<template>
  <tbody>
    <tr v-for="(_, i_row) in n_text_lines" :class="{ break_start: i_row == 0 }" :key="i_row">
      <template v-if="i_row == 0">
        <td v-if="n_pre_cols > 0" class="text" :colspan="n_pre_cols">
          <div>{{ name }}</div>
        </td>
        <td class="break_text" :colspan="sizing.ncols - n_pre_cols" :rowspan="pattern.text.rows">
          {{ pattern.text.content }}
        </td>
      </template>
      <template v-else-if="pattern?.subtitle">
        <td
          v-if="i_row == 1"
          class="text remark"
          :colspan="n_pre_cols"
          :rowspan="n_text_lines + n_extra_lines - 1"
        >
          {{ pattern.subtitle }}
        </td>
      </template>
      <template v-else>
        <td :colspan="n_pre_cols"></td>
      </template>
    </tr>
  </tbody>
</template>
