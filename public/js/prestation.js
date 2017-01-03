$( function() {
    $("#click").click(function(){
        $(".quota").remove();
        addColumn();
    });

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

    $('#save_quota').click(function(){
        savePrestation();
    });

    $('.delete_prestation').click(function(e){
        e.preventDefault();
        deletePrestation(this);
    });

// <<<<<<< HEAD
    $(document).on('change keyup blur','[name="nbsvc"]',function(){
        $(".quota").remove();
       addColumn();
    });

    searchPrestation();
    checkPrestation();
    savePrestation();

// =======
//     searchPrestation();
//     checkPrestation();
// >>>>>>> 45c40e96755f46038552ce24383c851476146aef
} );

function addColumn() {
    var minvalues = [];
    var maxvalues = [];
    var tr=$("#Tbody > tr");

    tr.each(function(){
        var min = $(this).find("td > [name = 'paxmin']").val();
        var max = $(this).find("td > [name = 'paxmax']").val();
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
                var min = $(this).find("td > [name='paxmin']").val();
                var max = $(this).find("td > [name='paxmax']").val();
                var type = $(this).find(".type").html();
                var svc_unit = parseInt($(this).find("td > [name='nbsvc']").val());
                var amount = parseInt($(this).find(".tarif").html());
                var total = svc_unit*amount;

                if(svc_unit ==''){
                    $(this).find('td').eq(7).html(0);
                }else{
                    $(this).find('td').eq(7).html(total);
                }

                var colbody = $("<td>");
                var subtotal;
                colbody.attr("class","quota");
                if(type === "Per Person"){
                     subtotal =total;
                }else {
                     subtotal =(total/i);
                }

                if(i<min || i>max){
                    colbody.text("0");

                }else{
                    colbody.html(subtotal.toFixed(2));
                    bigtotal = bigtotal+subtotal;

                }

                $(this).append(colbody);


                $(".table").append($(this));
            });
            colfoot.html(bigtotal.toFixed(2));
            colfoot.css({"font-weight":"bold","color":"#2B838E"});
            $("#Tfoot").append(colfoot);

        }

    }else{
        $('.pax_msg').css({'display':'block','color':'red'})
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
    var cheked_id = $('#id_'+$checked_prestation.attr('id').replace('check_value_', ''));

    $checked_prestation.remove();
    $('#id_'+$checked_prestation.attr('id')).prop('checked', false);

    cheked_id.prop('checked', false);
    ifUnchecked($checked_prestation.attr('id'));

    if(parent_div.find('.check_value:checked').length == 0){
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
         price = euro * rate;
    }else  if(currency == "MGA"){
         price = rate;
    }else{
         price = rate * dollar ;
    }
// <<<<<<< HEAD
//     var row = '<tr class="tr_' + input_id + '"> ' +
//                     '<td class=" add-record" onclick="duplicateRow(this)">' +
// =======

    var row =   '<tr class="tr_' + input_id + '"> ' +
                    '<td class="table-add add_record" onclick="duplicateRow(this)">' +
// >>>>>>> 45c40e96755f46038552ce24383c851476146aef
                        '<span class="glyphicon glyphicon-plus"></span>' +
                    '</td>' +
                    '<td class="label_text">' +
                        '<span>' + label_text + '</span>' +
                        '<input type="text" class="n_pax" name="n_pax">' +
                    '</td> ' +
                    '<td title="min">' +
                        '<input class="check" name="paxmin" type="text" >' +
                    '</td>' +
                    '<td title="max">' +
// <<<<<<< HEAD
                        '<input class="check"  name="paxmax" title="Enter pax_max!" type="text">'+
// =======
//                         '<input class="check" name="paxmax" type="text" >' +
// >>>>>>> 45c40e96755f46038552ce24383c851476146aef
                    '</td> ' +
                    '<td class="tarif">' + roundValue(price) + '</td>' +
                    '<td title="number">' +
                        '<input class="check" type="text" name="nbsvc"/>' +
                    '</td> ' +
                    '<td class="type">' + type + '</td> ' +
                    '<td class="total"> </td></tr>';
    $("#Tbody").append(row);

}

function duplicateRow($this){
    var original = $($this).closest('tr');
    var tr_class = original.attr('class');
    var last_tr = $('.'+tr_class).last();
    var pax_max_msg = last_tr.find('input[name="paxmax"]');
    var pax_max =  last_tr.find('input[name="paxmax"]').val();
    var $clone = original.clone(true);
        if(pax_max==''){

                pax_max_msg.tooltip('show');
          // pax_max_msg.tooltip({'trigger':'focus'});
          //   pax_max_msg.tooltipster({
          //       trigger: 'custom',
          //       content: 'Enter pax_max'
          //   })
          //       .on( 'focus', function() {
          //           $( this ).tooltipster( 'show' );
          //       })
          //   pax_max_msg.on( 'blur', function() {
          //           $( this ).tooltipster( 'hide' );
          //       });
        }else {
            $clone.find('td:eq(0)').prop('onclick', null).off('click');
            $clone.find('td:eq(0)').click(function () {
                $clone.remove();
            });
            $clone.find('.quota').text(0);
            $clone.find('input[name="paxmax"]').val('');
            $clone.find('input[name="nbsvc"]').val('');
            $clone.find('input[name="paxmin"]').val(parseInt(pax_max) + 1).attr('disabled', 'disabled');
            $clone.find('td:eq(0) span').attr('class', 'table-remove glyphicon glyphicon-remove');
            last_tr.last().after($clone);
        }
}

