import type {ChatMessage} from "@/types/ChatMessage";

export type ChatRoom = {
    uid: string ,
    name: string,
    messages: ChatMessage[],
}