npm init
npm add codemirror
npm add --save-dev esbuild

npm install lib0
npm install y-codemirror.next
npm install y-webrtc
npm install yjs

npm add @codemirror/lang-markdown
npm add @codemirror/lang-javascript
npm add @codemirror/lang-python

### codemirror legacy 

npm add @codemirror/legacy-modes
npm add @codemirror/language

looks like they all come in one bundle

check code snippet in https://github.com/codemirror/legacy-modes

import {StreamLanguage} from "@codemirror/language"
import {sparql} from "@codemirror/legacy-modes/mode/sparql"
import {turtle} from "@codemirror/legacy-modes/mode/turtle"
import {http} from "@codemirror/legacy-modes/mode/http"

was

danny@danny-desktop:~/HKMS/codemirror$ ./node_modules/.bin/esbuild --minify --bundle y/src/index.js --outfile=ye.js

I've put in bin/build.sh





