
export default {
    "General Breaks": {
        "sizing": {
            "pre_width": 12,
            "after_width": 9,
            "bars_per_row": 1,
            "beats_per_bar": 4,
            "subbeats_per_beat": 4,
        },
        "patterns": {
            "4 Silence": {
                "name": "Silence",
                "aside": "4 Beats of Silence",
                "remarks": ["4 fingers"],
            },
            "8 Silence": {
                "name": "Double Silence",
                "aside": "8 Beats of Silence",
                "subtitle": "two hands show 4 fingers",
            },
            "12 Silence": {
                "name": "Triple Silence",
                "aside": "12 Beats of Silence",
                "subtitle": "like “Double Silence” one hand upside down",
            },
            "16 Silence": {
                "name": "Quad Silence",
                "aside": "16 Beats of Silence",
                "subtitle": "like “Double Silence” both hands upside down",
            },
        },
        "pages": [
            [
                "4 Silence",
                "8 Silence",
                "12 Silence",
                "16 Silence",
                "Boom Break",
                "8 up",
                "8 down",
                "Karla Break",
            ],
            [
                "Progressive",
                "Progressive Karla",
                "Clave",
                "Clave Inverted",
                "Yala Break",
            ],
        ],
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
