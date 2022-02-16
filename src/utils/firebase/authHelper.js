import {
    signInWithPopup,
    GoogleAuthProvider,
    query,
    addDoc,
    collection,
    getDocs,
    where,
    auth,
    db,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from './index';

// google auth provider
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        console.log("🚀 ~ file: authHelper.js ~ line 24 ~ signInWithGoogle ~ user", user)
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL: user.photoURL,
            });
        }
        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
        return false;
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log("🚀 ~ file: authHelper.js ~ line 47 ~ logInWithEmailAndPassword ~ data", data)
        return true;
    } catch (err) {
        console.error(err);
        alert(err.message);
        return false;
    }
};

export const registerWithEmailAndPassword = async (name, email, password, photo) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("🚀 ~ file: authHelper.js ~ line 59 ~ registerWithEmailAndPassword ~ user", user)
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            photoURL: photo || "",
        });
        return true;
    } catch (err) {
        console.error(err);
        alert(err.message);
        return err.message;
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logout = () => {
    signOut(auth);
};

// get user data from firestore
export const fetchUserData = async (user) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log("🚀 ~ file: Login.jsx ~ line 49 ~ fetchUserName ~ data", data)
        return data;
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
};