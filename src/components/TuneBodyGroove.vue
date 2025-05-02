<script setup lang="ts">
import { computed } from 'vue'
import TuneBodyAid from './TuneBodyAid.vue'
import { hasOwn, tuneLineToCells, INSTRU_NAMES } from '../common.ts'

const props = defineProps<{
  name: string
  pattern: any
  sizing: any
}>()

const name = computed(() => props.pattern?.name || props.name)
const lines_render = computed(() => {
  const upbeat = props.pattern?.upbeat ?? 0
  const empty_line = ' '.repeat(
    Math.min(
      props.sizing['subbeats_per_row'],
      ...Object.entries(props.pattern['notes']).map(([key, n]) => {
        return n.length
      }),
    ),
  )
  const notes_override = props.pattern?.notes_override ?? {}
  const lines_render_ins = {}
  for (const instru_name of props.pattern['instru_order']) {
    const notes = props.pattern['notes'][instru_name]
    const n_lines = Math.ceil((notes.length - upbeat) / props.sizing['subbeats_per_row'])
    const lines = [...Array(n_lines).keys()].map((i_line) => {
      if (i_line == 0) {
        return notes.substr(0, props.sizing['subbeats_per_row'] + upbeat)
      } else {
        return notes.substr(
          upbeat + i_line * props.sizing['subbeats_per_row'],
          props.sizing['subbeats_per_row'],
        )
      }
    })
    const ins_notes_override = hasOwn(notes_override, instru_name)
      ? notes_override[instru_name]
      : {}
    const first_nonempty_line = lines.findIndex((l) => l != empty_line)

    lines_render_ins[instru_name] = []
    for (let i_line = 0; i_line < n_lines; i_line++) {
      const offset = i_line * props.sizing['subbeats_per_row']
      const l = lines[i_line]
      const override = {}
      for (const [start, d] of Object.entries(ins_notes_override)) {
        if (start > offset) {
          override[start - offset] = d
        }
      }
      const n_overrides = Object.keys(override).length

      if (l == empty_line) {
        continue
      }

      let n_repeat_lines = 0
      let i_line_next = i_line + n_repeat_lines
      if (n_overrides == 0 && !props.pattern?.nosqueeze) {
        // only combine consecutive lines if there are no overrides
        while (i_line_next == i_line + n_repeat_lines && i_line + 2 * n_repeat_lines <= n_lines) {
          n_repeat_lines++
          i_line_next = i_line + n_repeat_lines
          while (
            i_line_next + n_repeat_lines <= n_lines &&
            lines
              .slice(i_line_next, i_line_next + n_repeat_lines)
              .every((l, i) => l == lines[i_line + i])
          ) {
            i_line_next += n_repeat_lines
          }
        }
      }

      if (i_line_next == i_line + n_repeat_lines) {
        i_line_next = i_line + 1
        n_repeat_lines = 0
      }

      if (i_line_next > i_line + 1) {
        for (let i_repeat_lines = 0; i_repeat_lines < n_repeat_lines; i_repeat_lines++) {
          const str_row =
            `${i_line + 1 + i_repeat_lines}` +
            `-${i_line_next + 1 - n_repeat_lines + i_repeat_lines}`
          lines_render_ins[instru_name].push({
            row_name:
              i_line + i_repeat_lines == first_nonempty_line
                ? hasOwn(INSTRU_NAMES, instru_name)
                  ? INSTRU_NAMES[instru_name]
                  : instru_name
                : '',
            str_row: str_row,
            notation: lines[i_line + i_repeat_lines],
            override: override,
            upbeat: i_line + i_repeat_lines == 0 ? upbeat : 0,
          })
        }
      } else {
        let str_row = ''
        if (n_lines > 1 || instru_name == props.pattern['instru_order'][0]) {
          str_row += `${i_line + 1}`
        }

        lines_render_ins[instru_name].push({
          row_name:
            i_line == first_nonempty_line
              ? hasOwn(INSTRU_NAMES, instru_name)
                ? INSTRU_NAMES[instru_name]
                : instru_name
              : '',
          str_row: str_row,
          notation: l,
          override: override,
          upbeat: i_line == 0 ? upbeat : 0,
        })
      }

      i_line = i_line_next - 1
    }
  }
  const empty_line_render = {
    row_name: '',
    str_row: '',
    notation: empty_line,
  }
  const result = []
  let instru_order = props.pattern.instru_order;
  if (props.pattern?.instrument_groups) {
    for (const group of props.pattern['instrument_groups']) {
      lines_render_ins[group[0]].forEach((_, i_line) => {
        result.push(
          ...group.map((ins, i_instr) => {
            if (i_instr != 0) {
              lines_render_ins[ins][i_line]['str_row'] = ''
            }
            return lines_render_ins[ins][i_line]
          }),
        )
        result.push(empty_line_render)
      })
      instru_order = instru_order.filter(
        (ins) => group.indexOf(ins) < 0,
      )
    }
  }
  instru_order.forEach((instru_name, i_instr) => {
    result.push(...lines_render_ins[instru_name])
    if (i_instr + 1 < instru_order.length && !props.pattern.separate_instruments) {
      result.push(empty_line_render)
    }
  })
  return result
})

const tuneRows = computed(() => {
  return lines_render.value.map(({ row_name, str_row, notation, override, upbeat }, i_line) => {
    const row = {
      classList: [],
      cells: tuneLineToCells(props.sizing, row_name, str_row, notation, override, upbeat, true),
    }
    const noteCells = row.cells
      .filter((c) => c.classList.indexOf('note') >= 0)
      .filter((c) => c.classList.indexOf('upbeat') < 0)
    noteCells[0].classList.push('line_start')
    noteCells[noteCells.length - 1].classList.push('line_end')
    if (props.pattern.separate_instruments) {
      if (i_line == 0) {
        row.classList.push('break_start')
      }
      if (i_line == lines_render.value.length - 1) {
        row.classList.push('break_end')
      }
    }
    return row
  })
})
</script>

<template>
  <tbody v-if="name !== 'Tune'">
    <tr class="heading">
      <td class="text" :colspan="pattern?.preamble ? 2 + sizing.upbeats : sizing.ncols">
        {{ name }}
      </td>
      <td
        v-if="pattern?.preamble"
        :colspan="sizing.ncols - 2 - sizing.upbeats"
        class="text preamble"
      >
        {{ pattern.preamble }}
      </td>
    </tr>
  </tbody>
  <tbody>
    <tr v-for="(row, i_row) in tuneRows" :key="i_row" :class="row.classList">
      <td
        v-for="(cell, i_cell) in row.cells"
        :class="cell.classList"
        :colspan="cell.colSpan > 1 ? cell.colSpan : ''"
        :rowspan="cell.rowSpan > 1 ? cell.rowSpan : ''"
        :key="i_cell"
      >
        <div v-if="i_cell == 0 && cell.classList.indexOf('text') >= 0">{{ cell.content }}</div>
        <template v-else>{{ cell.content }}</template>
      </td>
    </tr>
  </tbody>
  <tbody v-if="pattern?.remarks && pattern.remarks.length > 0">
    <tr v-for="(remark, i) in pattern.remarks" :key="i">
      <td :colspan="sizing.ncols - 1 - sizing.afterbeats" class="text tune_remark">{{ remark }}</td>
      <td v-for="i in sizing.afterbeats" :key="i"></td>
    </tr>
  </tbody>
  <tbody v-if="pattern?.memory_aid">
    <tr class="empty">
      <td :colspan="sizing.ncols"></td>
    </tr>
    <TuneBodyAid :sizing="sizing" :data="pattern.memory_aid" />
  </tbody>
</template>
