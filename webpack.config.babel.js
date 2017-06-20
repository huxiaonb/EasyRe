import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const isDev = process.env.NODE_ENV === "development"

const config = {
    entry: './src/entry.js',
    output: {
        path: path.join(__dirname, isDev ? 'dist/dev' : 'dist'),
        filename: 'lego.js',
        libraryTarget: 'umd'
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json']
    },
    // devtool: "eval",
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(woff|ttf|eot|svg|woff2)(\?[^]{0,100})?$/,
                loader: 'base64-font-loader'
            },{ 
                test: /\.png$/, 
                loader: "url-loader?mimetype=image/png"
             }
        ]
    },
    
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('lego.css', {allChunks: true})
    ]
}
if(!isDev){   
     config.resolve.alias = {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': '../../../create-react-class'
    },
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}


export default config