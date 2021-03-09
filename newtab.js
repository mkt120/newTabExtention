window.addEventListener('load', function() {
    var button = document.getElementById('setting-button');
    button.onclick = function() {
        showModal();
    };
});

function showModal() {
    var input = document.createElement('input');
    input.setAttribute('id', 'image_select');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = ('change', function(e) {
        onSelectFile(e);
        removeModal();
    });

    var label = document.createElement('label');
    label.setAttribute('id', 'setting-background-button');
    label.textContent = '背景設定';
    label.appendChild(input);

    var modal = document.createElement('div');
    modal.classList.add('setting-modal');
    modal.appendChild(label);

    var div = document.createElement('div');
    div.setAttribute('id', 'modal_view');
    div.classList.add('modal-background');
    div.appendChild(modal);

    document.body.appendChild(div);
}

function removeModal() {
    let view = document.getElementById('modal_view');
    document.body.removeChild(view);
}