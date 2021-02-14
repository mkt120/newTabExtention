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
        image.setAttribute('background-image', e.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}