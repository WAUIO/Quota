$( function() {

    $( "#accordion" ).accordion();

    $('.checked_list_content').perfectScrollbar();

    $('.list_service').perfectScrollbar();

    // $('.funky_label').css('text-overflow', 'ellipsis !important');
    // $('.funky_label').hover(function() {
    //     alert($(this).text());
    //     $(this).css("overflow","visible !important")
    // });

    $('#btn_next').click(function () {
        showMessage();
    });

    $('.delete_prestation').click(function(e){
        e.preventDefault();
        deletePrestation(this);
    });
    searchPrestation();
    checkPrestation();
    savePrestation();
    //
} );

//service search filter
function searchPrestation(){
    $('.search_prestation').keyup(function(){
        var items = 0;
        var list_service = $('.list_service');
        var valThis = $(this).val().toLowerCase();
        var this_id = $(this).attr('id');
        var parent_block;
        var exist = false;

        if(this_id == "search_individual"){
            parent_block= $('#person');
        }else{
            parent_block= $('#booking');
        }

        parent_block.find('input[type=checkbox]').each(function(){
            var text = $(this).siblings('label').text().toLowerCase();
            if(text.indexOf(valThis) != -1){
                $(this).parent().show();
                exist = true;
                items++;
            }
            else{
                $(this).parent().hide();
            }
        });
        if(!exist){
            parent_block.find('.search_message').show();
        }else parent_block.find('.search_message').hide();
        list_service.scrollTop(0);
        list_service.perfectScrollbar('update');

        resize(parent_block, items);
    });
}

function resize(parent_block, items){
    var checked = parent_block.find('.checked_prestation').length;

    var height_list;
    if(checked > 1){
        height_list = 25*(checked-1) + 46;
    }
    else{
        height_list = 20;
    }

    var height_service = (items*36.5);

    parent_block.find('.list_service').css('height',height_service);

    if(parent_block.find('.search_message').css('display') == 'block'){
        height_service = 20;
        parent_block.find('.list_service').css('height',height_service);

        if(parent_block.find('.search_message').css('display') == 'block'){
            height_service = 20;
            parent_block.find('.list_service').css('height',height_service);
        }

        if(height_list > height_service && height_list < 300){
            parent_block.css('height',height_list+10);
        }else if(height_list < height_service && height_service < 300){
            parent_block.css('height',height_service+16);
        }else parent_block.css('height',321);
    }


    if(height_list > height_service && height_list < 300){
        parent_block.css('height',height_list+10);
    }else if(height_list < height_service && height_service < 300){
        parent_block.css('height',height_service+16);
    }else parent_block.css('height',321);
}

//function checkif a vertical scroll appear
jQuery.fn.hasScrollBar = function(direction) {
    if (direction == 'vertical')
    {
        return this.get(0).scrollHeight > this.innerHeight();
    }
    else if (direction == 'horizontal')
    {
        return this.get(0).scrollWidth > this.innerWidth();
    }
    return false;
};

//check scroll and change view
function checkScroll(parent_div){
    var items = 0;
    var checked_list_content = parent_div.find('.checked_list_content');

    parent_div.find('input[type=checkbox]').each(function(){
        if($(this).parent().css('display') == 'block'){
            items++;
        }
    });

    checked_list_content.perfectScrollbar('update');
    if(checked_list_content.hasScrollBar('vertical')) {
        $('.checked_prestation').css('margin-right', '12px');
        $('.ps-scrollbar-y-rail').css('z-index', '1000');
    }
    else{
        $('.checked_prestation').css('margin-right','0');
    }
    $('.ps-scrollbar-x-rail').hide();

    resize(parent_div, items);
}

//set the scroll in the bottom
function resetCheckedScroll(parent_div){
    var checked_list_content = parent_div.find('.checked_list_content');

    checked_list_content.scrollTop(checked_list_content.height());
    checkScroll(parent_div);
}

