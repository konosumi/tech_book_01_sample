// webpack 入門 （v3系 対応）
// SEE: https://qiita.com/soarflat/items/28bf799f7e0335b68186
const webpack = require("webpack");

module.exports = {
    // エントリーポイントの設定
    entry: './src/index.js',
    // 出力の設定
    output: {
        // 出力するファイル名(このファイルを起点にバンドルされていきます)
        filename: 'index.js',
        // 出力パス（最終的にpublic/js/bundle/index.jsに出力されます）
        path: __dirname + '/public/js/bundle/'
    },

    // コンパイルされたJSは見づらいため、素のソースコードをマッピングします
    devtool: 'source-map',

    plugins: [
        // 開発や検証など、環境によって接続先を切り替えることを想定しています
        // SEE: https://webpack.js.org/plugins/define-plugin/
        // 参考: https://qiita.com/fullkawa/items/dee3754ba243970c37c7
        new webpack.DefinePlugin({
            'FIREBASE_CONFIG': JSON.stringify({
                apiKey: "<API_KEY>",
                authDomain: "<PROJECT_ID>.firebaseapp.com",
                databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
                storageBucket: "<BUCKET>.appspot.com",
                messagingSenderId: "<SENDER_ID>",
            })
        })
    ],

    module: {
        rules: [{
            // JSもしくはJSXファイルに対して発動します
            test: /\.jsx?$/, 
            // インストールしたパッケージは除外します
            exclude: /node_modules/,
            use: {
                /**
                 * npm でインストールした
                 *   babel-loader,
                 *   babel-preset-env,
                 *   babel-preset-react
                 * を使用して、JSをトランスパイラ(変換)しています
                 */
                loader: 'babel-loader',
                options: {
                    // babel-preset-envを簡単にさわってみた。
                    // SEE: https://qiita.com/ryuone/items/13f5d450c3865709ba10
                    presets: ["env", "react"]
                }
            }
        }]
    }
};
