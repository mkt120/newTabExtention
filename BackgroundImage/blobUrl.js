window.addEventListener('load', function(){
  // body
  var image = document.getElementById("backgroundImage");
  document.body.addEventListener("change", function(evt) {
    // Blob URLの作成
    var fileList = evt.target.files;
    var blobUrl = window.URL.createObjectURL( fileList[0] ) ;
    // HTMLに書き出し (src属性にblob URLを指定)
    //document.body.background = blobUrl;

    var image = document.getElementById("backgroundImage");
    image.src= blobUrl;
    //document.body.innerHTML += '<a href="' + blobUrl + '" target="_blank"><img id="backgroundImage" src="' + blobUrl + '"></a>' ;

    // button
    var btn = document.getElementById("save");
    btn.addEventListener('click', function(){
      var image = document.getElementById("backgroundImage");
      if (image == null) {
        alert("image is null.");
      } else {
        alert("save background image complete.");
        var str = getImageToBase64(image);
      }
    });

  },false);

});



function getImageToBase64(img) {
    // New Canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    //alert(canvas.toDataURL("image/png"));
    // To Base64
    return canvas.toDataURL(mime_type);
}