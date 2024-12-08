exports.loadJs = ({ options }) => ({
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: ["/node_modules/", "/lib/"],
                use: [
                    {
                        loader: "ts-loader",
                        options: options
                    }
                ]
            }
        ]
    }
});

exports.sourceMaps = (method) => ({
    devtool: method
});
