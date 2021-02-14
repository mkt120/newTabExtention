const LOCAL_STORAGE_KEY_TASK_LIST = 'task_list';

const CLASS_TASK_LIST_HEADER = 'TaskListHeaderView';
const ID_TASK_LIST_VIEW = "task_list_view";
const CLASS_TASK_LIST_VIEW = 'TaskListView';
const CLASS_TASK_ITEM_VIEW = 'TaskItemView';
const CLASS_TASK_ITEM_ADD_BUTTON_VIEW = 'TaskItemAddButton';

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
    var taskList = localStorage[LOCAL_STORAGE_KEY_TASK_LIST];
    if (taskList != null) {
        taskList = JSON.parse(taskList);
        createList(taskList);
    }
}

function createList(taskList) {
    var listView = document.getElementById(ID_TASK_LIST_VIEW);
    while (listView.firstChild) {
        listView.firstChild.remove();
    }

    for (i in taskList) {
        addTaskItemView(taskList[i]);
    }
}

function createHeader(document) {
    var header = document.createElement('div');
    header.classList.add(CLASS_TASK_LIST_HEADER);
    header.textContent = "タスクリスト";

    // 追加するボタン
    var addButton = document.createElement('button');
    addButton.textContent = "追加";
    addButton.onclick = function(event) {
        let title = prompt('タスクを入力してください');
        if (title == null || title.length == 0) {
            return;
        }
        let item = {
            'title': title
        };
        saveTaskInfo(item);
        addTaskItemView(item);
    };
    header.appendChild(addButton);
    return header;
}

function saveTaskInfo(taskInfo) {
    var list = localStorage.getItem(LOCAL_STORAGE_KEY_TASK_LIST);
    if (list == null) {
        list = '[]';
    }
    list = JSON.parse(list);
    list.push(taskInfo);
    localStorage.setItem(LOCAL_STORAGE_KEY_TASK_LIST, JSON.stringify(list));
}

function addTaskItemView(taskInfo) {
    console.log("addTaskItemView title=" + taskInfo[TASK_INFO_TITLE]);
    var listView = document.getElementById(ID_TASK_LIST_VIEW);
    listView.appendChild(createTaskItemView(taskInfo));
}

function createTaskItemView(taskInfo) {
    // 親View
    var item = document.createElement('div');
    item.classList.add(CLASS_TASK_ITEM_VIEW);
    let title = taskInfo[TASK_INFO_TITLE];
    item.textContent = title;

    // 完了ボタン
    let button = document.createElement('button');
    button.classList.add(CLASS_TASK_ITEM_ADD_BUTTON_VIEW);

    button.textContent = '完了';
    button.onclick = function(event) {
        let list = removeTaskInfo(taskInfo);
        createList(list);
    };
    item.appendChild(button);
    return item;
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