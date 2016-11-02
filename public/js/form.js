
$(document).ready(function () {
    $(this).scrollTop(0);
    $('[type="checkbox"]').prop('checked', false);

     $("select").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");

   checkOption();
    simpleBase();
    doubleBase();
    tripleBase();
    familyBase();
    extraBase();


});
function checkOption(){
    $("[type='checkbox']").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(3);
        var select_picker = parent.find('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
            select_picker.parents().addClass('disabled');
        }
    });

}
function Base(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();


        data+='hotel='+hotel;
        if($("#single").is(':checked')){
            var singleVal=$("#single").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+=', singleVal='+singleVal;
            var adultBreakfast=adultbreakfast.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=adultlunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=adultlunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            if(adultbreakfast.is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if(adultlunch.is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if(adultdinner.is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
            alert(data);
        }
    });

}