import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"

import { ChatContainerStyled } from "./styles";

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessage] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessag, setArrivalMessage] = useState(null);

    return (
        <ChatContainerStyled>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img 
                            src={`data:image/svg+xml;base64,${currentChat.avatar_img}`}
                            alt=""
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <div className="chat-messages">
                    {messages.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div
                                    className={`message ${
                                        message.fromSelf ? "sended" : "recieved"
                                    }`}
                                >
                                    <div className="content">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ChatContainerStyled>
    )
}
