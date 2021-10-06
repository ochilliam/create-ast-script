import { Transform } from "jscodeshift";
// import { util } from "../utils/index.js";
const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const collections = root.find(j.ImportDeclaration).filter((node) => {
    if (node.value.specifiers?.length === 1) {
      const importValue = node.value.source.value as string;
      return importValue.includes("LanguageContext");
    }

    return false;
  });

  // collections.insertAfter(util.createImportStatement("lang", "test"));
  collections.remove();

  return root.toSource();
};

export default transform;
