
import RAW_TUNES from "./defaultTunes.js";

import TUNE_LAYOUTS from "./tuneLayouts.js";

const NOTE_CHARS = {
    " ": "",
    "Ş": "ls",
    "Ꞩ": "ms",
    "Ŝ": "hs",
    "Ṧ": "mhs",
    "Ꟊ": "lms",
    "Š": "sn",
    "o": "l",
    "a": "h",
    "å": "ag",
    "f": "fl",
    "h": "hd",
    "r": "ri",
    "s": "sil",
    "þ": "T+h",
    "t": "w",
    "z": "s",
};

const BREAK_CHARS = {
    "as": "S",
    "ls": "Ş",
    "ms": "Ꞩ",
    "hs": "Ŝ",
    "mhs": "Ṧ",
    "lms": "Ꟊ",
    "re": "R",
    "sn": "Š",
    "ta": "T",
    "ot": "c",
    "sh": ".",
}

const INSTRU_NAMES = {
    "as": "All Surdos",
    "ls": "Low Surdo",
    "ms": "Mid Surdo",
    "hs": "High Surdo",
    "mhs": "Mid+High Surdo",
    "lms": "Low+Mid Surdo",
    "re": "Repinique",
    "sn": "Snare",
    "ta": "Tamborim",
    "ag": "Agogô",
    "sh": "Shaker",
    "ot": "Whistle",
}

const INSTRU_ORDER = ["as", "ls", "ms", "lms", "hs", "mhs", "re", "sn", "ta", "ag", "ot", "sh"];

function note_char_to_repr(c) {
    return NOTE_CHARS.hasOwnProperty(c) ? NOTE_CHARS[c] : c;
}

