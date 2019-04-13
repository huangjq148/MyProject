$(document).ready(function(){
    $('#dlg').window('close');
})

function searchForm(){
    $('#dg').datagrid('load',{
        "searchPinming": $('#searchPinming').val()
    });
}

function resetForm(){
    $("#searchForm").form('clear');
    // $("#searchForm")[0].reset();
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
        $.post("/goodsManager/goodsInfo/remove",{id:row.id},function(result){
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
    $.post("/goodsManager/goodsInfo/saveOrUpdate",$("#editForm").serialize(),function(result){
        $('#dlg').window('close');
        $('#dg').datagrid('reload');
    })
}
function clearForm(){
    $('#editForm').form('clear');
}