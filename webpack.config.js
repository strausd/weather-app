const path = require('path');

module.exports = {
    entry: './app/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'app/components/')
        ]
    }
};
