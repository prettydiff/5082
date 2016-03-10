# 5082

## Summary

NPM issue will break your repository and there is absolutely nothing you can do about except republish.  This code automates detection and resolution.

## Installation

Make these changes to your project's *package.json*:

* Include 5082 as a *devDependency*
* Add this path to *scripts.publish* NPM script
* Add options (not required) to a new property *config5082*

Once that is complete run `npm install` within your project to install 5082 as a devDependency

## Options

There are three supported options:

* beautify - A boolean indicating whether the
* files - an array to store paths for additional files in your repo that may contain version numbers that might also need to be bumped.  The files should be a relative path from your project's package.json file.  No need to include package.json in this list.  It will be corrected anyways.  If you do include it by accident it will not be processed twice.
* options - An object storing configurations for beautification. The supported beautifier is Pretty Diff.

## Execution path

1. Get the options from your package.json file
2. Remove the temporary directory specified in the next step (just in case it is already there)
3. mkdir ../packageName5082/node_modules
4. cd ../packageName5082/node_modules
5. npm install packageName
6. fs.readFile("package.json") gather version and main
7. fs.readdir(packageName) see if main file is present
8. If main file is present then remove ../packageName5082 directory and exit
8. If main file is absent the bump version number in package.json
9. Bump the version number in other specified files and write them to disk
10. Optionally beautify package.json before writing to disk
11. Write package.json to disk
12. publish package
13. run this application again recursively (let's hope you get a 5082 error twice in a row)

## License

MIT License
