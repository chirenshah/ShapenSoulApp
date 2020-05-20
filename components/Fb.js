import firebase from 'react-native-firebase';
import uuid4 from 'uuid/v4';

export async function login( email, password , popup ) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => popup(error))
}

export async function signup(email, password, Name, popup) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
            userInfo.user.updateProfile({ displayName: Name.trim() })
        })
    .catch((error)=> popup(error))
}

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}

export function signout(onSignedOut) {
    firebase.auth().signOut()
        .then(() => {
            onSignedOut();
        })

}

export function updateProfile(User, updateComplete) {
    User.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log(User);

    firebase.firestore()
        .collection('Users')
        .doc(User.email).set(User)
        .then(() => updateComplete(User))
        .catch((error) => console.log(error));
}

export function deleteFood(food, deleteComplete) {
    console.log(food);

    firebase.firestore()
        .collection('Foods')
        .doc(food.id).delete()
        .then(() => deleteComplete())
        .catch((error) => console.log(error));
}

export async function getUsers(UsersRetreived) {

    var userList = [];

    var snapshot = await firebase.firestore()
        .collection('Users')
        .get()

    snapshot.forEach((doc) => {
        const userItem = doc.data();
        userItem.id = doc.id;
        userList.push(userItem);
    });
    UsersRetreived(userList);
}
export async function getRecipe(RecipeList) {

    var foodList = [];

    var snapshot = await firebase.firestore()
        .collection('Recipe')
        .get()

    snapshot.forEach((doc) => {
        const foodItem = doc.data();
        foodItem.id = doc.id;
        foodList.push(foodItem);
    });
    RecipeList(foodList);
}


export function uploadFood(food, onFoodUploaded, { updating }) {

    if (food.imageUri) {
        const fileExtension = food.imageUri.split('.').pop();
        console.log("EXT: " + fileExtension);

        var uuid = uuid4();

        const fileName = `${uuid}.${fileExtension}`;
        console.log(fileName);

        var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

        storageRef.putFile(food.imageUri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    console.log("snapshot: " + snapshot.state);
                    console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        console.log("Success");
                    }
                },
                error => {
                    unsubscribe();
                    console.log("image upload error: " + error.toString());
                },
                () => {
                    storageRef.getDownloadURL()
                        .then((downloadUrl) => {
                            console.log("File available at: " + downloadUrl);

                            food.image = downloadUrl;

                            delete food.imageUri;

                            if (updating) {
                                console.log("Updating....");
                                updateFood(food, onFoodUploaded);
                            } else {
                                console.log("adding...");
                                addFood(food, onFoodUploaded);
                            }
                        })
                }
            )
    } else {
        console.log("Skipping image upload");

        delete food.imageUri;

        if (updating) {
            console.log("Updating....");
            updateFood(food, onFoodUploaded);
        } else {
            console.log("adding...");
            addFood(food, onFoodUploaded);
        }
    }
}

export function addUser(User, addComplete) {

    firebase.firestore()
        .collection('Users')
        .add(User)
        .then((snapshot) => {
            User.id = snapshot.id;
            snapshot.set(User);
        }).then(() => addComplete(User))
        .catch((error) => console.log(error));
}