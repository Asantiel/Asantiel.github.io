$(
    function(){
        if(!('serviceWorker' in navigator)) return;
        if(!('PushManager' in window)) return;
    }
)

function registerServiceWorker() {
    

    return navigator.serviceWorker.register('script.js')
    .then(function(registration){
        console.log('Service worker successfully registered');
        return registration;
    })
    .catch(function(err){
        console.error('Unable to register servive-worker');
    });
}

function askPermission(){
    return new Promise(function(resolve, reject){
        const permissionResult = Notification.requestPermission(function(result){
            resolve(result);
        });

        if(permissionResult){
            permissionResult.then(resolve, reject);
        }
    })
    .then(function(permissionResult){
        if (permissionResult !== 'granted')
            throw new Error("We weren't granted permission.");
    });
}

function getNotificationPermissionState() {
    if (navigator.permissions) {
      return navigator.permissions.query({name: 'notifications'})
      .then((result) => {
        return result.state;
      });
    }
  
    return new Promise((resolve) => {
      resolve(Notification.permission);
    });
  }
