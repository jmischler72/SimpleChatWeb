export type ChatUser = {
    guest: boolean;
    displayName: string;
    userInfo: ChatUserInfo | null;
}

type ChatUserInfo = {
    email: string;
    photoURL: string;
    uid: string;
}