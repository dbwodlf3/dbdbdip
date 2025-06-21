import path from "path";

export default {
    port : 5501,
    projectRoot: path.resolve(path.dirname(path.dirname(path.dirname(__dirname)))),
    serverRoot: path.resolve(path.dirname(__dirname)),
}