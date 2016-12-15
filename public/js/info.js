$( function() {
    var options={
        dateFormat: 'mm/dd/yy',
        todayHighlight: true,
        autoclose: true
    };
    $( "#stay" ).datepicker(options);

    saveClient();

    $('input[type="number"]').keypress(validateNumber);
} );

//save client
function saveClient(){
    $("#btn_save").click(function(){
        var ref_regex = new RegExp("[a-zA-Z0-9]{5}", "g");
        var date_regex = new RegExp("(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[0-9]{4}","g");
        var date = $("#stay").val();
        if( ref_regex.test(ref) && date_regex.test(date)){
            $('#banner').empty();

            $.ajax({
                type:"GET",
                url:"/saveClient",
                data: $('form').serialize(),
                dataType : "html",
                success : function(data){
                    $('.client_message').css({'display':'block','color':'#5cb85c'}).text("Customer "+data.reference+" added !");
                    $('#client_saved').show();
                },
                error:function(){
                    $('.client_message').css({'display':'block','color':'#FF0F22'}).text('Error, customer no saved !');
                }
            });
            location.reload();
        }else{
            var p="<p> <span class=' glyphicon glyphicon-hand-right'></span>  Format or values of your entries are not permissible,please retry!</p>";
            $("#banner").append(p);
        }
    });
}

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
            if(parseInt($(this).val()+String.fromCharCode(key)) > 100)
                return false;
            return true;
        }
    }
}

function retrieveData(){
    return donnees = {
        'customerRef' : $('#customerRef').val(),
        'name' : $('#name').val(),
        'nbAdults' : $('#nbAdults').val(),
        'nbChildren' : $('#nbChildren').val(),
        'stay' : $('#stay').val()
    };
}