function render_tune(tune) {
    const total_width = tune["sizing"]["total_width"];
    for (let i_page = 0; i_page < tune["pages"].length; i_page++) {
        const page_order = tune["pages"][i_page];
        const el_section = document.createElement("section");
        el_section.innerHTML = `<div><h1></h1></div><div></div>`;
        const el_h1 = el_section.querySelector("h1");
        const el_main = el_section.querySelector("div:last-child")
        let el_table = null;
        let sizing = null;
        el_section.style.width = `${total_width}rem`;
        if (total_width > 80) {
            el_section.classList.add("wide");
        }

        function render_header(main, aside) {
            el_h1.textContent = main;
            if (main.length > 15) {
                el_h1.classList.add("long");
            }
            const el_h1_div = document.createElement("div");
            el_h1_div.textContent = aside;
            if (!!aside && aside.length > 95) {
                el_h1_div.classList.add("long");
            }
            el_h1.appendChild(el_h1_div);
        }

        function add_table() {
            el_table = document.createElement("table");
            el_main.appendChild(el_table);
            const el_colgroup = document.createElement("colgroup");
            el_colgroup.innerHTML = (
                `<col style="width: ${sizing["pre_name_width"]}rem"></col>`
                + `<col style="width: ${sizing["pre_count_width"]}rem"></col>`
            );
            for (let i = 0; i < sizing["subbeats_per_row"] + sizing["upbeats"]; i++) {
                const el_col = document.createElement("col");
                el_col.style.width = `${sizing["subbeat_width"]}rem`;
                el_colgroup.appendChild(el_col);
            }
            const el_col = document.createElement("col");
            el_col.style.width = `${sizing["after_width"]}rem`;
            el_colgroup.appendChild(el_col);
            el_table.appendChild(el_colgroup);
        }

        function tbl_add_empty_row(overline) {
            const el_tr = document.createElement("tr");
            el_tr.classList.add("empty");
            if (!!overline) {
                el_tr.innerHTML = (
                    `<td class="overline"></td>` +
                    `<td colspan="${sizing["ncols"] - 1}"></td>`
                );
            } else {
                el_tr.innerHTML = `<td colspan="${sizing["ncols"]}"></td>`;
            }
            el_table.appendChild(el_tr);
        }

        function tbl_add_head() {
            let el_td;
            const el_tr = document.createElement("tr");
            el_tr.classList.add("heading");
            el_td = document.createElement("td");
            el_td.classList.add("text");
            el_td.colSpan = 2;
            el_td.textContent = "Groove";
            el_tr.appendChild(el_td);
            if (sizing["upbeats"] > 0) {
                el_td = document.createElement("td");
                el_td.classList.add("count");
                el_td.colSpan = sizing["upbeats"];
                el_tr.appendChild(el_td);
            }
            for (let i = 0; i < sizing["beats_per_row"]; i++) {
                el_td = document.createElement("td");
                el_td.classList.add("count");
                el_td.colSpan = sizing["subbeats_per_beat"];
                el_td.textContent = i + 1;
                el_tr.appendChild(el_td);
            }
            el_tr.appendChild(document.createElement("td"));
            el_table.appendChild(el_tr);
        }

        function tbl_tune_row_add_upbeats(el_tr, notation) {
            const upbeat = notation.length;
            const offset = sizing["upbeats"] - upbeat;
            for (let i = 0; i < sizing["upbeats"]; i++) {
                const el_td = document.createElement("td");
                if (i >= offset) {
                    el_td.classList.add("note");
                    el_td.classList.add("upbeat");
                    el_td.textContent = note_char_to_repr(notation.charAt(i - offset));
                }
                el_tr.appendChild(el_td);
            }
        }

        function tbl_add_tune_row(name, i_row, notation, override, upbeat, upbeat_pre) {
            upbeat = upbeat || 0;
            override = override || {};
            let el_tr = document.createElement("tr");
            el_tr.innerHTML = (
                `<td class="text"><div>${name}</div></td>` +
                `<td class="count">${i_row}</td>`
            );

            let upbeat_notes = "";
            if (upbeat_pre) {
                upbeat_notes = notation.slice(0, upbeat);
                notation = notation.slice(upbeat);
                upbeat = 0;
            }
            tbl_tune_row_add_upbeats(el_tr, upbeat_notes);

            let offset = 0;
            if (upbeat > 0) {
                offset = sizing["subbeats_per_row"] - upbeat;
                const el_td = document.createElement("td");
                el_td.colSpan = offset;
                el_tr.appendChild(el_td);
            }
            for (let i = offset; i - offset < notation.length; i++) {
                let c = note_char_to_repr(notation.charAt(i - offset));
                const el_td = document.createElement("td");
                el_td.classList.add("note");
                if (
                    i % sizing["subbeats_per_beat"] == 0
                    || i == 0 && sizing["upbeats"] > 0
                ) {
                    const n_beat = i / sizing["subbeats_per_beat"];
                    el_td.classList.add(
                        n_beat != 0 && n_beat % sizing["beats_per_bar"] == 0 ? "bar" : "beat"
                    );
                }
                if (override.hasOwnProperty(i - offset + 1)) {
                    const [len, str, align] = override[i - offset + 1];
                    c = str;
                    el_td.colSpan = len;
                    el_td.style.textAlign = align;
                    el_td.classList.add("long");
                    i += len - 1;
                } else if (c.length > 3) {
                    el_td.classList.add("long");
                }
                el_td.textContent = c;
                el_tr.appendChild(el_td);
            }
            if (notation.length < sizing["subbeats_per_row"] && upbeat == 0) {
                const el_td = document.createElement("td");
                el_td.colSpan = sizing["subbeats_per_row"] - notation.length;
                el_tr.appendChild(el_td);
            }
            el_tr.appendChild(document.createElement("td"));
            el_table.appendChild(el_tr);
            return el_tr;
        }

        function tbl_add_tune(variant_name, data, compact_layout) {
            variant_name = data.hasOwnProperty("name") ? data["name"] : variant_name;
            if (variant_name !== "Tune") {
                const el_tr = document.createElement("tr");
                el_tr.classList.add("heading");
                const el_td = document.createElement("td");
                el_td.classList.add("text");
                el_td.textContent = variant_name;
                if (data.hasOwnProperty("preamble")) {
                    el_td.colSpan = 2 + sizing["upbeats"];
                    el_tr.appendChild(el_td);
                    const el_preamble = document.createElement("td");
                    el_preamble.colSpan = sizing["ncols"] - 2 - sizing["upbeats"];
                    el_preamble.classList.add("text");
                    el_preamble.classList.add("preamble");
                    el_preamble.textContent = data["preamble"];
                    el_tr.appendChild(el_preamble);
                } else {
                    el_td.colSpan = sizing["ncols"];
                    el_tr.appendChild(el_td);
                }
                el_table.appendChild(el_tr);
            }
            const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;
            const empty_line = " ".repeat(Math.min(
                sizing["subbeats_per_row"],
                ...Object.entries(data["notes"]).map(([key, n]) => {
                    return n.length;
                }),
            ));
            const notes_override = (
                data.hasOwnProperty("notes_override") ? data["notes_override"] : {}
            );

            const lines_render_ins = {};
            for (const instru_name of data["instru_order"]) {
                const notes = data["notes"][instru_name];
                const n_lines = Math.ceil((notes.length - upbeat) / sizing["subbeats_per_row"]);
                const lines = [...Array(n_lines).keys()].map((i_line) => {
                    if (i_line == 0) {
                        return notes.substr(0, sizing["subbeats_per_row"] + upbeat);
                    } else {
                        return notes.substr(
                            upbeat + i_line * sizing["subbeats_per_row"],
                            sizing["subbeats_per_row"],
                        );
                    }
                });
                const ins_notes_override = (
                    notes_override.hasOwnProperty(instru_name) ? notes_override[instru_name] : {}
                );
                const first_nonempty_line = lines.findIndex(l => l != empty_line);

                lines_render_ins[instru_name] = [];
                for (let i_line = 0; i_line < n_lines; i_line++) {
                    const offset = i_line * sizing["subbeats_per_row"];
                    const l = lines[i_line];
                    const override = {};
                    for (const [start, d] of Object.entries(ins_notes_override)) {
                        if (start > offset) {
                            override[start - offset] = d;
                        }
                    }
                    const n_overrides = Object.keys(override).length;

                    if (l == empty_line) {
                        continue;
                    }

                    let n_repeat_lines = 0;
                    let i_line_next = i_line + n_repeat_lines;
                    if (n_overrides == 0 && !data.hasOwnProperty("nosqueeze")) {
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

                    if (i_line_next > i_line + 1) {
                        for (
                            let i_repeat_lines = 0;
                            i_repeat_lines < n_repeat_lines;
                            i_repeat_lines++
                        ) {
                            let str_row = (
                                `${i_line + 1 + i_repeat_lines}`
                                + `-${i_line_next + 1 - n_repeat_lines + i_repeat_lines}`
                            );
                            lines_render_ins[instru_name].push({
                                "row_name": (
                                    i_line + i_repeat_lines == first_nonempty_line
                                    ? (
                                        INSTRU_NAMES.hasOwnProperty(instru_name)
                                        ? INSTRU_NAMES[instru_name]
                                        : instru_name
                                    ) : ""
                                ),
                                "str_row": str_row,
                                "notation": lines[i_line + i_repeat_lines],
                                "override": override,
                                "upbeat": i_line + i_repeat_lines == 0 ? upbeat : 0,
                            });
                        }
                    } else {
                        let str_row = "";
                        if (n_lines > 1 || instru_name == data["instru_order"][0]) {
                            str_row += `${i_line + 1}`;
                        }

                        lines_render_ins[instru_name].push({
                            "row_name": (
                                i_line == first_nonempty_line
                                ? (
                                    INSTRU_NAMES.hasOwnProperty(instru_name)
                                    ? INSTRU_NAMES[instru_name]
                                    : instru_name
                                ) : ""
                            ),
                            "str_row": str_row,
                            "notation": l,
                            "override": override,
                            "upbeat": i_line == 0 ? upbeat : 0,
                        });
                    }

                    i_line = i_line_next - 1;
                }
            }

            const empty_line_render = {
                "row_name": "",
                "str_row": "",
                "notation": empty_line,
            }
            const lines_render = [];
            if (data.hasOwnProperty("instrument_groups")) {
                for (const group of data["instrument_groups"]) {
                    lines_render_ins[group[0]].forEach((_, i_line) => {
                        lines_render.push(...group.map((ins, i_instr) => {
                            if (i_instr != 0) {
                                lines_render_ins[ins][i_line]["str_row"] = "";
                            }
                            return lines_render_ins[ins][i_line];
                        }));
                        lines_render.push(empty_line_render);
                    });
                    data["instru_order"] = (
                        data["instru_order"].filter(ins => group.indexOf(ins) < 0)
                    );
                }
            }

            data["instru_order"].forEach((instru_name, i_instr) => {
                lines_render.push(...lines_render_ins[instru_name]);
                if (i_instr + 1 < data["instru_order"].length && !compact_layout) {
                    lines_render.push(empty_line_render);
                }
            });

            lines_render.forEach(({row_name, str_row, notation, override, upbeat}, i_line) => {
                const el_tr = tbl_add_tune_row(
                    row_name, str_row, notation, override, upbeat, true,
                );

                const td_notes = el_tr.querySelectorAll("td.note:not(.upbeat)");
                td_notes[0].classList.add("line_start");
                td_notes[td_notes.length - 1].classList.add("line_end");

                if (compact_layout) {
                    if (i_line == 0) {
                        el_tr.classList.add("break_start");
                    }

                    if (i_line == lines_render.length - 1) {
                        el_tr.classList.add("break_end");
                    }
                }
            });


            const remarks = data.hasOwnProperty("remarks") ? data["remarks"] : [];

            remarks.forEach((remark) => {
                const el_tr = document.createElement("tr");
                const el_td = document.createElement("td");
                el_td.colSpan = sizing["ncols"] - 1;
                el_td.classList.add("text", "tune_remark");
                el_td.textContent = remark;
                el_tr.innerHTML = el_td.outerHTML + "<td></td>";
                el_table.appendChild(el_tr);
            });
        }

        function tbl_add_memory_aid(data) {
            const notes = data["notes"];
            const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;
            const n_lines = Math.ceil(notes.length / sizing["subbeats_per_row"]);

            const notes_override = {};
            let i_words = 0;
            for (const [i, c] of Object.entries([...notes])) {
                if (c.toLowerCase() != "x") {
                    continue;
                }
                notes_override[parseInt(i) + 1] = [1, data["words"][i_words++], "center"];
            }

            const lines = [...Array(n_lines).keys()].map((i_line) => {
                if (upbeat > 0) {
                    if (i_line == 0) {
                        return notes.substr(0, upbeat);
                    } else {
                        return  notes.substr(
                            upbeat + (i_line - 1) * sizing["subbeats_per_row"],
                            sizing["subbeats_per_row"],
                        );
                    }
                } else {
                    return notes.substr(
                        i_line * sizing["subbeats_per_row"],
                        sizing["subbeats_per_row"],
                    );
                }
            });

            const lines_render = [];
            for (let i_line = 0; i_line < n_lines; i_line++) {
                let offset = i_line * sizing["subbeats_per_row"];
                if (i_line > 0 && upbeat > 0) {
                    offset += upbeat - sizing["subbeats_per_row"];
                }
                const override = {};
                for (const [start, d] of Object.entries(notes_override)) {
                    if (start > offset) {
                        override[start - offset] = d;
                    }
                }

                lines_render.push({
                    "notation": lines[i_line],
                    "override": override,
                });
            }

            lines_render.forEach(({notation, override}, i_line) => {
                tbl_add_tune_row(
                    "", "", notation, override, i_line == 0 ? upbeat : 0, false,
                );
            });
        }

        function tbl_add_text_break(name, data) {
            name = data.hasOwnProperty("name") ? data["name"] : name;
            const n_extra_lines = (
                data.hasOwnProperty("subtitle_extra_lines")
                ? data["subtitle_extra_lines"]
                : 0
            );
            const n_text_lines = data["text"]["rows"];
            const n_pre_cols = 6;
            for (let i_row = 0; i_row < n_text_lines + n_extra_lines; i_row++) {
                const el_tr = document.createElement("tr");
                el_tr.innerHTML = "";
                if (i_row == 0) {
                    el_tr.classList.add("break_start");

                    let el_td = document.createElement("td");
                    el_td.classList.add("text");
                    el_td.colSpan = n_pre_cols;
                    el_td.innerHTML = `<div>${name}</div>`;
                    el_tr.innerHTML += el_td.outerHTML;

                    el_td = document.createElement("td");
                    el_td.classList.add("break_text");
                    el_td.colSpan = sizing["ncols"] - n_pre_cols;
                    el_td.rowSpan = data["text"]["rows"];
                    el_td.textContent = data["text"]["content"];
                    el_tr.innerHTML += el_td.outerHTML;
                } else if (data.hasOwnProperty("subtitle")) {
                    if (i_row == 1) {
                        const el_td = document.createElement("td");
                        el_td.classList.add("text", "remark");
                        el_td.colSpan = n_pre_cols;
                        el_td.rowSpan = n_text_lines + n_extra_lines - 1;
                        el_td.textContent = data["subtitle"];
                        el_tr.innerHTML += el_td.outerHTML;
                    }
                } else {
                    el_tr.innerHTML += `<td colspan="${n_pre_cols}"></td>`;
                }
                el_table.appendChild(el_tr);
            }
        }

        function _render_lines(data, i_notes) {
            const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;
            const notes_override = (
                data.hasOwnProperty("notes_override")
                && data["notes_override"].length > i_notes
                ? data["notes_override"][i_notes]
                : {}
            );
            const empty_line = " ".repeat(sizing["subbeats_per_row"]);
            const empty_line_upbeat = " ".repeat(upbeat);
            let notes = data["notes"][i_notes];
            let n_lines = Math.ceil(notes.length / sizing["subbeats_per_row"]);
            const lines = [...Array(n_lines).keys()].map((i_line) => {
                if (upbeat > 0) {
                    if (i_line == 0) {
                        return notes.substr(0, upbeat);
                    } else {
                        return notes.substr(
                            upbeat + (i_line - 1) * sizing["subbeats_per_row"],
                            sizing["subbeats_per_row"],
                        );
                    }
                } else {
                    return notes.substr(
                        i_line * sizing["subbeats_per_row"],
                        sizing["subbeats_per_row"],
                    );
                }
            });

            const lines_render = [];
            for (let i_line = 0; i_line < n_lines; i_line++) {
                let offset = i_line * sizing["subbeats_per_row"];
                if (i_line > 0 && upbeat > 0) {
                    offset += upbeat - sizing["subbeats_per_row"];
                }
                const override = {};
                for (const [start, d] of Object.entries(notes_override)) {
                    if (offset < start && start < offset + sizing["subbeats_per_row"]) {
                        override[start - offset] = d;
                    }
                }
                const n_overrides = Object.keys(override).length;

                if (
                    n_overrides == 0
                    && (
                        lines[i_line] == empty_line
                        || i_line == 0 && upbeat > 0 && lines[i_line] == empty_line_upbeat
                    ) && lines.some(l => l != empty_line)
                ) {
                    continue;
                }

                let n_repeat_lines = 0;
                let i_line_next = i_line + n_repeat_lines;
                if (n_overrides == 0 && !data.hasOwnProperty("nosqueeze")) {
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

                const upbeat_mod = upbeat > 0 ? -1 : 0;
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
                        lines_render.push({
                            "l_start": i_line + i_repeat_lines,
                            "l_end": i_line_next - n_repeat_lines + i_repeat_lines,
                            "str_row": str_row,
                            "notation": lines[i_line + i_repeat_lines],
                            "override": override,
                        });
                    }
                } else {
                    let str_row = "";
                    if (data.hasOwnProperty("row_numbers")) {
                        str_row = data["row_numbers"][i_line];
                    } else if (n_lines > 1 && i_line + upbeat_mod >= 0) {
                        str_row += `${i_line + upbeat_mod + 1}`;
                    }

                    lines_render.push({
                        "l_start": i_line,
                        "l_end": i_line,
                        "str_row": str_row,
                        "notation": lines[i_line],
                        "override": override,
                    });
                }

                i_line = i_line_next - 1;
            }

            return lines_render;
        }

        function _render_lines_merged(data) {
            const lines_render = [];
            const lines_render_tmp = data["notes"].flatMap((_, i) => _render_lines(data, i));
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
                lines_render.push(l_next);
            }
            return lines_render;
        }

        function _add_break_row(
            i_line,
            n_lines,
            {str_row, notation, override},
            {name, upbeat, preamble, subtitle, subtitle_extra_lines, aside, aside_lines},
        ) {
            const n_extra_lines = subtitle_extra_lines || 0;
            upbeat = upbeat || 0;
            const el_tr = tbl_add_tune_row(
                i_line == 0 ? name : "",
                str_row,
                notation,
                override,
                i_line == 0 ? upbeat : 0,
                false,
            );
            if (i_line == 0) {
                el_tr.classList.add("break_start");
                if (!!preamble && upbeat > 0) {
                    const el_td = el_tr.querySelectorAll("td[colspan]")[0];
                    el_td.classList.add("text", "remark");
                    el_td.textContent = preamble;
                }
            }

            let td_notes = el_tr.querySelectorAll("td.note:not(.upbeat)");
            td_notes[0].classList.add("line_start");
            td_notes[td_notes.length - 1].classList.add("line_end");
            const n_td_notes = td_notes.length;

            if (i_line == 1 && upbeat > 0 && upbeat > 0) {
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
        }

        function tbl_add_break(data) {
            const n_extra_lines = (
                data.hasOwnProperty("subtitle_extra_lines")
                ? data["subtitle_extra_lines"]
                : 0
            );
            const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;

            if (data.hasOwnProperty("preamble") && upbeat == 0) {
                const el_tr = document.createElement("tr");
                const n_cols_pre = 2 + sizing["upbeats"];
                el_tr.innerHTML = `<td colspan="${n_cols_pre}"></td>`;
                let el_td = document.createElement("td");
                el_td.classList.add("text", "remark");
                el_td.colSpan = sizing["ncols"] - n_cols_pre;
                el_td.textContent = data["preamble"]
                el_tr.appendChild(el_td);
                el_table.appendChild(el_tr);
            }

            const lines_render = _render_lines_merged(data);
            const n_lines_render = lines_render.length;

            lines_render.forEach(({str_row, notation, override}, i_line) =>
                _add_break_row(i_line, n_lines_render, {str_row, notation, override}, data)
            );

            const remarks = data.hasOwnProperty("remarks") ? data["remarks"] : [];
            const rem_indent = (
                data.hasOwnProperty("remarks_indent") ? data["remarks_indent"] : false
            );

            for (let i_line = 0; i_line < n_extra_lines; i_line++) {
                const el_tr = document.createElement("tr");
                let innerHTML = "";
                if (n_lines_render <= 1 && i_line == 0) {
                    const el_td = document.createElement("td");
                    el_td.rowSpan = data["subtitle_extra_lines"];
                    el_td.classList.add("text", "remark");
                    el_td.textContent = data["subtitle"];
                    innerHTML += el_td.outerHTML;
                }
                if (remarks.length > i_line) {
                    let n_cols_pre = 1;
                    if (rem_indent !== false) {
                        n_cols_pre += rem_indent;
                    }
                    innerHTML += `<td class="empty" colspan="${n_cols_pre}"></td>`;
                    const el_td = document.createElement("td");
                    el_td.colSpan = sizing["ncols"] - 1 - n_cols_pre;
                    el_td.classList.add("text", "remark");
                    el_td.textContent = remarks[i_line];
                    innerHTML += el_td.outerHTML;
                } else {
                    innerHTML += `<td class="empty" colspan="${sizing["ncols"] - 1}"></td>`;
                }
                el_tr.innerHTML += innerHTML;
                el_table.appendChild(el_tr);
            }

            remarks.slice(n_extra_lines).forEach((remark) => {
                let n_cols_pre = 0;
                const el_tr = document.createElement("tr");
                el_tr.innerHTML = "";
                if (rem_indent !== false) {
                    n_cols_pre = 2 + sizing["upbeats"] + rem_indent;
                    el_tr.innerHTML += `<td class="empty" colspan="${n_cols_pre}"></td>`;
                }
                const el_td = document.createElement("td");
                el_td.colSpan = sizing["ncols"] - n_cols_pre;
                el_td.classList.add("text", "remark");
                el_td.textContent = remark;
                el_tr.innerHTML += el_td.outerHTML;
                el_table.appendChild(el_tr);
            });

            if (data.hasOwnProperty("memory_aid")) {
                tbl_add_empty_row();
                tbl_add_memory_aid(data["memory_aid"]);
            }
        }

        if (i_page == 0) {
            render_header(
                tune["name"],
                tune.hasOwnProperty("sign") ? `tune sign: ${tune["sign"]}` : ""
            );
        }

        for (let i_break = 0; i_break < page_order.length; i_break++) {
            const name = page_order[i_break];
            const data = tune["patterns"][name];
            sizing = data["sizing"];
            add_table();
            if (name == "Tune") {
                tbl_add_empty_row(true);
                tbl_add_head();
                tbl_add_empty_row();
            }
            if (name.toLowerCase().indexOf("tune") >= 0 || data["separate_instruments"]) {
                tbl_add_tune(name, data, data["separate_instruments"]);
            } else if (data.hasOwnProperty("text")) {
                tbl_add_text_break(name, data);
            } else {
                tbl_add_break(data);
            }
            tbl_add_empty_row();
        }
        document.body.appendChild(el_section);
    }
}

