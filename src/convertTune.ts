import TUNE_LAYOUTS from './tuneLayouts.ts'
import { hasOwn, noteCharToRepr, INSTRU_NAMES } from './common.ts'

const BREAK_CHARS = {
  as: 'S',
  ls: 'Ş',
  ms: 'Ꞩ',
  hs: 'Ŝ',
  mhs: 'Ṧ',
  lms: 'Ꟊ',
  re: 'R',
  sn: 'Š',
  ta: 'T',
  ot: 'c',
  sh: '.',
}

const INSTRU_ORDER = ['as', 'ls', 'ms', 'lms', 'hs', 'mhs', 're', 'sn', 'ta', 'ag', 'ot', 'sh']

function resolve_pattern(notes, no_high_surdo, sel_instrus, suppress) {
  const all_instruments = ['ls', 'ms', 'hs', 're', 'sn', 'ta', 'ag', 'ot']
  sel_instrus = sel_instrus || [...all_instruments.filter((ins) => hasOwn(notes, ins))]
  suppress = suppress || []
  for (const [instru, notation] of Object.entries(notes)) {
    if (typeof notation !== 'string') {
      continue
    }
    if (notation.charAt(0) == '@') {
      notes[instru] = notes[notation.substr(1)]
    }
  }
  let first_instru = Object.keys(notes).filter((ins) => sel_instrus.indexOf(ins) >= 0)
  if (first_instru.length == 0) {
    first_instru = Object.keys(notes).filter((ins) => ins.length == 2)[0]
  } else {
    first_instru = first_instru[0]
  }
  const len = notes[first_instru].length
  const empty_pattern = ' '.repeat(len)
  // make sure at least these instruments are listed and make them silent if missing
  all_instruments
    .filter((ins) => !hasOwn(notes, ins) || sel_instrus.indexOf(ins) < 0)
    .forEach((ins) => {
      notes[ins] = empty_pattern
    })
  for (const [ins, start, end] of suppress) {
    if (ins == '*') {
      for (const i of all_instruments) {
        notes[i] = notes[i].slice(0, start - 1) + ' '.repeat(end - start + 1) + notes[i].slice(end)
      }
    } else {
      notes[ins] =
        notes[ins].slice(0, start - 1) + ' '.repeat(end - start + 1) + notes[ins].slice(end)
    }
  }
  if (['ls', 'ms', 'hs', 'lms', 'mhs', 'as'].some((ins) => sel_instrus.indexOf(ins) >= 0)) {
    if (notes['ls'] == notes['ms'] && no_high_surdo) {
      sel_instrus = ['as', ...sel_instrus.filter((ins) => ['ls', 'ms', 'hs'].indexOf(ins) < 0)]
      notes['as'] = notes['ls']
      delete notes['ls']
      delete notes['ms']
    } else if (notes['ls'] == notes['ms'] && notes['ms'] != notes['hs']) {
      sel_instrus = ['lms', ...sel_instrus.filter((ins) => ['ls', 'ms'].indexOf(ins) < 0)]
      notes['lms'] = notes['ms']
      delete notes['ls']
      delete notes['ms']
    } else if (notes['ms'] == notes['hs']) {
      if (notes['ls'] == notes['ms']) {
        sel_instrus = ['as', ...sel_instrus.filter((ins) => ['ls', 'ms', 'hs'].indexOf(ins) < 0)]
        notes['as'] = notes['ls']
        delete notes['ls']
        delete notes['ms']
        delete notes['hs']
      } else {
        sel_instrus = ['mhs', ...sel_instrus.filter((ins) => ['ms', 'hs'].indexOf(ins) < 0)]
        notes['mhs'] = notes['ms']
        delete notes['ms']
        delete notes['hs']
      }
    }
  }
  return sel_instrus
}

function convert_tune_pattern(notes) {
  const result = {}
  for (const instru of INSTRU_ORDER) {
    if (hasOwn(notes, instru)) {
      result[instru] = notes[instru]
    }
  }
  return result
}

