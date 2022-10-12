import { createInterface } from "readline";
import fs from "fs";

let modulePath = "./src/modules/";
let controllerPath = "./src/controllers/";
let routesPath = "./src/routes/";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForModuleName = (questionText: string) =>
  new Promise<string>((resolve) => rl.question(questionText, resolve)).finally(
    () => rl.close()
  );

askForModuleName("Please enter module name. >> ")
  .then((answer: String) => {
    if (answer.toLowerCase() !== "") {
      checkDirectoryExistence(answer);
    } else {
      throw new Error("Try again");
    }
  })
  .catch((err) => {
    console.error("unable to get name =>", err);
  });

async function checkDirectoryExistence(_moduleName: String) {
  let __module_path = modulePath + _moduleName;
  if (fs.existsSync(__module_path)) {
    console.error("The directory already exists! please try with other name");
    return true;
  } else {
    fs.mkdirSync(__module_path);
    await createModuleFiles(__module_path, _moduleName);
    await createControllerFile(_moduleName);
    await createRouteFile(_moduleName);
  }
}

function createModuleFiles(module_path: any, module_name: any) {
  let files = [
    { id: 1, fileName: "Model.ts" },
    { id: 2, fileName: "Service.ts" },
    { id: 3, fileName: "Schema.ts" },
  ];

  for (let i = 0; i < files.length; i++) {
    const el = files[i];
    if (el.id == 2) {
      let className =
        module_name.charAt(0).toUpperCase() + module_name.slice(1) + "Service";
      fs.writeFile(
        module_path + "/" + `${module_name + el.fileName}`,
        `export default class ${className} {}`,
        function (err) {
          if (err) throw err;
          return;
        }
      );
    } else {
      fs.writeFile(
        module_path + "/" + `${module_name + el.fileName}`,
        "",
        function (err) {
          if (err) throw err;
          return;
        }
      );
    }
  }
}

/**
 * create controller files for provided module name
 */
function createControllerFile(controller_name: any) {
  let className =
    controller_name.charAt(0).toUpperCase() +
    controller_name.slice(1) +
    "Controller";
  fs.writeFile(
    controllerPath + "/" + `${controller_name + "Controller.ts"}`,
    `export class ${className} { }`,
    function (err) {
      if (err) throw err;
      console.info("module created succesfully!");
    }
  );
}

/**
 * Create routes file for provided module name
 */
function createRouteFile(route_name: any) {
  let className =
    route_name.charAt(0).toUpperCase() + route_name.slice(1) + "Routes";
  fs.writeFile(
    routesPath + "/" + `${route_name + "Routes.ts"}`,
    `export class ${className} { }`,
    function (err) {
      if (err) throw err;
      return;
    }
  );
}

export default askForModuleName;
