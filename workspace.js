$(handleShowModelView);

// 点击 show modelView 按钮
$(document).on('click', '#stigmod-model-view, #stigmod-model-view-fs', handleShowModelView);

function handleShowModelView() {

    // 清除旧的 svg 和 Detail
    $('#view').find('svg').remove();
    $('#classDetail').remove();
    $('#relationDetail').remove();

    // 显示模型图像
    $('#stigmod-modal-d3view').modal('show');

    // 刷新模型图像
    setTimeout(function() {
        modelView();
    }, 500);

}

// // 为 modelview 搜索栏添加下拉提示
// $('#searchText').typeahead({
//             hint: true,
//             highlight: true,
//             minLength: 1
//         },
//         {
//             name: 'clsNames',
//             displayKey: 'value',
//             source: substringMatcher('class', 6)
//         });



// 输入框的 Enter、ESC 功能 (目前支持：编辑单元.stigmod-clickedit-root 、模态框.modal)
$(document).on('keyup', 'input[type=text]', handleKbdCtrlInput);

function handleKbdCtrlInput(event) {
    if (13 === event.which) {  // Enter

        // 尝试寻找旁边的搜索按钮 TODO：这几个“尝试”写得不好，应该在一开始就搞清楚属于那种情况
        if (0 !== $(this).parent().find('#stigmod-search-left-btn, #searchButton').trigger('click').length) {  // 第一个 parent() 是考虑了 typeahead wrapper 的影响
            return false;  // 已猜对，不用继续
        }

    } else if (27 === event.which) {  // ESC

        // 编辑组件取消编辑 （modal的ESC功能是自带的，不用写在这里）
        if (0 !== $(this).closest('.stigmod-clickedit-root').find('.stigmod-clickedit-btn-cancel').trigger('click').length) {
            return false;
        }

        // 左侧搜索栏，清除输入的文字并清除文本框的焦点
        $(this).val('').blur();
    }
}