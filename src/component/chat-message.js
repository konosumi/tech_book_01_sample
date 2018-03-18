/**
 * チャット内容表示クラス
 *
 * チャットメッセージ内容をHTMLで描画します。
 * props経由で初期値としてメッセージ内容が与えられるので、それをそのまま表示しているだけです
 */
import React from "react";

class ChatMessage extends React.Component {
    render() {
        /**
         * ComponentのJSXでは、style={{margin: "6px"}}のようにスタイルをあてます
         *
         * 今からはじめるReact.js〜スタイルの適用〜
         * SEE: https://qiita.com/kuniken/items/b06de893c22f33499a22
         */
        return (
            <table border="1" style={{margin: "6px"}}>
                <tbody>
                <tr>
                    <th>発言者</th>
                    <td>{this.props.chat_message.name}</td>
                    <th>発言内容</th>
                    <td>{this.props.chat_message.message}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default ChatMessage;
