/**
 * チャットの送信フォームクラス
 */
import React from "react";
import Firebase from "firebase";

class ChatSend extends React.Component {
    constructor(props) {
        super(props);

        // 最初は空の状態です
        this.state = {
            'message': '',
            'name': ''
        }
    }
 
    // 発言者名の変更をstateで保持します
    onChangeName(e) {
        const value = e.target.value;
        this.setState((prevState, props) => {
            return {
                'name': value,
                'message': prevState.message
            }
        });
    }
 
    // 発言内容の変更をstateで保持します
    onChangeMessage(e) {
        const value = e.target.value;
        this.setState((prevState, props) => {
            return {
                'name': prevState.name,
                'message': value
            }
        });
    }

    // 発言内容をRealtime Databaseに送信(登録)します
    onClickSend(e) {
        if (this.state.message.length > 0) {
           /**
            * https://firebase.google.com/docs/database/admin/save-data
            * Realtime Database への発言の書き込みです
            *
            * chat_messagesをリストとし、そこに発言内容を記録していきます。
            * 最終的に、Firebaseには以下のように保存されます
            * {-L6iyvIIJObhMrQfpUcU: {…}, -L6izcKQAh1x3M1_67Ym: {…}}
            *     -L6iyvIIJObhMrQfpUcU : {message: "かきくけこ", name: "あいうえお"}
            *     -L6izcKQAh1x3M1_67Ym : {message: "fghij", name: "abcde"}
            *
            * なお、本書では本質と関係ないため省略していますが、ここで必ず入力チェックを行ないましょう
            */
           Firebase.database().ref('chat_messages/').push().set({
               name: this.state.name,
               message :this.state.message
           });

           // 発言を送信したのでリセットします
           // stateが変更されるので、送信フォームの発言内容が消去されますよ！
           this.setState((prevState, props) => {
                return {
                    'name': prevState.name,
                    'message': ''
                }
            });
        }
    }

    render() {
        /**
         * クリックやフォームの値の変更にイベントを設定している以外は、何の変哲もない送信フォームです
         * thisを崩さないようにするために、あえてアロー関数形式でイベントを起動しています
         *
         * 【JavaScript】アロー関数式を学ぶついでにthisも復習する話
         * SEE: https://qiita.com/mejileben/items/69e5facdb60781927929
         * ES6時代のNode.js(arrow functionを使おう)
         * SEE: https://techblog.yahoo.co.jp/javascript/nodejs/Node-es6/
         */
        return (
            <form>
                <h3>チャットメッセージの送信フォームです</h3>
                <table border="1">
                <tbody>
                <tr>
                    <th>● 発言者名</th>
                    <td>
                        <input type="text" size="20" value={this.state.name} onChange={(e) => this.onChangeName(e)} />
                    </td>
                </tr>
                <tr>
                    <th>● 発言内容</th>
                    <td>
                        <textarea rows="10" cols="100" value={this.state.message} onChange={(e) => this.onChangeMessage(e)}></textarea>
                    </td>
                </tr>
                </tbody>
                </table>
                <input type="button" value="送信" style={{width: "4em", height: "2em"}} onClick={(e) => this.onClickSend(e)} />
            </form>
        );
    }
}

export default ChatSend;
