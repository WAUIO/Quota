$(document).ready(function () {
    $(this).scrollTop(0); quota_list = $('#quota_list');
    getClient();
    searchClient();

    $(".ref_client").click(function () {
        $("#about_client").dialog({modal: true, height: 205, width: 400 });
    });


    $('input').keydown(function (e) {
        e.stopPropagation();
    });

    quota_list.perfectScrollbar();
    if(quota_list.hasScrollBar('vertical')) {
        $('.quota_lists').css('margin-right', '15px');
        $('.ps-scrollbar-y-rail').css('z-index', '1000');
    }

    $('.table-editable').perfectScrollbar();

    $('.based_on').removeAttr("href");

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        ShowHideQuotaList($('#quota_list'), 0);
    });

    $('.taxes').css('border-bottom', 'none');
    $('.others').css('border-bottom', 'none');
    $(".selectpicker").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    $("#search_control").removeAttr("disabled");

    //checkboxEvent();
    menuView();
    popupView();
    detailView();
    editValuePopup();
    calculateTotal();
    ancreLink();
    mouseEvent();
    btnSave();

    $('#client_1').click(function () {
       alert("azertyu");
    });
});

function roundValue(value){
    value = parseFloat(value);
    if(value % 1 != 0){
        value = value.toFixed(2);
    }else value = value.toFixed(0);
    return value;
}

// <<<<<<< HEAD
// $( function() {
//     var options ={
//         dateFormat: 'dd/mm/yy',
//         todayHighlight: true,
//         autoclose: true
//     };
//     $( "#stay" ).datepicker(options);
// } );
//
// =======
function searchClient(){
    $('#search_client').keyup(function(){
        var exist = false;
        var quota_list = $('#quota_list');
        var input_text = $(this).val().toLowerCase();

        if(quota_list.is(":visible") === false){
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }

        $('.quota_lists').each(function(){
            var text = $(this).text().toLowerCase();
            if(text.indexOf(input_text) != -1){
                $(this).show();
                exist = true;
            }
            else{
                $(this).hide();
            }
        });

        if(!exist){
            quota_list.find('.search_message').show();
        }else
            quota_list.find('.search_message').hide();

        quota_list.scrollTop(0);
        quota_list.perfectScrollbar('update');

    });
}

function getClient() {

    $.ajax({
        url: "/getClient",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var $length = data.length;

            for(i=0;i<$length-1;i++){
                $('#quota_list').append($('<div id="client_'+data[i].id+'" class="quota_lists">'+data[i].reference+' : '+data[i].name+'</div>')
                    .click(function(){
                        setClient(window.location, $(this).attr('id').replace('client_',''));
                    })
                );
            }

            $('.ref_client').load(window.location + ' .ref_client');
        }
    });
}

function setClient(url, client_id){
    $.ajax({
        url: "/setClient",
        type: "GET",
        data: {client_id : client_id},
        success: function () {
            window.location.replace(url);
        }
    });
}

function checkboxEvent() {
    /*******checkbox event*******/
    $("input[type=checkbox]").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(2);
        var select_picker = parent.closest('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }
    });
}

function menuView() {
    //Show & hide menu(Search and room basis)
    $('#menu_hamburger').click(function(e){
        e.preventDefault();
        var quota_list = '#quota_list';
        var bloc_well = $('.well');
        if(bloc_well.not('#well_search').css("display") == "block"){
            bloc_well.not('#well_search').fadeOut(100,function () {
                ShowHideQuotaList(quota_list, 1);
            });
        }else{
            ShowHideQuotaList(quota_list, 2);
            bloc_well.fadeIn();
        }
    });
}

function popupView() {
    //show
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        $('.select_data').perfectScrollbar();
        e.preventDefault();
    });

    //close
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
}

//Ancre Onclick base type
function ancreLink() {
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-60 }, speed );
        return false;
    });
}

//test if a string is a float
function isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;

    if (!floatRegex.test(val))
        return false;

    val = parseFloat(val);
    if (isNaN(val))
        return false;

    return true;
}

function ShowHideQuotaList(quota_list, nbr){
    if(nbr == 0){
        if(quota_list.is(":visible") === true){
            quota_list.fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }else{
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }else if(nbr == 1){
        if(quota_list.is(":visible") === true){
            quota_list.fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }
    }else{
        if(quota_list.is(":visible") === false){
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }
}