function ifUnchecked(id){
    $('#tr_'+id).remove();
}


function showQuotationTable(){
    if($('#accordion').find('.check_value:checked').length < 1){
        $('.no_service_message').css('display', 'block').delay(5000).fadeOut();
    }
    else{
        $('#prestation_form').css('display','none');
        $('#quotafade').slideToggle('slow');
    }
}

//save Prestation into database
function savePrestation() {
    $('#savequota').click(function () {
        var allTR = $('#Tbody').children('tr');
        allTR.each(function () {
            var values = {
                "service": $(this).find('.label_text span').html(),
                "pax": $(this).find('input[name="n_pax"]').val(),
                "pax_min": $(this).find('input[name="paxmin"]').val(),
                "pax_max": $(this).find('input[name="paxmax"]').val(),
                "rate_service": $(this).find('.tarif').html(),
                "number_service": $(this).find('input[name="nbsvc"]').val(),
                "type_service": $(this).find('.type').html()
            };
            var other = {};
            other.pax_min = values.pax_min;
            other.pax_max = values.pax_max;
            other.rate_service = values.rate_service;
            other.number_service = values.number_service;
            other.type_service = values.type_service;

            var service = values.service + " " + values.pax;

            $.ajax({
                type: "GET",
                url: "/saveprestation",
                data: {service: service, others: other},
                dataType: "json",
                success: function () {
                    $('#saved_msg').css({'display': 'block', 'color': '#5cb85c'});
                    console.log();
                    location.reload();
                },
                error: function () {
                    $('#saved_msg').css({'display': 'block', 'color': '#5cb85c'});
                    console.log('error!');
                }
            });
        });
    });
}
function showQuotationEdit(){
    $('#quotafade').css('display','none');
    $('#prestation_form').slideToggle('slow');
}

function savePrestation(){
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
        var other = {};
        other.pax_min = values.pax_min;
        other.pax_max = values.pax_max;
        other.rate_service = values.rate_service;
        other.number_service = values.number_service;
        other.type_service = values.type_service;

        var others = JSON.stringify(other);
        var info = "service=" + values.service +" "+values.pax+"&others="+others;

        $.ajax({
            type: "GET",
            url: "/saveprestation",
            data: info,
            dataType: "html"
        });
    });
}

function addColumn() {
    var minvalues = [];
    var maxvalues = [];
    var tr = $("#Tbody > tr");
    tr.each(function(){
        var min = $(this).find("td > [name = 'paxmin']").val();
        var max = $(this).find("td > [name = 'paxmax']").val();
        if(min!=="" && max !==""){
            minvalues.push(parseInt(min));
            maxvalues.push(parseInt(max));
        }
    });

    var minimum = Math.min.apply(Math,minvalues);
    var maximum = Math.max.apply(Math,maxvalues);

    if(minimum<=maximum){
        for (i=minimum; i<=maximum; i++){
            var colhead = $("th");

            colhead.attr("rowspan","2");
            colhead.attr("class","quota");
            colhead.text(i);
            $("#Thead").append(colhead);
        }

        for (i=minimum; i<+maximum; i++){
            var bigtotal = 0;
            var colfoot = $("<td>");
            colfoot.attr("class","quota");
            tr.each(function(){
                var min = $(this).find("td > [name='paxmin']").val();
                var max = $(this).find("td > [name='paxmax']").val();
                var type = $(this).find(".type").html();
                var svc_unit = parseInt($(this).find("td > [name='nbsvc']").val());
                var amount = parseInt($(this).find(".tarif").html());
                var total = svc_unit*amount;


                $(this).find('td').eq(7).html(total);

                var colbody = $("<td>");
                colbody.attr("class","quota");
                if(type === "Per Person"){
                    var subtotal =total;
                }else {
                    var subtotal =(total/i);
                }

                if(i<min || i>max){
                    colbody.text("0");

                }else{
                    colbody.html(subtotal.toFixed(2));
                    bigtotal = bigtotal+subtotal;
                }

                $(this).append(colbody);


                $(".table").append($(this));
            });
            colfoot.html(bigtotal.toFixed(2));
            colfoot.css({"font-weight":"bold","color":"#2B838E"});
            $("#Tfoot").append(colfoot);

        }

    }else{
        alert('WARNING: Pax min> Pax max');
    }
}

function duplicateRow($this){
    var original = $($this).closest('tr');
    var tr_class = original.attr('class');
    var last_tr = $('.'+tr_class).last();
    var pax_max =  last_tr.find('input[name="paxmax"]').val();
    var $clone = original.clone(true);
    if(pax_max == ''){

    }else {
        $clone.find('td:eq(0)').prop('onclick', null).off('click');
        $clone.find('td:eq(0)').click(function () {
            $clone.remove();
        });
        $clone.find('.quota').text(0);
        $clone.find('input[name="paxmax"]').val('');
        $clone.find('input[name="nbsvc"]').val('');
        $clone.find('input[name="paxmin"]').val(parseInt(pax_max) + 1).attr('disabled', 'disabled');
        $clone.find('td:eq(0) span').attr('class', 'table-remove glyphicon glyphicon-remove');
        last_tr.last().after($clone);
    }
}