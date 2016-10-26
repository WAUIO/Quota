$(document).ready(function () {
    $('#quota_list').perfectScrollbar();

    $('.based_on').removeAttr("href");

    //detail hide
    $('.detail_head').click(function(e){
        e.preventDefault();
        var detail_id = '#'+$(this).parents().attr("id");
        if($(detail_id+' .detail_body').is(":visible") === false){
            $(detail_id +' .detail_body').fadeIn();
            $(detail_id +' .detail_body_content').animate({marginTop:"-=100px"},300);
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-down").toggleClass("glyphicon-menu-up");
        }else{

            $(detail_id +' .detail_body').hide();
            $(detail_id +' .detail_body_content').hide();
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
        }
    });

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        var quota_list_id = $('#quota_list');
        if(quota_list_id.is(":visible") === true){
            quota_list_id.fadeOut();
            $(this).toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }else{
            quota_list_id.fadeIn();
            $(this).toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    });


    //Ancre Onclick base type
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-60 }, speed );
        return false;
    });


    /*pop up*/
    $('[data-popup-open]').on('click', function(e)  {
        console.log($('#quota_list').height());
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        $('.select_data').perfectScrollbar();
        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });


    /**************/
    $(".selectpicker").attr("disabled","disabled");
    $(".form-control").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");

    /*******checkbox event*******/
    $("input[type=checkbox]").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(3);
        var select_picker = parent.find('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }
    });

    checkRoom();
    simpleBase();
});


/********************/
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


function simpleBase(){
    $("#save").click(function(){
        var data="";
        var hotel=$('#select-hotel').find('option:selected').text();


        data+='hotel='+hotel;
        if($("#single").is(':checked')){
            var singleVal=$("#single").parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+=', singleVal='+singleVal;
            var adultBreakfast = $("#adult-breakfast").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch = $("#adult-lunch").parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner =  $("#adult-dinner").parents().eq(3).children().eq(1).children().find('option:selected').text();
            if($("#adult-breakfast").is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if($("#adult-lunch").is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if($("#adult-dinner").is(':checked')){
                data+=', adultDinner='+adultDinner;

            }
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
        var extra_adult = $("#extra-adult");
        var adult_breakfast = $("#adult-breakfast");
        var adult_lunch = $("#adult-lunch");
        var adult_dinner = $("#adult-dinner");
        if(extra_adult.is(':checked')){
            var extraVal= extra_adult.parents().eq(3).children().eq(1).children().find('option:selected').text();
            data+='extraVal='+extraVal;
            var adultBreakfast=adult_breakfast.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultLunch=adult_lunch.parents().eq(3).children().eq(1).children().find('option:selected').text();
            var adultDinner=adult_dinner.parents().eq(3).children().eq(1).children().find('option:selected').text();
            if(adult_breakfast.is(':checked')){
                data+=', adultBreakfast='+adultBreakfast;
            }
            if(adult_lunch.is(':checked')){
                data+=', adultLunch='+adultLunch;
            }
            if(adult_dinner.is(':checked')){
                data+=', adultDinner='+adultDinner;
            }
        }
    });

}