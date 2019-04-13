$(document).ready(function(){
    $('#dlg').window('close');

    $.get("/tradeInfo/countTradeRecord",function(result){

    })


})

function searchForm(){
    $('#dg').datagrid('load',{
        "searchPinming": $('#searchPinming').val(),
        "searchType": $('#searchType').val(),
        "searchStartDate": $('#searchStartDate').val(),
        "searchEndDate": $('#searchEndDate').val()
    });
}

function resetForm(){
    $("#searchForm").form('clear');
}

function countTradeRecord(){
    $.get("/tradeInfo/countTradeRecord",function(result){

    })
}

function showDialog(){
    $('#dlg').window('open');
    $('#editForm').form('clear');
    // $(".editDialog").css("visibility","visible");
}

function edit(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('setTitle','Edit User');
        $('#editForm').form('load',row);
    }else{
        $.messager.show({
            title: 'Error',
            msg: "请选择一条记录进行编辑"
        });
        // alert("请选择一条记录进行编辑")
    }
}

function remove(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.post("/goodsManager/tradeInfo/remove",{id:row.id},function(result){
            if("success" == result){
                $('#dg').datagrid('reload');
            }
        })
    }else{
        $.messager.show({
            title: 'Error',
            msg: "请选择一条记录进行删除"
        });
    }
}

function submitForm(){
    $.post("/goodsManager/tradeInfo/saveOrUpdate",$("#editForm").serialize(),function(result){
        $('#dlg').window('close');
        $('#dg').datagrid('reload');
    })
}
function clearForm(){
    $('#editForm').form('clear');
}

function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}