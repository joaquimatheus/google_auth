import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage';
import jwt_decode from "jwt-decode";
import { Buffer } from "buffer";
import axios from 'axios';
import ajaxAdapter from "../../helpers/ajaxAdapter";

import { StyledAvatarSet } from "./styles";

export default function SetAvatar() {
    const loggedIn = getFromLocalStorage('jwtToken');
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate(); 
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const setProfilePicture = async () => {
        const token = await getFromLocalStorage("jwtToken");
        const user = await jwt_decode(token);

        const data = {
            avatar_img: avatars[selectedAvatar]
        }

        const response = await ajaxAdapter.request(`/users/avatar/${user.id}`, "put", data)

        if (response.ok == true) {
            navigate("/chat");
        }
    }

    useEffect(() => {
        const getAvatar = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }

            setAvatars(data);
            setIsLoading(false);
        }

        getAvatar();
    }, [])

    return (
        <>
            {!loggedIn && <Navigate to="/" />}
            {isLoading ? (
                <StyledAvatarSet>
                    <img src="loader.gif" alt="loader" className="loader"/>
                </StyledAvatarSet>
            ) : (
                <StyledAvatarSet>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars && avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar ${ selectedAvatar === index ? "selected" : "" }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                </StyledAvatarSet>
            )}
        </>
    )
}
