
function shift_override_offsets(obj, offset) {
    let dest = {};
    for (const key in obj) {
        dest[parseInt(key) + offset] = obj[key];
    }
    return dest;
}

export default {
    "General Breaks": {
        "sizing": {
            "pre_width": 15,
            "after_width": 9.5,
        },
        "patterns": {
            "4 Silence": {
                // DIFFERENCE name
                "name": "Silence",
                "aside": "4 Beats of Silence",
                "remarks": ["4 fingers"],
                "nosqueeze": true,
            },
            "8 Silence": {
                // DIFFERENCE name
                "name": "Double Silence",
                "aside": "8 Beats of Silence",
                "sign": "two hands show 4 fingers",
                "nosqueeze": true,
            },
            "12 Silence": {
                // DIFFERENCE name
                "name": "Triple Silence",
                "aside": "12 Beats of Silence",
                "sign": "like “Double Silence” one hand upside down",
                "nosqueeze": true,
            },
            "16 Silence": {
                // DIFFERENCE name
                "name": "Quad Silence",
                "aside": "16 Beats of Silence",
                "sign": "like “Double Silence” both hands upside down",
                "nosqueeze": true,
            },
            "Continue for One Bar": {
                "notes": ["................"],
                "aside": "Continue 4 Beats",
                "remarks": ["draw a horizontal line in the air with one finger"],
                "nosqueeze": true,
            },
            "Continue for Two Bars": {
                "notes": ["................................"],
                "aside": "Continue 8 Beats",
                "sign": "like “continue for one bar” with both hands",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "Continue for Three Bars": {
                "notes": ["................................................"],
                "aside": "Continue 12 Beats",
                "sign": (
                    "like “continue for two bars” and then “continue for one bar”"
                    + " in the opposite direction"
                ),
                "subtitle_extra_lines": 2,
                "nosqueeze": true,
            },
            "Continue for Four Bars": {
                "notes": ["................................................................"],
                "aside": "Continue 16 Beats",
                "sign": (
                    "like “continue for two bars” and then again in the opposite direction"
                ),
                "nosqueeze": true,
            },
            "Boom Break": {
                "remarks": ["Show an explosion away from your body with both hands"],
            },
            "8 up": {
                // DIFFERENCE name
                "name": "Eight Up",
                "aside": "from soft to loud",
                "sign": "both hands move up while fingers shaking",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "8 down": {
                // DIFFERENCE name
                "name": "Eight Down",
                "aside": "from loud to soft",
                "sign": "both hands move down while fingers shaking",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "Karla Break": {
                "aside": "from soft to loud",
                "sign": "rabbit ears OR finger pistol shooting up",
                "nosqueeze": true,
            },
            "Oi/Ua Break": {
                // DIFFERENCE: part of special breaks
                "notes": ["E   E   E   Ș   "],
                "notes_override": [{
                    5: [4, "[ E E E ]", "center"],
                    13: [4, "shout...", "left"],
                }],
                "remarks": [
                    "... “oi”: two arms crossing, with OK-sign",
                    "... “ua”: two fists, knuckles hit each other",
                ],
            },
            "Cat Break": {
                // DIFFERENCE: missing in player
                "notes": ["                "],
                "notes_override": [{
                    1: [1, "m", "center"],
                    5: [1, "i", "center"],
                    9: [1, "a", "center"],
                    13: [1, "u", "center"],
                }],
                "remarks": ["from high to low sound"],
                "sign": "claws to left and right",
                "subtitle_extra_lines": 1,
            },
            "Wolf Break": {
                // DIFFERENCE: part of special breaks, subbeat at end of line 3
                "notes": [(
                    "S S A SSS S A  S" +
                    "S S A  SS S A   " +
                    "S S A SSS S A  E" +
                    "E E E E         "
                )],
                "notes_override": [{
                    60: [1, "a", "center"],
                    61: [1, "u", "center"],
                    62: [1, "-", "center"],
                    63: [1, "-", "center"],
                    64: [1, "-", "center"],
                }],
                "sign": "wolf's ears and teeth",
                "subtitle_extra_lines": 1,
                "remarks": ["< a - u = like a howling wolf"],
            },
            "Democracy Break": {
                // DIFFERENCE: part of shouting breaks
                "notes": [(
                    "EEEEEEEEEEEEEEEE" +
                    "EEEEEEEEEEEEEEEE" +
                    "EEEEEEEEEEEEEEEE" +
                    "                " +
                    "E E E EE EE E E " +
                    "                " +
                    "E E E EE EE E E " +
                    "                " +
                    "                " +
                    "                " +
                    "E E E EE EE E E "
                )],
                "notes_override": Object.assign({}, ...(
                    [48, 80, 112, 128, 144].map((offset) => shift_override_offsets({
                        1: [2, "This", "left"],
                        3: [2, "is", "left"],
                        5: [2, "what", "left"],
                        7: [2, "demo", "left"],
                        10: [2, "crazy", "left"],
                        13: [2, "looks", "left"],
                        15: [2, "like", "left"],
                    }, offset))
                )),
                "sign": "shout with your hands forming a funnel",
                "aside_lines": {
                    1: [3, "from soft to loud"],
                    8: [3, "from soft to loud"],
                },
                "nosqueeze": true,
            },
            "Laughing Break": {
                // DIFFERENCE: missing in player
                "notes": ["EEEEEEEEEEEEE   "],
                "notes_override": [{
                    1: [1, "ha", "center"],
                    2: [1, "ha", "center"],
                    3: [1, "ha", "center"],
                    4: [1, "ha", "center"],
                    5: [1, "ha", "center"],
                    6: [1, "ha", "center"],
                    7: [1, "ha", "center"],
                    8: [1, "ha", "center"],
                    9: [1, "ha", "center"],
                    10: [1, "ha", "center"],
                    11: [1, "ha", "center"],
                    12: [1, "ha", "center"],
                    13: [1, "ha", "center"],
                }],
                "aside": "laughter",
                "sign": "fingers move up corners of your mouth",
                "subtitle_extra_lines": 2,
                "remarks": ["from high to low sound"],
            },
            "Star Wars Break": {
                // DIFFERENCE: part of special breaks in player
                "notes": [(
                    "Ꞩ   Ꞩ   Ꞩ   Ş  Ŝ" +
                    "Ꞩ   Ş  ŜꞨ       "
                )],
                "sign": "Move flat hand from top to bottom of face",
                "subtitle_extra_lines": 1,
            },
            "Progressive": {
                // DIFFERENCE name
                "name": "Progressive Break",
                "sign": "5 fingers and other hand grabbing thumb",
                "remarks": ["(can be inverted by showing the sign upside down)"],
            },
            "Progressive Karla": {
                "sign": "rabbit ears OR finger pistol, the other hand is grabbing the thumb",
            },
            "Clave": {
                "remarks": [
                    "Point your thumb and index finger up as if indicating a distance of"
                    + " about 10 cm between them",
                ],
            },
            "Clave Inverted": {
                "name": "Clave inverted",
                "remarks": ["Like “Clave”, but with the two fingers pointing down"],
            },
            "Yala Break": {
                "remarks": ["all fingertips of one hand gather and shake wrist"],
            },
            "Dance Break": {
                // DIFFERENCE: part of shouting breaks in player
                "notes": ["                "],
                "notes_override": [{
                    1: [2, "E-", "left"],
                    3: [2, "very", "left"],
                    5: [2, "bo-", "left"],
                    7: [2, "dy", "left"],
                    9: [4, "dance", "left"],
                    13: [4, "now", "left"],
                }],
                "aside": "Everybody sings",
                "sign": (
                    "Show a > with your index+middle finger and move it horizontally in front"
                    + " of your eyes"
                ),
                "subtitle_extra_lines": 4,
                "remarks": [
                    "After the break, everyone continues to play",
                    "walking around dancing randomly for a while",
                ],
            },
            "Hard Core Break": {
                // DIFFERENCE: part of special breaks in player
                "notes": [(
                    "l l l l l l l EE" +
                    "E l l l l l l EE" +
                    "E l l l l l l EE" +
                    "E l l l EEEEEEEE" +
                    "E e e e e e e EE" +
                    "E e e e e e e EE" +
                    "E e e e e e e EE" +
                    "E e e e EEEEEEEE"
                )],
                "sign": "Both hands in the air, with index and pinky fingers pointing up",
                "subtitle_extra_lines": 3,
                "remarks": [
                    "l = Agogô plays low, e = everyone play softly",
                    "2nd time: everyone except Surdos",
                    "4th time Agogô plays high",
                ],
                "aside_lines": {
                    5: [4, "3 × from soft to loud"],
                },
                "nosqueeze": true,
            },
            "4 times from soft to loud": {
                "text": {
                    "content": (
                        "When any break or sequence of breaks is shown followed by this sign,"
                        + " it should be played 4 times, starting very quietly and getting"
                        + " louder each time."
                    ),
                    "rows": 2,
                },
                "sign": (
                    "Hold one arm vertically in front of your body and move the other"
                    + " up along the arm"
                ),
                "subtitle_extra_lines": 1,
            },
            "Tamborim Stroke": {
                "text": {
                    "content": "Everyone plays the line of the tamborim once",
                    "rows": 1,
                },
                "sign": "Make a circle with your index finger and thumb, like “OK”",
                "subtitle_extra_lines": 2,
            },
            "Play another instrument": {
                "text": {
                    "content": (
                        "Show this sign followed by the sign of an instrument to make everyone"
                        + " play the line of that instrument"
                    ),
                    "rows": 2,
                },
                "sign": (
                    "Hold both hands in front of your face, and wave your arms to cross"
                    + " each other"
                ),
                "subtitle_extra_lines": 1,
            },
            "Switch Call/Response": {
                "text": {
                    "content": (
                        "Call and responding instruments switch roles. Only works in Call+Response"
                        + " breaks, for example Wolf Break or Funk Break 1."
                    ),
                    "rows": 2,
                },
                "sign": (
                    "Point with both index fingers forward and wave your arms to cross each other"
                    + " each other"
                ),
                "subtitle_extra_lines": 1,
            },
            "In a loop": {
                "text": {
                    "content": (
                        "When any break or sequence of breaks is shown followed by this sign, it"
                        + " should be repeated continuously until the maestra instructs to play"
                        + " something else."
                    ),
                    "rows": 2,
                },
                "sign": (
                    "Hold one arm vertically in front of your body and make a wave over it with"
                    + " the other hand"
                ),
                "subtitle_extra_lines": 1,
            },
            "Storming Break": {
                "text": {
                    "content": (
                        "chosen instrument section plays sixteenths with volumen indicated by"
                        + " maestra if you can't stand it anymore: scream"
                    ),
                    "rows": 2,
                },
                "sign": (
                    "show the arm as a measure with the other hand on elbow don't make a fist"
                ),
                "subtitle_extra_lines": 1,
            },
            "Alerting / Magic Wand Break": {
                "text": {
                    "content": (
                        "Stop the Surdos. Give a sign for when the Surdos should hit once, by"
                        + " hitting the stick on the hand in the air. It's easier to follow if"
                        + " you paint a small loop in the air with your stick, just before"
                        + " hitting. Start with just one hit every four beats, then add more."
                    ),
                    "rows": 4,
                },
                "sign": "show your flat hand and hit it with stick",
            },
            "Chaos Break": {
                "text": {
                    "content": (
                        "Everyone plays something chaotic, getting louder and louder."
                        + " No counting in!"
                    ),
                    "rows": 2,
                },
                "sign": "Point with index finger at temple",
            },
            "Again": {
                "text": {
                    "content": "Repeat the last break (combination)",
                    "rows": 1,
                },
                "sign": "Hit with flat hand on forehead",
                "subtitle_extra_lines": 1,
            },
            "Improvisation": {
                "text": {
                    "content": (
                        "Show all others what they should do in the meantime, so the length of"
                        + " the impro part is defined"
                    ),
                    "rows": 2,
                },
                "sign": "Point at your nose and at the sambista who can play freely",
                "subtitle_extra_lines": 2,
            },
        },
        "pages": [
            [
                "4 Silence",
                "8 Silence",
                "12 Silence",
                "16 Silence",
                "Continue for One Bar",
                "Continue for Two Bars",
                "Continue for Three Bars",
                "Continue for Four Bars",
                "Boom Break",
                "8 up",
                "8 down",
                "Karla Break",
                "Oi/Ua Break",
                "Cat Break",
            ],
            [
                "Wolf Break",
                "Democracy Break",
                "Laughing Break",
                "Star Wars Break",
                "Progressive",
                "Progressive Karla",
                "Clave",
                "Clave Inverted",
                "Yala Break",
                "Dance Break",
                "Hard Core Break",
            ],
            [
                "4 times from soft to loud",
                "Tamborim Stroke",
                "Play another instrument",
                "Switch Call/Response",
                "In a loop",
                "Storming Break",
                "Alerting / Magic Wand Break",
                "Chaos Break",
                "Again",
                "Improvisation",
            ],
        ],
        // TODO: "Notation" table at bottom of page
    },
    "Afoxe": {
        "sign": "shaving the armpit",
        "patterns": {
            "Break 2": {
                "notes": ["      S       S       S   SSSSS "],
                "remarks": ["S = Mid and high surdos, everybody else continues playing!"],
                "remarks_indent": 0,
            },
            "Break 3": {
                "instruments": ["ms", "hs"],
                "remarks": ["mhs = Mid and high surdos, everybody else continues playing!"],
                "remarks_indent": 0,
            },
            "Bra Break": {
                "sign": "With both hands point at yourself and then at the band",
                "subtitle_extra_lines": 1,
                "remarks": ["R = call by Repinique"],
                "remarks_indent": 0,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
                "Bra Break",
            ],
        ],
    },
    "Angela Davis": {
        "sign": "pull two prison bars apart in front of your face",
        "patterns": {
            "Tune": {
                "remarks": ["w = whippy stick (or rim)"],
                "notes": {
                    // DIFFERENCE: w and x are interchanged in player
                    "ls": "X X w  wXwX w   ",
                },
            },
            "Break 2": {
                "nosqueeze": true,
            },
            "Break 3": {
                "instruments": ["ls", "ms", "hs", "re", "ta", "ag"],
                "preamble": "snare continues playing through the break!",
                "remarks": ["repeat until cut"],
                "remarks_indent": 0,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
            ],
        ],
    },
    "Angry Dwarfs": {
        "sign": "looking angry, form an A with your hands over your head (as a taper hat)",
        "sizing": {
            "pre_width": 15,
        },
        "patterns": {
            "Intro": {
                // DIFFERENCE name
                "instruments": ["ls", "ms", "hs", "re", "sn", "ag"],
                "suppress_instruments": [
                    ["ls", 125, 128],
                    ["ms", 125, 128],
                    ["hs", 125, 128],
                ],
                "name": "Call Break",
                "preamble": (
                    "Tambs play 4× solo and then continue while the rest plays the break."
                    + " Surdos play the groove in the 4th beat of the last bar."
                ),
                "subtitle": "Intro",
                "nosqueeze": true,
            },
            "No-Cent-For-Axel-Break": {
                // DIFFERENCE name
                "name": "No Cent for Axel Break",
                "notes_override": [{
                    1: [1, "Kein", "center"],
                    2: [1, "Cent", "center"],
                    4: [1, "für", "center"],
                    5: [1, "Ax-", "center"],
                    7: [1, "el", "center"],
                }],
                "remarks": ["“No” gesture, then “money” gesture (rub thumb and index)"],
            },
            "Tension Break": {
                "notes_override": [{
                    5: [1, "Tls", "center"],
                    7: [1, "Tms", "center"],
                    21: [1, "Tls", "center"],
                    23: [1, "Tms", "center"],
                }],
                "preamble": "snare continues playing through the break!",
                "sign": "2 fingers running on the palm on the other hand",
                "subtitle_extra_lines": 1,
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "No-Cent-For-Axel-Break",
                "Tension Break",
            ],
        ],
    },
    "Antitek": {
        "sign": (
            "place your hands as if you're holding a telescope over one eye and rotate"
            + " your hands as if to zoom in and out"
        ),
        "patterns": {
            "Tune": {
                "notes_override": {
                    "re": {
                        28: [1, "(X)", "center"],
                    },
                    "sn": Object.assign({}, ...(
                        [...Array(16).keys()].map((offset) => shift_override_offsets({
                            2: [1, "(.)", "center"],
                        }, 2 * offset))
                    )),
                },
            },
            "Call Break": {
                "separate_instruments": true,
            },
            "Singing Break 1": {
                // DIFFERENCE: missing in player
                "notes": [(
                    "X  X  X           XXX X X       " +
                    "X  X  X           XXX X X       "
                )],
                "notes_override": [{
                    1: [1, "non", "left"],
                    4: [1, "non", "left"],
                    7: [1, "non", "left"],
                    19: [1, "c'est", "left"],
                    20: [1, "pas", "left"],
                    21: [1, "bien", "left"],
                    23: [1, "d'cas-", "left"],
                    25: [1, "ser", "left"],
                    33: [1, "sauf", "left"],
                    36: [1, "quand", "left"],
                    39: [1, "c'est", "left"],
                    51: [1, "quand", "left"],
                    52: [1, "on", "right"],
                    53: [1, "a", "left"],
                    55: [1, "ga-", "left"],
                    57: [1, "gner", "left"],
                }],
                "sign": "wave no-no with one hand, show 1 finger with another",
                "subtitle_extra_lines": 2,
            },
            "Singing Break 2": {
                // DIFFERENCE: missing in player
                "notes": [(
                    "X  X  X           XXX X X       " +
                    "X  X  X           XXX X X       "
                )],
                "notes_override": [{
                    1: [1, "non", "left"],
                    4: [1, "non", "left"],
                    7: [1, "non", "left"],
                    19: [1, "nous", "left"],
                    20: [1, "on", "left"],
                    21: [1, "cas-", "left"],
                    23: [1, "se", "left"],
                    25: [1, "pas", "left"],
                    33: [1, "sauf", "left"],
                    36: [1, "quand", "left"],
                    39: [1, "c'est", "left"],
                    51: [1, "c'est", "left"],
                    52: [1, "des", "left"],
                    53: [1, "ca-", "left"],
                    55: [1, "mé-", "left"],
                    57: [1, "ras", "left"],
                }],
                "sign": "same as singing break 1, but with 2 fingers",
                "subtitle_extra_lines": 2,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Call Break",
                "Singing Break 1",
                "Singing Break 2",
            ],
        ],
    },
    "Bella Ciao": {
        "sign": (
            "put the fingertips together with straight fingers, building a top of a mountain"
            + " with both hands"
        ),
        "patterns": {
            "Tune": {
                "notes_override": {
                    "sn": {
                        10: [1, "(X)", "center"],
                        26: [1, "(X)", "center"],
                        42: [1, "(X)", "center"],
                        58: [1, "(X)", "center"],
                    },
                },
            },
            "Break 3": {
                // DIFFERENCE: missing in player
                "notes": ["                                "],
                "notes_override": {
                    1: [2, "ciao", "left"],
                    5: [2, "bel-", "left"],
                    7: [1, "la", "left"],
                    9: [2, "ciao", "left"],
                    13: [2, "bel-", "left"],
                    15: [1, "la", "left"],
                    17: [2, "ciao", "left"],
                    21: [2, "ciao", "left"],
                    25: [2, "ciao", "left"],
                }
            },
            "Intro": {
                "upbeat": 6,
                "preamble": "everybody",
                "sign": (
                    "same as tune sign but with a movement: the two “sides of the mountain”"
                    + " approach each other"
                ),
                "nosqueeze": true,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
                "Intro",
            ],
        ],
    },
    "Bhangra": {
        "patterns": {
            "Tune": {
                "notes_override": {
                    "sn": Object.assign({}, ...(
                        [0, 1, 2, 3, 4, 5, 6, 7].map((offset) => (
                            shift_override_offsets({
                                1: [1, "r", "center"],
                                4: [1, "l", "center"],
                            }, 6 * offset)
                        ))
                    )),
                },
            },
            "Break 1": {
                "memory_aid": {
                    "upbeat": 6,
                    "notes": ["  XX  X XX X  XX  X  X  X XX  "],
                    "words": [
                        "I", "say", "do", "as", "I", "say,", "you", "old", "fool,",
                        "dam", "dam,", "I", "say",
                    ],
                },
                "nosqueeze": true,
            },
            "Break 2": {
                "memory_aid": {
                    "upbeat": 6,
                    "notes": [(
                        "  XX  " +
                        "X XX  X XX  X       XX  " +
                        "  X  XX  X  X       XX  "
                    )],
                    "words": [
                        "I", "want", "pa-", "pa-", "dam", "pa-", "pa-", "dam", "now.",
                        "I", "want", "paa-", "pa-", "dam", "right", "now.",
                    ],
                },
            },
            "Bra Break": {
                "single_bar_sizing": true,
                "notes_override": [{
                    94: [1, "eh", "center"],
                }],
                "aside_lines": {
                    1: [1, "R = Repinique"],
                    7: [1, "from soft to loud"],
                    8: [1, "eh = shout"],
                },
                "remarks_indent": 0,
                "nosqueeze": true,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
            ],
            [
                "Break 2",
                "Break 3",
                "Bra Break",
            ],
        ],
    },
    "Bomba": {
        "sign": (
            "As you grab a hand granade, take the secure with your mouth and throw it to the air."
        ),
        "patterns": {
            "Break 2": {
                "notes": {
                    // DIFFERENCE tune book doesn't have tam+agogo
                    "ta": "",
                    "ag": "",
                },
                "merge_instruments": {
                    "High Surdo + Repi": ["hs", "re"],
                },
                "instru_order": ["lms", "High Surdo + Repi", "sn"],
                "separate_instruments": true,
            },
            "Call Break": {
                // DIFFERENCE longer and different pattern in player
                "notes": ["S     S   RR  R R     RR  R   R "],
                "remarks": ["With both hands point at yourself and then at the band"],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Call Break",
            ],
        ],
    },
    "Chichita": {
        "sign": "make two fists and rub middle joints against each other",
        "patterns": {
            "Tune": {
                "notes": {
                    // DIFFERENCE: player has only Snare 1
                    "Snare 2": (
                        "ffX ffX ffXXX X " +
                        "ffX ffX ffXXX X " +
                        "ffX ffX ffXXX X " +
                        "X XXX X XXXXX X "
                    ),
                },
                "merge_instruments": {
                    "Snare 1": ["sn"],
                },
                "instru_order": [
                    "ls", "ms", "re",  "Snare 1", "Snare 2", "ag",
                ],
            },
            "Double Break 2": {
                "sign": "show 2 fingers with both hands",
            },
            "Intro": {
                "remarks": ["snare goes directly in tune after intro, others stop"],
                "remarks_indent": 0,
            },
            "End": {
                "text": {
                    "content": (
                        "Tune continues for 12 bars (3x repi-line) and gets constantly faster."
                        + " For the last 4 bars, everyone plays the last part of repi line."
                    ),
                    "rows": 3,
                },
                "sign": "2 fists diverge diagonally",
                "subtitle_extra_lines": 1,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Double Break 2",
                "Intro",
                "End",
            ],
        ],
        // TODO: explanatory text at bottom of page
    },
    "Coupe-Decale": {
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 2,
        },
        "patterns": {
            "Tune": {
                "merge_instruments": {
                    "Repi & Snare": ["re", "sn"],
                },
                "instru_order": [
                    "ls", "mhs", "Repi & Snare", "ta", "ag",
                ],
            },
            "Tune (6/8)": {
                "name": "Groove (6/8)",
            },
            "Intro": {
                "separate_instruments": true,
                "merge_instruments": {
                    "Repi & Snare": ["re", "sn"],
                    // DIFFERENCE no high surdo in player
                    "mhs": ["ms"],
                },
                "instru_order": [
                    "ls", "mhs", "Repi & Snare", "ta", "ag",
                ],
                "remarks": [
                    "16 bars in total. Repi&Snare start on rim, then Agogô join in,"
                    + " then Tamb joins, then Shaker. In the end, Surdos pick up.",
                ],
                "remarks_indent": 0,
            },
            "Break 1": {
                "single_bar_sizing": true,
                "aside_lines": {
                    1: [1, "fl, R: only Repi"],
                },
                "separate_lines": [
                    [0, 48, ["ag"]],
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Break 1",
            ],
            [
                "Break 2",
                "Tune (6/8)",
                "Intro (6/8)",
                "Crest Break (6/8)",
            ],
        ],
    },
    "Cochabamba": {
        "sign": "drink from a cup formed with one hand",
        "patterns": {
            "Tune": {
                "remarks": [
                    ". = clicking bells together",
                    "Make sure the off beat (2 and 4) is always very clear."
                    + " The snares have to exaggerate this off beat.",
                    "Make sure the high and low surdos fit together well;"
                    + " playing the offbeat with the left hand makes this easier.",
                ],
            },
            "Break 1": {
                "single_bar_sizing": true,
                "nosqueeze": true,
                "subtitle": "(Iron Lion Zion Break)",
                "aside": "Everyone together ... start soft and go louder!",
            },
            "Bra Break (Maestra)": {
                // DIFFERENCE name
                "name": "Call Break",
                "single_bar_sizing": true,
                "nosqueeze": true,
                "aside_lines": {
                    1: [1, "c = call by maestro (on repinique or snare)"],
                    2: [1, "A = All others answer"],
                },
                "remarks_indent": 0,
            },
            "Cross Kicks": {
                // DIFFERENCE name
                "name": "Cross Kicks for surdos",
                "separate_instruments": true,
                "instru_order": ["hs", "ls"],
                "sign": "sign 'X' with the arms, waving towards the sky",
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Bra Break (Maestra)",
                "Cross Kicks",
            ],
        ],
    },
    "Custard": {
        "sign": "make an offer to the sky",
        "patterns": {
            "Break 1": {
                "nosqueeze": true,
            },
            "Break 2": {
                "nosqueeze": true,
            },
            "Break 3": {
                "preamble": (
                    "ONE instrument section continues while the rest of the band plays this break"
                ),
                "sign": "+ instr. sign that continues",
                "separate_lines": [
                    [112, 127, ["sn"]],
                ],
            },
            "Singing Break": {
                "notes": [(
                    "                " +
                    "                " +
                    "                " +
                    "                "
                )],
                "notes_override": Object.assign({}, ...(
                    [0, 16, 32, 48].map((offset) => shift_override_offsets({
                        1: [1, offset == 48 ? "We've" : "I've", "left"],
                        3: [1, "got", "left"],
                        5: [1, "cus", "left"],
                        6: [1, "tard", "left"],
                        8: [1, "in", "left"],
                        10: [1, offset == 48 ? "our" : "my", "left"],
                        12: [1, "un", "left"],
                        14: [1, "der", "left"],
                        15: [1, "pants", "left"],
                    }, offset))
                )),
                "sign": "Signed as Break 1, with a lot of blabla...",
                "remarks": [
                    "Surdo players sing first half, same beats as they would play.",
                    "All other answer, same beats as they play.",
                    "Last part Everyone sings together.",
                ],
                "remarks_indent": 0,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
                "Break 5",
                "Singing Break",
            ],
        ],
    },
    "Crazy Monkey": {
        "sign": "scratch your head and your armpit at the same time like a monkey",
        "patterns": {
            "Tune": {
                "remarks": ["(x) = variations, [ ] = triplet"],
            },
            "Break 1": {
                "single_bar_sizing": true,
                "nosqueeze": true,
                "aside_lines": {
                    1: [1, "A = all others except agogô"],
                    2: [1, "E = everyone"],
                    3: [1, "ms = Mid Surdo"],
                },
            },
            "Break 2": {
                "single_bar_sizing": true,
                "nosqueeze": true,
                "aside_lines": {
                    1: [1, "sn = snare"],
                    2: [1, ". = dead note on snare"],
                    3: [1, "ms = Mid Surdo"],
                },
            },
            "Break 3": {
                "single_bar_sizing": true,
                "aside_lines": {
                    2: [1, "ms = Mid Surdo"],
                },
                "separate_lines": [
                    [16, 31, ["ag"]],
                ],
                "notes_override": [
                    {},
                    {
                        31: [1, "(h)", "center"],
                    }
                ],
            },
            "Bongo Break 1": {
                "sign": "play a bongo with one hand",
                "subtitle_extra_lines": 2,
                "remarks": ["play as loop"],
                "remarks_indent": 0,
                "separate_lines": [
                    [0, 31, ["ag"]],
                ],
            },
            "Bongo Break 2": {
                "sign": "play a bongo with two hands",
                "subtitle_extra_lines": 2,
                "remarks": ["play as loop"],
                "remarks_indent": 0,
                "separate_lines": [
                    [0, 31, ["ta", "re", "sn"]],
                    [0, 31, ["ag"]],
                ],
            },
            "Monkey Break": {
                // DIFFERENCE triols in book, regular 16th in player
                "single_bar_sizing": true,
                "sign": "like tune sign",
                "aside": "Shout like a monkey",
                "remarks": ["alternative: different rhythm or just chaotic voices"],
                "remarks_indent": 0,
                "notes_override": [{
                    1: [8, "[ U U U ]", "center"],
                    9: [8, "[ A A A ]", "center"],
                }],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
            ],
            [
                "Break 2",
                "Break 3",
                "Bongo Break 1",
                "Bongo Break 2",
                "Monkey Break",
            ],
        ],
    },
    "Drum&Bass": {
        "sign": "with one hand in your ear lift the other and move it front and back",
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Dance Break": {
                "single_bar_sizing": true,
                "notes": ["                "],
                "notes_override": [{
                    1: [2, "E-", "left"],
                    3: [2, "very", "left"],
                    5: [2, "bo-", "left"],
                    7: [2, "dy", "left"],
                    9: [4, "dance", "left"],
                    13: [4, "now", "left"],
                }],
                "remarks": [
                    "Show a > with your index+middle finger and move it horizontally in front"
                    + " of your eyes",
                ],
                "aside": "Everybody sings and starts dancing",
            },
            "Break 2": {
                "single_bar_sizing": true,
                "notes_override": [{
                    25: [1, "x", "center"],
                    26: [1, "x", "center"],
                    27: [1, "x", "center"],
                    28: [1, "x", "center"],
                }],
                "aside": "x = hits on snare and repi",
            },
            "Break 3": {
                "single_bar_sizing": true,
                "nosqueeze": true,
            },
            "Hip-Hop Break": {
                "sign": "hit your chest",
                "remarks_indent": 0,
                "remarks": [
                    "R = hit on repi,"
                    + " ri = repi hit on rim,"
                    + " sn = snare,"
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Dance Break",
                "Break 2",
                "Break 3",
                "Hip-Hop Break",
            ],
        ],
    },
    "Drunken Sailor": {
        "sign": "build an eyepatch with one hand in front of your eye",
        "sizing": {
            "pre_width": 13,
            "bars_per_row": 2,
        },
        "patterns": {
            "Tune": {
                "instrument_groups": [["ls", "ms", "hs"]],
            },
            "White Shark": {
                "sign": "simulating a shark fin",
                "separate_lines": [
                    [0, 127, ["ag"]],
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "White Shark",
            ],
        ],
    },
    "Funk": {
        "sign": "glasses on your eyes",
        "patterns": {
            "Tune (Variant 1)": false,
            "Tune (Variant 2)": false,
            "Oi/Ua Break": {
                "notes": ["E   E   E   Ș   "],
                "notes_override": [{
                    5: [4, "[ E E E ]", "center"],
                    13: [4, "shout...", "left"],
                }],
                "remarks": [
                    "... “oi”: two arms crossing, with OK-sign",
                    "... “ua”: two fists, knuckles hit each other",
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Oi/Ua Break",
            ],
        ],
    },
    "Hafla": {
        "sign": "spread arms and shake your shoulders and hips",
        "patterns": {
            // DIFFERENCE repi tune: x/ri are interchanged non-trivially
            // DIFFERENCE easier variant of snare tune is not in player
            "Tune": {
                "notes": {
                    "Snare (easier)": "..X...X.....X.....X...X.....X...",
                },
                "instru_order": [
                    "ls", "ms", "hs", "re", "sn",
                    "Snare (easier)", "ta", "ag",
                ],
            },
            "Yala Break": {
                "sign": "all fingertips of one hand gather and shake wrist",
                "subtitle_extra_lines": 1,
            },
            "Kick Back 1": {
                "single_bar_sizing": true,
                "suppress_instruments": [
                    ["*", 17, 64],
                ],
                "separate_lines": [
                    [0, 15, ["ag"]],
                ],
                "remarks_indent": 0,
                "remarks": [
                    "repeat until cut, ag = Agogô, switch low and high every two bars",
                ],
            },
            "Kick Back 2": {
                "notes_override": [{
                    31: [1, ".", "center"],
                    32: [1, ".", "center"],
                }],
                "remarks_indent": 0,
                "remarks": [
                    ". = snare playing silent note",
                ],
            },
            "Hook Break": {
                "sign": "two fingers hooked together",
                "subtitle_extra_lines": 1,
            },
        },
        "pages": [
            [
                "Tune",
                "Yala Break",
                "Kick Back 1",
                "Kick Back 2",
                "Break 3",
                "Hook Break",
            ],
        ],
    },
    "Hedgehog": {
        "sign": "spiky fingers on the head",
        "patterns": {
            // DIFFERENCE "count in from here" is not in player
            "Break 1": {
                "notes": [(
                    "                " +
                    "S   S   S   S   "
                )],
                "notes_override": [{
                    1: [6, "count in from here", "left"],
                }],
                "remarks_indent": 16,
                "remarks": [
                    "others continue playing",
                ],
            },
            "Break 2": {
                "name": "Hedgehog Call",
                "notes": [(
                    "                " +
                    "E               "
                )],
                "notes_override": [{
                    1: [6, "count in from here", "left"],
                    25: [4, "Hedge-", "left"],
                    29: [4, "hog", "left"],
                }],
                "sign": "Hedgehog Tune sign",
                "subtitle_extra_lines": 1,
                "remarks_indent": 24,
                "remarks": [
                    "call something else here",
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
            ],
        ],
    },
    "Hip Hop": {
        // DIFFERENCE name without space in tune book
        "sign": (
            "pointing with your index fingers to the ground,"
            + " your thumbs pointing towards each other"
        ),
        "patterns": {
            // DIFFERENCE Tamborim is shifted by one beat!
            "Break 1": {
                "remarks_indent": 0,
                "remarks": [
                    "(Count in break 1 for the second measure)",
                ],
            }
        },
        "pages": [
            [
                "Tune",
                "Kick Back 1",
                "Kick Back 2",
                "Break 1",
            ],
        ],
    },
    "Jungle": {
        "sign": (
            "swing your fist above your head and shake your body,"
            + " like dancing to techno music"
        ),
        // DIFFERENCE surdo tune: all three are slightly different
        // DIFFERENCE repi tune: shifted by one subbeat, last hit missing in player
        // DIFFERENCE agogô tune: last high-hit missing in player
    },
    "Kaerajaan": {
        "sign": (
            "place forearms on top of each other in front of you,"
            + " fingertips aligned with elbows (like in Estonian folk dance)"
        ),
        "patterns": {
            // DIFFERENCE agogo break 2: no low/high
            "Break 1": {
                "notes_override": [{
                    29: [4, "Hei!", "left"],
                }],
                "separate_lines": [
                    [0, 31, ["ag"]],
                ],
            },
            "Break 2": {
                "nosqueeze": true,
                "separate_lines": [
                    [0, 63, ["ag"]],
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
            ],
        ],
    },
    "Karla Shnikov": {
        "sign": (
            "move index+middle finger like rabbit ears and cover other fingers with other hand" +
            " OR point with finger pistol to head"
        ),
        "sizing": {
            "pre_width": 12.5,
        },
        "patterns": {
            "Karla Break": {
                // DIFFERENCE break is missing in player
                "notes": [(
                    "XXXXXXXXXXXXXXXX" +
                    "XXXXXXXXXXXXXXXX" +
                    "XXXXXXXXXXXXXXXX" +
                    "X               "
                )],
                "preamble": ">from soft to loud",
                "sign": "rabbit ears OR finger pistol shooting up",
                "nosqueeze": true,
            },
            "Break 2": {
                "nosqueeze": true,
            },
            "Break 2 Inverted": {
                "name": "Break 2 inverted",
                "sign": "sign with two fingers pointing down instead of up",
                "nosqueeze": true,
            },
        },
        "pages": [
            [
                "Tune",
                "Karla Break",
                "Break 2",
                "Break 2 Inverted",
            ],
        ],
    },
    "Malkhas Akhber": {
        "sign": (
            "put one fist on top of the other, as if you were"
            + " holding a paddle, and start paddling"
        ),
        "patterns": {
            "Hey Break": {
                "notes": ["XX  r           "],
                "notes_override": [{
                    9: [2, "Hey!", "left"],
                }],
                "sign": "make an X with your index fingers",
                "subtitle_extra_lines": 1,
            },
        },
        "pages": [
            [
                "Tune",
                "Hey Break",
            ]
        ],
    },
    "March for Biodiversity": {
        // DIFFERENCE no sign ?!
        "patterns": {
            "Intro": {
                "separate_instruments": true,
            },
            "Break 2": {
                "notes_override": [{
                    11: [1, "hey!", "left"],
                }],
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Break 1",
                "Break 2",
            ]
        ],
    },
    "No Border Bossa": {
        "sign": "interlock your hands like a fence and then open it",
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Tune": {
                // DIFFERENCE Agogô has no upbeat in player
                "notes": {
                    "Hand resting on skin:": (
                        ".......       ...." +
                        ".....       ...." +
                        ".....       ...." +
                        ".....       ...."
                    ),
                },
                "instrument_groups": [["as", "Hand resting on skin:"]],
                "remarks": [
                    "Surdos: only 1 Stick on one hand; h = other hand hits skin",
                ],
            },
            "Break 2": {
                "instruments": ["ls", "ms", "hs"],
                "preamble": "Surdos only, Rest continues",
                "remarks_indent": 0,
                "remarks": ["repeat until cut with Break 2*"],
            },
            "Break 2*": {
                "instruments": ["ls", "ms", "hs"],
                "preamble": "Surdos only, Rest continues",
                "remarks_indent": 0,
                "remarks": ["from soft to loud"],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 2*",
                "Bra Break",
            ]
        ],
    },
    "Menaiek": {
        "sign": (
            "put three fingers on your other upper arm"
            + " (like covering a police badge)"
        ),
        "patterns": {
            "Double Break": {
                "instru_order": ["ls", "ms", "hs", "ag"],
                "separate_instruments": true,
                "sign": "Make a T with both hands",
                "remarks": [
                    "Like the groove, but double speed."
                    + " Everyone else continues playing normally",
                ],
            },
            "Kick Back 1": {
                "single_bar_sizing": true,
                "separate_instruments": true,
                "merge_instruments": {
                    "All others": ["re", "sn", "ta"],
                },
                "remarks": ["repeat until cut"],
            },
            "Mozambique Break": {
                "single_bar_sizing": true,
                "separate_instruments": true,
                "merge_instruments": {
                    "All others": ["ag", "re", "sn", "ta"],
                },
                "sign": (
                    "Point both index fingers away from mouth (like bug antennas)"
                ),
                "remarks": ["sl = slap with thumb (by rotating the hand)"],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
            ],
            [
                "Double Break",
                "Kick Back 1",
                "Mozambique Break",
            ],
        ],
    },
    "Norppa": {
        // DIFFERENCE no sign?!
        "patterns": {
            "Break 1": {
                "notes": ["x.x.x.x.E       "],
                "notes_override": [{
                    13: [1, "Hey!", "left"],
                }],
                "remarks_indent": 0,
                "remarks": ["x, .: Snare"],
            },
            "Break 2": {
                "separate_instruments": true,
                "merge_instruments": {
                    "Surdos": ["ls", "ms", "hs"],
                },
                "instru_order": ["Surdos", "re", "sn", "ta", "ag"],
            },
            "Break 3": {
                "separate_instruments": true,
            },
            "Call break": {
                "notes_override": [{
                    5: [1, "Hey!", "left"],
                    13: [1, "Hey!", "left"],
                }],
            },
            "Shouting break": {
                "name": "Shouting Break",
                "notes_override": [{
                    3: [1, "🗣", "center"],
                    6: [1, "🗣", "center"],
                    7: [1, "🗣", "center"],
                    9: [1, "🗣", "center"],
                    11: [1, "🗣", "center"],
                }],
                "remarks_indent": 0,
                "remarks": ["🗣: Replace with own shout"],
            },
            "Break 5": {
                "separate_instruments": true,
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
                "Call break",
                "Shouting break",
                "Break 5",
            ],
        ],
    },
    "Nova Balanca": {
        "sign": "fists before breast, open hands and arms",
        "patterns": {
            "Bra Break": {
                "subtitle": "Intro",
                "nosqueeze": true,
            },
            "Break 1": {
                "preamble": "> from soft to loud!",
            },
        },
        "pages": [
            [
                "Tune",
                "Bra Break",
                "Break 1",
                "Break 2",
            ]
        ],
    },
    "Orangutan": {
        "sign": "monkey, both hands in armpits",
        "patterns": {
            "Funky gibbon": {
                "separate_instruments": true,
                "merge_instruments": {
                    "All others": ["re", "ta", "ag"],
                },
                "sign": "Upside down '3 creature'",
                "remarks": [
                    "Repeat until cut",
                    "ri = Everyone else hits the rim",
                ],
            },
            "Monkey break": {
                "notes_override": [{
                    1: [1, "oo", "center"],
                    9: [1, "oo", "center"],
                }],
                "sign": "One hand in armpit",
                "subtitle_extra_lines": 1,
                "remarks_indent": 0,
                "remarks": ["oo = Shout Ook!"],
            },
            "Speaking Break": {
                "notes": ["                "],
                "remarks_indent": 0,
                "remarks": ["Make monkey noises"],
            },
        },
        "pages": [
            [
                "Tune",
                "Funky gibbon",
                "Monkey break",
                "Break 2",
                "Speaking Break",
            ]
        ],
    },
    "Pekurinen": {
        // DIFFERENCE no sign?!
        "sizing": {
            "pre_width": 15,
            "bars_per_row": 1,
        },
        "patterns": {
            "Break 1": {
                "separate_instruments": true,
                "merge_instruments": {
                    "All others": ["as", "sn", "ta"],
                },
            },
            "Break 2": {
                "remarks_indent": 0,
                "remarks": ["A: only Repi, Snare & Tamb, E: all instruments, including Surdos"],
            },
            "Clave Plus": {
                "remarks": ["Like Clave, but vertically, like letter C"],
            },
            "Disco Barricade Break": {
                "notes_override": [{
                    1: [1, "Dis-", "center"],
                    3: [1, "co", "center"],
                    5: [1, "dis-", "center"],
                    7: [1, "co", "center"],
                    9: [1, "bar-", "center"],
                    11: [1, "ri-", "center"],
                    12: [1, "ca-", "center"],
                    14: [1, "do!", "center"],
                }],
                "sign": "Build barricade by stacking hands on each other",
                "subtitle_extra_lines": 1,
            },
            "Bra Break": {
                "separate_instruments": true,
                "merge_instruments": {
                    "All others": ["as", "sn"],
                },
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Break 3",
                "Clave Plus",
                "Disco Barricade Break",
                "Bra Break",
            ],
        ],
    },
    "Rope Skipping": {
        "sign": "sign with both hands a rotating rope and jump up and down",
        "sizing": {
            "bars_per_row": 2,
        },
        "patterns": {
            "Oh Shit": {
                "sign": "two little fingers show horns of taurus",
                "single_bar_sizing": true,
                "notes_override": [{
                    9: [1, "Oh", "left"],
                    13: [1, "Shit", "left"],
                }],
            },
            "Fuck Off": {
                "sign": "one little finger",
                "single_bar_sizing": true,
                "notes_override": [{
                    9: [1, "Fuck", "left"],
                    13: [1, "Off", "left"],
                }],
            },
            "Küsel Break": {
                // DIFFERENCE snare has a typo (?) in the tune book
                "sign": "hands twist head",
                "remarks_indent": 0,
                "remarks": ["all players turn around 360° while playing the break"],
                "separate_lines": [
                    [0, 31, ["sn"]],
                ],
            },
            "I like to move it": {
                "sign": "curling hands up and down",
                "subtitle_extra_lines": 2,
                "remarks_indent": 0,
                "remarks": ["Repi and Agogô; play as a loop"],
            },
            "Eye of the tiger": {
                "separate_lines": [
                    [0, 189, ["sn"]],
                ],
                "preamble": "Surdos (High, Middle, Low), Snare",
                "sign": "claws left and right",
            },
        },
        "pages": [
            [
                "Tune",
                "Oh Shit",
                "Fuck Off",
                "Break 1",
                "Break 2",
                "Break 3",
            ],
            [
                "Küsel Break",
                "Skipping Agogo",
                "I like to move it",
                "Eye of the tiger",
            ],
        ],
    },
    "Ragga": {
        "sign": "fists together, thumbs to the left and to the right",
        "patterns": {
            "Tune": {
                "notes_override": {
                    "hs": {
                        26: [1, "(X)", "center"],
                        27: [1, "(X)", "center"],
                        28: [1, "(X)", "center"],
                        29: [1, "(X)", "center"],
                    },
                    "re": {
                        // DIFFERENCE additional variation in tune book
                        29: [1, "(X)", "center"],
                    },
                    "sn": {
                        26: [1, "(X)", "center"],
                        29: [1, "(X)", "center"],
                    },
                    "ta": {
                        26: [1, "(X)", "center"],
                        29: [1, "(X)", "center"],
                    },
                },
            },
            "Kick Back 1": {
                "remarks_indent": 0,
                "remarks": ["repeat until counting in for Kick Back 2"],
                "sign": "thumb back over shoulder",
                "subtitle_extra_lines": 1,
            },
            "Kick Back 2": {
                // DIFFERENCE Agogô player aoaoaoao... instead of aaaaaaa...
                "remarks_indent": 0,
                "remarks": ["repeat until cut with one of the breaks"],
                "sign": "like Kick Back 1, but with two thumbs",
                "separate_lines": [
                    [0, 63, ["ag"]],
                ],
            },
            "Break 1": {
                // DIFFERENCE Break 1 is not in player
                "notes": ["S AS AS "],
                "remarks": [
                    "this break is only two counts long - afterwards continue"
                    + " normally with the first beat",
                ],
            },
            "Zorro-Break": {
                "remarks_indent": 0,
                "remarks": [
                    "others continue playing;"
                    + " repeat until cut with one of the breaks",
                ],
                "sign": "sign 'Z' in the air",
                "subtitle_extra_lines": 1,
            },
        },
        "pages": [
            [
                "Tune",
                "Kick Back 1",
                "Kick Back 2",
                "Break 1",
                "Break 2",
                "Break 3",
                "Zorro-Break",
            ]
        ],
    },
    "Sambasso": {
        "sign": (
            "V with 4 fingers (vulcan salute) on both hands,"
            + " slide the gaps into each other"
        ),
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 1,
        },
        "patterns": {
            "Tune": {
                "remarks": ["w = whippy stick"],
            },
            "Intro": {
                // DIFFERENCE [RRRRRR] from book is fl fl fl fl in player
                // TODO repeat group of three lines 4x with upbeat and afterbeat
                "name": "Call Break",
                "subtitle": "Intro",
                "remarks_indent": 0,
                "remarks": ["Last beat overlaps with first Repi beat"],
            },
            "Break 1": {
                "preamble": "Keep playing groove during first 2 beats",
                "remarks_indent": 0,
                "remarks": ["Pr = long whistle, pr = short whistle"],
            },
            "Break 2": {
                "remarks_indent": 0,
                "remarks": ["repeat 4 times"],
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Break 1",
                "Break 2",
            ]
        ],
    },
    "Samba Reggae": {
        "sign": "smoking a cigar/joint",
        "sizing": {
            "pre_width": 16,
        },
        "patterns": {
            "Bra Break": {
                "nosqueeze": true,
                "remarks_indent": 0,
                "remarks": ["ls = low surdo picks up"],
                "separate_lines": [
                    [64, 111, ["sn"]],
                ],
            },
            "Clave": {
                // DIFFERENCE Clave is not in player
                "notes": ["E  E  E   E E   "],
            },
            "Break 1": {
                "remarks_indent": 0,
                "remarks": ["hs = high surdo picks up"],
            },
            "Break 3": {
                "suppress_instruments": [
                    ["sn", 17, 128],
                ],
                "nosqueeze": true,
                "preamble": "snare continues playing this through the break",
                "remarks_indent": 0,
                "remarks": ["hs = high surdo picks up"],
                "separate_lines": [
                    [80, 111, ["ta", "ag"]],
                ],
            },
            "SOS Break": {
                // TODO: add info about Repi tune changes after playing this break
                "nosqueeze": true,
                "sign": "signed by waving the palms diagonal across one shoulder",
                "subtitle_extra_lines": 2,
                "remarks_indent": 0,
                "remarks": ["ls = low surdo picks up"],
            },
            "SOS Break (Repi change)": {
                // DIFFERENCE in Repi tune after playing SOS break is not in player
                "name": "",
                "preamble": (
                    "after which the repinique picks up this rhythm"
                    + " and plays in the tune:"
                ),
                "notes": ["  xx xx   x x   "],
            },
            "SOS Break (Repi change back)": {
                // DIFFERENCE in Repi tune after playing SOS break is not in player
                "name": "",
                "preamble": (
                    "... until next time the SOS break is played."
                    + " Then it goes back to:"
                ),
                "notes": ["  xx  xx  xx  xx"],
            },
            "Knock On The Door (Cut)": {
                // TODO: visible line before Repi with comment (?)
                "name": "Knock On The Door Break",
                "preamble": "snare continues playing this or the rhythm of Call Break",
                "sign": (
                    "knock with the knuckles of your right hand on your"
                    + " flat left hand"
                ),
                "remarks_indent": 0,
                "remarks": [
                    "repeat until cut",
                    "last run: Repi plays extra line; before that, Repi plays 'E'",
                ],
                "nosqueeze": true,
                "separate_lines": [
                    [0, 189, ["sn"]],
                    [141, 189, ["re"]],
                ],
            },
            "Dancing Break": {
                "preamble": "The players who don't play dance (see left)",
                "sign": (
                    "sign by showing the dance: arms down to the right,"
                    + " and to the left - then arms up to the right, and left .."
                    + " and go! (start down right)"
                ),
                "remarks_indent": 0,
                "remarks": ["ls = low surdo picks up"],
            },
        },
        "pages": [
            [
                "Tune",
                "Bra Break",
                "Clave",
                "Break 1",
                "Break 2",
            ],
            [
                "Break 3",
                "SOS Break",
                "SOS Break (Repi change)",
                "SOS Break (Repi change back)",
                "Knock On The Door (Cut)",
                "Dancing Break",
            ],
        ],
    },
    // DIFFERENCE (?) Samba Reggae High/Low is in player, but not in book
    "Sheffield Samba Reggae": {
        "sign": (
            "smoke a joint like a cup of tea (with thumb and index finger)"
        ),
        "patterns": {
            "Tune": {
                "remarks": [
                    "Memory aid for Agogô: I - like - to - play - the - A- go- gô",
                ],
            },
            "Intro": {
                // DIFFERENCE "E" in last beat of last line (Repi has no beat?)
                // DIFFERENCE Repi flare in player is "RR" in book
                // DIFFERENCE line 3, subbeats 3+4 differ
                "name": "Call Break",
                "subtitle": "Intro",
            },
            "Break 1": {
                "instruments": ["ls", "ms", "hs"],
                "preamble": (
                    "Surdos only, loop until told otherwise."
                    + " Everyone else carries on with the main groove."
                ),
            },
            "Break 2": {
                "instruments": ["ls", "ms", "hs", "re", "ag", "ta"],
                "remarks_indent": 0,
                "remarks": ["Snare plays the same as Repi"],
                "nosqueeze": true,
                "separate_lines": [
                    [0, 63, ["re"]],
                ],
            },
            "Whistle Break": {
                "sign": "Point to whistle",
                "subtitle_extra_lines": true,
                "remarks_indent": 0,
                "remarks": ["Loop until told otherwise"],
            },
            "Outro": {
                "sign": (
                    "Fist like “Stop playing” with thumb sticking out"
                ),
                "remarks_indent": 0,
                "remarks": ["then stop playing"],
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Break 1",
                "Break 2",
                "Break 3",
                "Whistle Break",
                "Outro",
            ]
        ],
    },
    "Police": {
        "sign": (
            "hold one hand inside up and turn it left and right like the"
            + " blue lights of a police car"
        ),
        "patterns": {
            // TODO: Tune: Whistle <-> Shouting
            "Intro": {
                // TODO: separate shouting line ("ot")
                "notes_override": [{
                    1: [1, "Whoop!", "left"],
                    4: [1, "Whoop!", "left"],
                    17: [1, "Whoop!", "left"],
                    20: [1, "Whoop!", "left"],
                }],
            },
            "Break 1": {
                "remarks_indent": 0,
                "remarks": ["From soft to loud"],
            },
            "Break 2": {
                // DIFFERENCE only one bar in book, but two bars in player
                // TODO: separate shouting line ("ot")
            },
            "Beast Break": {
                // TODO: Repi+Agogô as xxx...
                "subtitle_extra_lines": 1,
                "sign": "evil claws going down",
                "remarks_indented": true,
                "remarks": ["x = Agogô can be supported by Repi"],
            },
            "Beast Break Inverted": {
                "subtitle_extra_lines": 1,
                "sign": "evil claws going up",
                "remarks_indented": true,
                "remarks": ["h = Agogô"],
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Break 1",
                "Break 2",
                "Beast Break",
                "Beast Break Inverted",
            ]
        ],
    },
    "Tequila": {
        "sign": "Shake salt onto your hand",
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Tune": {
                "remarks": [
                    "Low Surdo starts with an upbeat before the 1",
                    "(0) = Can be played optionally to make the rhythm easier to understand",
                ],
                "notes_override": {
                    "ls": {
                        3: [1, "(0)", "center"],
                        4: [1, "(0)", "center"],
                        19: [1, "(0)", "center"],
                        20: [1, "(0)", "center"],
                        32: [1, "(X)", "center"],
                    },
                },
            },
            "Break 1": {
                "notes_override": [{
                    13: [3, "Tequila!", "left"],
                    16: [1, "(ls)", "center"],
                }],
                "subtitle_extra_lines": 1,
                "sign": "Shake salt on number 1",
            },
            "Break 2": {
                "preamble": "Surdos start with 3 upbeats before the 1",
                // TODO: Shaker! (and on separate line)
                // TODO: third bar is truncated
                "remarks_indented": true,
                "remarks": [". = Shaker"],
            },
            "Bra Break": {
                "single_bar_sizing": true,
                "aside": "Repeat 3 times, R = call by Repinique",
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Bra Break",
            ]
        ],
    },
    "The Roof Is on Fire": {
        "sign": (
            "form a roof with your hands, interlace the fingers"
            + " and wiggle them like flames"
        ),
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Break 1": {
                // DIFFERENCE player has only "ls" where book has "E"
                "notes_override": [{
                    1: [2, "The", "left"],
                    3: [2, "Roof", "left"],
                    9: [2, "the", "left"],
                    11: [2, "Roof", "left"],
                    17: [2, "the", "left"],
                    19: [2, "Roof", "left"],
                    21: [2, "is", "left"],
                    23: [2, "on", "left"],
                    25: [2, "Fi-", "left"],
                    27: [2, "re", "left"],
                }],
            },
            "Bra Break": {
                // TODO: last line is truncated because only single bar
                "notes_override": [{
                    109: [2, "Burn!", "left"],
                }],
                "separate_lines": [
                    [0, 127, ["ag"]],
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Bra Break",
            ]
        ],
    },
    "The Sirens of Titan": {
        "sign": "folded hands, like praying",
        "patterns": {
            "Rented a Tent Break": {
                "remarks": ["sign: showing both sides of a tent from up to down"],
                "separate_instruments": true,
                // TODO: memory aid for break with separate instruments
                "memory_aid": {
                    "notes": ["XXX X  X    XXX X  X    "],
                    "words": [
                        "Ren-", "ted", "a", "tent,", "a", "tent,", "a", "tent!",
                        "Ren-", "ted", "a", "tent,", "a", "tent,", "a", "tent!",
                    ],
                },
            },
        },
        "pages": [
            [
                "Tune",
                "Rented a Tent Break",
            ]
        ],
    },
    "Trans-Europa-Express": {
        "sign": "wave an imaginary tissue like saying goodbye to a train",
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Doppler Break": {
                "separate_instruments": true,
                "sign": (
                    "Sign: move your hand in front of your body"
                    + " from one side to the other like a train passing by"
                ),
                "remarks": ["Shaker keeps playing the groove"],
            },
            "Break 1": {
                "separate_instruments": true,
                "remarks": ["Shaker keeps playing the groove"],
            },
        },
        "pages": [
            [
                "Tune",
                "Doppler Break",
                "Break 1",
            ]
        ],
    },
    "Van Harte Pardon": {
        "name": "Van Harte pardon!",
        "sign": "heart formed with your hands",
        "sizing": {
            "landscape": false,
        },
        "patterns": {
            // DIFFERENCE last two Agogô are hh in book, ll in player
            "Break 1": {
                "notes_override": [{
                    1: [1, "g", "center"],
                    2: [1, ".", "center"],
                    3: [1, ".", "center"],
                    4: [1, "r", "center"],
                    5: [1, ".", "center"],
                    6: [1, ".", "center"],
                    7: [1, "o", "center"],
                    8: [1, ".", "center"],
                    9: [1, ".", "center"],
                    10: [1, "o", "center"],
                    11: [1, ".", "center"],
                    12: [1, ".", "center"],
                    13: [1, "v", "center"],
                    14: [1, ".", "center"],
                    15: [1, "e", "center"],
                    16: [1, ".", "center"],
                    29: [1, "hey!", "left"],
                }],
                "remarks_indent": 0,
                "remarks": ["Everybody sings this"],
            },
            "Silence Break": {
                "sign": "the sign is 4 fingers up",
                "remarks": ["ls = low surdo, ag = agogô"],
                "separate_lines": [
                    [0, 15, ["ag"]],
                ],
            },
            "Break 2": {
                "separate_instruments": true,
                "merge_instruments": {
                    "Snare / Repinique": ["sn", "re"],
                },
                "remarks": ["repeated on and on until maestra calls off"],
            },
            "Break 2 (Cut)": {
                "notes_override": {
                    "Snare / Repinique": {
                        8: [1, "(X)", "center"],
                    },
                    "ta": {
                        8: [1, "(X)", "center"],
                    },
                    "ag": {
                        8: [1, "(h)", "center"],
                    },
                },
                "separate_instruments": true,
                "merge_instruments": {
                    "Snare / Repinique": ["sn", "re"],
                },
                "remarks": ["back into the groove"],
            },
            "Cross Break": {
                "name": "Cross Break - Surdos",
                "separate_instruments": true,
                "sign": "sign 'x' with the arms",
                "remarks": ["repeated until cut"],
            },
            "Cross Eight Break": {
                "single_bar_sizing": true,
                "name": "Cross Eight Break - Surdos",
                "sign": "sign 'x' with arms showing Eight Up",
                "subtitle_extra_lines": 1,
                "aside": "from soft to loud",
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Silence Break",
                "Break 2",
                "Break 2 (Cut)",
                "Cross Break",
                "Cross Eight Break",
            ]
        ],
    },
    "Voodoo": {
        "sign": "aureole – make a circle around head with your index finger down",
        "patterns": {
            // DIFFERENCE Agogô tune: h instead of l in player before beat 4
            "Scissor Break": {
                // TODO: memory aid in subtitle extra line
                "sign": "Signed like scissors",
                "subtitle_extra_lines": 1,
                "memory_aid": {
                    "notes": ["X X X X XX X XX "],
                    "words": ["1", "2", "3", "4", "in", "my", "un-", "der", "pants"],
                },
            },
        },
        "pages": [
            [
                "Tune",
                "Scissor Break",
            ]
        ],
    },
    "Walc(z)": {
        "sign": "draw a triangle in the air with one hand",
        "patterns": {
            "Break 1": {
                // DIFFERENCE break missing in player
                "notes": ["E E E "],
            },
            "Bra Break": {
                // DIFFERENCE name
                "name": "Call Break",
            },
            "Cut-throat Break": {
                "remarks": ["Sign like cutting your throat with a finger"],
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Bra Break",
                "Break 3",
                "Break 5",
                "Cut-throat Break",
                "Cut-throat Break Fast",
            ]
        ],
    },
    "Wolf": {
        "sign": "drawing big “V” in the air with both hands (from up to down)",
        "sizing": {
            "pre_width": 16.5,
            "bars_per_row": 2,
        },
        "patterns": {
            "Pat 1": {
                "name": "Pat 1 (2)",
                "separate_instruments": true,
                "notes_override": {
                    "hs": {
                        10: [1, "(X)", "center"],
                        11: [1, "(X)", "center"],
                        12: [1, "(X)", "center"],
                        13: [1, "(X)", "center"],
                    },
                },
                "remarks": ["(X) = added in pat 2"],
            },
            "Break 2": {
                "notes_override": [{
                    61: [1, "Oi!", "center"],
                }],
                "remarks_indent": 0,
                "remarks": ["Oi! = Everybody shouts “Oi”"],
            },
        },
        "pages": [
            [
                "Tune",
                "Pat 1",
                "Break 1",
                "Break 2",
            ]
        ],
    },
    "Xango": {
        "sign": "rain trickling down, with 10 fingers",
        "sizing": {
            "pre_width": 14,
            "bars_per_row": 1,
        },
        "patterns": {
            "Intro": {
                // DIFFERENCE no surdos in player
                "preamble": "Everyone hits the rims",
                "sign": "building a tower with fists on top of each other, upwards",
                "subtitle_extra_lines": 2,
                "remarks_indent": 0,
                "remarks": ["repeat until cut"],
            },
            "Intro+Surdos": {
                "name": "Surdo Part of Intro",
                "sign": "flat hand on head",
                "instruments": ["ls", "ms", "hs"],
                "notes_override": [{
                    61: [1, "(S)", "center"],
                }],
                "remarks_indent": 0,
                "remarks": [
                    "(S) not before Boum Shakala Break",
                    "can be remembered by:",
                    "start: 1 - 4 - 3 - 5",
                    "then: 2 - 4 - 3 - 5 :||",
                ],
            },
            "Boum Shakala Break": {
                // DIFFERENCE in player, surdos play together with A
                "sign": "Crossed fingers",
                "nosqueeze": true,
            },
            "Break 2": {
                // DIFFERENCE in player, surdos play together with A
            },
        },
        "pages": [
            [
                "Tune",
                "Intro",
                "Intro+Surdos",
                "Boum Shakala Break",
                "Break 2",
            ]
        ],
    },
    "Zurav Love / Truant": {
        "sign": "open and close the beak of a bird with your hands",
        "patterns": {
            // TODO: shaker
            "Bra Break": {
                "single_bar_sizing": true,
                "separate_lines": [
                    [48, 63, ["sn"]],
                ],
            },
            "Kick Back 2": {
                // TODO: "A" instead of "E" (?)
                "separate_lines": [
                    [0, 15, ["re"]],
                ],
            },
        },
        "pages": [
            [
                "Tune",
                "Bra Break",
                "Kick Back 1",
                "Kick Back 2",
            ]
        ],
    },
};
