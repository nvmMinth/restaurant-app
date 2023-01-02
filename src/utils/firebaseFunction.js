import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { database } from "../firebase"


/// save Items into Database storage
export const saveCreatedItem = async (data) => {
    await setDoc(doc(database, "items", `${Date.now()}`), data, { merge: true })
}

/// get all items
export const getAllItems = async () => {
    const items = await getDocs(query(collection(database, "items"), orderBy("id", "desc")))

    return items.docs.map(item => item.data())
}
