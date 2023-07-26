# y-mirror

I want to try incorporating realtime collaboration facilities in [HKMS](https://hyperdata.it/hkms/). 

[Y.js](https://github.com/yjs/yjs) is a conflict-free replicated data type ([CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)) implementation which has an  adapter for the [codemirror](https://codemirror.net/) editor - [codemirror.next](https://github.com/yjs/y-codemirror.next).

As [Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax)) RDF is a text format expressing graphs, sharing Turtle should effectively share graphs for free.

In the first instance I'm going to try replacing some of the **textarea** elements in [HKMS](https://hyperdata.it/hkms/) apps with mirrored text/code boxes. 

The system also needs an online service to at least initialize communications between clients.

This is work-in-progress, this seems as good a place as any to jot notes.

## Installation/Client Component Generation

The setup uses node/npm though the generated client component is plain Javascript and can be used in a HTML page without dependencies. The [esbuild](https://esbuild.github.io/) bundler is used.

Clone this repo. cd into it's directory.

Install nodejs and npm if you haven't already.

Setup the npm project as follows. The default options on init should be ok, for ref see [package-danja.json](package-danja.json).

```
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
```

*Note - I just discovered npm install and add are aliases, the only difference being **add** uses the --save option. But that option is deprecated npm 5+. But I'm not sure which version of npm I'm using, and the above worked for me* 


Codemirror has recently transitioned from v5 to v6 and the way language support is implemented has changed. But the older language modes can be used. 

```
npm add @codemirror/legacy-modes
npm add @codemirror/language
```

The source file for the bundle is in [src/mirror-raw.js](src/mirror-raw.js)  

The script bin/build.sh will bundle it with dependencies, the result going to build/mirror.js

There is example HTML/css code in demo/

## Server Installation

The server code is in /server

Be aware of the host:port settings in both the client and server



The following worked on Ubuntu 2022.04 

Assuming you've done the setup above on the server, 

```sudo apt install pm2```

cd to the /server directory

```pm2 start y-server.js```

should get the service running

```pm2 save```

records this state

```pm2 list```

lists service statuses

```pm2 show y-server```

gives detailed status








