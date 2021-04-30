/* eslint-disable no-undef */
const { writeFile } = require("fs");
const dirTree = require("directory-tree");
const { chain, map, get, join, template, templateSettings } = require("lodash");

const writeImportExport = (sPath, sPlugin) => {
  const tree = dirTree(`src/${sPath}`);
  const arFiles = chain(tree.children)
    .filter((item) => item.type == "directory")
    .keyBy("name")
    .mapValues((item) => {
      return map(item.children, (file) => get(file, "name").replace(".ts", ""));
    })
    .value();

  const importCollections = chain(arFiles.collections)
    .map((sFile) => `import ${sFile} from "./collections/${sFile}";`)
    .join("\n")
    .value();
  const exportCollections = `export { ${join(arFiles.collections, ", ")} };\n`;
  const importModels = chain(arFiles.models)
    .map((sFile) => `import ${sFile} from "./models/${sFile}";`)
    .join("\n")
    .value();
  const exportModels = `export { ${join(arFiles.models, ", ")} };\n`;

  const sTemplate = `
  /**
   * Models and Collections for {{ plugin }} plugin
   *
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   */
  
  // COLLECTIONS
  {{ importCollections }}
  
  {{ exportCollections }}
  
  
  // MODELS
  {{ importModels }}
  
  {{ exportModels }}
  `;

  templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  const compiled = template(sTemplate);
  const sValue = compiled({
    importCollections: importCollections,
    exportCollections: exportCollections,
    importModels: importModels,
    exportModels: exportModels,
    plugin: sPlugin,
  });

  writeFile(`src/${sPath}/index.ts`, sValue, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("index.ts saved!");
  });
};

exports.writeImportExport = writeImportExport;
