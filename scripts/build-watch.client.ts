import path from "path";
import { spawn, exec } from "child_process"
import common from "./common";

const srcPath = path.join(common.clientRoot, "src");
let NODE_PATH = `${common.clientRoot}:${srcPath}`;

if(process.platform == 'win32')  {
    NODE_PATH = `${common.clientRoot};${srcPath}`;
}
else {
    NODE_PATH = `${common.clientRoot}:${srcPath}`;
}

const childProcess = spawn(`cd ${common.clientRoot} && \
    npx rollup -c ${common.clientRoot}/rollup.config.js -w`, 
    { shell: true, stdio: 'inherit', env: { NODE_PATH: NODE_PATH, ...process.env } }
);