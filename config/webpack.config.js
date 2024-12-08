const path = require("path");
const { merge } = require("webpack-merge");
const packageJson = require("../package.json");

const parts = require("./webpack.parts.config");

let main = packageJson.main;
main = main.replace(/^.*[\\/]/, "");

const libraryName = main.substring(0, main.lastIndexOf("."));

const paths = {
    base: path.resolve("src"),
    app: path.resolve("src/index.ts"),
    dist: path.resolve("lib")
};

const libConfig = merge([
    {
        target: "web",
        context: paths.base,
        entry: {
            app: paths.app
        },
        output: {
            library: libraryName,
            filename: libraryName + ".js",
            libraryTarget: "umd",
            umdNamedDefine: true,
            path: paths.dist,
            clean: true
        },
        resolve: {
            modules: [path.resolve("./node_modules"), path.resolve("./src")],
            extensions: [".json", ".js", ".ts"]
        },
        optimization: {
            minimize: true
        }
    },

    parts.loadJs({})

    // parts.sourceMaps("source-map"),
]);

module.exports = (env) => {
    const config = merge(libConfig);

    return config;
};
