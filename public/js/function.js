$( function() {
    var quota_list = $('#quota_list');

    $(window).on('resize', function(){
        windowResize();
    });

    $("form#login_form").on("submit", function(e) {
        e.preventDefault();
        login();
    });

    var $user_name = $('#user_name');
    $('#user_avatar').hover(
        function () {
            $user_name.closest('li').show();
            $user_name.show("slide", { direction: "right" }, 200);
        },
        function () {
            $user_name.hide("slide", { direction: "right" }, 200);
            $user_name.closest('li').hide();
        }
    );

    $('#user_logout').click(function () {
        logout();
    });

    $('#client_reference').click(function () {
        $('#about_client').dialog({modal: true, height: 205, width: 400 });
    });

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        ShowHideQuotaList($('#quota_list'), 0);
    });

    $('input').keydown(function (e) {
        e.stopPropagation();
    });

    if(quota_list.hasScrollBar('vertical')) {
        $('.quota_lists').css('margin-right', '15px');
        $('.ps-scrollbar-y-rail').css('z-index', '1000');
    }

    $('.table-editable').perfectScrollbar();
    $('.based_on').removeAttr("href");
    $('.taxes').css('border-bottom', 'none');
    $('.others').css('border-bottom', 'none');
    $('.selectpicker').attr("disabled","disabled");
    $('#select-hotel').removeAttr("disabled");
    $('#search_control').removeAttr("disabled");

    quota_list.perfectScrollbar();
    searchClient();
    ancreLink();
    windowResize();
});

//when resize window
function windowResize(){
    if($('#header_title').height() > 100 ){
        $('body').css('padding-top', '130px');
    }else $('body').css('padding-top', '80px');

    if ($( window ).width() > 768) {
        $('.dropdown').removeClass('open');
    }
}

//test validation email
function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
}

//user log in
function login(){
    var login_form = '#login_form';
    var loginData = $(login_form).serialize();
    var url = window.location.pathname;
    var avatar = $('.avatar');
    var newSrc = avatar.attr("src").replace("/images/user1.png", "/images/user_gif.gif");

    avatar.attr("src", newSrc);
    $('#login_error').hide();
    $('#login_btn').append('&nbsp;<img src="/images/loader.gif" alt="..." class="" style="width:20px; height:5px">');
    $(login_form+' input').prop('disabled', true);
    $(login_form+' button').prop('disabled', true);

    $.ajax({
        url:'/authenticate',
        type:'POST',
        data:loginData,
        dataType:'json',
        success:function(data){
            if(data.authenticated){
                window.location.replace(url);
            }else{
                afterLoginFailed(avatar, login_form, data.message);
            }
        }, error: function () {
            afterLoginFailed(avatar, login_form, 'Something wrong !');
        }
    });
}

//set message after login
function afterLoginFailed(avatar, login_form, message){
    newSrc = avatar.attr("src").replace("/images/user_gif.gif", "/images/user1.png");
    avatar.attr("src", newSrc);
    $('#login_error').text(message).show();
    $(login_form+' input').prop('disabled', false);
    $(login_form+' button').prop('disabled', false);
    $('#login_btn').html('Login');
}

//user log out
function logout() {
    url = '/';
    $.ajax({
        url: '/logout',
        type: "GET",
        success: function () {
            window.location.replace(url);
        }
    });
}

//round float value (fixed 2)
function roundValue(value) {
    value = parseFloat(value);
    if (value % 1 != 0) {
        value = value.toFixed(2);
    } else value = value.toFixed(0);
    return value;
}

//search customer (search input)
function searchClient() {
    $('#search_client').keyup(function () {
        var exist = false;
        var quota_list = $('#quota_list');
        var input_text = $(this).val().toLowerCase();

        if (quota_list.is(":visible") === false) {
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }

        $('.quota_lists').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(input_text) != -1) {
                $(this).show();
                exist = true;
            }
            else {
                $(this).hide();
            }
        });

        if (!exist) {
            quota_list.find('.search_message').show();
        } else
            quota_list.find('.search_message').hide();

        quota_list.scrollTop(0);
        quota_list.perfectScrollbar('update');

    });
}

//Ancre Onclick base type
function ancreLink() {
    if($('#header_title').height() > 100 ){
        top_value = 150;
    }else top_value = 100;

    $('.base_type').on('click', function () {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate({scrollTop: $(page).offset().top - top_value}, speed);
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

//when user show / hide customer list
function ShowHideQuotaList(quota_list, nbr) {
    if (nbr == 0) {
        if (quota_list.is(":visible") === true) {
            quota_list.fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        } else {
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    } else if (nbr == 1) {
        if (quota_list.is(":visible") === true) {
            quota_list.fadeOut(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }
    } else {
        if (quota_list.is(":visible") === false) {
            quota_list.fadeIn(200);
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }
}