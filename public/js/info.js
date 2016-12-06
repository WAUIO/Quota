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