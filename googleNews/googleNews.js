const URL_NEWS_API = "URLを張り付ける";

// padidng は top right bottom left
const CLASS_NEWS_ITEM_VIEW = "NewsItemView";
const CLASS_NEWS_IMG = "NewsImg";

const COLOR_NEWS_ITEM_VIEW_ON_MOUSE = 'gray';

window.addEventListener('load', function(){
  requestAjax(URL_NEWS_API, function(response){
    
    for (var i in response.articles) {
      var div = createNewsItem(document, response.articles[i]);
      document.body.appendChild(div);
    }
  });
});

// コンテンツを作る
function createNewsItem(document,article) {
  var div = document.createElement("div");
  div.setAttribute('class', CLASS_NEWS_ITEM_VIEW);
  
  // マウスを乗せたら色を変える
  div.onmouseover = function() {
    div.style.backgroundColor = COLOR_NEWS_ITEM_VIEW_ON_MOUSE;
  }
  div.onmouseout = function() {
    div.style.backgroundColor='';
  }
  
  // サムネイル
  var img = document.createElement("img");
  img.setAttribute('class', CLASS_NEWS_IMG);
  img.src = article.urlToImage;
  div.appendChild(img);
  
  // テキスト
  var a = document.createElement("a");
  a.innerHTML = article.title;
  a.href = article.url;
  div.appendChild(a);
  
  return div;
}

// 通信処理メソッド
var requestAjax = function(endpoint, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200) {
            callback(this.response);
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET',endpoint,true);
    xhr.send();
};

