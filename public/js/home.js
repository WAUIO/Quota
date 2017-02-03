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

    $('#show_customers').click(function () {
        getClient();
    });

    $('#refresh_client').click(function () {
        getClient();
    });
});

//if cursor hover list customer
function setTooltip(client) {
    var $content = '<p>Reference : '+ client.reference +'</p>'+
        '<p>Name : '+ client.name +'</p>'+
        '<p>Adult number : '+ client.number_adult +'</p>'+
        '<p>Child number : '+ client.number_child +'</p>'+
        '<p>Stay beginning : '+ client.start_date +'</p>';

    $('#client_'+client.id).tooltip({
        items: '.quota_lists',
        content: $content,
        show: null, // show immediately
        open: function (event, ui) {
            if (typeof(event.originalEvent) === 'undefined') {
                return false;
            }

            var $id = $(ui.tooltip).attr('id');

            // close any lingering tooltips
            $('div.ui-tooltip').not('#' + $id).remove();
            // ajax function to pull in data and add it to the tooltip goes here
        },
        close: function (event, ui) {
            ui.tooltip.hover(function () {
                $(this).stop(true).fadeTo(400, 1);
            },
            function () {
                $(this).fadeOut('400', function () {
                    $(this).remove();
                });
            });
        }
    });
}

//set customer in session
function setClient(client_id) {
    $.ajax({
        url: "/setClient",
        type: "GET",
        data: {client_id: client_id},
        success: function () {
            window.location.replace('/');
        }
    });
}

//fill out the customer list
function getClient() {
    $('#show_customers').hide();
    var quota_list = $('#quota_list'),
        $icon = $('#refresh_client').show().find('.glyphicon.glyphicon-refresh'),
        animateClass = "glyphicon-refresh-animate";
    $icon.addClass(animateClass);

    $.ajax({
        url: "/getClient",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var $length = data.length;
            quota_list.html('');

            if($length == 0){
                quota_list.append('<div class="no_client">No existing customer !</div>'+
                    '<div class="add_room_button " id="add_new_customer" onclick="location.href =\'/addClient\'">Add customer</div>');

            }else{
                for (i = 0; i < $length; i++) {
                    quota_list.append($('<div id="client_' + data[i].id + '" class="quota_lists">' + data[i].reference + ' : ' + data[i].name + '</div>')
                        .click(function () {
                            client_id = $(this).attr('id').replace('client_', '');
                            setClient(client_id);
                        })
                    );
                    setTooltip(data[i]);
                }
            }
            quota_list.perfectScrollbar('update');
            $icon.removeClass(animateClass);
            $('#search_client').show();
            $('#expand').show();
        }
    });
}

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
    var item_number = table.find('.item_number');
    var line = $($this).closest('tr');
    var new_item_number = parseInt(item_number.text()) - 1;
    var id_item = $($this).find('h4').text();
    var to_url, delete_title, item_title;

    if(~table.attr('id').indexOf('table_about_room_')) {
        to_url = "/deleteQuotaRoom";
        delete_title = 'Deletion of room';
        item_title = $($this).siblings().eq(1).text();
    }
    else {
        to_url = "/deleteQuotaPrestation";
        delete_title = 'Deletion of benefit';
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
                line.remove();
                item_number.text(new_item_number);
                $('#delete_item').dialog('close');
            }
        });
    });

    $('#btn_cancel_item').click(function(){
        $('#delete_item').dialog('close');
    });
}
