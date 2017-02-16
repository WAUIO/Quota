$( function() {
    $(document).on('change','#registration_number',function(){
        $('#registration_number_message').hide();
    });

    $('#btn_duplicate_registration').click(function () {
        duplicateRegistration();
    });

    $('#btn_delete_registration').click(function () {
        deleteRegistration();
    });

    $('#refresh_client').click(function () {
        getClient();
    });
});

function deleteRegistration(){
    var active_registration = $('.registration_menu.active').attr('id').replace('registration_','');
    $('.item_title').text(active_registration);

    $('#delete_registration').dialog({
        title: "Deletion of registration",
        modal: true,
        resizable: true,
        height: 200,
        width: 400
    });

    $('#btn_make_delete').click(function(){
        $.ajax({
            type: "GET",
            url: "/deleteRegistration",
            data: {active_registration : active_registration},
            dataType: "html",
            success: function(){
                $('#delete_registration').dialog('close');
                //refresh page
                window.location.replace('/');
            }
        });
    });

    $('#btn_cancel_delete').click(function(){
        $('#delete_registration').dialog('close');
    });
}

function duplicateRegistration(){
    var active_registration = $('.registration_menu.active').attr('id').replace('registration_','');

    duplicate_title = "Duplication of registration n°"+active_registration;
    $('#duplicate_registration').dialog({
        title: duplicate_title,
        modal: true,
        resizable: true,
        height: 230,
        width: 400
    });

    $('#btn_make_duplicate').click(function(){
        var registration_number = $('#registration_number').val();

        if(registration_number == ''){
            $('#registration_number_message').text('Please, set the registration number !').show().delay(5000).fadeOut();
        }else if(~$('#existing_registraton').text().indexOf(registration_number)){
            $('#registration_number_message').text('Please, choose a number not in '+$('#existing_registraton').text()).show().delay(5000).fadeOut();
        }else{
            $(this).attr('disabled','disabled');
            $.ajax({
                type: "GET",
                url: "/duplicateRegistration",
                data: {active_registration : active_registration, new_registration : registration_number},
                dataType: "html",
                success: function(){
                    $('#duplicate_registration').dialog('close');
                    //refresh page
                    window.location.replace('/');
                }
            });
        }
    });

    $('#btn_cancel_duplicate').click(function(){
        $('#duplicate_registration').dialog('close');
    });
}

function deleteItem($this) {
    var table = $($this).closest('table');
    var id_item = $($this).find('h4').text();
    var to_url, delete_title, item_title;

    if(~table.attr('id').indexOf('table_about_room_')) {
        to_url = "/deleteQuotaRoom";
        delete_title = 'Deletion of room';
        item_title = $($this).siblings().eq(1).text();
    }
    else {
        to_url = "/deleteQuotaPrestation";
        delete_title = 'Deletion of Service';
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
        $.ajax({
            type: "GET",
            url: to_url,
            data: {id_item : id_item},
            dataType: "html",
            success: function(){
                //delete row
                $($this).closest('tr').remove();

                //set number of items(room / service)
                var item_number = table.find('tbody').children('tr').length;
                table.find('.item_number').text(item_number);
                $('#delete_item').dialog('close');
            }
        });
    });

    $('#btn_cancel_item').click(function(){
        $('#delete_item').dialog('close');
    });
}
