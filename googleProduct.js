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
window.addEventListener('load', function() {
    console.log("googleProduct window.onLoad");
    if (localStorage[KEY_SHORTCUT_SETTING] == null) {
        console.log("googleProduct null");
        addDefaultSetting();
    }
    bindShortcut();
});

function bindShortcut() {
    var setting = localStorage[KEY_SHORTCUT_SETTING];
    setting = JSON.parse(setting);
    setting.forEach(element => {
        console.log("window.onLoad");
        console.log(element);
        var img = document.createElement("img");
        img.src = element.icon;
        img.classList.add('product-logo');
        img.onclick = function(e) {
            document.location.href = element.url;
        };
        var parent = document.getElementById('shortcut');
        parent.appendChild(img);
    });
}

function addDefaultSetting() {
    localStorage.setItem(KEY_SHORTCUT_SETTING, JSON.stringify(DEFAULT_SETTINGS));
}