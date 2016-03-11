/*prettydiff.com api.topcoms: true, api.insize: 4, api.inchar: " ", api.vertical: true */

// For automatic republishing due to: https://github.com/npm/npm/issues/5082
//
// Steps:
// 1. mkdir ../packageName5082/node_modules
// 2. cd ../packageName5082/node_modules
// 3. npm install packageName
// 4. fs.readFile("package.json") gather version and main
// 5. fs.readdir(packageName) see if main file is present 6a. If main file is
// present then remove ../packageName5082 directory and exit 6b. If main file is
// absent the bump version number in package.json
// 7. Bump the version number in other specified files and write them to disk
// 8. Optionally beautify package.json before writing to disk
// 9. Write package.json to disk
// 10. publish package
// 11. run this application again recursively

(function a5082() {
    "use strict";
    var child          = require("child_process").exec,
        fs             = require("fs"),
        path           = require("path"),
        proc           = require("process"),
        loop           = 0,
        config         = {
            beautify: false,
            files   : [],
            options : {}
        },
        packageName    = (function () {
            var arr = proc
                .cwd()
                .split(path.sep);
            return arr[arr.length - 1];
        }()),
        prettydiff     = {},
        currentVersion = "",
        nextVersion    = "",
        versionSearch  = new RegExp(currentVersion, "g"),
        packageWritten = false,
        packageJson    = {},
        mkdir          = function a5082_mkdir_declaration() {
            return;
        },
        removedir      = function a5082_removedir(start) {
            var rmcmd = (path.sep === "\\")
                ? "rmdir /Q /S "
                : "rm -rf ";
            child(rmcmd + packageName + "5082" + path.sep + "node_modules", function a5082_removedir_callback(rmerror, stdout, stderr) {
                if (loop === 3) {
                    console.log("Error: recursive limit hit.");
                    console.log("Failed at task: npm install " + packageName);
                    return process.exit(1);
                }
                if (rmerror !== null) {
                    loop += 1;
                    console.log(rmerror);
                    console.log("");
                    console.log("Trying remove directory again...");
                    a5082_removedir();
                } else if (typeof stderr === "string" && stderr.length > 0 && stderr.indexOf("No description") < 0) {
                    loop += 1;
                    console.log(stderr);
                    console.log("");
                    console.log("Trying remove directory again...");
                    a5082_removedir();
                } else if (start === true) {
                    loop = 0;
                    mkdir(packageName + "5082");
                }
                return stdout;
            });
        },
        publish        = function a5082_publish() {
            child("npm publish " + packageName, function a5082_publish_callback(puberror, stdout, stderr) {
                if (loop === 3) {
                    console.log("Error: recursive limit hit.");
                    console.log("Failed at task: npm publish " + packageName);
                    return process.exit(1);
                }
                if (puberror !== null) {
                    loop += 1;
                    console.log(puberror);
                    console.log("");
                    console.log("Trying to publish again...");
                    a5082_publish();
                } else if (typeof stderr === "string" && stderr.length > 0 && stderr.indexOf("No description") < 0) {
                    loop += 1;
                    console.log(stderr);
                    console.log("");
                    console.log("Trying to publish again...");
                    a5082_publish();
                } else {
                    loop = 0;
                    mkdir(packageName + "5082");
                }
                return stdout;
            });
        },
        writeFile      = function a5082_writeFile(fileName, fileData) {
            fs
                .writeFile(fileName, fileData, "utf8", function a5082_writeFile_callback(errorWriteFile) {
                    if (loop === 3) {
                        console.log("Error: recursive limit hit.");
                        console.log("Failed at task: fs.writeFile('" + fileName + "')");
                        return process.exit(1);
                    }
                    if (errorWriteFile !== null) {
                        loop += 1;
                        console.log(errorWriteFile);
                        console.log("");
                        console.log("Trying to write " + fileName + " again...");
                        a5082_writeFile(fileName, fileData);
                    } else {
                        loop = 0;
                        console.log("File " + fileName + " successfully written to disk.");
                        if (fileName === packageName + path.sep + "package.json") {
                            packageWritten = true;
                            if (config.files.length === 0) {
                                publish();
                            }
                        } else if (config.files.length === 0 && packageWritten === true) {
                            publish();
                        }
                    }
                });
        },
        readFile       = function a5082_readFile(file, next) {
            fs
                .readFile(file, {
                    encoding: "utf8"
                }, function a5082_readFile_callback(errReadFile, dump) {
                    if (loop === 3) {
                        console.log("Error: recursive limit hit.");
                        console.log("Failed at task: fs.readFile('" + file + "')");
                        return process.exit(1);
                    }
                    if (errReadFile !== null && errReadFile !== undefined) {
                        loop += 1;
                        console.log(errReadFile);
                        console.log("");
                        console.log("Trying to read " + file + " again...");
                        a5082_readFile(packageName + path.sep + "package.json");
                    } else {
                        loop = 0;
                        next(file, dump);
                    }
                });
        },
        readdir        = function a5082_readdir(dirpath) {
            var a     = 0,
                vers  = [],
                patch = 0,
                str   = "";
            fs.readdir(dirpath, function a5082_readdir_callback(readdirError, files) {
                var callbackRead = function a5082_readFilesFromConfig(fileName, fileData) {
                    fileData = fileData.replace(versionSearch, nextVersion);
                    if (config.beautify === true) {
                        config.options.source = fileData;
                        fileData              = prettydiff.api(config.options)[0];
                    }
                    console.log("Writing file " + config.files[config.files.length - 1] + " from the optional file list");
                    writeFile(fileName, fileData);
                };
                if (loop === 3) {
                    console.log("Error: recursive limit hit.");
                    console.log("Failed at task: fs.readdir('" + packageName + "')");
                    return process.exit(1);
                }
                if (readdirError !== null && readdirError !== undefined) {
                    loop += 1;
                    console.log(readdirError);
                    console.log("");
                    console.log("Trying to read package directory again...");
                    a5082_readdir(dirpath);
                } else {
                    loop = 0;
                    for (a = files.length - 1; a > -1; a -= 1) {
                        if (files[a] === packageJson.main) {
                            console.log("Main file is present. No 5082 defect.");
                            break;
                        }
                    }
                    process.chdir(".." + path.sep + ".." + path.sep + packageName);
                    removedir(false);
                    if (a > -1) {
                        process.exit(0);
                    }
                    vers  = currentVersion.split(".");
                    patch = Number(vers[vers.length - 1]);
                    if (isNaN(patch) === true) {
                        patch = 1;
                    } else {
                        patch += 1;
                    }
                    vers[vers.length - 1] = patch;
                    nextVersion           = vers.join(".");
                    console.log("Main file is missing. Package is corrupt due to NPM issue #5082.");
                    console.log("Bumping version to " + nextVersion);
                    packageJson.version = nextVersion;
                    if (config.files.length === 0) {
                        console.log("No provided options.");
                    } else {
                        do {
                            readFile(config.files[config.files.length - 1], callbackRead);
                            config
                                .files
                                .pop();
                        } while (config.files.length > 0);
                    }
                    console.log("Writing package.json with bumped version.");
                    str = JSON.stringify(packageJson);
                    if (config.beautify === true) {
                        config.options.source = str;
                        str                   = prettydiff.api(config.options)[0];
                    }
                    writeFile(packageName + path.sep + "package.json", str);
                }
            });
        },
        install        = function a5082_install() {
            child("npm install " + packageName, function a5082_install_callback(error, stdout, stderr) {
                if (loop === 3) {
                    console.log("Error: recursive limit hit.");
                    console.log("Failed at task: npm install " + packageName);
                    return process.exit(1);
                }
                if (error !== null) {
                    loop += 1;
                    console.log(error);
                    a5082_install();
                } else if (typeof stderr === "string" && stderr.length > 0 && stderr.indexOf("No description") < 0) {
                    loop += 1;
                    console.log(stderr);
                    a5082_install();
                } else {
                    loop = 0;
                    console.log(packageName + " installed");
                    readFile(packageName + path.sep + "package.json", function a5082_readPackageJson_callback(fileName, fileData) {
                        packageJson    = JSON.parse(fileData);
                        currentVersion = packageJson.version;
                        console.log("package.json read for version " + currentVersion);
                        readdir(packageName);
                        return fileName;
                    });
                }
                return stdout;
            });
        },
        getOptions     = function a5082_getOptions(file) {
            fs
                .readFile(file, {
                    encoding: "utf8"
                }, function a5082_readPackageJson_callback(err5082PackageJson, dump) {
                    var localConfig = {};
                    if (loop === 3) {
                        console.log("Error: recursive limit hit.");
                        console.log("Failed at task: fs.readFile('package.json') for 5082");
                        return process.exit(1);
                    }
                    if (err5082PackageJson !== null && err5082PackageJson !== undefined) {
                        loop += 1;
                        console.log(err5082PackageJson);
                        console.log("");
                        console.log("Trying to read 5082/package.json again...");
                        a5082_getOptions("package.json");
                    } else {
                        loop        = 0;
                        localConfig = JSON.parse(dump);
                        if (localConfig.config5082 !== undefined) {
                            if (localConfig.config5082.beautify === true) {
                                config.beautify = true;
                                prettydiff      = require("prettydiff");
                            }
                            if (Array.isArray(localConfig.config5082.files) === true && localConfig.config5082.files.length > 0) {
                                config.files = localConfig.config5082.files;
                            }
                            if (typeof localConfig.config5082.options === "object") {
                                config.options = localConfig.config5082.options;
                            }
                        }
                        process.chdir("..");
                        removedir(true);
                    }
                });
        };
    mkdir = function a5082_mkdir(nameOfDir) {
        fs
            .mkdir(nameOfDir, function a5082_mkdir_callback(mkerror) {
                if (loop === 3) {
                    console.log("Error: recursive limit hit.");
                    console.log("Failed at task: mkdir " + nameOfDir);
                    return process.exit(1);
                }
                if (mkerror !== undefined && mkerror !== null && mkerror.code !== "EEXIST") {
                    loop += 1;
                    console.log(mkerror);
                    console.log("");
                    console.log("Trying mkdir again...");
                    a5082_mkdir(nameOfDir);
                } else if ((/(node_modules)$/).test(nameOfDir) === false) {
                    a5082_mkdir(nameOfDir + path.sep + "node_modules");
                } else {
                    loop = 0;
                    process.chdir(packageName + "5082" + path.sep + "node_modules");
                    install();
                }
            });
    };
    getOptions("package.json");
}());
