$( function() {
    $( "#accordion" ).accordion();

    $('.checked_list_content').perfectScrollbar();

    $('.list_service').perfectScrollbar();

    $('#btn_next').click(function () {
        showMessage();
    });

    $('.delete_prestation').click(function(e){
        e.preventDefault();
        deletePrestation(this);
    });

    searchPrestation();
    checkPrestation();
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
    var height_list;
    var checked = parent_block.find('.checked_prestation').length;
    var height_service = (items*36.5);

    parent_block.find('.list_service').css('height',items*36.5);

    if(checked > 1){
        height_list = 25*(checked-1) + 46;
    }
    else{
        height_list = 20;
    }

    if(parent_block.find('.search_message').css('display') == 'block'){
        height_service = 20;
        parent_block.find('.list_service').css('height',height_service);
    }

    if(height_list > height_service && height_list < 300){
        parent_block.css('height',height_list+16);
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

function checkPrestation(){
    $('.check').click(function() {
        var parent_div = $('#'+$(this).closest('.per_price').attr('id'));
        if ($(this).is(":checked")){
            var label_text = $(this).siblings('label').text();

            if(parent_div.find('.check:checked').length == 1){
                parent_div.find('.checked_list_title').slideDown( 400);
                parent_div.find('.checked_lists').css('height', 61);
            }
            var $clone = parent_div.find('.checked_list').clone(true).removeClass('checked_list').removeClass('hide');
            $clone.attr('id',$(this).val());
            $clone.find('.prestation_label').html(label_text).css('font-size', '80%');
            parent_div.find('.checked_list_content').append($clone);
        }else{
            check_list_id = $(this).val();
            $('#'+check_list_id).remove();
            if(parent_div.find('.check:checked').length == 0){
                parent_div.find('.checked_lists').css('height', 36);
                parent_div.find('.checked_list_title').slideUp(400);
            }
        }

        resetCheckedScroll(parent_div);
    });
}
 function showMessage(){
     if($('#accordion').find('.check:checked').length < 1){
         $('.no_service_message').css('display', 'block').delay(3000).fadeOut();
         return false;
     }
     return true;
 }