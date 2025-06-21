import path from "path";

const projectRoot = path.resolve(path.dirname(__dirname));
const serverRoot = path.join(projectRoot, "packages", "server");
const clientRoot = path.join(projectRoot, "packages", "client");

export default {
    projectRoot,
    serverRoot,
    clientRoot
}