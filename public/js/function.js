

$( function() {
    getClient();
    var quota_list = $('#quota_list');

    searchClient();

    $(this).scrollTop(0);
    $('#family_member').on('change keyup', function () {
        calculateFamilyTotal($(this));
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

    $( "#accordion" ).accordion();

    $('input').keydown(function (e) {
        e.stopPropagation();
    });
    $('.checked_list_content').perfectScrollbar();
    $('.list_service').perfectScrollbar();

    $('#quota_list').perfectScrollbar();
    if($('#quota_list').hasScrollBar('vertical')) {


        quota_list.perfectScrollbar();

        if (quota_list.hasScrollBar('vertical')) {
            $('.quota_lists').css('margin-right', '15px');
            $('.ps-scrollbar-y-rail').css('z-index', '1000');
        }

        $('.table-editable').perfectScrollbar();

        $('.based_on').removeAttr("href");

        $('#search_glyphicon').click(function (e) {
            e.preventDefault();
            ShowHideQuotaList($('#quota_list'), 0);
        });
    getClient();
    detailView();
    editValuePopup();
    calculateTotal();
    ancreLink();
    mouseEvent();
    setTooltip();
}

$( function() {
    var options={
        dateFormat: 'mm/dd/yy',
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
                    type: "GET",
                    url: "/client",
                    data: info,
                    dataType: "html",
                    cache: false,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function () {
                        console.log("you have an error");
                    }
                });
            }
    });
}
    setTooltip();

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
            url:'/authenticate',
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

function logout(){
    url = '/';
    $.ajax({
        url:'/logout',
        type: "GET",
        success: function () {
            window.location.replace(url);
        }
    });
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

function calculateTotal() {
    $('table').each(function(){
        somme(this.id);
    });
}

function editValuePopup() {
    $.fn.editable.defaults.mode = 'popup';

    //for fees, guides flights, customers flights and others
    $('.others').editable({

        type: 'text',
        inputclass:'lebar',
        showbuttons:true,
        title: 'Enter a value' ,
        value:'',
        placement:'top',
        emptytext:'------',
        validate: function(value) {
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            }else{
                $(this).on('hidden.bs.modal', function () {
                    table_id  = $(this).closest('table').attr('id');
                    length = $('#'+table_id+' tbody tr:eq(1) td ').length;
                    td = $(this).parent('td');
                    for (i=0;i<length-3;i++) {
                        td.siblings().eq(i+1).text(value);
                    }
                    somme(table_id);
                });
            }
        }
    });

    //for taxes and margins
    $('.taxes').editable({
        type: 'text',
        inputclass: 'lebar',
        showbuttons: true,
        title: 'Enter a value',
        value: '',
        placement: 'top',
        emptytext: '------',
        validate: function (value) {
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            }
            else{
                if(value<0 || value>100){
                    return 'The value must be between 0 and 100';
                }else{
                    $(this).on('hidden.bs.modal', function () {
                        table_id  = $(this).closest('table').attr('id');
                        room_type = table_id.replace('table_','');
                        length = $('#'+table_id+' tbody tr:eq(1) td ').length;

                        if($(this).attr('id') == 'margin_prestation_'+room_type)
                            calculateMargin(this, room_type, value, length);

                        else if($(this).attr('id') == 'taxes_prestation_'+room_type)
                            calculateTaxes(this, room_type, value, length);
                        
                        else if($(this).attr('id') == 'margin_room_'+room_type)
                            calculateMargin(this, room_type, value, length);

                        else //if($(this).attr('id') == 'taxes_room_'+room_type)
                            calculateTaxes(this, room_type, value, length);

                        somme(table_id);
                    });
                }
            }
        }
    });

    /**************/
    $(".selectpicker").attr("disabled", "disabled");
    // $(".form-control").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    /*******checkbox event*******/
    $("input[type=checkbox]").click(function () {
        var checkbox_id = $('#' + $(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(2);
        var select_picker = parent.find('select');
        if ($(this).is(':checked')) {
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        } else {
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }
    });
    $("#search_control").removeAttr("disabled");
   // total_dataTable();
   //  somme("#table_single_room");
    //somme("#table_double_room");
}
function saveClient(){
    $("#roomclick").click(function(){
       window.location.href='/house';
    });
}

    //for fees, guides flights, customers flights and others
    $('.others').editable({
        type: 'text',
        inputclass: 'lebar',
        showbuttons: true,
        title: 'Enter a value',
        value: '',
        placement: 'top',
        emptytext: '------',
        validate: function (value) {
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            } else {
                $(this).on('hidden.bs.modal', function () {
                    table_id = $(this).closest('table').attr('id');
                    length = $('#' + table_id + ' tbody tr:eq(1) td ').length;
                    td = $(this).parent('td');
                    for (i = 0; i < length - 3; i++) {
                        td.siblings().eq(i + 1).text(value);
                    }
                    somme(table_id);
                });

            }
        }
    });

//calculation for margins
function calculateMargin($this, room_type, value, length){
    span_taxes = $('#'+$($this).attr('id').replace('margin','taxes'));
    td_margin = $($this).closest('td');
    td_taxes = span_taxes.closest('td');
    tr_id = $($this).closest('tr').prev().attr('id');

    for (i=0;i<length-3;i++) {
        val = $('tr#'+tr_id+' > td.td_'+room_type+':eq(' + i + ')').text();
        val_margin = val * value / 100;
        td_margin.siblings().eq(i+1).text( val_margin.toFixed(2));

        tax = span_taxes.text();
        val_taxes  = val_margin * tax / 100;
        td_taxes.siblings().eq(i+1).text( val_taxes.toFixed(2));
    }
}

//calculation for taxes
function calculateTaxes($this, room_type, value, length){
    td_taxes = $($this).closest('td');
    td_margin_id = $($this).closest('tr').prev().attr('id');
    for (i=0;i<length-3;i++) {
        tax = $($this).text();
        val_margin = $('tr#'+td_margin_id+' > td.td_'+room_type+':eq(' + i + ')').text();

        val_taxes  = val_margin * value / 100;
        console.log(val_taxes);
        td_taxes.siblings().eq(i+1).text( val_taxes.toFixed(2));
    }
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


    function somme(table_id){
        var room_type = table_id.replace('table_','');
        var euro_exchange = parseFloat($('#euro_exchange').text()).toFixed(2);
        var dollar_exchange = parseFloat($('#dollar_exchange').text()).toFixed(2);

        length = $('#'+table_id+' tbody tr:eq(1) td').length;
        for (i=0;i<length-3;i++) {
            var total = 0;
            $('td.td_'+room_type+':eq(' + i + ')', 'tr').each(function(i) {
                if($(this).text() != ""){
                    total = total + Number.parseFloat($(this).text());
                }
            });
            var total_USD = $('#'+table_id+' .tr_USD td');
            var total_EUR = $('#'+table_id+' .tr_EUR td');
            var total_MGA = $('#'+table_id+' .tr_MGA td');

            total_MGA.eq(i+2).text(total.toFixed(2));
            total_EUR.eq(i+1).text((total / euro_exchange).toFixed(2));
            total_USD.eq(i+1).text((total / dollar_exchange).toFixed(2));
        }
    }

    function tableEvent(){
        var $TABLE = $('.table-editable');
        var $BTN = $('#export-btn');
        var $EXPORT = $('#export');

        /*** add others row ***/
        $('.table-add').click(function () {
            table_id = $(this).closest('table').attr('id');
            var $clone = $TABLE.find('#'+table_id+' tr.hide').clone(true).removeClass('hide');
            $clone.find('td:eq(1) span').attr('class','others').css('border-bottom', 'none').remove('editable').editable({
                type: 'text',
                inputclass:'lebar',
                showbuttons:true,
                title: 'Enter a value' ,
                value:'',
                placement:'top',
                emptytext:'------',
                validate: function(value) {
                    if($.trim(value) == '') {
                        return 'Numeric value required';
                    }
                    if ($.isNumeric(value) == '') {
                        return 'Numeric value required';
                    }else{
                        $(this).on('hidden.bs.modal', function () {
                            table_id  = $(this).closest('table').attr('id');
                            length = $('#'+table_id+' tbody tr:eq(1) td ').length;
                            td = $(this).parent('td');
                            for (i=0;i<length-3;i++) {
                                td.siblings().eq(i+1).text(value);
                            }
                            somme(table_id);
                        });

                    }
                }
            });
            $TABLE.find('#'+table_id+' .tr_MGA').before($clone);

        });


        $('.table-remove').click(function () {
            table_id = $(this).closest('table').attr('id');
            length = $('#'+table_id+' tbody tr:eq(1) td').length;
            for (i=1;i<length-1;i++) {
                $(this).parents('td').siblings().eq(i).text(0);
            }
            somme(table_id);
            $(this).parents('tr').detach();
        });
    }
