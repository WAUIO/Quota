$( function() {
    windowResize();
    getClient();
    searchClient();

    var quota_list = $('#quota_list');
    $(window).on('resize', function(){
        windowResize();
    });

    $("form#login_form").on("submit", function(e) {
        e.preventDefault();
        login();
    });

    $('#user_icon').hover(
        function () {
            $('#user_name').show("slide", { direction: "right" }, 200);
        },
        function () {
            $('#user_name').hide("slide", { direction: "right" }, 200);
        }
    );

    $('#user_logout').click(function () {
        logout();
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

    ancreLink();
});

//when resize window
function windowResize(){
    if($('#header_title').height() > 100 ){
        $('body').css('padding-top', '130px');
    }else $('body').css('padding-top', '80px');
}

//if cursor hover list customer
function setTooltip(client) {
    var $content = '<p>Reference : '+ client.reference +'</p>'+
                    '<p>Name : '+ client.name +'</p>'+
                    '<p>Adult number : '+ client.number_adult +'</p>'+
                    '<p>Child number : '+ client.number_child +'</p>'+
                    '<p>Stay beginning : '+ client.start_date +'</p>';

    $('#client_'+client.id).tooltip({
        items: '.quota_lists',
        content: $content,
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

//test validation email
function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
}

//user log in
function login(){
    var login_form = '#login_form';
    var email = $("#login_email").val();
    var password = $("#login_password").val();
    if(isValidEmail( email ) && password != ''){
        var avatar = $('.avatar');
        var newSrc = avatar.attr("src").replace("/images/user1.png", "/images/user_gif.gif");
        avatar.attr("src", newSrc);

        $('#login_btn').append('&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
        $(login_form+' input').prop('disabled', true);
        $(login_form+' button').prop('disabled', true);
        $.ajax({
            url:'/authenticate',
            type:'GET',
            dataType:'html',
            data: {email : email, password : password},
            success:function(data){
                if(data == 'not authenticated'){
                    newSrc = avatar.attr("src").replace("/images/user_gif.gif", "/images/user1.png");
                    avatar.attr("src", newSrc);
                    $('#login_error').text('Email or password invalid !').show();
                    $(login_form+' input').prop('disabled', false);
                    $(login_form+' button').prop('disabled', false);
                    $('#login_btn').html('Login');
                }else{
                    window.location.replace(window.location.pathname);
                }
            }, error: function () {
                newSrc = avatar.attr("src").replace("/images/user_gif.gif", "/images/user1.png");
                avatar.attr("src", newSrc);
                $('#login_error').text('Something wrong, please refresh !').show();
                $(login_form+' button').prop('disabled', false);
            }
        });
    }
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

//fill out the customer list
function getClient() {
        var quota_list = $('#quota_list');
        var $icon = $('#refresh_client').find('.glyphicon.glyphicon-refresh'),
            animateClass = "glyphicon-refresh-animate";
        $icon.addClass(animateClass);

        $.ajax({
            url: "/getClient",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var $length = data.length;
                var client_id;
                quota_list.html('');
                if($length == 0){
                    quota_list.append('<div class="no_client">No existing customer !</div>'+
                        '<div class="add_room_button " id="add_new_customer" onclick="location.href =\'/clientAdd\'">Add customer</div>');

                }else{
                    for (i = 0; i < $length; i++) {
                        quota_list.append($('<div id="client_' + data[i].id + '" class="quota_lists">' + data[i].reference + ' : ' + data[i].name + '</div>')
                            .click(function () {
                                client_id = $(this).attr('id').replace('client_', '');
                                setClient(window.location, client_id);
                            })
                        );
                        setTooltip(data[i]);
                    }
                    getClient();
                }
                $icon.removeClass(animateClass);
                quota_list.perfectScrollbar('update');
            }
        });
    }

//set customer in session
function setClient(url, client_id) {
        $.ajax({
            url: "/setClient",
            type: "GET",
            data: {client_id: client_id},
            success: function () {
                window.location.replace(url);
            }
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