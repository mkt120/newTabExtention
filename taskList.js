const LOCAL_STORAGE_KEY_TASK_LIST = 'task_list';

const CLASS_TASK_LIST_HEADER = 'TaskListHeaderView';
const ID_TASK_LIST_VIEW = "task_list_view";
const CLASS_TASK_LIST_VIEW = 'TaskListView';
const CLASS_TASK_ITEM_VIEW = 'TaskItemView';
const CLASS_TASK_ITEM_ADD_BUTTON_VIEW = 'TaskItemAddButton';
const CLASS_TASK_ITEM_COMPLETE_BUTTON_VIEW = 'TaskItemCompleteButton';

const TASK_INFO_TITLE = 'title';

window.addEventListener('load', function() {
    createTaskList()
});

function createTaskList() {
    var root = document.getElementById("task-list");

    // ヘッダ
    var header = createHeader(document);
    root.appendChild(header);

    // リスト領域
    var listView = document.createElement('div');
    listView.setAttribute('id', ID_TASK_LIST_VIEW);
    listView.classList.add(CLASS_TASK_LIST_VIEW);
    root.appendChild(listView);

    //localStorage.clear();
    // ストレージからタスクリストを取得
    createList();
}

function createHeader(document) {
    var header = document.createElement('div');
    header.classList.add(CLASS_TASK_LIST_HEADER);
    var span = document.createElement('span');
    span.textContent = "タスクリスト";
    header.appendChild(span);

    // 追加するボタン
    var addButton = document.createElement('div');
    addButton.textContent = "追加";
    addButton.classList.add(CLASS_TASK_ITEM_ADD_BUTTON_VIEW);
    addButton.onclick = function(event) {
        let title = prompt('タスクを入力してください');
        if (title == null || title.length == 0) {
            return;
        }
        let item = {
            'title': title
        };
        saveTaskInfo(item);
        var listView = document.getElementById(ID_TASK_LIST_VIEW);
        var view = createTaskItemView(item);
        listView.appendChild(view);
    };
    header.appendChild(addButton);
    return header;
}

function createList() {
    var listView = document.getElementById(ID_TASK_LIST_VIEW);
    while (listView.firstChild) {
        listView.firstChild.remove();
    }
    var taskList = localStorage[LOCAL_STORAGE_KEY_TASK_LIST];
    if (taskList != null) {
        taskList = JSON.parse(taskList);
        taskList.forEach(task => {
            var view = createTaskItemView(task);
            listView.appendChild(view);
        });
    }
}

function createTaskItemView(taskInfo) {
    // 親View
    var div = document.createElement('div');
    div.classList.add(CLASS_TASK_ITEM_VIEW);

    // 要素の設定
    var p = document.createElement('span');
    p.classList.add(CLASS_TASK_ITEM_VIEW);
    let title = taskInfo[TASK_INFO_TITLE];
    if (title != null && title.length > 0) {
        // タイトル・URLを設定
        p.textContent = title;
        div.appendChild(p);
    }

    // 完了ボタン
    let button = document.createElement('div');
    button.classList.add(CLASS_TASK_ITEM_COMPLETE_BUTTON_VIEW);

    button.textContent = '完了';
    button.onclick = function(event) {
        let list = removeTaskInfo(taskInfo);
        createList(list);
    };
    div.appendChild(button);
    return div;
}

function saveTaskInfo(taskInfo) {
    var list = localStorage[LOCAL_STORAGE_KEY_TASK_LIST];
    if (list == null) {
        list = '[]';
    }
    list = JSON.parse(list);
    list.push(taskInfo);
    localStorage.setItem(LOCAL_STORAGE_KEY_TASK_LIST, JSON.stringify(list));
}

function removeTaskInfo(taskInfo) {
    var title = taskInfo[TASK_INFO_TITLE];
    var list = localStorage.getItem(LOCAL_STORAGE_KEY_TASK_LIST);
    if (list == null) {
        list = '[]';
    }
    list = JSON.parse(list);
    for (var i = 0; i < list.length; i++) {
        if (title == list[i][TASK_INFO_TITLE]) {
            list.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_TASK_LIST, JSON.stringify(list));
    return list;
}