const NOTE_CHARS = {
  ' ': '',
  Ş: 'ls',
  Ꞩ: 'ms',
  Ŝ: 'hs',
  Ṧ: 'mhs',
  'Ꟊ': 'lms',
  Š: 'sn',
  o: 'l',
  a: 'h',
  å: 'ag',
  f: 'fl',
  h: 'hd',
  r: 'ri',
  s: 'sil',
  þ: 'T+h',
  t: 'w',
  z: 's',
  y: 'Pr',
  w: 'pr',
}

interface Cell {
  classList?: string[]
  colSpan?: number
  rowSpan?: number
  content?: string
}

function newCell(cell: Cell): Cell {
  return {
    classList: [],
    colSpan: 1,
    rowSpan: 1,
    content: '',
    ...cell,
  }
}

export function hasOwn(obj: any, property: string): any {
  return Object.prototype.hasOwnProperty.call(obj, property)
}

export function noteCharToRepr(c: string): string {
  return hasOwn(NOTE_CHARS, c) ? NOTE_CHARS[c] : c
}

export const INSTRU_NAMES = {
  as: 'All Surdos',
  ls: 'Low Surdo',
  ms: 'Mid Surdo',
  hs: 'High Surdo',
  mhs: 'Mid+High Surdo',
  lms: 'Low+Mid Surdo',
  re: 'Repinique',
  sn: 'Snare',
  ta: 'Tamborim',
  ag: 'Agogô',
  sh: 'Shaker',
  ot: 'Whistle',
}

export function tuneLineToCells(sizing, name, i_row, notation, override, upbeat, print_upbeats): Cell[] {
  upbeat = upbeat || 0
  override = override || {}
  const cells = [
    newCell({ classList: ['text'], content: name }),
    newCell({ classList: ['count'], content: `${i_row}` }),
  ]

  let upbeat_notes = ''
  if (print_upbeats) {
    upbeat_notes = notation.slice(0, upbeat)
    notation = notation.slice(upbeat)
    upbeat = 0
  }

  let offset = sizing['upbeats'] - upbeat_notes.length
  for (let i = 0; i < sizing['upbeats']; i++) {
    const cell = newCell({})
    if (i >= offset) {
      cell.classList.push('note')
      cell.classList.push('upbeat')
      cell.content = noteCharToRepr(upbeat_notes.charAt(i - offset))
    }
    cells.push(cell)
  }

  let afterbeat_notes = ''
  if (notation.length - upbeat - sizing['subbeats_per_row'] > 0) {
    afterbeat_notes = notation.slice(-sizing['afterbeats'])
    notation = notation.slice(0, -sizing['afterbeats'])
  }

  offset = 0
  if (upbeat > 0) {
    offset = sizing['subbeats_per_row'] - upbeat
    cells.push({ classList: [], colSpan: offset, content: '' })
  }
  for (let i = offset; i - offset < notation.length; i++) {
    let c = noteCharToRepr(notation.charAt(i - offset))
    const cell = newCell({ classList: ['note'] })
    if (i % sizing['subbeats_per_beat'] == 0 || (i == 0 && sizing['upbeats'] > 0)) {
      const n_beat = i / sizing['subbeats_per_beat']
      cell.classList.push(n_beat != 0 && n_beat % sizing['beats_per_bar'] == 0 ? 'bar' : 'beat')
    }
    if (hasOwn(override, i - offset + 1)) {
      const [len, str, align] = override[i - offset + 1]
      c = str
      cell.colSpan = len
      cell.style = { textAlign: align }
      cell.classList.push('long')
      i += len - 1
    } else if (c.length > 3) {
      cell.classList.push('long')
    }
    cell.content = c
    cells.push(cell)
  }
  if (notation.length < sizing['subbeats_per_row'] && upbeat == 0) {
    const cell = newCell({
      classList: ['silent'],
      colSpan: sizing['subbeats_per_row'] - notation.length,
    })
    const n_beat = notation.length / sizing['subbeats_per_beat']
    if (n_beat != 0 && n_beat % sizing['beats_per_bar'] == 0) {
      cell.classList.push('bar')
    }
    cells.push(cell)
  }

  // add afterbeats
  for (let i = 0; i < afterbeat_notes.length; i++) {
    cells.push(
      newCell({
        classList: ['note', 'afterbeat'],
        content: noteCharToRepr(afterbeat_notes.charAt(i)),
      }),
    )
  }
  if (sizing['afterbeats'] > afterbeat_notes.length) {
    cells.push(newCell({ colSpan: sizing['afterbeats'] - afterbeat_notes.length }))
  }

  // add empty element for "aside"
  cells.push(newCell({}))

  return cells
}
