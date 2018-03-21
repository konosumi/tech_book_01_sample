/**
 * webpackのエントリーポイントです。
 * このファイルを起点にして、JSがバンドルされます
 */
import React from "react";
import ReactDom from "react-dom";
import Chat from "./component/chat";

// Firebaseの初期化です
// webpackのdefineプラグインで定義した接続設定を利用します
Firebase.initializeApp(FIREBASE_CONFIG);

/**
 * 匿名認証を行ないます
 * then の横は function() { ではなく () => { で記述する必要があります。
 * これには、JavaScriptのthisにおける深い問題があります。
 *
 * 【JavaScript】アロー関数式を学ぶついでにthisも復習する話
 * SEE: https://qiita.com/mejileben/items/69e5facdb60781927929
 */
Firebase.auth().signInAnonymously().then(() => {
    console.log('Anonymous auth success');

    // index.htmlの<div id="div_chat"></div>のことです
    const div_chat = document.getElementById("div_chat");
    if (div_chat) {
        /**
         * divの中身を差し替えて、描画を開始します
         * <Chat />はJSX風の記法です
         *
         * 今回のチャットシステムは、匿名認証済みのユーザのみ利用することができます
         * そのため、チャットシステムの描画をあえて匿名認証の実行後に行なっています 
         *
         * Reactの基礎を学ぶ 
         * SEE:https://qiita.com/tsuuuuu_san/items/58f82201ded0da420201
         */
        ReactDom.render(
            <Chat />,
            div_chat
        );
    }
}).catch((error) => {
    console.log('Anonymous auth error');

    if (error) {
        console.error(error);
    }
});

