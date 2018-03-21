/**
 * チャットクラスです
 * Firebase Realtime Database と連携します
 */
import React from "react";
import Firebase from "firebase";
import ChatMessage from "./chat-message";
import ChatSend from "./chat-send";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        // 初期状態では読み込み中というチャットメッセージを差し込んでおきます
        this.state = {
            // 発展系の理想を言うと、個々のチャットメッセージはモデルクラス化した方が良いです
            "chat_messages": [{
                "name": "読み込み中",
                "message": "チャットを読み込んでいます"
            }]
        } 
    }

    componentWillMount() {
        // Reactの準備が整ったら、Realtime Database接続を開始します
        // Realtimte Databaseのchat_messagesを監視して、変更検知で発火します
        // SEE: https://firebase.google.com/docs/database/web/read-and-write
        Firebase.database().ref('/chat_messages').on('value', (snapshot) => {
            const chatMessages = snapshot.val();

            /**
             * ReactComponentのstateを書き換えることで、Reactに再描画を促します
             * 
             * React.js コンポーネント入門（props/state）
             * SEE: https://qiita.com/KeitaMoromizato/items/0da6c8e4264b1f206451
             *
             */
            this.setState((prevState, props) => {
                return {
                    'chat_messages': chatMessages ? chatMessages : [{
                        "name": "読み込み完了",
                        "message": "まだ発言はありません"
                    }]
                }
            });
        });
    }

    render() {
        // 開発用にコンソールに出力しています
        console.log('チャットのメッセージ一覧');
        console.log(this.state.chat_messages);
        
        /**
         * チャットメッセージとチャット送信は、パーツ化して分離しました。
         * renderが肥大化してきたら、パーツで分離することをオススメします
         *
         * メッセージ内容： src/component/chat-message.js
         * 送信フォーム： src/component/chat-send.js
         */
        return (
            <div>
                <h3>チャットに書き込まれたメッセージの一覧です</h3>
            {/**
              * Object.valuesはIE11ではエラーになりますが、今回はコンパクトに書くために採用してます
              * ここでの chat_keyは、-L6iyvIIJObhMrQfpUcU のような、push時に自動発行された値になります。
              * 解説は送信フォーム側にも書いてありますので、chat-send.jsもご確認ください。
              *
              * なお、props(chat_message=)で、チャットメッセージクラスにチャット内容を渡しています。
              */}
            {Object.values(this.state.chat_messages).map((chat_message, chat_key) => {
               return (
                   <ChatMessage chat_message={chat_message} key={chat_key} />
               );
            })}
	        <ChatSend />
            </div>
        );
    }
}

export default Chat;
