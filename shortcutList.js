const KEY_SHORTCUT_SETTING = "key_shortcut_setting";
const CLASS_PRODUCT_LOGO = "product-logo";

window.addEventListener('load', function () {
    //       reset();
    chrome.storage.local.get(KEY_SHORTCUT_SETTING, function (value) {
        var setting = value[KEY_SHORTCUT_SETTING];
        console.log("shortcutList setting=" + JSON.stringify(setting));
        bindShortcut(setting);
    });
});

function bindShortcut(setting) {
    console.log("bindShortcut setting=" + setting);
    if (setting != null) {
        setting = JSON.parse(setting);
        setting.forEach(element => {

            var img = document.createElement("img");
            img.src = element.icon;
            img.classList.add(CLASS_PRODUCT_LOGO);

            var a = document.createElement("a");
            a.setAttribute("href", element.url);
            a.setAttribute("target", "_blank");
            a.appendChild(img);

            var parent = document.getElementById('shortcut');
            parent.appendChild(a);
        });
    }
    if (setting == null || setting.length < 10) {
        addshortcutButton();
    }
}

function addShortCut(url, label) {
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    convertUrltoBase64(url, function (result) {
        chrome.storage.local.get(KEY_SHORTCUT_SETTING, function (value) {
            var setting = value[KEY_SHORTCUT_SETTING];
            if (setting == null) {
                setting = [];
            } else {
                setting = JSON.parse(setting);
            }
            setting.push({
                'url': url,
                'label': label,
                'icon': result
            });
            chrome.storage.local.set({ 'key_shortcut_setting': JSON.stringify(setting) }, function () {
                console.log("addDefaultSetting YES setting=" + JSON.stringify(setting));
                var shortcut = document.getElementById('shortcut');
                while (shortcut.firstChild) {
                    shortcut.firstChild.remove();
                }
                bindShortcut(JSON.stringify(setting));
            });
        });
    });
}

function addshortcutButton() {
    var img = document.createElement("img");
    img.src = 'add_shortcut.png';
    img.classList.add('product-logo');
    img.onclick = function (e) {
        showShortCutModal();
    };
    var parent = document.getElementById('shortcut');
    parent.appendChild(img);
}

function showShortCutModal() {
    var modal = document.createElement('form');
    modal.classList.add('setting-modal');

    // ラベル
    var label = document.createElement('label');
    label.textContent = 'URL';
    modal.appendChild(label);

    // URL入力
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('autofocus', 'autofocus');
    modal.appendChild(input);

    // 追加ボタン
    var button = document.createElement('button');
    button.textContent = "追加";
    modal.appendChild(button);
    button.onclick = function (e) {
        var parent = document.getElementById('modal_view');
        document.body.removeChild(parent);
        addShortCut(input.value, "label");
    };

    var div = document.createElement('div');
    div.setAttribute('id', 'modal_view');
    div.classList.add('modal-background');
    div.appendChild(modal);

    document.body.appendChild(div);
}


function reset() {
    chrome.storage.local.remove(KEY_SHORTCUT_SETTING, function () {
        console.log("addDefaultSetting reset");
    });
}

function convertUrltoBase64(targetUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log("XMLHttpRequest.responseText:" + XMLHttpRequest.responseText);
        if (xhr.readyState == 4) {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        }
    };
    let url = new URL(targetUrl);
    xhr.open('GET', 'https://www.google.com/s2/favicons?sz=64&domain_url=' + url.hostname);
    xhr.responseType = 'blob';
    xhr.send();
}