function resolve_pattern(notes, no_high_surdo, sel_instrus, suppress) {
    const all_instruments = ["ls", "ms", "hs", "re", "sn", "ta", "ag", "ot"];
    sel_instrus = sel_instrus || [
        ...all_instruments.filter(ins => notes.hasOwnProperty(ins))
    ];
    suppress = suppress || [];
    for (let [instru, notation] of Object.entries(notes)) {
        if (typeof notation !== "string") {
            continue;
        }
        if (notation.charAt(0) == "@") {
            notes[instru] = notes[notation.substr(1)];
        }
    }
    let first_instru = (
        Object.keys(notes)
        .filter(ins => sel_instrus.indexOf(ins) >= 0)
    );
    if (first_instru.length == 0) {
        first_instru = (
            Object.keys(notes)
            .filter(ins => ins.length == 2)
        )[0];
    } else {
        first_instru = first_instru[0];
    }
    const len = notes[first_instru].length;
    const empty_pattern = " ".repeat(len);
    // make sure at least these instruments are listed and make them silent if missing
    all_instruments
        .filter(ins => !notes.hasOwnProperty(ins) || sel_instrus.indexOf(ins) < 0)
        .forEach(ins => {notes[ins] = empty_pattern;});
    for (let [ins, start, end] of suppress) {
        if (ins == "*") {
            for (let i of all_instruments) {
                notes[i] = (
                    notes[i].slice(0, start - 1)
                    + " ".repeat(end - start + 1)
                    + notes[i].slice(end)
                );
            }
        } else {
            notes[ins] = (
                notes[ins].slice(0, start - 1)
                + " ".repeat(end - start + 1)
                + notes[ins].slice(end)
            );
        }
    }
    if (["ls", "ms", "hs", "lms", "mhs", "as"].some(ins => sel_instrus.indexOf(ins) >= 0)) {
        if (notes["ls"] == notes["ms"] && no_high_surdo) {
            sel_instrus = ["as", ...sel_instrus.filter(ins => ["ls", "ms", "hs"].indexOf(ins) < 0)];
            notes["as"] = notes["ls"];
            delete notes["ls"];
            delete notes["ms"];
        } else if (notes["ls"] == notes["ms"] && notes["ms"] != notes["hs"]) {
            sel_instrus = ["lms", ...sel_instrus.filter(ins => ["ls", "ms"].indexOf(ins) < 0)];
            notes["lms"] = notes["ms"];
            delete notes["ls"];
            delete notes["ms"];
        } else if (notes["ms"] == notes["hs"]) {
            if (notes["ls"] == notes["ms"]) {
                sel_instrus = ["as", ...sel_instrus.filter(ins => ["ls", "ms", "hs"].indexOf(ins) < 0)];
                notes["as"] = notes["ls"];
                delete notes["ls"];
                delete notes["ms"];
                delete notes["hs"];
            } else {
                sel_instrus = ["mhs", ...sel_instrus.filter(ins => ["ms", "hs"].indexOf(ins) < 0)];
                notes["mhs"] = notes["ms"];
                delete notes["ms"];
                delete notes["hs"];
            }
        }
    }
    return sel_instrus;
}

