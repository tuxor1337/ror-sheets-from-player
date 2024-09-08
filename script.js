
import RAW_TUNES from "./defaultTunes.js";

import TUNE_LAYOUTS from "./tuneLayouts.js";

const NOTE_CHARS = {
    " ": "",
    "Ş": "ls",
    "Ꞩ": "ms",
    "Ŝ": "hs",
    "Ṧ": "mhs",
    "Š": "sn",
    "o": "l",
    "a": "h",
    "f": "fl",
    "h": "hd",
    "r": "ri",
    "s": "sil",
    "z": "s",
};

const BREAK_CHARS = {
    "as": "S",
    "ls": "Ş",
    "ms": "Ꞩ",
    "hs": "Ŝ",
    "mhs": "Ṧ",
    "re": "R",
    "sn": "Š",
    "ta": "T",
}

const INSTRU_NAMES = {
    "as": "All Surdos",
    "ls": "Low Surdo",
    "ms": "Mid Surdo",
    "hs": "High Surdo",
    "mhs": "Mid+High Surdo",
    "re": "Repinique",
    "sn": "Snare",
    "ta": "Tamborim",
    "ag": "Agogô",
    "ot": "Whistle",
}

const INSTRU_ORDER = ["as", "ls", "ms", "hs", "mhs", "re", "sn", "ta", "ag", "ot"];

