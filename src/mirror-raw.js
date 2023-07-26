/* eslint-env browser */

import * as Y from "yjs";
// @ts-ignore
import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";

import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";

import { StreamLanguage } from "@codemirror/language"
import { sparql } from "@codemirror/legacy-modes/mode/sparql"
import { turtle } from "@codemirror/legacy-modes/mode/turtle"
import { http } from "@codemirror/legacy-modes/mode/http"

//import { javascript } from "@codemirror/lang-javascript";

import * as random from "lib0/random";

export const usercolors = [
    { color: "#30bced", light: "#30bced33" },
    { color: "#6eeb83", light: "#6eeb8333" },
    { color: "#ffbc42", light: "#ffbc4233" },
    { color: "#ecd444", light: "#ecd44433" },
    { color: "#ee6352", light: "#ee635233" },
    { color: "#9ac2c9", light: "#9ac2c933" },
    { color: "#8acb88", light: "#8acb8833" },
    { color: "#1be7ff", light: "#1be7ff33" }
];

// select a random color for this user
export const userColor = usercolors[random.uint32() % usercolors.length];

const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("codemirror6-demo-room", ydoc);

const provider = new WebrtcProvider(
    'mozz',
    ydoc,
    { signaling: ['wss://hyperdata.it:4444'] }
)

const ytext = ydoc.getText("codemirror");

const undoManager = new Y.UndoManager(ytext);

provider.awareness.setLocalStateField("user", {
    name: "Anonymous " + Math.floor(Math.random() * 100),
    color: userColor.color,
    colorLight: userColor.light
});

const state = EditorState.create({
    doc: ytext.toString(),
    extensions: [
        basicSetup,
        //  sparql,
        yCollab(ytext, provider.awareness, { undoManager })
    ]
});

/*

mirror.js:7 Uncaught Error: Unrecognized extension value in extension set ([object Object]). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.

extensions: [
    basicSetup,
    languageConf.of(javascript()),
    autoLanguage
  ],
  */

const view = new EditorView({
    state,
    parent: /** @type {HTMLElement} */ (document.querySelector("#editor"))
});
