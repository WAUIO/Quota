$( function() {

    var options={
        dateFormat: 'mm/dd/yy',
        todayHighlight: true,
        autoclose: true
    };
    $( "#stay" ).datepicker(options);
    Client();

    $('input[type="number"]').keypress(validateNumber);
});

function Client() {
    $("#btn_save").click(function(){
        var date_regex = new RegExp("(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}","g");
        var name_regex = new RegExp("[a-zA-Z]{2}", "g");
        var name = $("#name").val();
        var date = $("#stay").val();
        var ref = $("#reference").val();
        if( ref.length >= 5){
            if(name != '' && name_regex.test(name)){
                if ($("#nbAdults").val() != '') {
                    if ($("#nbChildren").val() != '') {
                        if (date_regex.test(date)) {
                            $.ajax({
                                type: "GET",
                                url: "/saveClient",
                                data: $('form').serialize(),
                                dataType: "json",
                                cache: false,
                                success: function (data) {
                                    $('.client_message').css({'display':'block','color':'#5cb85c'}).text("Customer "+data['reference']+" added !");
                                    $('#client_saved').show();
                                    $('form')[0].reset();
                                },
                                error: function (data) {

                                    console.log("misy erreur");
                                    console.log(data);
                                    $("#client_message").text('Something wrong !').css('display', 'block').delay(5000).fadeOut();
                                }
                            });

                        }
                        else {
                            $("#client_message").text('Date is empty or invalid format!').css('display', 'block').delay(5000).fadeOut();
                        }
                    }
                    else {
                        $("#client_message").text('Children\'s number empty!').css('display', 'block').delay(5000).fadeOut();
                    }
                }
                else {
                    $("#client_message").text('Adult\'s number empty!').css('display', 'block').delay(5000).fadeOut();
                }
            }else{
                $("#client_message").text('Name is empty or invalid format!!').css('display', 'block').delay(5000).fadeOut();
            }

        }
        else{
            $("#client_message").text('Customer Reference is empty or too short!').css('display','block').delay(5000).fadeOut();
        }
    });
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
            if(parseInt($(this).val()+String.fromCharCode(key)) > 100)
                return false;
            return true;
        }
    }
}

function btnSave(){
    $('#btn-save').on('click',function(){
        var donnees = retrieveData();
        var url="";
//envoie les données au url(c.a.d au controlleur et au fonction definie de cette controller)
        $.post(url,donnees,function(data){
//data c'est la vue envoyer par le controller
//ici on change le contenue #content par la vue envoyer par le controller
            $('#content').html(data);
        });
    });

//Autre exemple de recuperation données
    $('#-----').on('click',function(){
        var customerRef = $('#customerRef').val();
        var name = $('#name').val();
        var nbAdults = $('#nbAdults').val();
        var nbChildren = $('#nbChildren').val();
        var stay = $('#stay').val();
        $.post(url,{'name': name},function(data){
            $('#content').html(data);
        });
    });
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