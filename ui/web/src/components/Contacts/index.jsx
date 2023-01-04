import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../../helpers/storage";
import { ContactStyled } from "./styles";

export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        const getUser = async () => {
            const data = getFromLocalStorage("jwtToken");
            const user = await jwt_decode(data);

            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatar_img);
        }
        getUser();
    }, []);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return  (
        <>
            {currentUserName && currentUserImage && (
                <ContactStyled>
                    <div className="brand">
                        <img src="logo.png" alt="logo"/>
                        <h3>Wysa</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact.id}
                                    className={`contact ${ 
                                        index === currentSelected ? "selected" : "" }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img 
                                            src={`data:image/svg+xml;base64,${contact.avatar_img}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            ) 
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img 
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </ContactStyled>
            )}
        </>
    )
}