function convert_tune_pattern(notes) {
    const result = {};
    for (let instru of INSTRU_ORDER) {
        if (notes.hasOwnProperty(instru)) {
            result[instru] = notes[instru];
        }
    }
    return result;
}

function _merge_instru_notes_i(notes, l_instrus, i) {
    const ref_ins = l_instrus.find(ins => notes[ins].charAt(i) != " ");
    if (typeof ref_ins === "undefined") {
        return " ";
    }

    const ref_ins_all = l_instrus.filter(ins => notes[ins].charAt(i) != " ")
    const n_ref_ins = ref_ins_all.length;
    if (n_ref_ins > 1) {
        const ref_is_surdos = (
            (
                n_ref_ins == 2
                && ref_ins_all.indexOf("lms") >= 0
                && ref_ins_all.indexOf("hs") >= 0
            ) || (
                n_ref_ins == 2
                && ref_ins_all.indexOf("lhs") >= 0
                && ref_ins_all.indexOf("ms") >= 0
            ) || (
                n_ref_ins == 2
                && ref_ins_all.indexOf("ls") >= 0
                && ref_ins_all.indexOf("mhs") >= 0
            ) || (
                n_ref_ins == 3
                && ref_ins_all.indexOf("ls") >= 0
                && ref_ins_all.indexOf("ms") >= 0
                && ref_ins_all.indexOf("hs") >= 0
            )
        );
        const ref_is_th = (
            n_ref_ins == 2
            && ref_ins_all.indexOf("ta") >= 0
            && ref_ins_all.indexOf("ag") >= 0
            && notes["ag"].charAt(i) == "a"
        );
        if (ref_is_surdos) {
            return "S";
        } else if (ref_is_th) {
            return "þ";
        } else if (n_ref_ins < l_instrus.length) {
            return "A";
        } else if (l_instrus.every(ins => notes[ins].charAt(i) == "r")) {
            return "r";
        } else {
            return "E";
        }
    } else if (ref_ins == "ag") {
        const ref = notes[ref_ins].charAt(i);
        return [...notes[ref_ins]].every(c => [" ", ref].indexOf(c) >= 0) ? "å" : ref;
    } else {
        const ref_note = notes[ref_ins].charAt(i);
        if ([".", "f", "h", "r", "s"].indexOf(ref_note) >= 0) {
            return ref_note;
        } else {
            return BREAK_CHARS.hasOwnProperty(ref_ins) ? BREAK_CHARS[ref_ins] : ref_ins;
        }
    }
}

