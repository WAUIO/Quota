$( function() {
    if($( "#accordion" ).length){
        $( "#accordion" ).accordion();
    }
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

    $('.btn_update').click(function(){
        updatePrestation();
    });

    //trigger for quota_prestation calculation
    $(document).on('change','[name="pax_min"],[name="pax_max"],[name="nb_service"]',function(){
        if($('.group_table').length){
            var group_table = $(this).closest('.group_table');
            table =  group_table.find('table');
            group_table.find('.btn_update').css('display','block');
            group_table.find('.prestationUpdate_message').text('Benefit(s) modified !').css({'display':'none'});
        }else{
            table = $('#quotafade').find('table');
        }

        if($('[name="nb_service"]').val() != ''){
           calculatePrestation(table);
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
function calculatePrestation(table) {
    var minvalues = [];
    var maxvalues = [];
    var tr_body = table.find('tbody').children('tr');

    if($('.quota').length){
        $('.quota').remove();
    }

    tr_body.each(function(){
        var min = $(this).find("td > [name = 'pax_min']").val();
        var max = $(this).find("td > [name = 'pax_max']").val();
        if(min != "" && max != ""){
            minvalues.push(parseInt(min));
            maxvalues.push(parseInt(max));
        }
    });

    var minimum = Math.min.apply(Math,minvalues);
    var maximum = Math.max.apply(Math,maxvalues);
    var nb_pax = maximum - minimum + 1;

    if( minimum <= maximum ){
        var tr_pax_rowspan = table.find('.tr_pax_rowspan');
        tr_pax_rowspan.html('');
        
        var tr_total = table.find('.tr_total');
        tr_total.html(' <td></td><td colspan="7">Total</td>');

        if($('.td_col_pax').length){
            $('.td_col_pax').remove();
        }

        for (i=minimum; i<=maximum; i++){
            //set pax header
            var th_pax = $("<th>");
            th_pax.attr('class','quota td_right');
            th_pax.text(i);
            tr_pax_rowspan.append(th_pax);

            //
            var sum = 0;
            var td_total = $("<td>");
            td_total.attr("class","quota");
            tr_body.each(function(){
                var type = $(this).find(".type").html();
                var number_service = parseInt($(this).find("td > [name='nb_service']").val());
                var amount = parseInt($(this).find(".tarif").html());
                var total = number_service * amount;

                var td_body = $("<td>");

                min = $(this).find('td > [name="pax_min"]').val();
                max = $(this).find('td > [name="pax_max"]').val();
                $(this).find('td').eq(7).html(total);

                td_body.attr("class","quota td_right");
                if(type.toLowerCase() != "per person"){
                    total = total / i;
                }

                if( i<min || i>max || total == 0 ){
                    td_body.html('');
                }else{
                    td_body.html(roundValue(total));
                    sum += total;
                }

                $(this).append(td_body);
               // $("#prestation_table").append($(this));
            });

            td_total.html(roundValue(sum));
            tr_total.append(td_total);
        }
        $('.tr_pax').attr('colspan', nb_pax).css('text-align','center');
    }else{
        $('#prestation_message').text('pax_max must be higher than pax_min!').css({'display':'block', 'color':'#FF0F22', 'line-height':'40px', 'float':'right'}).delay(5000).fadeOut();
    }
}

function blabla(){
    var minvalues = [];
    var maxvalues = [];
    var tr = $("#Tbody > tr");

    $(".quota").remove();

    tr.each(function(){
        var min = $(this).find("td > [name = 'pax_min']").val();
        var max = $(this).find("td > [name = 'pax_max']").val();
        if(min != "" && max != ""){
            minvalues.push(parseInt(min));
            maxvalues.push(parseInt(max));
        }
    });

    var minimum = Math.min.apply(Math,minvalues);
    var maximum = Math.max.apply(Math,maxvalues);
    var nb_pax = maximum - minimum + 1;

    if( minimum <= maximum ){
        for (i=minimum; i<=maximum; i++){
            var th_pax = $("<th>");
            th_pax.attr("class","quota td_right");
            th_pax.text(i);
            $("#tr_pax_rowspan").append(th_pax);

            var sum = 0;
            var td_total = $("<td>");
            td_total.attr("class","quota");
            tr.each(function(){
                var type = $(this).find(".type").html();
                var service_unit = parseInt($(this).find("td > [name='nb_service']").val());
                var amount = parseInt($(this).find(".tarif").html());
                var total = service_unit * amount;

                var td_body = $("<td>");

                min = $(this).find('td > [name="pax_min"]').val();
                max = $(this).find('td > [name="pax_max"]').val();
                $(this).find('td').eq(7).html(total);

                td_body.attr("class","quota td_right");
                if(type.toLowerCase() != "per person"){
                    total = total / i;
                }

                if( i<min || i>max || total == 0 ){
                    td_body.html('');
                }else{
                    td_body.html(roundValue(total));
                    sum += total;
                }

                $(this).append(td_body);
                $("#prestation_table").append($(this));
            });

            td_total.html(roundValue(sum));
            $("#Tfoot").append(td_total);
        }
        $('#tr_pax').attr('colspan', nb_pax).css('text-align','center');
    }else{
        $('#prestation_message').text('pax_max must be higher than pax_min!').css({'display':'block', 'color':'#FF0F22', 'line-height':'40px', 'float':'right'}).delay(5000).fadeOut();
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

    if (direction == 'horizontal')
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
    deleteInTable(id);

    if(parent_div.find('.check_value:checked').length == 0){
        parent_div.find('.checked_lists').css('height', 36);
        parent_div.find('.checked_list_title').slideUp(400);
    }

    checkScroll(parent_div);
}

function deleteInTable(id){
    $('.tr_class_'+id).remove();
    calculatePrestation();
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
            deleteInTable($(this).attr('id').replace('id_',''));
        }

        resetCheckedScroll(parent_div);
    });
}

/* Add row in table for each service checked
* Append value needed for quotation*/
function addInTab($this) {
    var table = $('#prestation_table');
    var label_text = $($this).siblings('label').text();
    var input_id = $($this).attr('id');
    var rate = $($this).siblings('.others_rate').text();
    var currency = $($this).siblings('.others_currency').text();
    var euro = $($this).siblings('.others_euro').text();
    var dollar = $($this).siblings('.others_dollar').text();
    var type = $($this).siblings('.others_type').text();
    var tbody = table.find('tbody');
    var price;

    if(currency == "EUR"){
         price = (euro * rate).toFixed(2);
    }else  if(currency == "USD"){
        price = (rate * dollar).toFixed(2);
    }else{
        price = rate;
    }

    var row = '<tr id="tr_' + input_id + '"  class="tr_class' + input_id.replace('id', '') + '"> ' +
                '<td class="table-add add_record" onclick="duplicateRow(this)">' +
                    '<span class="glyphicon glyphicon-plus"></span>' +
                '</td>' +
                '<td class="label_text">' +
                    '<span>' + label_text + '</span>' +
                    '<input type="text" class="n_pax" name="n_pax">' +
                '</td> ' +
                '<td title="min">' +
                    '<input type="number" value="1" min="1" max="100" class="check number" name="pax_min" style="width: 50px;" onkeypress="return validateNumber(event)">' +
                '</td>' +
                '<td title="max">' +
                    '<input type="number" value="1" min="1" max="100" class="check number" name="pax_max" style="width: 50px;" onkeypress="return validateNumber(event)" required="true">' +
                '</td> ' +
                '<td class="tarif">' + roundValue(price)+ '</td>' +
                '<td title="number">' +
                    '<input type="number" value="1" min="1" max="50000" class="nb_services number" name="nb_service" style="width: 70px;" onkeypress="return validateNumber(event)" >' +
                '</td> ' +
                '<td class="type">' + type + '</td> ' +
                '<td class="total"></td>' +
            '</tr>';
    tbody.append(row);
    calculatePrestation(table);
}

//clone row in prestation tab
function duplicateRow($this){
    var original = $($this).closest('tr');
    var tr_class = original.attr('class');
    var last_tr  = $('.'+tr_class).last();
    var pax_max  =  last_tr.find('input[name="pax_max"]').val();
    var pax_min  =  last_tr.find('input[name="pax_min"]').val();
    var myInput  =  last_tr.find('input[name="pax_max"]');
    var minInput =  last_tr.find('input[name="pax_min"]');
    var $clone   = original.clone(true);
    var $pax_min_tooltip = $('#pax_min_tooltip');
    var $pax_max_tooltip = $('#pax_max_tooltip');

    if(pax_min =='') {
        $pax_min_tooltip.tooltip({
            //use 'of' to link the tooltip to your specified input
            position: {of: minInput, my: 'left center', at: 'right-2 center'}
        });
        $pax_min_tooltip.tooltip('open');
    }else if(pax_max ==''){
        $pax_max_tooltip.tooltip({
            //use 'of' to link the tooltip to your specified input
            position: {of: myInput, my: 'right center', at: 'left-2 center'}
        });
        $pax_max_tooltip.tooltip('open');
    }else{
        var pax = parseInt(pax_max) + 1;
        $clone.find('td:eq(0)').prop('onclick', null).off('click');
        $clone.find('td:eq(0)').click(function () {
            $clone.remove();
        });
        $clone.find('.quota').text(0);
        $clone.find('input[name="pax_max"]').val('');
        $clone.find('input[name="nb_service"]').val('0');
        $clone.find('input[name="pax_min"]').val(pax).attr('disabled', 'disabled');
        $clone.find('input[name="pax_max"]').val(pax).attr({'min':pax,'max':50});
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
    var registration = $('#number_registration').val();
    if( registration > 0 ) {
        var all_data = [];
        $('#prestation_table').find('tbody').children('tr').each(function() {
            var info = {};
            var others = {};
            others.pax_min          = $(this).find('input[name="pax_min"]').val();
            others.pax_max          = $(this).find('input[name="pax_max"]').val();
            others.rate_service     = $(this).find('.tarif').html();
            others.number_service   = $(this).find('input[name="nb_service"]').val();
            others.type_service     = $(this).find('.type').html();

            info.service =  $(this).find('.label_text span').html();
            info.registration = registration;
            info.others = others;

            all_data.push(info);
        });

        $('#btn_save_prestation').html('Saving&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
        $.ajax({
            type: "POST",
            url: "/savePrestation",
            data: {all_data : all_data},
            dataType: "html",
            success: function(){
                $('#prestation_message').text('Benefit(s) saved !').css({'display':'block', 'color':'#5cb85c', 'line-height':'40px', 'float':'right'});
                $('#btn_save_prestation').html('Save');
            }
        });
    }
    else{
        $('#prestation_message').text('Please, enter registration number !').css({'display':'block', 'color':'#FF0F22', 'line-height':'40px', 'float':'right'}).delay(5000).fadeOut();
    }
}

//back to list of prestation
function showQuotationEdit(){
    $('#quotafade').css('display','none');
    $('#choose_service').slideToggle('slow');
}

function updatePrestation(){
    var active_registration = $('.registration_menu.active').attr('id').replace('registration_','');
    var table = $('#group_'+active_registration).find('table');
    var tbody_tr = table.find('tbody').children('tr');
    var all_data = [];
    tbody_tr.each(function() {
        var info = {};
        var others = {};
        others.pax_min = $(this).find('input[name="pax_min"]').val();
        others.pax_max = $(this).find('input[name="pax_max"]').val();
        others.rate_service = $(this).find('.tarif').html();
        others.number_service = $(this).find('input[name="nb_service"]').val();
        others.type_service = $(this).find('.type').html();

        info.id = $(this).attr('id');
        info.service = $(this).find('#service').html();
        info.others = others;

        all_data.push(info);
    });
    $('#btn_modif_prestation').html('Modifing&nbsp;<img src="/images/loader.gif" alt="Avatar" class="" style="width:20px; height:5px">');
    $.ajax({
        type: "GET",
        url: "/updatePrestation",
        data: {datas : all_data},
        dataType: "html",
        success: function(){
            $('.prestationUpdate_message').text('Benefit(s) modified !').css({'color':'#5cb85c'}).show().delay(5000).fadeOut();
            $('.btn_modif_prestation').html('Save modification');
            $('.btn_update').hide();
            window.location.reload();
        }
    });
}