import React, { createRef, useEffect, useRef, useState } from 'react'
import { ChatInput, StyledChat } from './styles'
import { v4 as uuidv4 } from "uuid"
import { Navigate } from "react-router-dom"
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { getFromLocalStorage } from "../../helpers/storage"

import { Icon } from "../../components/Icon"
import ChatBubble from "../../components/ChatBubble"
import { defaultChats } from "./defaultInputs"

const ChatType = {
    user: "sender",
    from: "receiver"
}

const TRANSITION_DELAY = 100

const Chat = ({ chatAnimationDelay }) => {
    const [chats, setChats] = useState(defaultChats)
    const [animate, setAnimate] = useState(false)

    const inputRef = createRef()
    const chatsEndRef = useRef(null)

    const loggedIn = getFromLocalStorage("jwtToken")

    useEffect(() => {
        if (!chatsEndRef.current) return
        chatsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [chats])

    useEffect(() => {
        setAnimate(true)
    }, [])

    const inputChatHandler = () => {
        if (!inputRef.current) { return }

        const text = inputRef.current.value.trim()
        if (text === "") { return }

        inputRef.current.value = ""
        inputRef.current.focus()

        const chat = {
            id: uuidv4(),
            text: text,
            type: ChatType.user
        }
        setChats((prev) => [...prev, chat])
    }

    return (
        <StyledChat>
            {!loggedIn && <Navigate to="/" replace />}
            <TransitionGroup component="ul">
                <>
                    {chats.map((chat, index) => (
                        <CSSTransition
                            in={animate}
                            key={chat.id}
                            classNames="chat-bubble"
                            timeout={{
                                enter: chat.isDefault
                                    ? chatAnimationDelay * (index + 1)
                                    : TRANSITION_DELAY,
                            }}
                        >
                            <ChatBubble text={chat.text} type={chat.type}></ChatBubble>
                        </CSSTransition>
                    ))}
                </>
                <div ref={chatsEndRef} />
            </TransitionGroup>
            <ChatInput>
                <input 
                    ref={inputRef}
                    type="text"
                    placeholder="Ask something..."
                    onKeyDown={(e) => e.key !== "Enter" || inputChatHandler()}
                />
                <button onClick={() => inputChatHandler()}>
                    <Icon src="send.svg"/>
                </button>
            </ChatInput>
        </StyledChat>
    )
}

export default Chat