function convert_break_pattern(notes, l_instrus, separate_instrus) {
    if (!l_instrus) {
        l_instrus = ["as", "re", "sn", "ta", "ag"];
        if (!notes.hasOwnProperty("as")) {
            if (notes.hasOwnProperty("lms")) {
                l_instrus.splice(0, 1, "lms", "hs");
            } else {
                l_instrus.splice(0, 1, "ls", "mhs");
                if (!notes.hasOwnProperty("mhs")) {
                    l_instrus.splice(1, 1, "ms", "hs");
                }
            }
        }
    }

    separate_instrus = separate_instrus || [];

    const n_notes = Math.max(...(
        l_instrus
        .map(ins => notes.hasOwnProperty(ins) ? notes[ins].length : 0)
    ));

    for (let ins of l_instrus) {
        notes[ins] = notes[ins].padEnd(n_notes, " ");
    }

    const notation = ["", ...separate_instrus.map(() => "")];
    for (let i = 0; i < n_notes; i++) {
        let l_instrus_resid = l_instrus;
        separate_instrus.forEach(([i_start, i_end, l_sub_instrus], i_sep) => {
            if (i_start > i || i_end < i) {
                notation[i_sep + 1] += " ";
                return;
            }
            notation[i_sep + 1] += _merge_instru_notes_i(notes, l_sub_instrus, i)
            l_instrus_resid = l_instrus_resid.filter(ins => l_sub_instrus.indexOf(ins) < 0);
        });
        notation[0] += _merge_instru_notes_i(notes, l_instrus_resid, i);
    }
    return notation;
}