function _merge_instru_notes_i(notes, l_instrus, i) {
  const ref_ins = l_instrus.find((ins) => notes[ins].charAt(i) != ' ')
  if (typeof ref_ins === 'undefined') {
    return ' '
  }

  const ref_ins_all = l_instrus.filter((ins) => notes[ins].charAt(i) != ' ')
  const n_ref_ins = ref_ins_all.length
  if (n_ref_ins > 1) {
    const ref_is_surdos =
      (n_ref_ins == 2 && ref_ins_all.indexOf('lms') >= 0 && ref_ins_all.indexOf('hs') >= 0) ||
      (n_ref_ins == 2 && ref_ins_all.indexOf('lhs') >= 0 && ref_ins_all.indexOf('ms') >= 0) ||
      (n_ref_ins == 2 && ref_ins_all.indexOf('ls') >= 0 && ref_ins_all.indexOf('mhs') >= 0) ||
      (n_ref_ins == 3 &&
        ref_ins_all.indexOf('ls') >= 0 &&
        ref_ins_all.indexOf('ms') >= 0 &&
        ref_ins_all.indexOf('hs') >= 0)
    const ref_is_th =
      n_ref_ins == 2 &&
      ref_ins_all.indexOf('ta') >= 0 &&
      ref_ins_all.indexOf('ag') >= 0 &&
      notes['ag'].charAt(i) == 'a'
    if (ref_is_surdos) {
      return 'S'
    } else if (ref_is_th) {
      return 'þ'
    } else if (n_ref_ins < l_instrus.length) {
      return 'A'
    } else if (l_instrus.every((ins) => notes[ins].charAt(i) == 'r')) {
      return 'r'
    } else {
      return 'E'
    }
  } else if (ref_ins == 'ag') {
    const ref = notes[ref_ins].charAt(i)
    if (ref == 'a') {
      return ref
    }
    return [...notes[ref_ins]].every((c) => [' ', ref].indexOf(c) >= 0) ? 'å' : ref
  } else {
    const ref_note = notes[ref_ins].charAt(i)
    if (['.', 'f', 'h', 'r', 's', 'y', 'w'].indexOf(ref_note) >= 0) {
      return ref_note
    } else {
      return hasOwn(BREAK_CHARS, ref_ins) ? BREAK_CHARS[ref_ins] : ref_ins
    }
  }
}

function convert_break_pattern(notes, l_instrus, separate_instrus) {
  if (!l_instrus) {
    l_instrus = ['as', 're', 'sn', 'ta', 'ag']
    if (!notes?.as) {
      if (notes?.lms) {
        l_instrus.splice(0, 1, 'lms', 'hs')
      } else {
        l_instrus.splice(0, 1, 'ls', 'mhs')
        if (!notes?.mhs) {
          l_instrus.splice(1, 1, 'ms', 'hs')
        }
      }
    }
  }

  separate_instrus = separate_instrus || []

  const n_notes = Math.max(...l_instrus.map((ins) => (hasOwn(notes, ins) ? notes[ins].length : 0)))

  for (const ins of l_instrus) {
    notes[ins] = notes[ins].padEnd(n_notes, ' ')
  }

  const notation = ['', ...separate_instrus.map(() => '')]
  for (let i = 0; i < n_notes; i++) {
    let l_instrus_resid = l_instrus
    separate_instrus.forEach(([i_start, i_end, l_sub_instrus], i_sep) => {
      if (i_start > i || i_end < i) {
        notation[i_sep + 1] += ' '
        return
      }
      notation[i_sep + 1] += _merge_instru_notes_i(notes, l_sub_instrus, i)
      l_instrus_resid = l_instrus_resid.filter((ins) => l_sub_instrus.indexOf(ins) < 0)
    })
    notation[0] += _merge_instru_notes_i(notes, l_instrus_resid, i)
  }
  return notation
}

function auto_total_width(sizing) {
  sizing['landscape'] = sizing?.landscape ? sizing['landscape'] : sizing['bars_per_row'] > 1
  if (sizing['bars_per_row'] > 1 && !sizing['landscape']) {
    return 56
  }
  return sizing['landscape'] ? 66 : 41.9
}

function fill_sizing(sizing, total_width) {
  sizing = {
    pre_width: 9,
    after_width: 0,
    pre_count_width: 2.5,
    ...sizing,
  }
  sizing['beats_per_row'] = sizing['beats_per_bar'] * sizing['bars_per_row']
  sizing['subbeats_per_row'] = sizing['beats_per_row'] * sizing['subbeats_per_beat']
  sizing['ncols'] = 3 + sizing['upbeats'] + sizing['subbeats_per_row'] + sizing['afterbeats']
  sizing['pre_name_width'] = sizing['pre_width'] - sizing['pre_count_width']
  if (!sizing?.total_width) {
    sizing['total_width'] = total_width ? total_width : auto_total_width(sizing)
  }
  sizing['subbeat_width'] =
    (sizing['total_width'] - sizing['pre_width'] - sizing['after_width']) /
    (sizing['subbeats_per_row'] + sizing['upbeats'] + sizing['afterbeats'])
  return sizing
}

