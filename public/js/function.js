$(document).ready(function () {
    $(this).scrollTop(0);
    /*pop up*/
    $('[data-popup-open]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

//----- CLOSE
    $('[data-popup-close]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });

    $(".form-control").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    checkRoom();
    singleRoom();
    doubleRoom();
    tripleRoom();
    familyRoom();
    extraAdultRoom();
    extraChildRoom();
    adultBreakfast();
    adultLunch();
    adultDinner();
    childBreakfast();
    childLunch();
    childDinner();
    simpleBase();
    doubleBase();
    tripleBase();
    familyBase();
    extraBase();


});
function checkRoom() {
    $('#select-hotel').change(function(){
        var hotel=$('#select-hotel').find('option:selected').text();
        if(hotel=="Sapphire"){
            $("#doublebed").css("display","none");
            $("#triplebed").show();
            $("#extrabed").show();
            $("[name='child']").show();
        }
         else if(hotel=="Ruby"){
             $("#doublebed").show();
            $("#extrabed").show();
             $("[name='child']").show();
            $("#triplebed").css("display","none");
        }else if(hotel=="Gold"){
            $("#doublebed").show();
            $("#extrabed").css("display","none");
            $("[name='child']").css("display","none");
        }else if(hotel=="Jade"|| hotel=="Diamond"){
            $("#singlebed").show();
            $("#doublebed").show();
            $("#triplebed").show();
            $("#familybed").show();
            $("#extrabed").show();
            $("[name='child']").show();
        }

    });
}
function singleRoom(){
    $("#single").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function doubleRoom(){
    $("#double").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function tripleRoom(){
    $("#triple").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}
function familyRoom(){
    $("#family").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}


function extraAdultRoom(){
    $("#extra-adult").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}
function extraChildRoom(){
    $("#extra-child").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function adultBreakfast(){
    $("#adult-breakfast").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function adultLunch(){
    $("#adult-lunch").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function adultDinner(){
    $("#adult-dinner").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function childBreakfast(){
    $("#child-breakfast").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function childLunch(){
    $("#child-lunch").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }
    });


}

function childDinner() {
    $("#child-dinner").click(function () {
        var parent = $(this).parents().eq(3);
        var child = parent.children().eq(1);
        if ($(this).is(':checked')) {
            child.children().removeAttr("disabled");
        } else {
            child.children().attr("disabled", "disabled");
        }
    });


}
    function simpleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();


        data+='hotel='+hotel;
        if($("#single").is(':checked')){
            var singleVal=$("#single").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+=', singleVal='+singleVal;
            var adultBreakfast=$("#adult-breakfast").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=$("#adult-lunch").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=$("#adult-dinner").parents().eq(3).children().eq(1).children().find('option:selected').text();
            if($("#adult-breakfast").is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if($("#adult-lunch").is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if($("#adult-dinner").is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
            alert(data);
        }
    });

}

function doubleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();
        data+='hotel='+hotel;
        if($("#double").is(':checked')){
            var doubleVal=$("#double").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+=', doubleVal='+doubleVal;
            var adultBreakfast=$("#adult-breakfast").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=$("#adult-lunch").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=$("#adult-dinner").parents().eq(3).children().eq(1).children().find('option:selected').text();
            if($("#adult-breakfast").is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if($("#adult-lunch").is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if($("#adult-dinner").is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
            alert(data);
        }
    });

}

function tripleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();
        data+='hotel='+hotel;
        if($("#triple").is(':checked')){
            var tripleVal=$("#triple").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+='tripleVal='+tripleVal;
            var adultBreakfast=$("#adult-breakfast").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=$("#adult-lunch").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=$("#adult-dinner").parents().eq(3).children().eq(1).children().find('option:selected').text();
            if($("#adult-breakfast").is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if($("#adult-lunch").is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if($("#adult-dinner").is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
            alert(data);
        }
    });

}


function extraBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();
        data+='hotel='+hotel;
        if($("#extra-adult").is(':checked')){
            var extraVal=$("#extra-adult").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+='extraVal='+extraVal;
            var adultBreakfast=$("#adult-breakfast").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=$("#adult-lunch").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=$("#adult-dinner").parents().eq(3).children().eq(1).children().find('option:selected').text();
            if($("#adult-breakfast").is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if($("#adult-lunch").is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if($("#adult-dinner").is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
            alert(data);
        }
    });

}