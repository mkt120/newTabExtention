const CLASS_HISTORY_LIST_VIEW = "historyListView";
const CLASS_HISTORY_CHILD_VIEW = "historyChildView";
window.addEventListener('load', function() {
    createHistoryTree();
});

function createHistoryTree() {
    // 閲覧履歴を全て取得する
    chrome.history.search({ 'text': '', 'maxResults': 30 }, function(histories) {

        // getTree で閲覧履歴が取得できた時のコールバック
        // https://developer.chrome.com/docs/extensions/reference/history/#type-HistoryItem

        // [その他のブックマーク]フォルダのブックマークをbodyに追加する
        root = document.getElementById("history");
        root.classList.add(CLASS_HISTORY_LIST_VIEW);

        // rootが空なのでchildrenを渡す
        for (var i in histories) {
            var parents = createChild(document, histories[i]);
            root.appendChild(parents);
        }
    })
}

////////////////////////////////////////////
// 子ブックマークを作る
////////////////////////////////////////////
function createChild(document, child) {
    var title = child['title'];
    var url = child['url'];

    var p = document.createElement("p");
    p.classList.add(CLASS_HISTORY_CHILD_VIEW);
    // 要素の設定
    var a = document.createElement("a");
    if (title != null && title.length > 0) {
        // タイトル・URLを設定
        a.textContent = title;
        if (url != null && url.length > 0) {
            a.setAttribute("href", url);
            a.setAttribute("target", "_blank");
        }
    }
    p.appendChild(a);
    return p;
}