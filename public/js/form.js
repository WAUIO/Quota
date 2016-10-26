
$(document).ready(function () {
    $(this).scrollTop(0);
    $('[type="checkbox"]').prop('checked', false);

    $(".btn").attr("disabled","disabled");
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
var doublebed= $("#doublebed");
var triplebed= $("#triplebed");
var singlebed= $("#singlebed");
var adultbreakfast=$("#adult-breakfast");
var adultlunch=$("#adult-lunch");
var adultdinner=$("#adult-dinner");
function checkRoom() {
    $('#select-hotel').change(function(){
        var hotel=$('#select-hotel').find('option:selected').text();
        if(hotel=="Sapphire"){
            doublebed.css("display","none");
            triplebed.show();
            $("#extrabed").show();
            $("[name='child']").show();
        }
        else if(hotel=="Ruby"){
            doublebed.show();
            $("#extrabed").show();
            $("[name='child']").show();
            $("#triplebed").css("display","none");
        }else if(hotel=="Gold"){
            doublebed.show();
            $("#extrabed").css("display","none");
            $("[name='child']").css("display","none");
        }else if(hotel=="Jade"|| hotel=="Diamond"){
            singlebed.show();
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
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function doubleRoom(){
    $("#double").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function tripleRoom(){
    $("#triple").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}
function familyRoom(){
    $("#family").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}


function extraAdultRoom(){
    $("#extra-adult").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}
function extraChildRoom(){
    $("#extra-child").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function adultBreakfast(){
    $("#adult-breakfast").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function adultLunch(){
    $("#adult-lunch").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function adultDinner(){
    $("#adult-dinner").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function childBreakfast(){
    $("#child-breakfast").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function childLunch(){
    $("#child-lunch").click(function () {
        var parent=$(this).parents().eq(3);
        var child=parent.children().eq(1);
        if($(this).is(':checked')){
            child.children().children().eq(0).removeAttr("disabled");
        }else{
            child.children().children().eq(0).attr("disabled","disabled");
        }
    });


}

function childDinner() {
    $("#child-dinner").click(function () {
        var parent = $(this).parents().eq(3);
        var child = parent.children().eq(1);
        if ($(this).is(':checked')) {
            child.children().children().eq(0).removeAttr("disabled");
        } else {
            child.children().children().eq(0).attr("disabled", "disabled");
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
            var adultBreakfast=adultbreakfast.parents().eq(3).children().eq(1).children().children().eq(1).val();
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

function doubleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();
        data+='hotel='+hotel;
        if($("#double").is(':checked')){
            var doubleVal=$("#double").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+=', doubleVal='+doubleVal;
            var adultBreakfast=adultbreakfast.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=adultlunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=adultdinner.parents().eq(3).children().eq(1).children().find('option:selected').text();
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

function tripleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();
        data+='hotel='+hotel;
        if($("#triple").is(':checked')){
            var tripleVal=$("#triple").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+='tripleVal='+tripleVal;
            var adultBreakfast=adultbreakfast.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=adultlunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=adultdinner.parents().eq(3).children().eq(1).children().find('option:selected').text();
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


function extraBase() {
    $("#save").click(function () {
        var data = "";
        var hotel = $('#select-hotel').find('option:selected').text();
        data += 'hotel=' + hotel;
        if ($("#extra-adult").is(':checked')) {
            var extraVal = $("#extra-adult").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data += 'extraVal=' + extraVal;
            var adultBreakfast = adultbreakfast.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch = adultlunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner = adultdinner.parents().eq(3).children().eq(1).children().find('option:selected').text();
            if (adultbreakfast.is(':checked')) {
                data += ', adultBreakfast=' + adultBreakfast;
            }
            if (adultlunch.is(':checked')) {
                data += ', adultLunch=' + adultLunch;
            }
            if (adultdinner.is(':checked')) {
                data += ', adultDinner=' + adultDinner;

            }
            alert(data);
        }
    });
}