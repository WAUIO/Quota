$(document).ready(function () {

    $(document).on('click','#btn-save',function(){
        var donnees = recupererdonnees();
        var url="";
        alert(donnees.toSource());
        //envoie les données au url(c.a.d au controlleur et au fonction definie de cette controller)
        $.post(url,donnees,function(data){
            //data c'est la vue envoyer par le controller
            //ici on change le contenue #content par la vue envoyer par le controller
            $('#content').html(data);
        });
    });

    //Autre exemple de recuperation données
    $(document).on('click','#-----',function(){
        var customerRef = $('#customerRef').val();
        var name = $('#name').val();
        var nbAdults = $('#nbAdults').val();
        var nbChildren = $('#nbChildren').val();
        var stay = $('#stay').val();
        $.post(url,{'name': name},function(data){
            $('#content').html(data);
        });
    });

    function recupererdonnees(){
        var donnees = {
             'customerRef' : $('#customerRef').val(),
             'name' : $('#name').val(),
             'nbAdults' : $('#nbAdults').val(),
             'nbChildren' : $('#nbChildren').val(),
             'stay' : $('#stay').val()
        };
        return donnees;
    }

});