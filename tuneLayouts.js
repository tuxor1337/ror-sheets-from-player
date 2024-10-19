
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
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "4 Silence": {
                "name": "Silence",
                "aside": "4 Beats of Silence",
                "remarks": ["4 fingers"],
                "nosqueeze": true,
            },
            "8 Silence": {
                "name": "Double Silence",
                "aside": "8 Beats of Silence",
                "subtitle": "two hands show 4 fingers",
                "nosqueeze": true,
            },
            "12 Silence": {
                "name": "Triple Silence",
                "aside": "12 Beats of Silence",
                "subtitle": "like “Double Silence” one hand upside down",
                "nosqueeze": true,
            },
            "16 Silence": {
                "name": "Quad Silence",
                "aside": "16 Beats of Silence",
                "subtitle": "like “Double Silence” both hands upside down",
                "nosqueeze": true,
            },
            "Continue for One Bar": {
                "notes": "................",
                "aside": "Continue 4 Beats",
                "remarks": ["draw a horizontal line in the air with one finger"],
                "nosqueeze": true,
            },
            "Continue for Two Bars": {
                "notes": "................................",
                "aside": "Continue 8 Beats",
                "subtitle": "like “continue for one bar” with both hands",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "Continue for Three Bars": {
                "notes": "................................................",
                "aside": "Continue 12 Beats",
                "subtitle": (
                    "like “continue for two bars” and then “continue for one bar”"
                    + " in the opposite direction"
                ),
                "subtitle_extra_lines": 2,
                "nosqueeze": true,
            },
            "Continue for Four Bars": {
                "notes": "................................................................",
                "aside": "Continue 16 Beats",
                "subtitle": (
                    "like “continue for two bars” and then again in the opposite direction"
                ),
                "nosqueeze": true,
            },
            "Boom Break": {
                "remarks": ["Show an explosion away from your body with both hands"],
            },
            "8 up": {
                "name": "Eight Up",
                "aside": "from soft to loud",
                "subtitle": "both hands move up while fingers shaking",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "8 down": {
                "name": "Eight Down",
                "aside": "from loud to soft",
                "subtitle": "both hands move down while fingers shaking",
                "subtitle_extra_lines": 1,
                "nosqueeze": true,
            },
            "Karla Break": {
                "aside": "from soft to loud",
                "subtitle": "rabbit ears OR finger pistol shooting up",
                "nosqueeze": true,
            },
            "Oi/Ua Break": {
                "notes": "E   E   E   Ș   ",
                "notes_override": {
                    5: [4, "[ E E E ]", "center"],
                    13: [4, "shout...", "left"],
                },
                "remarks": [
                    "... “oi”: two arms crossing, with OK-sign",
                    "... “ua”: two fists, knuckles hit each other",
                ],
            },
            "Cat Break": {
                "notes": "                ",
                "notes_override": {
                    1: [1, "m", "center"],
                    5: [1, "i", "center"],
                    9: [1, "a", "center"],
                    13: [1, "u", "center"],
                },
                "remarks": ["from high to low sound"],
                "subtitle": "claws to left and right",
                "subtitle_extra_lines": 1,
            },
            "Wolf Break": {
                "notes": (
                    "S S A SSS S A  S" +
                    "S S A  SS S A   " +
                    "S S A SSS S A  E" +
                    "E E E E         "
                ),
                "notes_override": {
                    60: [1, "a", "center"],
                    61: [1, "u", "center"],
                    62: [1, "-", "center"],
                    63: [1, "-", "center"],
                    64: [1, "-", "center"],
                },
                "subtitle": "wolf's ears and teeth",
                "subtitle_extra_lines": 1,
                "remarks": ["< a - u = like a howling wolf"],
            },
            "Democracy Break": {
                "notes": (
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
                ),
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
                "subtitle": "shout with your hands forming a funnel",
                "aside_lines": {
                    1: [3, "from soft to loud"],
                    8: [3, "from soft to loud"],
                },
                "nosqueeze": true,
            },
            "Laughing Break": {
                "notes": "EEEEEEEEEEEEE   ",
                "notes_override": {
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
                },
                "aside": "laughter",
                "subtitle": "fingers move up corners of your mouth",
                "subtitle_extra_lines": 2,
                "remarks": ["from high to low sound"],
            },
            "Star Wars Break": {
                "notes": (
                    "Ꞩ   Ꞩ   Ꞩ   Ş  Ŝ" +
                    "Ꞩ   Ş  ŜꞨ       "
                ),
                "subtitle": "Move flat hand from top to bottom of face",
                "subtitle_extra_lines": 1,
            },
            "Progressive": {
                "name": "Progressive Break",
                "subtitle": "5 fingers and other hand grabbing thumb",
                "remarks": ["(can be inverted by showing the sign upside down)"],
            },
            "Progressive Karla": {
                "subtitle": "rabbit ears OR finger pistol, the other hand is grabbing the thumb",
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
                "notes": "                ",
                "notes_override": {
                    1: [2, "E-", "left"],
                    3: [2, "very", "left"],
                    5: [2, "bo-", "left"],
                    7: [2, "dy", "left"],
                    9: [4, "dance", "left"],
                    13: [4, "now", "left"],
                },
                "aside": "Everybody sings",
                "subtitle": (
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
                "notes": (
                    "l l l l l l l EE" +
                    "E l l l l l l EE" +
                    "E l l l l l l EE" +
                    "E l l l EEEEEEEE" +
                    "E e e e e e e EE" +
                    "E e e e e e e EE" +
                    "E e e e e e e EE" +
                    "E e e e EEEEEEEE"
                ),
                "subtitle": "Both hands in the air, with index and pinky fingers pointing up",
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
                "subtitle": (
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
                "subtitle": "Make a circle with your index finger and thumb, like “OK”",
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
                "subtitle": (
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
                "subtitle": (
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
                "subtitle": (
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
                "subtitle": (
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
                "subtitle": "show your flat hand and hit it with stick",
            },
            "Chaos Break": {
                "text": {
                    "content": (
                        "Everyone plays something chaotic, getting louder and louder."
                        + " No counting in!"
                    ),
                    "rows": 2,
                },
                "subtitle": "Point with index finger at temple",
            },
            "Again": {
                "text": {
                    "content": "Repeat the last break (combination)",
                    "rows": 1,
                },
                "subtitle": "Hit with flat hand on forehead",
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
                "subtitle": "Point at your nose and at the sambista who can play freely",
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
        "sizing": {
            "pre_width": 14,
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Break 2": {
                "notes": "      S       S       S   SSSSS ",
                "remarks": ["S = Mid and high surdos, everybody else continues playing!"],
                "remarks_indented": true,
            },
            "Break 3": {
                "notes": "   SSSS    SSSS    SSSS S SSSSS ",
                "remarks": ["S = Mid and high surdos, everybody else continues playing!"],
                "remarks_indented": true,
            },
            "Bra Break": {
                "remarks": ["R = call by Repinique"],
                "remarks_indented": true,
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
                    "Low Surdo": "X X w  wXwX w   ",
                },
            },
            "Break 2": {
                "nosqueeze": true,
            },
            "Break 3": {
                "notes": (
                    "E     EEEE      " +
                    "E E E  E        " +
                    "E     EEEE      " +
                    "  E  E  E      E" +
                    "E E E E E E E E "
                ),
                "preamble": "snare continues playing through the break!",
                "remarks": ["repeat until cut"],
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
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Intro": {
                "name": "Call Break",
                "row_numbers": ["5", "6", "7", "8"],
                "notes": (
                    "RR RR R AA AA A " +
                    "RR RR R AA AA A " +
                    "RR RR R AA AA A " +
                    "Ꞩ R Ş R Ꞩ R R R "
                ),
                "preamble": (
                    "Tambs play 4× solo and then continue while the rest plays the break."
                    + " Surdos play the groove in the 4th beat of the last bar."
                ),
                "subtitle": "Intro",
                "nosqueeze": true,
            },
            "No-Cent-For-Axel-Break": {
                "name": "No Cent for Axel Break",
                "notes_override": {
                    1: [1, "Kein", "center"],
                    2: [1, "Cent", "center"],
                    4: [1, "für", "center"],
                    5: [1, "Ax-", "center"],
                    7: [1, "el", "center"],
                },
                "remarks": ["“No” gesture, then “money” gesture (rub thumb and index)"],
            },
            "Tension Break": {
                "notes_override": {
                    5: [1, "Tls", "center"],
                    7: [1, "Tms", "center"],
                    21: [1, "Tls", "center"],
                    23: [1, "Tms", "center"],
                },
                "preamble": "snare continues playing through the break!",
                "subtitle": "2 fingers running on the palm on the other hand",
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
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        // TODO: some notes in Tune are in parentheses
        // TODO: instruments in Call Break separate
        // TODO: Singing Break 1/2 is missing
    },
    "Bella Ciao": {
        "sign": (
            "put the fingertips together with straight fingers, building a top of a mountain"
            + " with both hands"
        ),
        "patterns": {
            "Break 3": {
                "notes": "                                ",
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
                "notes": (
                    "r r r " +
                    "r r       r r r " +
                    "r r       r r r " +
                    "r   r r r   r r " +
                    "r   r   r r r r " +
                    "r r       r r r " +
                    "r r       r r r " +
                    "r   r   r   r   " +
                    "r               "
                ),
                "preamble": "everybody",
                "subtitle": (
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
        // TODO: some notes in Tune are in parentheses
    },
    "Bhangra": {
        "sizing": {
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 3,
        },
        "patterns": {
            "Break 1": {
                "nosqueeze": true,
            },
            "Bra Break": {
                "name": "Call Break",
                "notes_override": {
                    94: [1, "eh", "center"],
                },
                "remarks": [
                    "from soft to loud, R = Repinique, eh = shout",
                ],
                "remarks_indented": true,
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
        // TODO: memory aid with bars/beats under break
    },
    "Bomba": {
        "sign": (
            "As you grab a hand granade, take the secure with your mouth and throw it to the air."
        ),
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Call Break": {
                "remarks": ["With both hands point at yourself and then at the band"],
            }
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Break 2",
                "Call Break",
            ],
        ],
        // TODO: separate instruments for Break 2
        // TODO: notation is double speed for Break 1 and Call Break
    },
    "Chichita": {
        "sign": "make two fists and rub middle joints against each other",
        "patterns": {
            "Tune": {
                "notes": {
                    "Snare": "",
                    "Snare 1": (
                        "f XXf XXf XXf XX" +
                        "f XXf XXf XXf XX" +
                        "f XXf XXf XXf XX" +
                        "f XXf XXf XXf XX"
                    ),
                    "Snare 2": (
                        "ffX ffX ffXXX X " +
                        "ffX ffX ffXXX X " +
                        "ffX ffX ffXXX X " +
                        "X XXX X XXXXX X "
                    ),
                },
            },
            "Double Break 2": {
                "subtitle": "show 2 fingers with both hands",
            },
            "Intro": {
                "remarks": ["snare goes directly in tune after intro, others stop"],
                "remarks_indented": true,
            },
            "End": {
                "text": {
                    "content": (
                        "Tune continues for 12 bars (3x repi-line) and gets constantly faster."
                        + " For the last 4 bars, everyone plays the last part of repi line."
                    ),
                    "rows": 3,
                },
                "subtitle": "2 fists diverge diagonally",
                "subtitle_extra_lines": 1,
            }
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
        // TODO: order of instruments in Tune (esp. "Snare 1" and "Snare 2")
        // TODO: explanatory text at bottom of page
    },
    "Coupe-Decale": {
        "sizing": {
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Tune (6/8)": {
                "name": "Groove (6/8)",
            },
            "Intro": {
                "remarks": [
                    "16 bars in total. Repi&Snare start on rim, then Agogô join in,"
                    + " then Tamb joins, then Shaker. In the end, Surdos pick up.",
                ],
                "remarks_indented": true,
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
        // TODO: separate instruments for Intro
        // TODO: different subbeats_per_beat for some of the breaks (6/8)
        // TODO: triols in Break 1/2
    },
    "Cochabamba": {
        "sign": "drink from a cup formed with one hand",
        "sizing": {
            "pre_width": 14,
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
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
                "subtitle": "(Iron Lion Zion Break)",
                "remarks": ["Everyone together ... start soft and go louder!"],
                "remarks_indented": true,
            },
            "Bra Break (Repi)": {
                "name": "Call Break",
                "notes": (
                    "cc cc cc cc A A " +
                    "cc cc cc cc A A " +
                    "cc cc cc cc A A "
                ),
                "remarks": [
                    "c = call by maestro (on repinique or snare)",
                    "A = All others answer",
                ],
                "remarks_indented": true,
            },
            "Cross Kicks": {
                "name": "Cross Kicks for surdos",
                "preamble": "sign 'X' with the arms, waving towards the sky",
            },
        },
        "pages": [
            [
                "Tune",
                "Break 1",
                "Bra Break (Repi)",
                "Cross Kicks",
            ],
        ],
        // TODO: breaks over only one bar
        // TODO: separate instruments for Cross Kicks
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
                "subtitle": "+ instr. sign that continues",
                "row_numbers": ["1-7", "2-8", "8"],
                "notes": (
                    "A             A " +
                    "A               " +
                    "Š.Š.Š..Š.Š..ŠŠŠŠ"
                ),
            },
            "Singing Break": {
                "notes": (
                    "                " +
                    "                " +
                    "                " +
                    "                "
                ),
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
                "subtitle": "Signed as Break 1, with a lot of blabla...",
                "remarks": [
                    "Surdo players sing first half, same beats as they would play.",
                    "All other answer, same beats as they play.",
                    "Last part Everyone sings together.",
                ],
                "remarks_indented": true,
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
        "sizing": {
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Tune": {
                "remarks": ["(x) = variations, [ ] = triplet"],
            },
        },
        // TODO: triple speed compared to notation
        // TODO: (x) notation in tune (+ [triplets])
        // TODO: single bar breaks 1/2/3
        // TODO: remarks
    },
    "Funk": {
        "sign": "glasses on your eyes",
        "sizing": {
            "bars_per_row": 2,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Tune (Variant 1)": false,
            "Tune (Variant 2)": false,
            "Oi/Ua Break": {
                "notes": "E   E   E   Ș   ",
                "notes_override": {
                    5: [4, "[ E E E ]", "center"],
                    13: [4, "shout...", "left"],
                },
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
    "Karla Shnikov": {
        "sign": (
            "move index+middle finger like rabbit ears and cover other fingers with other hand" +
            " OR point with finger pistol to head"
        ),
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "Karla Break": {
                "notes": (
                    "XXXXXXXXXXXXXXXX" +
                    "XXXXXXXXXXXXXXXX" +
                    "XXXXXXXXXXXXXXXX" +
                    "X               "
                ),
                "preamble": "&gt;from soft to loud",
                "subtitle": "rabbit ears OR finger pistol shooting up",
            },
            "Break 2 Inverted": {
                "name": "Break 2 inverted",
                "subtitle": "sign with two fingers pointing down instead of up",
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
    "Walc(z)": {
        "sign": "draw a triangle in the air with one hand",
        "sizing": {
            "pre_width": 12,
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 6,
        },
        "patterns": {
            "Break 1": {
                "notes": "E E E ",
            },
            "Bra Break": {
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
};
