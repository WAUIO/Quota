$(document).ready(function () {
    var select_hotel = $('#select-hotel');
    $(this).scrollTop(0);
    $('.accordion_body_scroll').perfectScrollbar();

    //make select disable when page on ready
    $('select').attr('disabled','disabled');

    //make select option for house enable
    select_hotel.removeAttr('disabled');

    //make checkbox unchecked
    $('[type = "checkbox"]').prop('checked', false);
    $('.check_able').prop('disabled', true);

    $( "#form_accordion" ).accordion();

    // save room trigger
    $("form#room_form").on("submit", function(e) {
        e.preventDefault();
        saveRoom();
    });

    // get data appropriate when house option selected change
    select_hotel.on('change', function () {
        dataHouse();
    });

    checkOption();
});

//make select menu enable if checkbox checked
function checkOption(){
    $("input[type = 'checkbox']").click(function () {
        var parent = $(this).parents().eq(2);
        var select_picker = parent.find('select');

        if($(this).is(':checked')){
            select_picker.attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            select_picker.attr('disabled', !this.checked).selectpicker('refresh');
            select_picker.parents().addClass('disabled');
        }
    });
}

// get all data about room and board when house selected,
function dataHouse(){
    $('.room_message').fadeOut();
    $('#adult_select_single').html('');
    $('#adult_select_double').html('');
    $('#adult_select_triple').html('');
    $('#adult_select_family').html('');
    $('#adult_select_extra_bed').html('');
    $('#child_select_extra_bed').html('');

    $('#adult_select_breakfast').html('');
    $('#adult_select_dinner').html('');
    $('#adult_select_lunch').html('');
    $('#adult_select_menu').html('');
    $('#adult_select_hb').html('');
    $('#adult_select_fb').html('');
    $('#child_select_breakfast').html('');
    $('#child_select_dinner').html('');
    $('#child_select_lunch').html('');

    $('.loader').show();
    $('.all_select').hide();
    $('.check_able').prop('disabled', true);
    $('[type = "checkbox"]').prop('checked', false);

    //get house id
    var id_house = $('#select-hotel').val();
    var name_house = $('#select-hotel option:selected').text();
    getAllHouseData(id_house, name_house);
}

// get all room and restaurant data in house
function getAllHouseData(id_house, name_house){
    $.ajax({
        type: 'GET',
        url: '/getAllHouseData',
        dataType: 'json',
        data: {house_id: id_house},
        success: function(data) {
            setBase(data[0], id_house, name_house);
            setBoard(data[1]);
            $('.loader').hide();
            checkbox_enable();
        }
    });
}

//append data of room into select option
function setBase(data, house_id, name_house){
    var select = {'single':'', 'double':'','triple':'','family':'','extra_bed':''};
    var exist_extra_bed = false;

    $.each( select, function( key, value ) {
        select[key] = '<optgroup label="'+key.substr(0,1).toUpperCase() + key.substr(1)+'">';
    });

    $.each( data, function(key, value){
        var others = JSON.parse(value.others.replace('<br/>', ''));
        var room_option = {};

        var tax = "0";
        var vignette = "0";
        if ("tax" in others){
            tax = others['tax'].value;
        }
        if ("vignet-3" in others){
            vignette = others['vignet-3'].value;
        }

        room_option.id_house = house_id;
        room_option.name_house = name_house;
        room_option.rate = others['wau-rate'].value;
        if ("'public-rate" in others){
            room_option.currency = others['public-rate'].currency;
        }else
            room_option.currency = 'MGA';
        room_option.room_title = others['name'].value;
        room_option.vignet = vignette;
        room_option.tax = tax;

        var category = value.category.replace('-', '_').toLowerCase();
        select[category] += "<option value='"+ JSON.stringify(room_option) +"'>"+ room_option.room_title +"</option>";
        $('#id_row_adult_'+category).show();
        if (category == "extra_bed"){
            exist_extra_bed = true;
            $('#id_row_child_'+category).show();
        }
    });
    $.each( select, function( key, value ) {
        select[key] += '</optgroup>';
    });

    $('#adult_select_single').append(select['single'], select['extra_bed']);
    $('#adult_select_double').append(select['double'], select['single'], select['extra_bed']);
    $('#adult_select_triple').append(select['triple'], select['double'], select['single'], select['extra_bed']);
    $('#adult_select_family').append(select['family'], select['triple'], select['double'], select['single'], select['extra_bed']);
    $('#adult_select_extra_bed').append(select['extra_bed']);
    if (exist_extra_bed){
        $('#child_select_extra_bed').append(select['extra_bed']);
        $('#accordion_head_child').show();
        //$('#accordion_body_child').show();
    }else{
        $('#accordion_head_child').hide();
        $('#accordion_body_child').hide();
    }
}

