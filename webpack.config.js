const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'src/public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
        {
            use: {
                loader: 'babel-loader',
                options: {
                presets: ["@babel/preset-env","@babel/preset-react" ]
                }
            },
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ]
    }
};