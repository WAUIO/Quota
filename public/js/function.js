$(document).ready(function () {

    getClient();

    $('input').keydown(function (e) {
        e.stopPropagation();
    });

    $('#quota_list').perfectScrollbar();
    if($('#quota_list').hasScrollBar('vertical')) {
        $('.quota_lists').css('margin-right', '15px');
        $('.ps-scrollbar-y-rail').css('z-index', '1000');
    }

    $('.table-editable').perfectScrollbar();

    $('.based_on').removeAttr("href");

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        var quota_list_id = '#quota_list';
        ShowHideQuotaList(quota_list_id, 0);
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
    client();
    checkPrestation();
    mouseEvent();
    btnSave();

});

function getClient() {
    $.ajax({
        url: "/getClient",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            var $length = data.length;

            for(i=0;i<$length;i++){
                $('#quota_list').append('<div id="client_'+data[i].id+'" class="quota_lists"><a href="#">'+data[i].ref_client+' : '+data[i].name+'</a></div>');
            }
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
        var quota_list_id = '#quota_list';
        var bloc_well = $('.well');
        if(bloc_well.not('#well_search').css("display") == "block"){
            bloc_well.not('#well_search').fadeOut(100,function () {
                ShowHideQuotaList(quota_list_id, 1);
            });
        }else{
            ShowHideQuotaList(quota_list_id, 2);
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

function ShowHideQuotaList(quota_list_id, nbr){
    if(nbr == 0){
        if($(quota_list_id).is(":visible") === true){
            $(quota_list_id).fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }else{
            $(quota_list_id).fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }else if(nbr == 1){
        if($(quota_list_id).is(":visible") === true){
            $(quota_list_id).fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }
    }else{
        if($(quota_list_id).is(":visible") === false){
            $(quota_list_id).fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }
}