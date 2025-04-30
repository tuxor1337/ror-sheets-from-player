
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
  "y": "Pr",
  "w": "pr",
};

export function note_char_to_repr(c) {
  return NOTE_CHARS.hasOwnProperty(c) ? NOTE_CHARS[c] : c;
}

export const INSTRU_NAMES = {
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

function tbl_tune_row_add_upbeats(el_tr, sizing, notation) {
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

function tbl_tune_row_add_afterbeats(el_tr, notation) {
  for (let i = 0; i < notation.length; i++) {
    const el_td = document.createElement("td");
    el_td.classList.add("note");
    el_td.classList.add("afterbeat");
    el_td.textContent = note_char_to_repr(notation.charAt(i));
    el_tr.appendChild(el_td);
  }
}

export function tbl_add_tune_row(el_tr, sizing, name, i_row, notation, override, upbeat, print_upbeats) {
  upbeat = upbeat || 0;
  override = override || {};
  el_tr.innerHTML = (
    `<td class="text"><div>${name}</div></td>` +
    `<td class="count">${i_row}</td>`
  );

  let upbeat_notes = "";
  if (print_upbeats) {
    upbeat_notes = notation.slice(0, upbeat);
    notation = notation.slice(upbeat);
    upbeat = 0;
  }
  tbl_tune_row_add_upbeats(el_tr, sizing, upbeat_notes);

  let afterbeat_notes = "";
  if (notation.length - upbeat - sizing["subbeats_per_row"] > 0) {
    afterbeat_notes = notation.slice(-sizing["afterbeats"]);
    notation = notation.slice(0, -sizing["afterbeats"]);
  }

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
    el_td.classList.add("silent");
    const n_beat = notation.length / sizing["subbeats_per_beat"];
    if (n_beat != 0 && n_beat % sizing["beats_per_bar"] == 0) {
      el_td.classList.add("bar");
    }
    el_tr.appendChild(el_td);
  }

  // add afterbeats
  if (afterbeat_notes.length > 0) {
    tbl_tune_row_add_afterbeats(el_tr, afterbeat_notes)
  }
  if (sizing["afterbeats"] > afterbeat_notes.length) {
    const el_td = document.createElement("td");
    el_td.colSpan = sizing["afterbeats"] - afterbeat_notes.length;
    el_tr.appendChild(el_td);
  }

  // add empty element for "aside"
  el_tr.appendChild(document.createElement("td"));
}
