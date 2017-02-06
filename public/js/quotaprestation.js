$(function(){
    var btn= $('#btn_update');
    $(document).on('change','.number',function(){
        btn.css('display','block');
    });

    btn.click(function(){
        updatePrestation();
    });

});
function updatePrestation(){
    var allTR = $('#Tbod').children('tr');
    var all_data = [];
    allTR.each(function() {
        var info = {};
        var others = {};
        others.pax_min          = $(this).find('input[name="pax_min"]').val();
        others.pax_max          = $(this).find('input[name="pax_max"]').val();
        others.rate_service     = $(this).find('.tarif').html();
        others.number_service   = $(this).find('input[name="nb_service"]').val();
        others.type_service     = $(this).find('.type').html();

        info.id = $(this).attr('id');
        info.service =  $(this).find('#service').html();
        info.others = others;

        all_data.push(info);
    });
    $('#btn_modif_prestation').html('Modifing&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
        $.ajax({
            type: "GET",
            url: "/updatePrestation",
            data: {datas : all_data},
            dataType: "html",
            success: function(){
                $('#prestationUpdate_message').text('Benefit(s) modified !').css({'display':'block', 'color':'#5cb85c', 'line-height':'40px', 'float':'right'});
                $('#btn_modif_prestation').html('Modification saved');
                $('#btn_update').css('display','none');
                window.location.reload();
            }
        });
}

