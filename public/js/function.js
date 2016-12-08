$(document).ready(function () {
    getClient();



    $(this).scrollTop(0);
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
    tableEvent();
    //editValuePopup();
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
                $('#quota_list').append('<div id="client_'+data[i].id+'" class="quota_lists"><a href="#">'+data[i].ref_client+' : '+data[i].name+'azertyuiopaqsdfghjklmwxcvbn123456789</a></div>');
            }
        }
    });
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

    editValuePopup();
    calculateTotal();
    ancreLink();



$( function() {
    var options={
        dateFormat: 'dd/mm/yy',
        todayHighlight: true,
        autoclose: true
    };
    $( "#stay" ).datepicker(options);
} );

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
//             }
//             else {
//                 if (value < 0 || value > 100) {
//                     return 'The value must be between 0 and 100';
//                 } else {
//                     $(this).on('hidden.bs.modal', function () {
//                         table_id = $(this).closest('table').attr('id');
//                         room_type = table_id.replace('table_', '');
//                         length = $('#' + table_id + ' tbody tr:eq(1) td ').length;
//
//                         if ($(this).attr('id') == 'margin_prestation_' + room_type)
//                             calculateMargin(this, room_type, value, length);
//
//                         else if ($(this).attr('id') == 'taxes_prestation_' + room_type)
//                             calculateTaxes(this, room_type, value, length);
//
//                         else if ($(this).attr('id') == 'margin_room_' + room_type)
// =======
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
    somme("#table_single_room");
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