function auto_sizing(tune_n_subbeats, tune_time, tune_upbeat) {
  let sizing = {
    pre_width: 11,
    bars_per_row: 1,
    beats_per_bar: 4,
    subbeats_per_beat: tune_time,
    upbeats: tune_upbeat,
    afterbeats: 0,
  }
  const n_bars = (tune_n_subbeats - tune_upbeat) / (tune_time * sizing['beats_per_bar'])
  if (n_bars == 2) {
    // e.g. Funk, Afoxé
    sizing = {
      ...sizing,
      pre_width: 15.0,
      bars_per_row: 2,
    }
  } else if (n_bars == 4 && sizing['subbeats_per_beat'] == 3) {
    // e.g. Bhangra
    sizing = {
      ...sizing,
      pre_width: 14,
      bars_per_row: 2,
    }
  } else if (sizing['subbeats_per_beat'] == 12 && (n_bars == 2 || n_bars == 4)) {
    // e.g. Crazy Monkey (2), Rope Skipping (4)
    sizing = {
      ...sizing,
      bars_per_row: 2,
    }
  }
  return sizing
}

function get_tune_subbeats(patterns, time) {
  let tune_n_subbeats = 16
  let tune_time = time ? time : 4
  let tune_upbeat = 0
  for (const [breakName, p] of Object.entries(patterns)) {
    if (breakName.toLowerCase() != 'tune') {
      continue
    }
    tune_time = p['time']
    tune_upbeat = p['upbeat']
    tune_n_subbeats = Math.max(
      ...Object.keys(INSTRU_NAMES).map((ins) =>
        hasOwn(p.notes, ins) ? p['notes'][ins].length : 0,
      ),
    )
  }
  return [tune_n_subbeats, tune_time, tune_upbeat]
}

function fill_patterns(patterns) {
  for (const notes of Object.values(patterns)) {
    const time = notes?.time ? notes['time'] : 4
    const upbeat = notes?.upbeat ? notes['upbeat'] : 0
    const subbeats_per_bar = 4 * time
    for (const ins of Object.keys(INSTRU_NAMES)) {
      if (!hasOwn(notes, ins) || notes[ins].startsWith('@')) {
        continue
      }
      const n_bars = Math.ceil((notes[ins].length - upbeat) / subbeats_per_bar)
      notes[ins] = notes[ins].padEnd(upbeat + n_bars * subbeats_per_bar)
    }
  }
}

function _convert_triols(notes_12) {
  const n_beats = notes_12.length / 12
  let notes_4 = ''
  const override = {}
  for (let i_beat = 0; i_beat < n_beats; i_beat++) {
    const subbeats = [...notes_12.slice(i_beat * 12, (i_beat + 1) * 12)]
    const subbeats_transl = subbeats.map((c) => (c == ' ' ? ' ' : noteCharToRepr(c)))
    if (subbeats.every((c, i) => i % 3 == 0 || c == ' ')) {
      notes_4 += subbeats.filter((_, i) => i % 3 == 0).join('')
    } else if (subbeats.every((c, i) => i % 4 == 0 || c == ' ')) {
      notes_4 += '    '
      override[i_beat * 4 + 1] = [
        4,
        `[ ${subbeats_transl.filter((_, i) => i % 4 == 0).join(' ')} ]`,
        'center',
      ]
    } else {
      notes_4 += '    '
      override[i_beat * 4 + 1] = [4, `[${subbeats_transl.join(' ')}]`, 'center']
    }
  }
  return [notes_4, override]
}

function _merge_instruments(p) {
  const surdos = {
    ls: 'Ş',
    ms: 'Ꞩ',
    hs: 'Ŝ',
    mhs: 'Ṧ',
    lms: 'Ꟊ',
  }
  for (const [gname, gmembers] of Object.entries(p['merge_instruments'])) {
    let gnotes = p['notes'][gmembers[0]]
    if (gmembers.every((m) => hasOwn(surdos, m))) {
      gnotes = [...gnotes]
        .map((_, i_note) => {
          const gmembers_nz = gmembers.filter((m) => p['notes'][m].charAt(i_note) != ' ')
          if (gmembers_nz.length == 0) {
            return ' '
          }
          if (gmembers_nz.length == 1) {
            return surdos[gmembers_nz[0]]
          }
          return 'x'
        })
        .join('')
    }
    gmembers.forEach((m) => {
      delete p['notes'][m]
    })
    p['notes'][gname] = gnotes
  }
}

