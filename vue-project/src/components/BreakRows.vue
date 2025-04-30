<script setup lang="ts">
	import { computed } from "vue";
  import MemoryAid from './MemoryAid.vue';
  import { tbl_add_tune_row, INSTRU_NAMES } from '../common.ts';

  const props = defineProps<{
    pattern: any,
    sizing: any,
  }>();

  const n_extra_lines = computed(() => props.pattern?.subtitle_extra_lines ?? 0);
  const rem_indent = computed(() => props.pattern?.remarks_indent ?? 0);

  function _is_empty_line(notes) {
      return !([...notes].some(c => c != " "));
  }

  function _count_repeated_initlines(notes, upbeat) {
      const initline = notes.slice(0, props.sizing["subbeats_per_row"]);
      let currline = initline;
      let n_lines_repeated = 0;
      while (initline == currline) {
          n_lines_repeated++;
          currline = notes.substr(
              n_lines_repeated * props.sizing["subbeats_per_row"],
              props.sizing["subbeats_per_row"]
          )
      }
      if (n_lines_repeated == 1 || !_is_empty_line(currline.slice(0, upbeat))) {
          return 0;
      }
      return n_lines_repeated;
  }

  function _untangle_afterbeat(notes_first_iter, notes_second_iter) {
      let result = "";
      for (let i = 0; i < notes_first_iter.length; i++) {
          let char1 = notes_first_iter.charAt(i);
          let char2 = notes_second_iter.charAt(i);
          result += (char1 == char2 || char2 != "E") ? char1 : "A";
      }
      return result;
  }

  function _render_lines(data, i_notes) {
      const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;
      const repeat_with_afterbeats = (
          data.hasOwnProperty("repeat_with_afterbeats")
          ? data["repeat_with_afterbeats"] : []
      );
      const notes_override = (
          data.hasOwnProperty("notes_override")
          && data["notes_override"].length > i_notes
          ? data["notes_override"][i_notes]
          : {}
      );
      let notes = data["notes"][i_notes];
      let n_lines = (
          Math.ceil((notes.length - upbeat) / props.sizing["subbeats_per_row"])
          + ((upbeat > 0) ? 1 : 0)
      );
      let n_initlines_repeated = props.sizing["upbeats"] < upbeat ? 0 : (
          _count_repeated_initlines(notes, upbeat)
      );
      const offsets = [...Array(n_lines).keys()].map((i_line) => {
          if (i_line < n_initlines_repeated) {
              return i_line * props.sizing["subbeats_per_row"];
          }
          return i_line == 0 ? 0 : upbeat + props.sizing["subbeats_per_row"] * (
              props.sizing["upbeats"] < upbeat ? i_line - 1 : i_line
          );
      });
      const lines = offsets.map((offset, i_line) => {
          return notes.substr(offset, (
              i_line + 1 < n_lines
              ? offsets[i_line + 1] - offset
              : props.sizing["subbeats_per_row"]
          ));
      });

      const result = [];
      for (let i_line = 0; i_line < n_lines; i_line++) {
          let offset = offsets[i_line];
          let length = (
              i_line + 1 < n_lines
              ? offsets[i_line + 1] - offset
              : props.sizing["subbeats_per_row"]
          );
          const override = {};
          for (const [start, d] of Object.entries(notes_override)) {
              if (offset < start && start < offset + length) {
                  override[start - offset] = d;
              }
          }
          const n_overrides = Object.keys(override).length;

          if (
              n_overrides == 0
              && _is_empty_line(lines[i_line])
              && lines.some(l => !_is_empty_line(l))
          ) {
              // if at least one line is non-empty, skip empty lines
              continue;
          }

          let n_repeat_lines = 0;
          let i_line_next = i_line + n_repeat_lines;
          let preset = repeat_with_afterbeats.find(([i]) => i == i_line + 1);
          let afterbeats = 0;
          if (i_line == 0 && n_initlines_repeated > 0) {
              n_repeat_lines = 1;
              i_line_next = i_line + n_initlines_repeated;
          } else if (typeof preset !== "undefined") {
              n_repeat_lines = preset[1];
              i_line_next = i_line + preset[2] * preset[1];
              afterbeats = preset[3];
          } else if (n_overrides == 0 && !data.hasOwnProperty("nosqueeze")) {
              // only combine consecutive lines if there are no overrides
              while (
                  i_line_next == i_line + n_repeat_lines
                  && i_line + 2 * n_repeat_lines <= n_lines
              ) {
                  n_repeat_lines++;
                  i_line_next = i_line + n_repeat_lines;
                  while (
                      i_line_next + n_repeat_lines <= n_lines
                      && (
                          lines.slice(i_line_next, i_line_next + n_repeat_lines)
                          .every((l, i) => l == lines[i_line + i])
                      )
                  ) {
                      i_line_next += n_repeat_lines;
                  }
              }
          }

          if (i_line_next == i_line + n_repeat_lines) {
              i_line_next = i_line + 1;
              n_repeat_lines = 0;
          }

          const upbeat_mod = props.sizing["upbeats"] < upbeat ? -1 : 0;
          if (i_line_next > i_line + 1) {
              for (
                  let i_repeat_lines = 0;
                  i_repeat_lines < n_repeat_lines;
                  i_repeat_lines++
              ) {
                  let str_row = (
                      `${i_line + upbeat_mod + 1 + i_repeat_lines}`
                      + `-${i_line_next + upbeat_mod + 1 - n_repeat_lines + i_repeat_lines}`
                  );
                  let notation = lines[i_line + i_repeat_lines];
                  if (i_repeat_lines == n_repeat_lines - 1) {
                      notation += _untangle_afterbeat(
                          lines[i_line].slice(0, afterbeats),
                          lines[i_line + i_repeat_lines + 1].slice(0, afterbeats),
                      );
                  }
                  if (i_line == 0 && n_initlines_repeated > 0) {
                      notation += " ".repeat(upbeat);
                  }
                  result.push({
                      "l_start": i_line + i_repeat_lines,
                      "l_end": i_line_next - n_repeat_lines + i_repeat_lines,
                      "str_row": str_row,
                      "notation": notation,
                      "override": override,
                      "upbeat": i_line == 0 && props.sizing["upbeats"] >= upbeat ? upbeat : 0,
                  });
              }
          } else {
              let str_row = "";
              if (data.hasOwnProperty("row_numbers")) {
                  str_row = data["row_numbers"][i_line];
              } else if (n_lines > 1 && i_line + upbeat_mod >= 0) {
                  str_row += `${i_line + upbeat_mod + 1}`;
              }

              result.push({
                  "l_start": i_line,
                  "l_end": i_line,
                  "str_row": str_row,
                  "notation": lines[i_line],
                  "override": override,
                  "upbeat": i_line == 0 && props.sizing["upbeats"] >= upbeat ? upbeat : 0,
              });
          }

          i_line = i_line_next - 1;
      }

      return result;
  }

  const lines_render = computed(() => {
      const result = [];
      const lines_render_tmp = props.pattern["notes"].flatMap((_, i) => _render_lines(props.pattern, i));
      let str_row_prev = "";
      while (lines_render_tmp.length > 0) {
          const min_l_start = Math.min(...lines_render_tmp.map(arr => arr["l_start"]));
          const i_next = lines_render_tmp.findIndex(arr => arr["l_start"] == min_l_start);
          const l_next = lines_render_tmp.splice(i_next, 1)[0];
          if (l_next["str_row"] == str_row_prev) {
              l_next["str_row"] = "";
          } else {
              str_row_prev = l_next["str_row"];
          }
          result.push(l_next);
      }
      return result;
  })

  function _add_break_row(
      i_line,
      n_lines,
      {str_row, notation, override},
      {name, upbeat, preamble, subtitle, subtitle_extra_lines, aside, aside_lines},
  ) {
      const n_extra_lines = subtitle_extra_lines || 0;
      upbeat = upbeat || 0;
      const el_tr = document.createElement("tr");
      tbl_add_tune_row(
          el_tr,
          props.sizing,
          i_line == 0 ? name : "",
          str_row,
          notation,
          override,
          i_line == 0 ? upbeat : 0,
          upbeat <= props.sizing["upbeats"],
      );
      if (i_line == 0) {
          el_tr.classList.add("break_start");
          if (!!preamble && upbeat > 0) {
              const el_td = el_tr.querySelectorAll("td[colspan]")[0];
              el_td.classList.add("text", "remark");
              el_td.textContent = preamble;
          }
      }

      let td_notes = (
          i_line == 0 && upbeat <= props.sizing["upbeats"]
          ? el_tr.querySelectorAll("td.note")
          : el_tr.querySelectorAll("td.note:not(.upbeat)")
      );
      td_notes[0].classList.add("line_start");
      td_notes[td_notes.length - 1].classList.add("line_end");
      const n_td_notes = td_notes.length;

      if (i_line == 1 && upbeat > props.sizing["upbeats"]) {
          Array.from(td_notes).forEach((el_td, i_td) => {
              if (i_td < n_td_notes - upbeat) {
                  el_td.classList.add("break_start");
              }
          });
      }

      if (i_line == n_lines - 1) {
          el_tr.classList.add("break_end");
      }
      if (!!aside) {
          const el_td = el_tr.lastChild;
          if (i_line > 0) {
              el_tr.removeChild(el_td);
          } else {
              el_td.rowSpan = n_lines;
              el_td.classList.add("text", "aside");
              el_td.textContent = aside;
          }
      }
      if (!!aside_lines) {
          const el_td = el_tr.lastChild;
          for (const aside_lstart in aside_lines) {
              const [aside_llen, aside_text] = aside_lines[aside_lstart];
              if (
                  aside_lstart <= i_line + 1
                  && i_line + 1 <= aside_lstart + aside_llen - 1
              ) {
                  if (i_line + 1 > aside_lstart) {
                      // el_tr.removeChild(el_td);
                  } else {
                      el_td.rowSpan = aside_llen;
                      el_td.classList.add("text", "aside_lines");
                      el_td.textContent = aside_text;
                  }
              }
          }
      }
      if (!!subtitle && i_line > 0) {
          const el_td = el_tr.firstChild;
          if (i_line > 1) {
              el_tr.removeChild(el_td);
          } else {
              el_td.rowSpan = n_lines - 1 + n_extra_lines;
              el_td.classList.add("remark");
              el_td.textContent = subtitle;
          }
      }

      return el_tr;
  }

  const vMain = {
    mounted: (el_tbody) => {
      const n_lines_render = lines_render.value.length;

      const table_rows = lines_render.value.map(({str_row, notation, override}, i_line) =>
          _add_break_row(i_line, n_lines_render, {str_row, notation, override}, props.pattern)
      );
      if (n_lines_render > 1) {
          // bottom border for "overhanging" parts
          for (let i_subbeat = 0; i_subbeat < props.sizing["subbeats_per_row"]; i_subbeat++) {
              let last_line = n_lines_render - 1;
              while (last_line >= 0 && lines_render.value[last_line]["notation"].length <= i_subbeat) {
                  last_line--;
              }
              if (last_line < n_lines_render - 1) {
                  const el_td = (
                      table_rows[last_line].querySelectorAll("td.note:not(.upbeat)")[i_subbeat]
                  );
                  el_td.classList.add("break_end");
              }
          }
      }
      table_rows.forEach((el_tr) => el_tbody.appendChild(el_tr));
    },
  };
