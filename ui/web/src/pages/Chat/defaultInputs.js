import { v4 as uuidv4 } from "uuid";

const ChatType = {
    system: "system",
};

export const defaultChats = [
    {
        id: uuidv4(),
        text: "hi theree!",
        type: ChatType.system,
    },
    {
        id: uuidv4(),
        text: "I'm Hazn - an AI chat built by devs!",
        type: ChatType.system,
        isDefault: true,
    },
    {
        id: uuidv4(),
        text: "I'm here to understand your concerns and connect you with the best resource available to support you",
        type: ChatType.system,
        isDefault: true,
    },
    {
        id: uuidv4(),
        text: "Can I help!",
        type: ChatType.system,
        isDefault: true,
    },
];
