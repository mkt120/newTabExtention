const KEY_SHORTCUT_SETTING = "key_shortcut_setting";
const CLASS_PRODUCT_LOGO = "product-logo";
const CLASS_EDIT_BUTTON = "edit-button";
const CLASS_SHORTCUT_BUTTON = "shortcut-button";

window.addEventListener('load', function () {
    //       reset();
    chrome.storage.local.get(KEY_SHORTCUT_SETTING, function (value) {
        var setting = value[KEY_SHORTCUT_SETTING];
        //        console.log("shortcutList setting=" + JSON.stringify(setting));
        bindShortcut(setting);
    });
});

function bindShortcut(setting) {
    //    console.log("bindShortcut setting=" + setting);
    if (setting != null) {
        setting = JSON.parse(setting);

        var shortcutList = document.createElement('ul');
        var parent = document.getElementById('shortcut');
        parent.appendChild(shortcutList);

        setting.forEach(element => {
            var img = document.createElement("img");
            img.src = element.icon;
            img.classList.add(CLASS_PRODUCT_LOGO);

            var a = document.createElement("a");
            a.setAttribute("href", element.url);
            a.setAttribute("target", "_blank");
            a.appendChild(img);

            var li = document.createElement("li");
            li.classList.add(CLASS_SHORTCUT_BUTTON);
            li.appendChild(a);

            var edit = document.createElement("img");
            edit.src = "./setting.png";
            edit.classList.add(CLASS_EDIT_BUTTON);
            edit.onclick = function (event) {
                showShortCutModal(element.url);
                event.stopPropagation();
            }
            li.appendChild(edit);

            shortcutList.appendChild(li);
        });
    }
    if (setting == null || setting.length < 10) {
        addshortcutButton();
    }
}


function addshortcutButton() {
    var img = document.createElement("img");
    img.src = 'add_shortcut.png';
    img.classList.add('product-logo');
    img.onclick = function (e) {
        showShortCutModal(null);
    };
    var parent = document.getElementById('shortcut');
    parent.appendChild(img);
}

function showShortCutModal(url) {
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
    if (url != null) {
        input.value = url;
    }
    modal.appendChild(input);

    // 追加ボタン
    var button = document.createElement('button');
    if (url != null) {
        button.textContent = "変更";
    } else {
        button.textContent = "追加";
    }
    modal.appendChild(button);
    button.onclick = function (e) {
        var parent = document.getElementById('modal_view');
        document.body.removeChild(parent);
        if (url != null) {
            console.log("do changeShortcut");
            changeShortCut(url, input.value, "label");
        } else {
            console.log("do addShortcut");
            addShortCut(input.value, "label");
        }
    };

    var closeButton = document.createElement('div');
    closeButton.classList.add(CLASS_CLOSE_BUTTON);
    closeButton.textContent = '閉じる'
    closeButton.onclick = function () {
        removeModal();
    }
    modal.appendChild(closeButton);


    var div = document.createElement('div');
    div.setAttribute('id', 'modal_view');
    div.classList.add('modal-background');
    div.appendChild(modal);

    document.body.appendChild(div);
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
                var shortcut = document.getElementById('shortcut');
                while (shortcut.firstChild) {
                    shortcut.firstChild.remove();
                }
                bindShortcut(JSON.stringify(setting));
            });
        });
    });
}

function changeShortCut(oldUrl, newUrl, label) {
    if (!newUrl.startsWith('http')) {
        newUrl = 'https://' + newUrl;
    }
    convertUrltoBase64(newUrl, function (result) {
        chrome.storage.local.get(KEY_SHORTCUT_SETTING, function (value) {
            var setting = JSON.parse(value[KEY_SHORTCUT_SETTING]);
            for (var index=0; index <= setting.length; index++) {
                var hoge = setting[index];
                console.log("setting old="+ oldUrl + ",  element.url=" + hoge.url); 
                if (hoge.url == oldUrl) {
                    console.log("setting found!!"); 
                    setting[index] = {
                        'url': newUrl,
                        'label': label,
                        'icon': result                        
                    };
                    break;
                }
            }
            chrome.storage.local.set({ 'key_shortcut_setting': JSON.stringify(setting) }, function () {
                var shortcut = document.getElementById('shortcut');
                while (shortcut.firstChild) {
                    shortcut.firstChild.remove();
                }
                bindShortcut(JSON.stringify(setting));
            });
        });
    });
}

function reset() {
    chrome.storage.local.remove(KEY_SHORTCUT_SETTING, function () {
        console.log("addDefaultSetting reset");
    });
}

function convertUrltoBase64(targetUrl, callback) {
    var xhr = new XMLHttpRequest();
    console.log("convertUrltoBase64 target=" + targetUrl);
    xhr.onreadystatechange = function () {
        //        console.log("XMLHttpRequest.responseText:" + XMLHttpRequest.responseText);
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