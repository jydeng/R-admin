let path = require("path");
let fs = require("fs");
let directory = path.resolve(__dirname, ".");
let templates = {};

let files = fs.readdirSync(directory);
files
  .filter(file => /.tpl$/.test(file))
  .forEach(file => {
    let code = fs.readFileSync(path.join(directory,file));
    templates[file.split(".").shift()] = new Function(
      "name",
      `return ${code};`
    );
  });

module.exports = templates;