</script>

<template>
  <tbody v-if="pattern?.preamble && pattern.upbeat == 0">
    <tr>
      <td :colspan="2 + sizing.upbeats"></td>
      <td
        class="text remark"
        :colspan="sizing.ncols - 2 - sizing.upbeats"
      >{{pattern.preamble}}</td>
    </tr>
  </tbody>
  <tbody v-main></tbody>
  <tbody v-if="n_extra_lines > 0">
    <tr v-for="(_, i_line) in n_extra_lines" :key="i_line">
      <td
        v-if="lines_render.length <= 1 && i_line == 0"
        :rowspan="pattern.subtitle_extra_lines"
        class="text remark"
      >{{pattern.subtitle}}</td>
      <template v-if="pattern.remarks.length > i_line">
        <td class="empty" :colspan="1 + rem_indent"></td>
        <td class="text remark" :colspan="sizing.ncols - 2 - rem_indent">{{pattern.remarks[i_line]}}</td>
      </template>
      <template v-else>
        <td class="empty" :colspan="sizing.ncols - 1"></td>
      </template>
    </tr>
  </tbody>
  <tbody v-if="pattern?.memory_aid">
    <tr class="empty"><td :colspan="sizing.ncols"></td></tr>
    <MemoryAid :sizing="sizing" :data="pattern.memory_aid" />
  </tbody>
</template>
