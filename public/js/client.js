$( function() {

    var options={
        dateFormat: 'dd/mm/yy',
        todayHighlight: true,
        autoclose: true
    };
    $( "#stay" ).datepicker(options);

    $("form#client_form").on("submit", function(e) {
        e.preventDefault();
        insertClient();
    });

    $('input[type="number"]').keypress(validateNumber);
    addNewCustomer();
} );
function addNewCustomer(){
    $('#add_customer').click(function(){
        $('#current_customer').css('display','none');
        $('#client_form').css('display','block');
    });
}
//save client
function insertClient(){
    var date_regex = new RegExp("(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[0-9]{4}","g");
    var name_regex = new RegExp("[a-zA-Z]{2}", "g");

    var reference   = $("#reference").val();
    var name        = $("#name").val();
    var nbAdults    = $("#nbAdults").val();
    var nbChildren  = $("#nbChildren").val();
    var stay_date        = $("#stay").val();

    var client_message = $("#client_message");
    var client_form = '#client_form';

    if( reference.length > 4)
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
                                client_message.text('Customer reference is already exist!').css('display','block').delay(10000).fadeOut();
                            }else{
                                client_message.text('Customer '+data+' added !').css({
                                    'display': 'block',
                                    'color': '#5cb85c',
                                    'height': '40px',
                                    'line-height': '40px'
                                });
                                $('#client_saved').show();
                                $(client_form)[0].reset();
                            }
                            $(client_form+' input').prop('disabled', false);
                            $(client_form+' button').prop('disabled', false);
                            $('#btn_save_customer').html('Save');
                        }
                    });
                }
                else client_message.text('Date is empty or invalid format!').css('display', 'block').delay(5000).fadeOut();
            else client_message.text('Adult\'s number empty!').css('display', 'block').delay(5000).fadeOut();
        else client_message.text('Name is empty or invalid format!!').css('display', 'block').delay(5000).fadeOut();
    else client_message.text('Customer Reference is empty or too short!').css('display','block').delay(5000).fadeOut();
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
            if(parseInt($(this).val()+String.fromCharCode(key)) > 100){
                return false;
            }
            return true;
        }
    }
}