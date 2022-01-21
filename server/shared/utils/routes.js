const glob = require("glob");
const path = require("path");

module.exports = app => {
	for (let file of glob.sync(
		path.join(path.resolve("route"), "/*.js")
	))
		app.use("/api/" + path.basename(file, ".js"), require(file));
};
