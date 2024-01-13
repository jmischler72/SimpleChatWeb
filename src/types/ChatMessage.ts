import type {ChatUser} from "@/types/ChatUser";

export type ChatMessage = {
    user: ChatUser,
    message?: string,
    gif?: {
        content_description: string,
        url: string
    }
    timestamp: number,
}