import path from "path";

const projectRoot = path.resolve(path.dirname(__dirname));
const serverRoot = path.join(projectRoot, "src", "server");
const clientRoot = path.join(projectRoot, "src", "client");

export default {
    projectRoot,
    serverRoot,
    clientRoot
}