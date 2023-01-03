import React from "react"
import { StyledChatBubble } from "./styles"

const ChatBubble = (props) => {
    return (
        <StyledChatBubble className={props.type}>{props.text}</StyledChatBubble>
    )
}

export default ChatBubble
