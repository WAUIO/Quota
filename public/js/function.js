$( function() {
    var quota_list = $('#quota_list');
    //$(this).scrollTop(0);

    searchClient();

    $("form#login_form").on("submit", function(e) {
        e.preventDefault();
        login();
    });

    $('#client_reference').click(function () {
        $('#about_client').dialog({modal: true, height: 205, width: 400 });
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

    $('#refresh_client').click(function () {
        getClient();
    });

    $('.taxes').css('border-bottom', 'none');
    $('.others').css('border-bottom', 'none');
    $('.selectpicker').attr("disabled","disabled");
    $('#select-hotel').removeAttr("disabled");
    $('#search_control').removeAttr("disabled");

    //checkboxEvent();
    //menuView();
    //popupView();
    getClient();
    detailView();
    editValuePopup();
    calculateTotal();
    ancreLink();
    mouseEvent();
    setTooltip();
});

function setTooltip() {
    $('#quota_list').tooltip({
        items: '.quota_lists',
        content: 'Click to display this customer.',
        show: null, // show immediately
        open: function (event, ui) {
            if (typeof(event.originalEvent) === 'undefined') {
                return false;
            }

            var $id = $(ui.tooltip).attr('id');

            // close any lingering tooltips
            $('div.ui-tooltip').not('#' + $id).remove();

            // ajax function to pull in data and add it to the tooltip goes here
        },
        close: function (event, ui) {
            ui.tooltip.hover(function () {
                    $(this).stop(true).fadeTo(400, 1);
                },
                function () {
                    $(this).fadeOut('400', function () {
                        $(this).remove();
                    });
                });
        }
    });
}

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
}

function login(){
    if(isValidEmail( $("#login_email").val()) && $("#login_password").val() != ''){
        var avatar = $('.avatar');
        var newSrc = avatar.attr("src").replace("/images/user1.png", "/images/user_gif.gif");
        avatar.attr("src", newSrc);
        $.ajax({
            url:'/login',
            type:'GET',
            dataType:'html',
            data: $('#login_form').serialize(),
            success:function(data){
                if(data == 'not authenticated'){
                    newSrc = avatar.attr("src").replace("/images/user_gif.gif", "/images/user1.png");
                    avatar.attr("src", newSrc);
                    $('#login_error').text('Email or password invalid !').show();
                }else{
                    window.location.replace(window.location.pathname);
                }
            },error:function (data) {
                newSrc = avatar.attr("src").replace("/images/user_gif.gif", "/images/user1.png");
                avatar.attr("src", newSrc);
                $('#login_error').text('Something wrong !').show();
            }
        });
    }
}

//round float value (fixed 2)
function roundValue(value){
    value = parseFloat(value);
    if(value % 1 != 0){
        value = value.toFixed(2);
    }else value = value.toFixed(0);
    return value;
}

//search customer (search input)
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

//list of all customers
function getClient() {
    var quota_list = $('#quota_list');
    var $icon = $('#refresh_client').find('.glyphicon.glyphicon-refresh'),
        animateClass = "glyphicon-refresh-animate";
    $icon.addClass( animateClass );

    $.ajax({
        url: "/getClient",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var $length = data.length;
            var client_id;
            quota_list.html('');
            for(i=0;i<$length;i++){
                quota_list.append($('<div id="client_'+data[i].id+'" class="quota_lists">'+data[i].reference+' : '+data[i].name+'</div>')
                    .click(function(){
                        client_id = $(this).attr('id').replace('client_','');
                        setClient(window.location, client_id);
                    })
                );
            }
            $icon.removeClass( animateClass );
            //$('.ref_client').load(window.location + ' .client_reference');
        }
    });
}

//set customer in session
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

//Ancre Onclick base type
function ancreLink() {
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-100 }, speed );
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

// function checkboxEvent() {
//     /*******checkbox event*******/
//     $("input[type=checkbox]").click(function () {
//         var checkbox_id = $('#'+$(this).closest(this).attr("id"));
//         var parent = checkbox_id.parents().eq(2);
//         var select_picker = parent.closest('select');
//         if($(this).is(':checked')){
//             $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
//         }else{
//             $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
//         }
//     });
// }

// function menuView() {
//     //Show & hide menu(Search and room basis)
//     $('#menu_hamburger').click(function(e){
//         e.preventDefault();
//         var quota_list = '#quota_list';
//         var bloc_well = $('.well');
//         if(bloc_well.not('#well_search').css("display") == "block"){
//             bloc_well.not('#well_search').fadeOut(100,function () {
//                 ShowHideQuotaList(quota_list, 1);
//             });
//         }else{
//             ShowHideQuotaList(quota_list, 2);
//             bloc_well.fadeIn();
//         }
//     });
// }
// function popupView() {
//     //show
//     $('[data-popup-open]').on('click', function(e)  {
//         var targeted_popup_class = jQuery(this).attr('data-popup-open');
//         $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
//
//         $('.select_data').perfectScrollbar();
//         e.preventDefault();
//     });
//
//     //close
//     $('[data-popup-close]').on('click', function(e)  {
//         var targeted_popup_class = jQuery(this).attr('data-popup-close');
//         $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
//
//         e.preventDefault();
//     });
// }