//append data of board into select option
function setBoard(data){
    $.each( data, function(e, value){
        others = JSON.parse(value.others.replace('<br/>', ''));
        meals = value.meals.toLowerCase();

        if(meals != '') {
            var array_meals = meals.split('/');
            var other_board = ['menu', 'fb', 'hb'];

            $.each( array_meals, function(e, val){
                var board_option = {};
                if(~other_board.indexOf(val)){
                    $("#id_row_"+val).show();
                }

                if(~val.indexOf('chd')){
                    select_id = "#child_select_"+val.replace(' chd', '');
                    id_row = "#id_row_child_"+val.replace(' chd', '');
                }else{
                    select_id = "#adult_select_"+val;
                    id_row = "#id_row_adult_"+val;
                }

                board_option[val] = others['wau-rate'].value;
                option = "<option value='"+ JSON.stringify(board_option) +"'>"+ value.menu +"</option>";
                $(select_id).append(option);
                $(id_row).show();
            });
        }
    });

    if($('.row_other_board:visible').length === 3){
        $('#accordion_body_adult').css('height', '350px');
    }
}
//make checkbox checkable if select option is not empty
function checkbox_enable(){
    $('select').each(function() {
        var parent = $(this).parent().parent();
        var siblings = parent.siblings();
        var checkbox = siblings.find('[type="checkbox"]');

        if(($(this).children().text() !='')) {
            checkbox.removeAttr('disabled');
        }
    })
}

//get room data to save
function saveRoom(){
    var board_option = {};
    var all_data = [];

    $('.accordion_body').each( function( ) {
        base_checkbox = $(this).find('.base_checkbox');
        board_checkbox = $(this).find('.board_checkbox');

        //get all checked board
        board_checkbox.each( function( ) {
            if (this.checked) {
                parent = $(this).parents().eq(2);
                select = parent.find('select option:selected');

                $.each(select, function () {
                    $.each( JSON.parse($(this).val()), function(key, value){
                        board_option[key] = value;
                    });
                });
            }
        });

        //get all checked room
        base_checkbox.each( function( ) {
            if (this.checked) {
                base = $(this).val();
                accordion_body_id = $(this).parents().eq(4).attr('id');
                parent = $(this).parents().eq(2);
                select = parent.find('select option:selected');
                $.each(select,function () {
                    room_option = JSON.parse($(this).val());
                    room_option.base = base;
                    if(Object.keys(board_option).length  > 0){
                        room_option.board = board_option;
                    }
                    all_data.push(room_option);
                });
            }
        });
    });

    if(all_data.length > 0 ){

        $('#btn_save_room').html('Saving&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
        $.ajax({
            type: 'GET',
            url: '/saveQuotaRoom',
            dataType:'html',
            data: {all_data : all_data},
            success: function(data){
                $('.room_message').text('Room(s) saved for '+data+' hotel !').css({'display':'block', 'color':'#5cb85c', 'line-height':'40px', 'float':'right'});
                $('#btn_save_room').html('Save');
                $(client_form+' button').prop('disabled', false);
            }
        });
    }else{
        $('.room_message').text('No room checked !').css({'display':'block', 'color':'#FF0F22', 'line-height':'40px', 'float':'right'}).delay(5000).fadeOut();
    }
}