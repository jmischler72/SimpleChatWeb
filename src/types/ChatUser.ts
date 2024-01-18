export type ChatUser = {
    guest: boolean;
    displayName: string;
    userInfo: ChatUserInfo | null;
}

type ChatUserInfo = {
    photoURL: string;
    uid: string;
}