function auto_total_width(sizing) {
    sizing["landscape"] = (
        sizing.hasOwnProperty("landscape") ? sizing["landscape"] : sizing["bars_per_row"] > 1
    );
    if (sizing["bars_per_row"] > 1 && !sizing["landscape"]) {
        return 56;
    }
    return sizing["landscape"] ? 66 : 41.9;
}

function fill_sizing(sizing, total_width) {
    sizing = {
        "pre_width": 9,
        "after_width": 0,
        "pre_count_width": 2.5,
        ...sizing,
    };
    sizing["beats_per_row"] = sizing["beats_per_bar"] * sizing["bars_per_row"];
    sizing["subbeats_per_row"] = sizing["beats_per_row"] * sizing["subbeats_per_beat"];
    sizing["ncols"] = 3 + sizing["upbeats"] + sizing["subbeats_per_row"];
    sizing["pre_name_width"] = sizing["pre_width"] - sizing["pre_count_width"];
    if (!sizing.hasOwnProperty("total_width")) {
        sizing["total_width"] = !!total_width ? total_width : auto_total_width(sizing);
    }
    sizing["subbeat_width"] = (
        (sizing["total_width"] - sizing["pre_width"] - sizing["after_width"])
        / (sizing["subbeats_per_row"] + sizing["upbeats"])
    );
    return sizing;
}

