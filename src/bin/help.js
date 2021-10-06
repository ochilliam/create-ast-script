import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default readFileSync(path.join(__dirname, "./help.txt"), "utf8");
