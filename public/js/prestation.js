$( function() {
    $( "#accordion" ).accordion();
    $('.prestation_quota').perfectScrollbar();
    $('.checked_list_content').perfectScrollbar();
    $('.list_service').perfectScrollbar();

    $('#btn_next').click(function () {
        showQuotationTable();
    });

    $('#back').click(function () {
        showQuotationEdit();
    });

    $("form#prestation_form").on("submit", function(e) {
        e.preventDefault();
        savePrestation();
    });

    $('.delete_prestation').click(function(e){
        e.preventDefault();
        deletePrestation(this);
    });

    //trigger for quota_prestation calculation
    $(document).on('change keyup blur','[name="pax_min"],[name="pax_max"],[name="nb_service"]',function(){

        if($('[name="nb_service"]').val() != ''){
           addColumn();
        }
    });

    //tooltips message if pax_min value is empty
    $('#pax_min_tooltip').tooltip({
        open: function (e) {
            setTimeout(function () {
                $(e.target).tooltip('close');
            }, 2000);
        }
    });

    //tooltips message if pax_max value is empty
    $('#pax_max_tooltip').tooltip({
        open: function (e) {
            setTimeout(function () {
                $(e.target).tooltip('close');
            }, 2000);
        }
    });

    searchPrestation();
    checkPrestation();
    mouseEvent();
});

/*add column according to the pax_min and pax_max value
* calculate prestation quotation*/
function addColumn() {
        var minvalues = [];
        var maxvalues = [];
        var tr=$("#Tbody > tr");

        $(".quota").remove();

        tr.each(function(){
            var min = $(this).find("td > [name = 'pax_min']").val();
            var max = $(this).find("td > [name = 'pax_max']").val();
            if(min!=="" && max !==""){
                minvalues.push(parseInt(min));
                maxvalues.push(parseInt(max));
            }
        });

        var minimum = Math.min.apply(Math,minvalues);
        var maximum = Math.max.apply(Math,maxvalues);

        if(minimum<=maximum){
            for (var i = minimum;i<=maximum;i++){
                var colhead = $("<th>");

                colhead.attr("rowspan","2");
                colhead.attr("class","quota");
                colhead.text(i);
                $("#Thead").append(colhead);

            }
            for (var i = minimum;i<=maximum;i++){
                var bigtotal = 0;
                var colfoot = $("<td>");
                colfoot.attr("class","quota");
                tr.each(function(){
                    var min = $(this).find("td > [name='pax_min']").val();
                    var max = $(this).find("td > [name='pax_max']").val();
                    var type = $(this).find(".type").html();
                    var svc_unit = parseInt($(this).find("td > [name='nb_service']").val());
                    var amount = parseInt($(this).find(".tarif").html());
                    var total = svc_unit*amount;
                    $(this).find('td').eq(7).html(total);

                    var colbody = $("<td>");
                    var subtotal;
                    colbody.attr("class","quota");
                    if(type === "Per Person"){
                        subtotal =total;
                    }else {
                        subtotal =(total/i);
                    }

                    if(i<min || i>max){
                        colbody.text();
                    }else{
                        if(subtotal == 0){
                            colbody.html();
                            bigtotal = bigtotal+subtotal;
                        }else{
                            colbody.html(roundValue(subtotal));
                            bigtotal = bigtotal+subtotal;
                        }
                    }

                    $(this).append(colbody);

                    $(".table").append($(this));
                });
                colfoot.html(roundValue(bigtotal));
                colfoot.css({"font-weight":"bold","color":"#2B838E"});
                $("#Tfoot").append(colfoot);

            }

        }else{
            $('.prestation_message').text('pax_max must be higher than pax_min!').css({'display':'block', 'color':'#5cb85c', 'line-height':'40px', 'float':'right'}).delay(5000).fadeOut();
        }
}

