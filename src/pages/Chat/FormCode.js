import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco,darcula,dark,vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { code } from ".";
const Chat = () => {
    const [codeString,setCodeString] = useState("")
  return (
    <div>
      <SyntaxHighlighter language="jsx" style={vs2015}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Chat;
