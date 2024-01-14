// Export ref of database
import {getDatabase, ref} from "firebase/database";
import {app} from "@/firebase/init";

const db = getDatabase(app);
const dbVersion = 'v3/';
export const dbRoomsPath = dbVersion + 'rooms/';

export function getRefFromPath(path: string){
    return ref(db, path);
}
