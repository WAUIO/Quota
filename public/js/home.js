function deleteItem($this) {

    var table = $($this).closest('table');
    var item_number = table.find('.item_number');
    var line = $($this).closest('tr');
    var to_url, id_item, delete_title, item_title;
    var new_item_number = parseInt(item_number.text())-1;

    if(table.attr('id') == 'table_about_room') {
        to_url = "/deleteQuotaRoom";
        id_item = $($this).attr('id').replace('room_','');
        delete_title = 'Delete room';
        item_title = $($this).siblings().eq(1).text();
    }
    else {
        to_url = "/deleteQuotaPrestation";
        id_item = $($this).attr('id').replace('prestation_','');
        delete_title = 'Delete benefit';
        item_title = $($this).siblings().eq(0).text();
    }

    $('.item_title').text(item_title);
    $('#delete_item').dialog({
        title: delete_title,
        modal: true,
        resizable: true,
        height: 200,
        width: 400
    });

    $('#btn_delete_item').click(function(){
        $('#delete_item').dialog('close');
        $.ajax({
            type: "GET",
            url: to_url,
            data: {id_item : id_item},
            dataType: "html",
            success: function(){
                line.remove();
                item_number.html(new_item_number);
            }
        });
    });

    $('#btn_cancel_item').click(function(){
        $('#delete_item').dialog('close');
    });
}
