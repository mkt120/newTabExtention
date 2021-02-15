window.addEventListener('load', function() {
    var view = document.getElementById('image_select')
    view.onchange = ('change', function(e) {
        onSelectFile(e)
    });
});

function onSelectFile(e) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var body = document.body;
        body.style.background = 'url(' + e.target.result + ')';
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center center';
    }
    reader.readAsDataURL(e.target.files[0]);
}