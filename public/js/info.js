$( function() {
    var options={
        dateFormat: 'dd/mm/yy',
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
        // var ref_regex = new RegExp("[a-zA-Z0-9]{5}", "g");
        // var number_regex = new RegExp("[0-9]","g");
        // var date_regex = new RegExp("(0[1-9]|1[12])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}","g");
        // var ref = $("#customerRef").val();
        // var name = $("#name").val();
        // var adult = $("#nbAdults").val();
        // var child = $("#nbChildren").val();
        // var date = $("#stay").val();
        // var info = "ref_cli="+ref+"&name="+name+"&adult="+adult+"&child="+child+"&date="+date;

        //if(ref_regex.test($('#customerRef').val()) && date_regex.test($('#stay').val())) {

            $.ajax({
                type:"GET",
                url:"/saveClient",
                data: $('form').serialize(),
                dataType : "html",
                cache : false,
                success : function(data){
                    $('.client_message').css({'display':'block','color':'#5cb85c'}).text('Customer saved !');

                    var add_quotation = '<div class="row">' +
                                            '<h4>'+
                                                'Add quotation for this customer'+
                                            '</h4>' +
                                        '</div>' +
                                        '<div class="row">'+
                                            '<div class="col-xs-6">' +
                                                '<div class="col-md-12 add_quotation" onclick="location.href =\'/room\'">'+
                                                    'Room quotation' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-6">' +
                                                '<div class="col-md-12 add_quotation" onclick="location.href =\'/prestation\'">'+
                                                    'Benefit quotation' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                    var block_client_saved = $('#client_saved');
                    block_client_saved.html("");
                    block_client_saved.append(add_quotation);
                },
                error:function(){
                    $('.client_message').css({'display':'block','color':'#FF0F22'}).text('Error, customer no saved !');
                }
            });
            // location.reload();
        // }else{
        //     alert("zezee");
        //     // var p="<p> <span class=' glyphicon glyphicon-hand-right'></span>  Format or values of your entries are not permissible,please retry!</p>";
        //     // $("#banner").append(p);
        // }

    });
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    if(event.keyCode != 9 && event.keyCode != 116){
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