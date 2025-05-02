<script setup lang="ts">
import { computed } from 'vue'
import { tuneLineToCells } from '../common.ts'

const props = defineProps<{
  data: any
  sizing: any
}>()

const rows = computed(() => {
  const notes = props.data['notes']
  const upbeat = props.data?.upbeat ?? 0
  const n_lines = Math.ceil(notes.length / props.sizing['subbeats_per_row'])

  const notes_override = {}
  let i_words = 0
  for (const [i, c] of Object.entries([...notes])) {
    if (c.toLowerCase() != 'x') {
      continue
    }
    notes_override[parseInt(i) + 1] = [1, props.data['words'][i_words++], 'center']
  }

  const lines = [...Array(n_lines).keys()].map((i_line) => {
    if (upbeat > 0) {
      if (i_line == 0) {
        return notes.substr(0, upbeat)
      } else {
        return notes.substr(
          upbeat + (i_line - 1) * props.sizing['subbeats_per_row'],
          props.sizing['subbeats_per_row'],
        )
      }
    } else {
      return notes.substr(
        i_line * props.sizing['subbeats_per_row'],
        props.sizing['subbeats_per_row'],
      )
    }
  })

  return [...Array(n_lines).keys()]
    .map((i_line) => {
      let offset = i_line * props.sizing['subbeats_per_row']
      if (i_line > 0 && upbeat > 0) {
        offset += upbeat - props.sizing['subbeats_per_row']
      }
      const override = {}
      for (const [start, d] of Object.entries(notes_override)) {
        if (start > offset) {
          override[start - offset] = d
        }
      }
      return {
        notation: lines[i_line],
        override: override,
      }
    })
    .map(({ notation, override }, i_line) =>
      tuneLineToCells(props.sizing, '', '', notation, override, i_line == 0 ? upbeat : 0, false),
    )
})
</script>

<template>
  <tr v-for="(cells, i_row) in rows" :key="i_row">
    <td
      v-for="(cell, i_cell) in cells"
      :class="cell.classList"
      :colspan="cell.colSpan > 1 ? cell.colSpan : ''"
      :rowspan="cell.rowSpan > 1 ? cell.rowSpan : ''"
      :key="i_cell"
    >
      <div v-if="i_cell == 0 && cell.classList.indexOf('text') >= 0">{{ cell.content }}</div>
      <template v-else>{{ cell.content }}</template>
    </td>
  </tr>
</template>
