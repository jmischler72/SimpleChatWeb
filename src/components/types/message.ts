export type Message = {
    username: string,
    message?: string,
    gif?: {
        content_description: string,
        url: string
    }
    timestamp: number,
}