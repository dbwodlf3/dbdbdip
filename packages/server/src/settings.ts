import path from "path";

export default {
    port : 5502,
    projectRoot: path.resolve(path.dirname(path.dirname(path.dirname(__dirname)))),
    serverRoot: path.resolve(path.dirname(__dirname)),
}