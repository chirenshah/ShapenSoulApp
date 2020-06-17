import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid4 from 'uuid/v4';

export async function login( email, password , popup ) {
    auth().signInWithEmailAndPassword(email, password)
        .catch((error) => popup(error))
}

export async function signInWithPhoneNumber(PhoneNumber,otp) {
    let confirmation = await auth().signInWithPhoneNumber(PhoneNumber).
    then((confirmation)=>{
        otp(confirmation,"Confirm OTP")})
    .catch((error)=>console.log(error))
  }

export async function confirmCode(code,confirm,problem) {
    try {
      success = await confirm.confirm(code);
        if(success)problem('true')
    } catch (error) {
      problem(error)
    }
}  

export async function signup(email, password, Name, popup) {
    auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
            userInfo.user.updateProfile({ displayName: Name })
        })
    .catch((error)=> popup(error))
}

export function subscribeToAuthChanges(authStateChanged) {
    auth().onAuthStateChanged((user) => {
        authStateChanged(user);
    })
}

export function reqAppointment(appointment){
    var db = firestore()

    var user = auth().currentUser
    var email = user.email
    var clientName = user.displayName

    var tokenID = clientName + appointment
    var all = []
    all.push(tokenID)
    // let entry = new Map()
    // let name = ''
    // let date = ''
    // // entry.set(name, clientName)
    // entry.set(date, appointment)

    var batch = db.batch()
    var client = db.collection('Users').doc(email)
    batch.update(client, {ApptReq: true, appointment:appointment})
    var admin = db.collection('Users').doc('admin@a.com')
    batch.update(admin, {appointment:all})   
    batch.commit().then(() => 
        {
            console.log('Updated', all);
        }
    )  
    .catch((error) => console.log(error))
}


export function getInfo(){
    var all = []
    
    firestore()
    .collection('Users')
    .where('ApptReq', '==', true)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){  
            all.push(doc.data().tokenID)  
            console.log(all)
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


export function signout(onSignedOut) {
    auth().signOut()
        .then(() => {
            onSignedOut();
        })
}

export function updateProfile(User, updateComplete) {
    User.updatedAt = firestore.FieldValue.serverTimestamp();
    console.log(User);

    firestore()
        .collection('Users')
        .doc(User.email).set(User)
        .then(() => updateComplete(User))
        .catch((error) => console.log(error));
}

export function deleteFood(food, deleteComplete) {
    console.log(food);

    firestore()
        .collection('Foods')
        .doc(food.id).delete()
        .then(() => deleteComplete())
        .catch((error) => console.log(error));
}

export async function getUsers(UsersRetreived) {

    var userList = [];

    var snapshot = await firestore()
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

    var snapshot = await firestore()
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

        var storageRef = storage().ref(`foods/images/${fileName}`);

        storageRef.putFile(food.imageUri)
            .on(
                storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    console.log("snapshot: " + snapshot.state);
                    console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                    if (snapshot.state === storage.TaskState.SUCCESS) {
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

    firestore()
        .collection('Users')
        .add(User)
        .then((snapshot) => {
            User.id = snapshot.id;
            snapshot.set(User);
        }).then(() => addComplete(User))
        .catch((error) => console.log(error));
}