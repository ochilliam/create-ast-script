import j from "jscodeshift";
export const util = {
  /**
   * Pass in params, creates and returns import statement AST
   * @param moduleName {string} - Also called the source
   * @param variableName {string} - Also called a specifier
   * @param propName {string} - `b` in `require('a').b`
   * @param comments {obj} - Comments AST object
   * @return {obj} - An AST object.
   * TODO: Add destructuring use cases...
   */
  createImportStatement: function (
    moduleName,
    variableName,
    propName,
    comments
  ) {
    let declaration, variable, idIdentifier, nameIdentifier;

    // if no variable name, return `import 'jquery'`
    if (!variableName) {
      declaration = j.importDeclaration([], j.literal(moduleName));
      declaration.comments = comments;
      return declaration;
    }

    // multiple variable names indicates a destructured import
    if (Array.isArray(variableName)) {
      const variableIds = variableName.map(function (v, i) {
        const prop = Array.isArray(propName) && propName[i] ? propName[i] : v;
        return j.importSpecifier(j.identifier(v), j.identifier(prop));
      });

      declaration = j.importDeclaration(variableIds, j.literal(moduleName));
    } else {
      // else returns `import $ from 'jquery'`
      nameIdentifier = j.identifier(variableName); //import var name
      variable = j.importDefaultSpecifier(nameIdentifier);

      // if propName, use destructuring `import {pluck} from 'underscore'`
      if (propName && propName !== "default") {
        idIdentifier = j.identifier(propName);
        variable = j.importSpecifier(idIdentifier, nameIdentifier); // if both are same, one is dropped...
      }

      declaration = j.importDeclaration([variable], j.literal(moduleName));
    }

    declaration.comments = comments;

    return declaration;
  },
};
