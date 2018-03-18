/**
 * webpackのエントリーポイントです。
 * このファイルを起点にして、JSがバンドルされます
 */
import React from "react";
import ReactDom from "react-dom";
import Chat from "./component/chat";

// index.htmlの<div id="div_chat"></div>のことです
const div_chat = document.getElementById("div_chat");
if (div_chat) {
    /**
     * divの中身を差し替えて、描画を開始します
     * <Chat />はJSX風の記法です
     *
     * Reactの基礎を学ぶ 
     * SEE:https://qiita.com/tsuuuuu_san/items/58f82201ded0da420201
     */
    ReactDom.render(
        <Chat />,
        div_chat
    );
}

