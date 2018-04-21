# はじめに
技術書典4にて頒布する「Firebase + React.js リアルタイムアプリケーション入門」のための、サンプルコード用のレポジトリです。

## プロジェクト直下
プロジェクトの直下にはnpm用の「package.json」とwebpack用の「webpack.config.dev.js」が置いてあります。

## doc
doc ディレクトリの下には、Realtime Database にセットするルールのサンプルが入っています。

## public/index.html
index.htmlはHTMLファイルです。ほぼJSを呼ぶためだけの役割です。

## src/index.js
Firebaseのセットアップと、チャットクラスの呼び出し(ReactDomのレンダリング)を行ないます。

## src/component/chat.js
chat.jsは、各種コンポーネントを束ねるチャットの本体クラスです。

## src/component/chat-message.js
chat-message.jsは、チャットのメッセージ用のReactコンポーネントです。

## src/component/chat-send.js
chat-send.jsは、チャット送信用のReactコンポーネントです。

## 補足
本コードは、MacOSにて開発致しました。Windowsでご利用される場合は、場合によってはシンボリック問題が発生する可能性があります。

本書内でも少し触れておりますが、その際はnpmモジュールは「--no-bin-links」でインストールし、webpackはローカルではなくグローバルにインストールするなどの工夫をお願いいたします。
