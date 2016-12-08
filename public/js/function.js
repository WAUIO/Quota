$(document).ready(function () {

    $('#family_member').on('change keyup', function () {
        calculateFamilyTotal($(this));
    });

    $('.delete_prestation').click(function(e){
        e.preventDefault();
        deletePrestation(this);
    });

    $( "#accordion" ).accordion();

    $('input').keydown(function (e) {
        e.stopPropagation();
    });

    $('.checked_list_content').perfectScrollbar();
    $('.list_service').perfectScrollbar();
    $('#quota_list').perfectScrollbar();
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
    tableEvent();
    editValuePopup();
    calculateTotal();
    ancreLink();
    client();
    checkPrestation();
    mouseEvent();
    searchPrestation();

    btnSave();

});


$( function() {
    var options={
        dateFormat: 'dd/mm/yy',
        todayHighlight: true,
        autoclose: true
    };
    $( "#stay" ).datepicker(options);
} );

function client(){
    $("#btn-save").click(function(){
        var ref_regex=new RegExp("[a-zA-Z0-9]{5}", "g");
        var number_regex=new RegExp("[0-9]","g");
        var date_regex=new RegExp("(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}","g");
        var ref=$("#customerRef").val();
        var name=$("#name").val();
        var adult=$("#nbAdults").val();
        var child=$("#nbChildren").val();
        var date=$("#stay").val();
        var info="ref_cli="+ref+"&name="+name+"&adult="+adult+"&child="+child+"&date="+date;
        if(ref_regex.test(ref) && number_regex.test(adult) && date_regex.test(date)) {
            $('#banner').empty();
            $.ajax({
                type:"GET",
                url:"/client",
                data: info,
                dataType : "html",
                cache : false,
                success : function(data){
                    console.log(data);
                },
                error:function(){
                    console.log("you have an error");
                }
            });

            location.reload();
        }else{
            var p="<p> <span class=' glyphicon glyphicon-hand-right'></span>  Format or values of your entries are not permissible,please retry!</p>";
            $("#banner").append(p);
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

function detailView() {
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
}

function ancreLink() {
    //Ancre Onclick base type
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



