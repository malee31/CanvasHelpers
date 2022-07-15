const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index-bundle.js',
        path: path.resolve(__dirname, './public'), // Path to Django static files
    },
    module: {
        rules: [
            {
                // From www.saaspegasus.com/guides/modern-javascript-for-django-developers/integrating-django-react/#the-1000-foot-view
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", {"runtime": "automatic" }],
                        ["@svgr/babel-preset", { "svgProps": { "width": 200 } }]
                    ]
                }
            }, {
                // Next two are from blog.jakoblind.no/css-modules-webpack
                test: /\.css$/,
                use: [
                    'style-loader',
                    "css-loader"
                ]
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
};
