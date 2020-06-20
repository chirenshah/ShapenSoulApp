const subscriber = database()
      .ref('messages/' + Currentuser.uid).on('child_added', snapshot => {
        const { user } = snapshot.val()
        if(user._id == Currentuser.uid)
        PushNotification.localNotification({
          title:'Shape n soul',
          message: "Stay home stay safe"
        })
      })