function auto_sizing(tune_n_subbeats, tune_time, tune_upbeat) {
    let sizing = {
        "pre_width": 11,
        "bars_per_row": 1,
        "beats_per_bar": 4,
        "subbeats_per_beat": tune_time,
        "upbeats": tune_upbeat,
    };
    const n_bars = (
        (tune_n_subbeats - tune_upbeat) / (tune_time * sizing["beats_per_bar"])
    );
    if (n_bars == 2) {
        // e.g. Funk, Afoxé
        sizing = {
            ...sizing,
            "pre_width": 15.0,
            "bars_per_row": 2,
        };
    } else if (n_bars == 4 && sizing["subbeats_per_beat"] == 3) {
        // e.g. Bhangra
        sizing = {
            ...sizing,
            "pre_width": 14,
            "bars_per_row": 2,
        };
    } else if (
        sizing["subbeats_per_beat"] == 12
        && (n_bars == 2 || n_bars == 4)
    ) {
        // e.g. Crazy Monkey (2), Rope Skipping (4)
        sizing = {
            ...sizing,
            "bars_per_row": 2,
        };
    }
    return sizing;
}

function get_tune_subbeats(patterns, time) {
    let tune_n_subbeats = 16;
    let tune_time = !!time ? time : 4;
    let tune_upbeat = 0;
    for (const [break_name, p] of Object.entries(patterns)) {
        if (break_name.toLowerCase() != "tune") {
            continue;
        }
        tune_time = p["time"];
        tune_upbeat = p["upbeat"];
        tune_n_subbeats = Math.max(...(
            Object.keys(INSTRU_NAMES)
            .map(ins => p["notes"].hasOwnProperty(ins) ? p["notes"][ins].length : 0)
        ));
    }
    return [tune_n_subbeats, tune_time, tune_upbeat];
}

function fill_patterns(patterns) {
    for (const [break_name, notes] of Object.entries(patterns)) {
        const time = notes.hasOwnProperty("time") ? notes["time"] : 4;
        const upbeat = notes.hasOwnProperty("upbeat") ? notes["upbeat"] : 0;
        const subbeats_per_bar = 4 * time;
        for (const ins of Object.keys(INSTRU_NAMES)) {
            if (!notes.hasOwnProperty(ins) || notes[ins].startsWith("@")) {
                continue
            }
            const n_bars = Math.ceil((notes[ins].length - upbeat) / subbeats_per_bar);
            notes[ins] = notes[ins].padEnd(upbeat + n_bars * subbeats_per_bar);
        }
    }
}

function _convert_triols(notes_12) {
    const n_beats = notes_12.length / 12;
    let notes_4 = "";
    let override = {};
    for (let i_beat = 0; i_beat < n_beats; i_beat++) {
        const subbeats = [...notes_12.slice(i_beat * 12, (i_beat + 1) * 12)];
        const subbeats_transl = subbeats.map(c => c == " " ? " " : note_char_to_repr(c));
        if (subbeats.every((c, i) => i % 3 == 0 || c == " ")) {
            notes_4 += subbeats.filter((_, i) => i % 3 == 0).join("");
        } else if (subbeats.every((c, i) => i % 4 == 0 || c == " ")) {
            notes_4 += "    ";
            override[i_beat * 4 + 1] = [
                4,
                `[ ${subbeats_transl.filter((_, i) => i % 4 == 0).join(" ")} ]`,
                "center",
            ];
        } else {
            notes_4 += "    ";
            override[i_beat * 4 + 1] = [4, `[${subbeats_transl.join(" ")}]`, "center"];
        }
    }
    return [notes_4, override];
}

function _merge_instruments(p) {
    const surdos = {
        "ls": "Ş",
        "ms": "Ꞩ",
        "hs": "Ŝ",
        "mhs": "Ṧ",
        "lms": "Ꟊ",
    };
    for (let [gname, gmembers] of Object.entries(p["merge_instruments"])) {
        let gnotes = p["notes"][gmembers[0]];
        if (gmembers.every(m => surdos.hasOwnProperty(m))) {
            gnotes = [...gnotes].map((_, i_note) => {
                const gmembers_nz = gmembers.filter(m => p["notes"][m].charAt(i_note) != " ");
                if (gmembers_nz.length == 0) {
                    return " ";
                }
                if (gmembers_nz.length == 1) {
                    return surdos[gmembers_nz[0]];
                }
                return "x";
            }).join("");
        }
        gmembers.forEach(m => { delete p["notes"][m]; });
        p["notes"][gname] = gnotes;
    }
}

