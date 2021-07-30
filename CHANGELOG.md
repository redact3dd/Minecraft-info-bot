### V2.2.0
### **Please, backup servers.json and config.json before updating to this version**
#### Major changes
* Added CONTRIBUTING.md, SECURITY.md, and Docker files
* **New directory**: ./data directory, where all data will be saved, for better backup and Docker volumes. Updated paths correspondingly
* **New installation methods**: `docker.sh` and `node.sh` executables allow for a faster execution with Docker or Node. Run them with `bash {file}`
* **New command**: version command, returns current version and checks whether a new version is available
#### Minor changes
* Added CHANGELOG.md
* Updated package.json
* Added a close function to bot.js to nicely terminate the program on an interrupt or terminate signal
* Changes to README.md and gitignore