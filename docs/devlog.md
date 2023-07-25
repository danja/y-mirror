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

# Server

 1983  npm install -g pm2
 1984  pm2 start server.js
 1985  pm2 save
 1986  pm2 update
 1987  pm2 startup
 1988  pm2 list
 1989  pm2 save
 1990  pm2 startup
 1991  pm2 list
 1992  systemctl enable pm2-root
 1993  pm2 list
 1994  pm2 start
 1995  pm2 start server.js
 1996  pm2 save
 1997  pm2 list
 1998  pm2 start server.js
 1999  pm2 list
 2000  pm2 logs server




