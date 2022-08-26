import {auth, db} from "../../db/firestore";

let checkAdmin;
async function getIsAdmin() {
    if (checkAdmin !== undefined)
        return checkAdmin;
    const userID = auth.currentUser.uid;

    const currentUser = db.collection('users').doc(userID);
    const userData = await currentUser.get();
    checkAdmin = userData.data().isAdmin;
    console.log('Check Admin:');
    console.log(checkAdmin);
    return checkAdmin;
}

export default getIsAdmin;
