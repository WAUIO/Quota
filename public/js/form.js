$(document).ready(function () {
    $(this).scrollTop(0);
    $('.accordion_body_scroll').perfectScrollbar();
    $("select").attr("disabled","disabled");
    select_hotel =$("#select-hotel");
    select_hotel.removeAttr("disabled");
    $('[type = "checkbox"]').prop('checked', false);
    $("#ddl").removeAttr("disabled");

    $( "#form_accordion" ).accordion();

    $("#save_room").click(function() {
        saveRoom();
    });

    select_hotel.on('change', function () {
        inHouse();
    });

    checkOption();
});

function checkOption(){
    $("[type = 'checkbox']").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(3);
        var select_picker = parent.find('select');

        if($(this).is(':checked')){
            select_picker.attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            select_picker.attr('disabled', !this.checked).selectpicker('refresh');
            select_picker.parents().addClass('disabled');
        }
    });
}
function inHouse(){
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
    $('[type = "checkbox"]').prop('checked', false);

    //get house id
    var house_id = $("#select-hotel").val();
    getAllHouseData(house_id);
}

function getAllHouseData(house_id){
    $.ajax({
        type: 'GET',
        url: '/getAllHouseData',
        dataType: 'json',
        data: {house_id: house_id},
        success: function(data) {
            setBase(data[0], house_id);
            setBoard(data[1]);
            $('.loader').hide();
        }
    });
}
function setBase(data, house_id){
    var select = {'single':'', 'double':'','triple':'','family':'','extra_bed':''};

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
        room_option.rate = others['wau-rate'].value;
        room_option.currency = others['public-rate'].currency;
        room_option.room_title = others['name'].value;
        room_option.vignet = vignette;
        room_option.tax = tax;

        var category = value.category.replace('-', '_').toLowerCase();
        select[category] += "<option value='"+ JSON.stringify(room_option) +"'>"+ room_option.room_title +"</option>";
    });

    $.each( select, function( key, value ) {
        select[key] += '</optgroup>';
    });

    $('#adult_select_single').append(select['single'], select['extra_bed']);
    $('#adult_select_double').append(select['double'], select['single'], select['extra_bed']);
    $('#adult_select_triple').append(select['triple'], select['double'], select['single'], select['extra_bed']);
    $('#adult_select_family').append(select['family'], select['triple'], select['double'], select['single'], select['extra_bed']);
    $('#adult_select_extra_bed').append(select['extra_bed']);
    $('#child_select_extra_bed').append(select['extra_bed']);
}

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
                }else{
                    select_id = "#adult_select_"+val
                }

                board_option[val] = others['wau-rate'].value;
                option = "<option value='"+ JSON.stringify(board_option) +"'>"+ value.menu +"</option>";

                $(select_id).append(option);
            });
        }
    });

    if($('.row_other_board:visible').length === 3){
        $('#accordion_body_adult').css('height', '350px');
    }
}

function saveRoom(){
    $('#loader_gif').show();
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
                        //console.log(value);
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
        console.log(all_data);
        $.ajax({
            type: 'GET',
            url: '/savequotaroom',
            dataType:'html',
            data: {all_data: all_data},
            success: function(data){
                console.log(data);
                $('#loader_gif').hide();
                $('.room_message').text('Room(s) saved !').css({'display' : 'block', 'color' : '#5cb85c'});
            }
        });
    }else{
        $('.room_message').text('No room checked !').css({'display' : 'block', 'color' : '#FF0F22'}).delay(5000).fadeOut();
    }
}