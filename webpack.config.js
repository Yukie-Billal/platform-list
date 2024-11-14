const path = require("path")

module.exports = {
   entry: './src/index.ts',
   target: 'node',
   mode: 'production', // Ubah ke 'development' jika ingin proses build lebih cepat
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: /node_modules/,
         },
      ],
   },
   resolve: {
      extensions: ['.ts'],
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'bundle'),
   },
   externals: {
      // Mengecualikan dependensi Node.js agar tidak dibundel
      express: 'commonjs express',
   },
   devtool: 'source-map', // Menambahkan sourcemap untuk debugging
};