//service search filter
function searchPrestation(){
    $('.search_prestation').keyup(function() {
        var items = 0;
        var list_service = $('.list_service');
        var valThis = $(this).val().toLowerCase();
        var this_id = $(this).attr('id');
        var parent_block;
        var exist = false;

        if (this_id == "search_individual") {
            parent_block = $('#person');
        } else {
            parent_block = $('#booking');
        }

        parent_block.find('input[type=checkbox]').each(function () {
            var text = $(this).siblings('label').text().toLowerCase();
            if (text.indexOf(valThis) != -1) {
                $(this).parent().show();
                exist = true;
                items++;
            }
            else {
                $(this).parent().hide();
            }
        });
        if (!exist) {
            parent_block.find('.search_message').show();
        } else parent_block.find('.search_message').hide();
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

//function check if a vertical scroll appear
jQuery.fn.hasScrollBar = function(direction) {
    if (direction == 'vertical')
    {
        // return this.get(0).scrollHeight > this.innerHeight();
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

//place the scroll in the bottom
function resetCheckedScroll(parent_div){
    var checked_list_content = parent_div.find('.checked_list_content');

    checked_list_content.scrollTop(checked_list_content.height());
    checkScroll(parent_div);
}

//delete service item
function deletePrestation($this){
    var parent_div = $($this).closest('.per_price');
    var $checked_prestation = $($this).closest('.checked_prestation');
    var id = $checked_prestation.attr('id').replace('check_value_', '');
    var checked_id = $('#id_'+id);

    $checked_prestation.remove();
    $('#id_'+$checked_prestation.attr('id')).prop('checked', false);

    checked_id.prop('checked', false);
    ifUnchecked(id);

    if(parent_div.find('.check_value:checked').length == 0){
        parent_div.find('.checked_lists').css('height', 36);
        parent_div.find('.checked_list_title').slideUp(400);
    }

    checkScroll(parent_div);
}

function ifUnchecked(id){
    $('#tr_id_'+id).remove();
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

/*
* check service on list of Benefit
* add each in table quotation
* */
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

            addInTab(this);
        } else {
            check_list_id = $(this).val();

            //remove this at check_list
            $('#' + check_list_id).remove();
            if (parent_div.find('.check_value:checked').length == 0) {
                parent_div.find('.checked_lists').css('height', 36);
                parent_div.find('.checked_list_title').slideUp(400);
            }

            //remove this from table
            $('.tr_'+$(this).attr('id')).remove();
        }

        resetCheckedScroll(parent_div);
    });
}

/* Add row in table for each service checked
* Append value needed for quotation*/
function addInTab($this) {
    var label_text = $($this).siblings('label').text();
    var input_id = $($this).attr('id');
    var rate = $($this).siblings('.others_rate').text();
    var currency = $($this).siblings('.others_currency').text();
    var euro = $($this).siblings('.others_euro').text();
    var dollar = $($this).siblings('.others_dollar').text();
    var type = $($this).siblings('.others_type').text();
    var tr = $('#Tbody > tr');
    var price;

    if(currency == "EUR"){
         price = (euro * rate).toFixed(2);
    }else  if(currency == "MGA"){
         price = rate;
    }else{
         price = (rate * dollar).toFixed(2);
    }

    var row =   '<tr id="tr_' + input_id + '"> ' +
                    '<td class="table-add add_record" onclick="duplicateRow(this)">' +
                        '<span class="glyphicon glyphicon-plus"></span>' +
                    '</td>' +
                    '<td class="label_text">' +
                        '<span>' + label_text + '</span>' +
                        '<input type="text" class="n_pax" name="n_pax">' +
                    '</td> ' +
                    '<td title="min">' +
                        '<input type="number" min="1" max="50" class="check number" name="pax_min" style="width: 50px;" onkeypress="return validateNumber(event)">' +
                    '</td>' +
                    '<td title="max">' +
                        '<input type="number" min="1" max="50" class="check number" name="pax_max" style="width: 50px;" onkeypress="return validateNumber(event)" required="true">' +
                    '</td> ' +
                    '<td class="tarif">' + roundValue(price)+ '</td>' +
                    '<td title="number">' +
                        '<input type="number" min="1" max="50" class="nb_services number" name="nb_service" value="0" style="width: 50px;" onkeypress="return validateNumber(event)" >' +
                    '</td> ' +
                    '<td class="type">' + type + '</td> ' +
                    '<td class="total"> </td>' +
                '</tr>';
    $("#Tbody").append(row);
}
//clone row in prestation tab
function duplicateRow($this){
    var original = $($this).closest('tr');
    var tr_class = original.attr('class');
    var last_tr = $('.'+tr_class).last();
    var pax_max =  last_tr.find('input[name="pax_max"]').val();
    var pax_min =  last_tr.find('input[name="pax_min"]').val();
    var myInput =  last_tr.find('input[name="pax_max"]');
    var minInput =  last_tr.find('input[name="pax_min"]');
    var $clone = original.clone(true);
        if(pax_min =='') {
            $('#pax_min_tooltip').tooltip({
                //use 'of' to link the tooltip to your specified input
                position: {of: minInput, my: 'left center', at: 'right-2 center'}
            });
            $('#pax_min_tooltip').tooltip('open');


        }else if(pax_max ==''){

            $('#pax_max_tooltip').tooltip({
                //use 'of' to link the tooltip to your specified input
                position: {of: myInput, my: 'right center', at: 'left-2 center'}
            });
            $('#pax_max_tooltip').tooltip('open');

        }else{
            $clone.find('td:eq(0)').prop('onclick', null).off('click');
            $clone.find('td:eq(0)').click(function () {
                $clone.remove();
            });
            $clone.find('.quota').text(0);
            $clone.find('input[name="pax_max"]').val('');
            $clone.find('input[name="nb_service"]').val('0');
            $clone.find('input[name="pax_min"]').val(parseInt(pax_max) + 1).attr('disabled', 'disabled');
            $clone.find('td:eq(0) span').attr('class', 'table-remove glyphicon glyphicon-remove');
            last_tr.last().after($clone);
        }
}

/*show checked service(s)
 * show message if any service checked
 * show list of service(s)*/
function showQuotationTable(){
    if($('#accordion').find('.check_value:checked').length < 1){
        $('.no_service').css({'display':'block', 'line-height':'40px'}).delay(5000).fadeOut();
    }
    else{
        $('#choose_service').css('display','none');
        $('#quotafade').slideToggle('slow');
        $('.ps-scrollbar-x-rail').show();
    }
}

//save Prestation into database
function savePrestation(){
    var allTR = $('#Tbody').children('tr');
    var all_data = [];
    allTR.each(function() {
        var info = {};
        var others = {};
        others.pax_min          = $(this).find('input[name="pax_min"]').val();
        others.pax_max          = $(this).find('input[name="pax_max"]').val();
        others.rate_service     = $(this).find('.tarif').html();
        others.number_service   = $(this).find('input[name="nb_service"]').val();
        others.type_service     = $(this).find('.type').html();

        info.service =  $(this).find('.label_text span').html();
        info.others = others;

        all_data.push(info);
    });

    $('#btn_save_prestation').html('Saving&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
    $.ajax({
        type: "GET",
        url: "/savePrestation",
        data: {all_data : all_data},
        dataType: "html",
        success: function(){
            $('.prestation_message').text('Benefit(s) saved !').css({'display':'block', 'color':'#5cb85c', 'line-height':'40px', 'float':'right'});
            $('#btn_save_prestation').html('Save');
        }
    });
}

//back to list of prestation
function showQuotationEdit(){
    $('#quotafade').css('display','none');
    $('#choose_service').slideToggle('slow');
}
