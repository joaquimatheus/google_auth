import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from '../../helpers/storage';
import jwt_decode from "jwt-decode";
import { Buffer } from "buffer";
import axios from 'axios';

import { StyledAvatarSet } from "./styles";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate(); 
    const [avatars, setAvatars] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const setProfilePicture = async () => {
        const token = await getFromLocalStorage("jwtToken");
        const user = await jwt_decode(token);

        console.log(user);
    }

    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsloading(false);
    }, [])

    return (
        <>
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
        </>
    )
}
