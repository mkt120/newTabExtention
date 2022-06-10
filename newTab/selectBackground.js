const BACKGROUND_IMAGE = "background_image";
window.addEventListener('load', function () {
//    console.log("setBackground document.cookie=" + document.cookie);
    chrome.storage.local.get(BACKGROUND_IMAGE, function (value) {
        var result = value[BACKGROUND_IMAGE];
        setBackground(result);
    });
});

function onSelectFile(e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        chrome.storage.local.set({ 'background_image': e.target.result }, function () {});
        setBackground(e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}

function clearBackground() {
    chrome.storage.local.remove(BACKGROUND_IMAGE, function (value) {
        var body = document.body;
        body.style.background = '';
    });
}

function setBackground(result) {
//    console.log("setBackground result=" + result);
    var body = document.body;
    body.style.background = 'url(' + result + ')';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center center';
}