function _convert_patterns(patterns, layout, def_time) {
  def_time = def_time || 4
  const no_high_surdo = !Object.values(patterns).some((notes) => !!notes?.hs)
  const layout_patterns = layout?.patterns ? layout['patterns'] : {}
  const result = { ...layout_patterns }
  for (const [breakName, notes] of Object.entries(patterns)) {
    const ref = hasOwn(layout_patterns, breakName) ? layout_patterns[breakName] : {}
    if (ref === false) {
      // layout spec tells us to omit this break
      continue
    }
    const p = { ...ref }
    const is_tune = breakName.toLowerCase().indexOf('tune') >= 0
    const separate_instruments = p?.separate_instruments ? p['separate_instruments'] : false
    if (p?.sign) {
      if (separate_instruments) {
        p['preamble'] = p['sign']
      } else if (!!p?.single_bar_sizing && !p?.aside && !p?.aside_lines) {
        p['aside'] = `sign: ${p['sign']}`
      } else {
        p['subtitle'] = p['sign']
      }
    }
    if (!p?.notes || is_tune || separate_instruments) {
      p['instruments'] = resolve_pattern(
        notes,
        no_high_surdo,
        p['instruments'],
        p['suppress_instruments'],
      )

      if (notes?.upbeat) {
        p['upbeat'] = notes['upbeat']
      }

      if (is_tune || separate_instruments) {
        const override_notes = p?.notes ? p['notes'] : {}
        p['notes'] = convert_tune_pattern(notes)
        for (const ins in override_notes) {
          if (override_notes[ins] == '') {
            delete p['notes'][ins]
          } else {
            p['notes'][ins] = override_notes[ins]
          }
        }
        if (p?.merge_instruments) {
          _merge_instruments(p)
        }
        if (!p?.instru_order) {
          p['instru_order'] = [
            ...Object.keys(p['notes']).filter((ins) => {
              const l_notes = [...p['notes'][ins]]
              return (
                l_notes.some((c) => c != ' ') &&
                // only show Shaker if it is non-trivial:
                (l_notes.slice(p['upbeat']).some((c) => c != '.') || ins != 'sh')
              )
            }),
          ]
        }
        if (is_tune && !p?.instrument_groups) {
          const l_surdos = p['instru_order'].filter(
            (ins) => ['ls', 'ms', 'hs', 'lms', 'mhs', 'as'].indexOf(ins) >= 0,
          )
          if (l_surdos.length > 1) {
            p['instrument_groups'] = [l_surdos]
          }
        }
      } else {
        p['notes'] = convert_break_pattern(notes, p['instruments'], p['separate_lines'])
      }
    }
    result[breakName] = p
  }
  for (const [breakName, p] of Object.entries(result)) {
    if (p === false) {
      continue
    }
    const orig = hasOwn(patterns, breakName) ? patterns[breakName] : {}
    for (const [prop, def] of [
      ['time', def_time],
      ['upbeat', 0],
      ['name', breakName],
    ]) {
      if (!hasOwn(p, prop)) {
        p[prop] = hasOwn(orig, prop) ? orig[prop] : def
      }
    }
    if (p['time'] == 12) {
      let keys
      if (Array.isArray(p['notes'])) {
        keys = p['notes'].keys()
        p['notes_override'] = p?.notes_override ? p['notes_override'] : []
      } else {
        keys = Object.keys(p['notes'])
        p['notes_override'] = p?.notes_override ? p['notes_override'] : {}
      }
      for (const i_notes of keys) {
        const [notes_4, override_triols] = _convert_triols(p['notes'][i_notes])
        p['notes'][i_notes] = notes_4
        p['notes_override'][i_notes] = override_triols
      }
      p['time'] = 4
    }
  }
  return result
}

function _set_sizing(layout, time) {
  const [tune_n_subbeats, tune_time, tune_upbeat] = get_tune_subbeats(layout['patterns'], time)
  const base_sizing = {
    ...auto_sizing(tune_n_subbeats, tune_time, tune_upbeat),
    ...(layout?.sizing ? layout['sizing'] : {}),
  }
  layout['sizing'] = fill_sizing(base_sizing)

  for (const p of Object.values(layout['patterns'])) {
    if (p === false) {
      continue
    }
    let p_sizing = { ...base_sizing }
    if (p['time'] != tune_time) {
      p_sizing['subbeats_per_beat'] = p['time']
    }
    if (p?.single_bar_sizing) {
      const bar_width =
        (layout['sizing']['subbeat_width'] * layout['sizing']['subbeats_per_row']) / 2
      p_sizing = {
        ...p_sizing,
        bars_per_row: 1,
        after_width:
          layout['sizing']['total_width'] -
          layout['sizing']['pre_width'] -
          layout['sizing']['upbeats'] * layout['sizing']['subbeat_width'] -
          bar_width,
      }
    }
    p['sizing'] = fill_sizing(
      {
        ...p_sizing,
        ...(p?.sizing ? p['sizing'] : {}),
      },
      layout['sizing']['total_width'],
    )
  }
}

export default function (tuneName, { displayName, time, patterns }) {
  fill_patterns(patterns)
  const layout = hasOwn(TUNE_LAYOUTS, tuneName) ? { ...TUNE_LAYOUTS[tuneName] } : {}
  layout['patterns'] = _convert_patterns(patterns, layout, time)

  _set_sizing(layout, time)

  return {
    name: displayName ? displayName : tuneName,
    pages: [Object.keys(layout['patterns']).filter((p) => layout['patterns'][p] !== false)],
    ...layout,
  }
}
