const URL_GOOGLE_DRIVE = "https://drive.google.com/drive/my-drive";
const URL_GOOGLE_GMAIL = "https://mail.google.com/mail/u/0/";
const URL_GOOGLE_YOUTUBE = "https://www.youtube.com/";
const URL_GOOGLE_PLAY_STORE_BOOK = "https://play.google.com/store/books?hl=ja";
const URL_GOOGLE_BLOGGER = "https://www.blogger.com/";
const URL_GOOGLE_CALENDAR = "https://calendar.google.com/calendar/u/0/r";

window.addEventListener('load', function() {
    console.log("window.onLoad");
    bindGoogleProducts();
});

function bindGoogleProducts() {
    // google drive
    var view = document.getElementById("google-drive");
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_DRIVE;
    };
    // Gmail 
    view = document.getElementById("google-gmail");
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_GMAIL;
    };
    // YouTube
    view = document.getElementById("google-youtube");
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_YOUTUBE;
    };
    // GoogleBook
    view = document.getElementById("google-play-books");
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_PLAY_STORE_BOOK;
    };
    // Blogger
    view = document.getElementById("google-blogger");
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_BLOGGER;
    };
    // Calendar
    view = document.getElementById("google-calendar")
    view.onclick = function(e) {
        document.location.href = URL_GOOGLE_CALENDAR;
    };
}