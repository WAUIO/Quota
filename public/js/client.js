$( function() {
    var options={
        dateFormat: 'dd/mm/yy',
        todayHighlight: true,
        autoclose: true
    };
    var quota_lists = $('.quota_lists');

    $( "#stay" ).datepicker(options);

    $("form#client_form").on("submit", function(e) {
        e.preventDefault();
        insertClient();
    });

    $('#search_client').keyup(function () {
        searchClient($(this));
    });

    $('input[type="number"]').keypress(validateNumber);

    quota_lists.each(function () {
        setToolTip($(this));
    });

    quota_lists.click(function () {
        client_id = $(this).attr('id').replace('client_', '');
        setClient(client_id);
    });

    $('#add_new_customer').click(function () {
        window.location.replace('/addClient');
    });
});


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

//search customer (search input)
function searchClient($this) {
    var exist = false;
    var quota_list = $('#quota_list');
    var input_text = $this.val().toLowerCase();

    if (quota_list.is(":visible") === false) {
        quota_list.fadeIn(200);
    }

    $('.quota_lists').each(function () {
        if (~$(this).find('.client_reference_name').text().toLowerCase().indexOf(input_text)) {
            $(this).show();
            exist = true;
        }
        else {
            $(this).hide();
        }
    });

    if (!exist) {
        $('.search_message').show();
    } else
        $('.search_message').hide();

    quota_list.scrollTop(0);
    quota_list.perfectScrollbar('update');
}

//set tooltip for each client in list
function setToolTip($this){
    var content = $this.find('.tooltip').html();
    $this.tooltip({
        items: '.quota_lists',
        content:content ,
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

//save client
function insertClient(){
    $('#client_saved').hide();
    var date_regex = new RegExp("(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[0-9]{4}","g");
    var name_regex = new RegExp("[a-zA-Z]{2}", "g");

    var reference   = $("#reference").val();
    var name        = $("#name").val();
    var nbAdults    = $("#nbAdults").val();
    var nbChildren  = $("#nbChildren").val();
    var stay_date        = $("#stay").val();

    var client_message = $("#client_message");
    var client_form = '#client_form';
    var message_error = {'display':'block','color':'FF0F22'};

    if( reference.trim().length > 4)
        if(name_regex.test(name))
            if (nbAdults > 0)
                if (date_regex.test(stay_date)) {
                    $('#btn_save_customer').html('Saving&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
                    $(client_form+' input').prop('disabled', true);
                    $(client_form+' button').prop('disabled', true);

                    $.ajax({
                        type: "GET",
                        url: "/saveClient",
                        data:{reference:reference, name:name, nbAdults:nbAdults, nbChildren:nbChildren, date:stay_date},
                        dataType: "html",
                        cache: false,
                        success: function (data) {
                            if ((data == 'client exist')){
                                client_message.text('Customer reference is already exist !').css('display','block').delay(10000).fadeOut();
                            }else{
                                client_message.text('Customer '+data+' added !').css({'display': 'block','color': '#5cb85c'});
                                $('#client_saved').show();
                                $(client_form)[0].reset();
                            }
                            $(client_form+' input').prop('disabled', false);
                            $(client_form+' button').prop('disabled', false);
                            $('#btn_save_customer').html('Save');
                        }
                    });
                }
                else client_message.text('Date format invalid !').css(message_error).delay(5000).fadeOut();
            else client_message.text('Empty adult number !').css(message_error).delay(5000).fadeOut();
        else client_message.text('Name format invalid or too short !').css(message_error).delay(5000).fadeOut();
    else client_message.text('Reference empty or too short !').css(message_error).delay(5000).fadeOut();
}

//check if input value is a number between 0..100
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    if(event.keyCode != 9 && event.keyCode != 116) {

        if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 37 || event.keyCode === 39) {
            if(parseInt($(this).val()+String.fromCharCode(key)) > 100)
               return false;
            return true;
        }
        else if ( key < 48 || key > 57 ) {
            return false;
        }
        else{
            if(parseInt($(this).val()+String.fromCharCode(key)) > 50000){
                return false;
            }
            return true;
        }
    }
}