//delete service item
function deletePrestation($this){
    var parent_div = $($this).closest('.per_price');
    var $checked_prestation = $($this).closest('.checked_prestation');

    $checked_prestation.remove();
    $('#id_'+$checked_prestation.attr('id')).prop('checked', false);

    if(parent_div.find('.check:checked').length == 0){
        parent_div.find('.checked_lists').css('height', 36);
        parent_div.find('.checked_list_title').slideUp(400);
    }

    checkScroll(parent_div);
}

function mouseEvent(){
    var checked_prestation = $('.checked_prestation');

    checked_prestation.mouseover(function(){
        $(this).find('.delete_prestation').show();
    });
    checked_prestation.mouseleave(function(){
        $(this).find('.delete_prestation').hide();
    });
}


function checkPrestation() {
    $('.check_value').click(function () {
        var parent_div = $('#' + $(this).closest('.per_price').attr('id'));
        if ($(this).is(":checked")) {
            var label_text = $(this).siblings('label').text();

            if (parent_div.find('.check_value:checked').length == 1) {
                parent_div.find('.checked_list_title').slideDown(400);
                parent_div.find('.checked_lists').css('height', 61);
            }

            var $clone = parent_div.find('.checked_list').clone(true).removeClass('checked_list').removeClass('hide');

            $clone.attr('id', $(this).val());
            $clone.find('.prestation_label').html(label_text).css('font-size', '80%');
            parent_div.find('.checked_list_content').append($clone);

            addInTab( this);

        } else {
            check_list_id = $(this).val();
            $('#' + check_list_id).remove();
            if (parent_div.find('.check_value:checked').length == 0) {
                parent_div.find('.checked_lists').css('height', 36);
                parent_div.find('.checked_list_title').slideUp(400);
            }
            ifUnchecked($(this).attr('id'));
        }

        resetCheckedScroll(parent_div);
    });
}


function addInTab($this) {
    var label_text = $($this).siblings('label').text();
    var input_id = $($this).attr('id');
    var rate = $($this).siblings('.wau-rate').text();
    var type = $($this).siblings('span').attr('class');
    var tr = $('#Tbody > tr');
    var row = '<tr id="tr_' + input_id + '"> <td class="cod"></td> <td class="label_text"><span>' + label_text + '</span><input type="text" class="n_pax" name="n_pax"></td> <td title="min"> <input class="check" name="paxmin" type="text" ></td><td  title="max"><input class="check" name="paxmax" type="text" > </td> <td class="tarif">' + roundValue(rate) + '</td> <td title="number"><input class="check" type="text" name="nbsvc"/></td> <td class="type">' + type + '</td> <td class="total"> </td></tr>';
    $("#Tbody").append(row);
}
function ifUnchecked(id){
    $('#tr_'+id).remove();
}

function showMessage(){
    if($('#accordion').find('.check_value:checked').length < 1){
        $('.no_service').css('display', 'block').delay(3000).fadeOut();
    }
    else{
        $('#prestation_form').css('display','none');

        $('#quotafade').slideToggle('slow');

    }
}

function savePrestation(){
    $('#savequota').click(function(){
        var id=$('#idcli_prestation').html();
        var allTR = $('#Tbody').children('tr');
        allTR.each(function() {
            var values = {
                "service": $(this).find('.label_text span').html(),
                "pax": $(this).find('input[name="n_pax"]').val(),
                "pax_min": $(this).find('input[name="paxmin"]').val(),
                "pax_max": $(this).find('input[name="paxmax"]').val(),
                "rate_service": $(this).find('.tarif').html(),
                "number_service": $(this).find('input[name="nbsvc"]').val(),
                "type_service": $(this).find('.type').html()
            };
            var other={};
            other.pax_min=values.pax_min;
            other.pax_max=values.pax_max;
            other.rate_service=values.rate_service;
            other.number_service=values.number_service;
            other.type_service=values.type_service;

            var others = JSON.stringify(other);

            var info = "service=" + values.service +" "+values.pax+ "&id="+id+"&others="+others;

            $.ajax({
                type: "GET",
                url: "/saveprestation",
                data: info,
                dataType: "html",
                success: function () {
                    console.log('save!');
                },
                error: function(){
                    console.log('error!');
                }
            });

        });
    });
}