function render_tune(tune) {
    const sizing = {
        "pre_width": 9,
        "after_width": 0,
        ...tune["sizing"],
    };
    sizing["beats_per_row"] = sizing["beats_per_bar"] * sizing["bars_per_row"];
    sizing["subbeats_per_row"] = sizing["beats_per_row"] * sizing["subbeats_per_beat"];
    const total_width = sizing["subbeats_per_row"] > 16 ? 90 : 50;
    sizing["ncols"] = 3 + sizing["subbeats_per_row"];
    sizing["subbeat_width"] = (
        (total_width - sizing["pre_width"] - sizing["after_width"])
        / sizing["subbeats_per_row"]
    );

    for (let i_page = 0; i_page < tune["pages"].length; i_page++) {
        const page_order = tune["pages"][i_page];
        const el_section = document.createElement("section");
        el_section.innerHTML = `<div><h1></h1></div><div><table></table></div>`;
        const el_h1 = el_section.querySelector("h1");
        const el_table = el_section.querySelector("table");
        el_section.style.width = `${total_width}rem`;

        function render_header(main, aside) {
            el_h1.textContent = main;
            const el_h1_div = document.createElement("div");
            el_h1_div.textContent = aside;
            el_h1.appendChild(el_h1_div);
        }

        function tbl_add_colgroup() {
            const el_colgroup = document.createElement("colgroup");
            el_colgroup.innerHTML = `<col></col><col></col>`;
            for (let i = 0; i < sizing["subbeats_per_row"]; i++) {
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

        function tbl_add_tune_row(name, i_row, notation, override, upbeat) {
            upbeat = upbeat || 0;
            override = override || {};
            let el_tr = document.createElement("tr");
            el_tr.innerHTML = (
                `<td class="text"><div>${name}</div></td>` +
                `<td class="count">${i_row}</td>`
            );
            let offset = 0;
            if (upbeat > 0) {
                offset = sizing["subbeats_per_row"] - upbeat;
                const el_td = document.createElement("td");
                el_td.colSpan = offset;
                el_tr.appendChild(el_td);
            }
            for (let i = offset; i - offset < notation.length; i++) {
                let c = notation.charAt(i - offset);
                c = NOTE_CHARS.hasOwnProperty(c) ? NOTE_CHARS[c] : c;
                const el_td = document.createElement("td");
                el_td.classList.add("note");
                if (i != 0 && i % sizing["subbeats_per_beat"] == 0) {
                    const n_beat = i / sizing["subbeats_per_beat"];
                    el_td.classList.add(
                        n_beat % sizing["beats_per_bar"] == 0 ? "bar" : "beat"
                    );
                }
                if (override.hasOwnProperty(i - offset + 1)) {
                    const [len, str, align] = override[i - offset + 1]
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

        function tbl_add_tune(variant_name, data) {
            if (variant_name !== "") {
                const el_tr = document.createElement("tr");
                el_tr.classList.add("heading");
                const el_td = document.createElement("td");
                el_td.colSpan = sizing["ncols"];
                el_td.classList.add("text");
                el_td.textContent = variant_name;
                el_tr.appendChild(el_td);
                el_table.appendChild(el_tr);
            }
            const n_instr = Object.keys(data["notes"]).length;
            let i_instr = 0;
            const empty_line = " ".repeat(sizing["subbeats_per_row"]);
            for (const [instru_name, notes] of Object.entries(data["notes"])) {
                const n_lines = Math.ceil(notes.length / sizing["subbeats_per_row"]);
                const lines = [...Array(n_lines).keys()].map((i_line) => {
                    return notes.substr(
                        i_line * sizing["subbeats_per_row"],
                        sizing["subbeats_per_row"],
                    );
                });
                for (let i_line = 0; i_line < n_lines; i_line++) {
                    const l = lines[i_line];
                    let i_line_next = i_line + 1;
                    while (i_line_next < n_lines && l == lines[i_line_next]) {
                        i_line_next++;
                    }
                    let str_row = "";
                    if (n_lines > 1 || i_instr == 0) {
                        str_row += `${i_line + 1}`;
                        if (i_line_next > i_line + 1) {
                            str_row += `-${i_line_next}`;
                        }
                    }
                    tbl_add_tune_row(i_line == 0 ? instru_name : "", str_row, l);
                    i_line = i_line_next - 1;
                }
                if (i_instr + 1 < n_instr) {
                    tbl_add_tune_row("", "", empty_line);
                }
                i_instr++;
            }
        }

        function tbl_add_break(name, data) {
            const notes = data["notes"];
            const upbeat = data.hasOwnProperty("upbeat") ? data["upbeat"] : 0;
            const notes_override = data.hasOwnProperty("notes_override") ? data["notes_override"] : {};
            const n_lines = Math.ceil(notes.length / sizing["subbeats_per_row"]);
            const empty_line = " ".repeat(sizing["subbeats_per_row"]);
            name = data.hasOwnProperty("name") ? data["name"] : name;

            if (data.hasOwnProperty("preamble")) {
                const el_tr = document.createElement("tr");
                el_tr.innerHTML = (
                    `<td colspan="2"></td>` +
                    `<td class="text remark" colspan="${sizing["ncols"] - 2}">` +
                    `${data["preamble"]}</td>`
                );
                el_table.appendChild(el_tr);
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
                const offset = i_line * sizing["subbeats_per_row"];
                const override = {};
                for (const [start, d] of Object.entries(notes_override)) {
                    if (start > offset) {
                        override[start - offset] = d;
                    }
                }

                const l = lines[i_line];
                let i_line_next = i_line + 1;
                if (Object.keys(override).length == 0 && !data.hasOwnProperty("nosqueeze")) {
                    // only combine consecutive lines if there are no overrides
                    while (i_line_next < n_lines && l == lines[i_line_next]) {
                        i_line_next++;
                    }
                }

                let str_row = "";
                if (n_lines > 1) {
                    str_row += `${i_line + 1}`;
                    if (i_line_next > i_line + 1) {
                        str_row += `-${i_line_next}`;
                    }
                }

                lines_render.push({
                    "str_row": str_row,
                    "notation": l,
                    "override": override,
                });
                i_line = i_line_next - 1;
            }

            lines_render.forEach(({str_row, notation, override}, i_line) => {
                const el_tr = tbl_add_tune_row(
                    i_line == 0 ? name : "", str_row, notation, override, i_line == 0 ? upbeat : 0,
                );
                if (i_line == 0) {
                    el_tr.classList.add("break_start");
                }
                if (i_line == 1 && upbeat > 0) {
                    Array.from(el_tr.querySelectorAll("td")).forEach((el_td, i_td) => {
                        if (i_td >= 2 && i_td - 2 < sizing["subbeats_per_row"] - upbeat) {
                            el_td.classList.add("break_start");
                        }
                    });
                }
                if (i_line == lines_render.length - 1) {
                    el_tr.classList.add("break_end");
                }
                if (data.hasOwnProperty("aside")) {
                    const el_td = el_tr.lastChild;
                    if (i_line > 0) {
                        el_tr.removeChild(el_td);
                    } else {
                        el_td.rowSpan = lines_render.length;
                        el_td.classList.add("text");
                        el_td.textContent = data["aside"];
                    }
                }
                if (data.hasOwnProperty("subtitle") && i_line > 0) {
                    const el_td = el_tr.firstChild;
                    if (i_line > 1) {
                        el_tr.removeChild(el_td);
                    } else {
                        el_td.rowSpan = lines_render.length - 1;
                        el_td.classList.add("remark");
                        el_td.textContent = data["subtitle"];
                    }
                }
            });

            if (data.hasOwnProperty("remarks")) {
                for (let remark of data["remarks"]) {
                    const el_tr = document.createElement("tr");
                    el_tr.innerHTML = (
                        `<td class="text remark" colspan="${sizing["ncols"]}">${remark}</td>`
                    );
                    el_table.appendChild(el_tr);
                }
            }
        }

        if (i_page == 0) {
            render_header(
                tune["name"],
                tune.hasOwnProperty("sign") ? `tune sign: ${tune["sign"]}` : ""
            );
            tbl_add_colgroup();
            tbl_add_empty_row(true);
        } else {
            tbl_add_colgroup();
        }
        for (let i_break = 0; i_break < page_order.length; i_break++) {
            const name = page_order[i_break];
            const data = tune["patterns"][name];
            if (name == "Tune") {
                tbl_add_head();
                tbl_add_empty_row();
            }
            if (name.toLowerCase().indexOf("tune") >= 0) {
                tbl_add_tune(name, data);
            } else {
                tbl_add_break(name, data);
            }
            tbl_add_empty_row();

            if (name == "Tune") {

            }
        }
        document.body.appendChild(el_section);
    }
}

function resolve_pattern(notes) {
    for (let [instru, notation] of Object.entries(notes)) {
        if (typeof notation !== "string") {
            continue;
        }
        if (notation.charAt(0) == "@") {
            notes[instru] = notes[notation.substr(1)];
        }
    }
    // make sure at least these instruments are listed and make them silent if missing
    const len = notes[Object.keys(notes)[0]].length;
    ["ls", "ms", "hs", "re", "sn", "ta", "ag"]
        .filter(ins => !notes.hasOwnProperty(ins))
        .forEach(ins => {notes[ins] = " ".repeat(len);});
    if (notes["ms"] == notes["hs"]) {
        if (notes["ls"] == notes["ms"]) {
            notes["as"] = notes["ls"];
            delete notes["ls"];
            delete notes["ms"];
            delete notes["hs"];
        } else {
            notes["mhs"] = notes["ms"];
            delete notes["ms"];
            delete notes["hs"];
        }
    }
}

function convert_tune_pattern(notes) {
    const result = {};
    for (let instru of INSTRU_ORDER) {
        if (notes.hasOwnProperty(instru)) {
            result[INSTRU_NAMES[instru]] = notes[instru];
        }
    }
    return result;
}

function convert_break_pattern(notes) {
    const l_instrus = ["as", "re", "sn", "ta", "ag"];
    if (!notes.hasOwnProperty("as")) {
        l_instrus.splice(0, 1, "ls", "mhs");
        if (!notes.hasOwnProperty("mhs")) {
            l_instrus.splice(1, 1, "ms", "hs");
        }
    }
    const surdo = notes[l_instrus[0]];
    let notation = "";
    for (let i = 0; i < surdo.length; i++) {
        const ref_ins = l_instrus.find(ins => notes[ins].charAt(i) != " ");
        if (typeof ref_ins === "undefined") {
            notation += " ";
            continue;
        }
        const n_ref_ins = l_instrus.filter(ins => notes[ins].charAt(i) != " ").length;
        if (n_ref_ins > 1) {
            notation += n_ref_ins == l_instrus.length ? "E" : "A";
        } else if (ref_ins == "ag") {
            const ref = notes[ref_ins].charAt(i)
            notation += ref == "X" ? "o" : ref;
        } else {
            notation += BREAK_CHARS.hasOwnProperty(ref_ins) ? BREAK_CHARS[ref_ins] : ref_ins;
        }
    }
    return notation;
}

function convert_tune([tune_name, {patterns}]) {
    const layout = TUNE_LAYOUTS.hasOwnProperty(tune_name) ? {...TUNE_LAYOUTS[tune_name]} : {};
    const layout_patterns = layout.hasOwnProperty("patterns") ? layout["patterns"] : {};
    layout["patterns"] = {...layout_patterns};
    for (const [break_name, notes] of Object.entries(patterns)) {
        const ref = layout_patterns.hasOwnProperty(break_name) ? layout_patterns[break_name] : {};
        if (ref === false) {
            // layout spec tells us to omit this break
            continue;
        }
        const p = {...ref};
        if (!p.hasOwnProperty("notes")) {
            resolve_pattern(notes);
            p["notes"] = (
                break_name.toLowerCase().indexOf("tune") >= 0
                ? convert_tune_pattern(notes)
                : convert_break_pattern(notes)
            );
            if (notes.hasOwnProperty("upbeat")) {
                p["upbeat"] = notes["upbeat"];
            }
        }
        layout["patterns"][break_name] = p;
    }
    return {
        "name": tune_name,
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
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
                "Funk",
                "Karla Shnikov",
                "Walc(z)"
            ].indexOf(tune_name) >= 0;

            */
        })
        .map(convert_tune)
        .map(render_tune);
});
