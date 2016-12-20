var webpack = require('webpack');


module.exports = {
    // entry: "./index.js",
    entry: {
      js: [
        './index', 
      ],
      vendor: [
          'react', 'react-dom'
      ],

      // fm: [
      //   './src/fm'
      // ]
    },
    output: {
        path: __dirname+"/public/",
        filename: "bundle.js"
    },
    
     module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['react','es2015', "stage-0"]
            }
          },
          {test: /\.jsx$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: ['react', 'es2015'] }},
        ]
     },
      plugins: [
    
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,

            // chunks: ["vendor"],
            filename: 'vendor.bundle.js',
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "fm",
        //     minChunks: Infinity,
        //     chunks: ["js"],
        //     filename: 'fm.bundle.js',
        // }),
    ],
};