function _convert_patterns(patterns, layout, def_time) {
    def_time = def_time || 4;
    const no_high_surdo = !Object.values(patterns).some(notes => notes.hasOwnProperty("hs"));
    const layout_patterns = layout.hasOwnProperty("patterns") ? layout["patterns"] : {};
    const result = {...layout_patterns};
    for (const [break_name, notes] of Object.entries(patterns)) {
        const ref = layout_patterns.hasOwnProperty(break_name) ? layout_patterns[break_name] : {};
        if (ref === false) {
            // layout spec tells us to omit this break
            continue;
        }
        const p = {...ref};
        const is_tune = break_name.toLowerCase().indexOf("tune") >= 0
        const separate_instruments = (
            p.hasOwnProperty("separate_instruments") ? p["separate_instruments"] : false
        );
        if (p.hasOwnProperty("sign")) {
            if (separate_instruments) {
                p["preamble"] = p["sign"];
            } else if (
                p.hasOwnProperty("single_bar_sizing")
                && !p.hasOwnProperty("aside")
                && !p.hasOwnProperty("aside_lines")
            ) {
                p["aside"] = `sign: ${p["sign"]}`;
            } else {
                p["subtitle"] = p["sign"];
            }
        }
        if (!p.hasOwnProperty("notes") || is_tune || separate_instruments) {
            p["instruments"] = resolve_pattern(
                notes, no_high_surdo, p["instruments"], p["suppress_instruments"],
            );

            if (is_tune || separate_instruments) {
                const override_notes = p.hasOwnProperty("notes") ? p["notes"] : {};
                p["notes"] = convert_tune_pattern(notes);
                for (const ins in override_notes) {
                    if (override_notes[ins] == "") {
                        delete p["notes"][ins];
                    } else {
                        p["notes"][ins] = override_notes[ins];
                    }
                }
                if (p.hasOwnProperty("merge_instruments")) {
                    _merge_instruments(p);
                }
                if (!p.hasOwnProperty("instru_order")) {
                    p["instru_order"] = [
                        ...Object.keys(p["notes"]).filter((ins) => {
                            return [...p["notes"][ins]].some((c) => c != " ");
                        })
                    ];
                }
            } else {
                p["notes"] = convert_break_pattern(notes, p["instruments"], p["separate_lines"]);
            }

            if (notes.hasOwnProperty("upbeat")) {
                p["upbeat"] = notes["upbeat"];
            }
        }
        result[break_name] = p;
    }
    for (const [break_name, p] of Object.entries(result)) {
        if (p === false) {
            continue;
        }
        const orig = patterns.hasOwnProperty(break_name) ? patterns[break_name] : {};
        for (const [prop, def] of [["time", def_time], ["upbeat", 0], ["name", break_name]]) {
            if (!p.hasOwnProperty(prop)) {
                p[prop] = orig.hasOwnProperty(prop) ? orig[prop] : def;
            }
        }
        if (p["time"] == 12) {
            let keys;
            if (Array.isArray(p["notes"])) {
                keys = p["notes"].keys();
                p["notes_override"] = p.hasOwnProperty("notes_override") ? p["notes_override"] : [];
            } else {
                keys = Object.keys(p["notes"]);
                p["notes_override"] = p.hasOwnProperty("notes_override") ? p["notes_override"] : {};
            }
            for (const i_notes of keys) {
                const [notes_4, override_triols] = _convert_triols(p["notes"][i_notes]);
                p["notes"][i_notes] = notes_4;
                p["notes_override"][i_notes] = override_triols;
            }
            p["time"] = 4;
        }
    }
    return result;
}

function _set_sizing(layout, time) {
    let [tune_n_subbeats, tune_time, tune_upbeat] = get_tune_subbeats(layout["patterns"], time);
    const base_sizing = {
        ...auto_sizing(tune_n_subbeats, tune_time, tune_upbeat),
        ...(layout.hasOwnProperty("sizing") ? layout["sizing"] : {}),
    }
    layout["sizing"] = fill_sizing(base_sizing);

    for (const [break_name, p] of Object.entries(layout["patterns"])) {
        if (p === false) {
            continue;
        }
        let p_sizing = {...base_sizing};
        if (p["time"] != tune_time) {
            p_sizing["subbeats_per_beat"] = p["time"];
        }
        if (p.hasOwnProperty("single_bar_sizing")) {
            const bar_width = (
                layout["sizing"]["subbeat_width"] * layout["sizing"]["subbeats_per_row"] / 2
            );
            p_sizing = {
                ...p_sizing,
                "bars_per_row": 1,
                "after_width": (
                    layout["sizing"]["total_width"]
                    - layout["sizing"]["pre_width"]
                    - bar_width
                ),
            };
        }
        p["sizing"] = fill_sizing({
            ...p_sizing,
            ...(p.hasOwnProperty("sizing") ? p["sizing"] : {}),
        }, layout["sizing"]["total_width"]);
    }
}

function convert_tune([tune_name, {displayName, time, patterns}]) {
    fill_patterns(patterns);
    const layout = TUNE_LAYOUTS.hasOwnProperty(tune_name) ? {...TUNE_LAYOUTS[tune_name]} : {};
    layout["patterns"] = _convert_patterns(patterns, layout, time);

    _set_sizing(layout, time);

    return {
        "name": !!displayName ? displayName : tune_name,
        "pages": [Object.keys(layout["patterns"]).filter(p => layout["patterns"][p] !== false)],
        ...layout,
    }
}

window.addEventListener("load", () => {
    Object.entries(RAW_TUNES)
        .filter(([tune_name, {patterns}]) => {
            return true;
            /* For testing purposes, you can restrict the selection:

            return [
                "General Breaks",
                "Afoxe",
                "Angela Davis",
                "Angry Dwarfs",
                "Antitek",
                "Bella Ciao",
                "Bhangra",
                "Bomba",
                "Chichita",
                "Coupe-Decale",
                "Cochabamba",
                "Custard",
                "Crazy Monkey",
                "Drum&Bass",
                "Funk",
                "Hafla",
                "Hedgehog",
                "Jungle",
                "Kaerajaan",
                "Karla Shnikov",
                "Malkhas Akhber",
                "March for Biodiversity",
                "No Border Bossa",
                "Menaiek",
                "Norppa",
                "Nova Balanca",
                "Orangutan",
                "Pekurinen",
                "Rope Skipping",
                "Ragga",
                "Sambasso",
                "Samba Reggae",
                "Sheffield Samba Reggae",
                "Police",
                "Tequila",
                "The Roof Is on Fire",
                "The Sirens of Titan",
                "Trans-Europa-Express",
                "Van Harte Pardon",
                "Voodoo",
                "Walc(z)",
                "Wolf",
                "Xango",
                "Zurav Love / Truant",
            ].indexOf(tune_name) >= 0;

            */
        })
        .map(convert_tune)
        .map(render_tune);
});
