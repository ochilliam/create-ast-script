import { defineTest } from "jscodeshift/dist/testUtils";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("removeImport", () => {
  defineTest(__dirname, "removeImport", null, `removeImport/removeImport`);
});
