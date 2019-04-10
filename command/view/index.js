const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const err = error => console.log(chalk.red(`${error}`));
const templates = require("./template");

// 读取用户输入
function read(prompt) {
  return new Promise((resolve, reject) => {
    try {
      process.stdout.write(prompt);
      process.stdin.resume();
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", input => {
        process.stdin.pause();
        resolve(input.toString().trim());
      });
    } catch (e) {
      reject(e.message);
    }
  });
}

// 创建文件
function generateFile(path, data) {
  if (fs.existsSync(path)) {
    err(`${path}文件已经存在.`);
    return;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", error => {
      if (error) {
        err(error.message);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

// 创建目录
function dotExistDirectoryCreate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, function() {
      resolve(true);
    });
  });
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory);
      callback();
    });
  }
}

async function main() {
  log("------------------- Vue代码生成v0.1 --------------------");
  log("------------------------ 视图 --------------------------");
  log("------------------------- Roy --------------------------");
  let view = await read(chalk.green("请输入你想要生成的视图目录名："));
  let directory = resolve("../../src/views", view);

  if (!fs.existsSync(directory)) {
    view = "index.vue";
    log(`视图目录不存在，正在生成目录 ${directory} ...`);
    await dotExistDirectoryCreate(directory);
    log(`视图目录 ${directory} 生成成功。`);
    log(`视图目录 ${directory} 为空，代码文件默认为 [index.vue]`);
  } else {
    view = await read(
      chalk.green("视图目录已存在，请输入要生成的代码文件名：")
    );
  }

  try {
    template = await read(
      chalk.green(
        `请选择你要使用的代码模板，目前有以下几种：[${Object.keys(
          templates
        ).join("][")}]：`
      )
    );
    if (Object.keys(templates).indexOf(template) > -1) {
      log(
        `使用模板“${template}”，开始生成代码文件 ${path.join(
          directory,
          view
        )} ...`
      );
      await generateFile(
        path.join(directory, view),
        templates[template](view.split(".").shift())
      );
      log(`代码文件 ${path.join(directory, view)} 生成成功。`);
    } else {
      err("代码模版选择错误。");
    }

    process.exit();
  } catch (error) {
    err(error.message);
  }
}

main();
