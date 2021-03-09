const KEY_SHORTCUT_SETTING = "key_shortcut_setting";
const DEFAULT_SETTINGS = [{
        'title': 'GoogleDrive',
        'icon': 'https://lh3.googleusercontent.com/rCwHBRBJV4wFiEIN_Mlboj94_TGJxyJtBh-MBFL4y1aZdO4hb7_Uc_PpXRyAoN7O9m_Zc1wSyp3H1vsnb829QE7t9KyGNJY9A1a3QQ',
        'url': 'https://drive.google.com/drive/my-drive'
    },
    {
        'title': 'Gmail',
        'icon': 'https://lh3.googleusercontent.com/0rpHlrX8IG77awQMuUZpQ0zGWT7HRYtpncsuRnFo6V3c8Lh2hPjXnEuhDDd-OsLz1vua4ld2rlUYFAaBYk-rZCODmi2eJlwUEVsZgg',
        'url': 'https://mail.google.com/mail/u/0/'
    },
    {
        'title': 'YouTube',
        'icon': 'https://lh3.googleusercontent.com/3_OFn2skqHXk-UQ-9RUdNrDl_HQJrMCxks5teQcUrF_bOSeDG1hD8j83FeD31W8hASZCvubzsGfumuJq8kvvSAq03wY87RZ7Otx_DF4',
        'url': 'https://www.youtube.com/'
    },
    {
        'title': 'PlayBooks',
        'icon': 'https://lh3.googleusercontent.com/ebfqZ6Jmupx7K805rWoti7Xkfbe5BMU89k2f0INXuK0dh1cYdUneF6Gw5qB1T0P-W0NspIOEE4yhGE590HNFhr_cdpRhON95EyP7',
        'url': 'https://play.google.com/store/books?hl=ja'
    },
    {
        'title': 'Blogger',
        'icon': 'https://lh3.googleusercontent.com/JtYUq9HfkkOryxudgp34oqI8qFu9a6mmL64OXjcDX7mfEwcX_pxmTdurvxssofY4swTY2c_M1Kk5o1a863CGTiBZkxxuYXfjiNgz=h120',
        'url': 'https://www.blogger.com/'
    },
    {
        'title': 'GoogleCalendar',
        'icon': 'https://lh3.googleusercontent.com/DaaQa-Y-b3_IAhu6SBFb2vRl8PFR5iuCLwLszc16_OTlLrEFvFF9P4CS0ui-414nG9016ul3dQD1R3mHtmMx4P1bIA-zRXuPpFN4yw=h120',
        'url': 'https://calendar.google.com/calendar/u/0/r'
    }
];

window.addEventListener('load', function () {
    //    reset();
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
            img.classList.add('product-logo');
            img.onclick = function (e) {
                document.location.href = element.url;
            };
            var parent = document.getElementById('shortcut');
            parent.appendChild(img);
        });
    }
    if (setting == null || setting.length < 10) {
        addshortcutButton();
    }
}

function addShortCut(url, label) {
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
            })
            chrome.storage.local.set({ "key_shortcut_setting": JSON.stringify(setting) }, function () {
                console.log("addDefaultSetting YES setting=" + JSON.stringify(setting));
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
    var modal = document.createElement('div');
    modal.classList.add('setting-modal');

    // ラベル
    var label = document.createElement('label');
    label.textContent = 'URL';
    modal.appendChild(label);

    // URL入力
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
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
    xhr.onreadystatechange  = function () {
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