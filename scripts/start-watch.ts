import path from "path";
import { spawn } from "child_process"
import common from "./common";

const srcPath = path.join(common.serverRoot, "src");
let NODE_PATH = `${common.serverRoot}:${srcPath}`;

if(process.platform == 'win32')  {
    NODE_PATH = `${common.serverRoot};${srcPath}`;
}
else {
    NODE_PATH = `${common.serverRoot}:${srcPath}`;
}

// nodemon -w src/ -w route/ -e js,json,yml your-app.js

// nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/your-app.ts

console.log("-_-;;", `nodemon --watch '${common.serverRoot}/src/**/*.ts' --exec 'ts-node' --project ${common.serverRoot}/tsconfig.json ${common.serverRoot}/src/index.ts`)

spawn(`cd ${common.serverRoot} && \
    nodemon --watch '${common.serverRoot}/src/**/*.ts' -e ts,json --exec 'ts-node' --project ${common.serverRoot}/tsconfig.json ${common.serverRoot}/src/index.ts`, 
    { shell: true, stdio: 'inherit', env: { NODE_PATH: NODE_PATH, ...process.env } }
);