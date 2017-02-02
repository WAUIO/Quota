$( function() {
    editValuePopup();

    $('.table_total').each(function(){
        calculateTotal($(this));
    });

    $('.btn_export').click(function (e) {
        var btn_export_id = $(this).attr('id');
        var each_table = $(this).closest('.each_table');
        var table_id = each_table.find('table').attr('id');

        if (~btn_export_id.indexOf('excel')){
            doExport('#'+table_id, {type: 'excel'});
        }
        else if(~btn_export_id.indexOf('pdf')){
            table_id = $(this).attr('id').replace('export_pdf','table');
            doExport('#'+table_id,
                {
                    type: 'pdf',
                    jspdf: {autotable: {tableWidth: 'wrap'}}
                }
            );
        }
        else{
            table_id = $(this).attr('id').replace('export_csv','table');
            doExport('#'+table_id,
                {
                    type: 'csv',numbers: {html: {decimalMark: '.',
                    thousandsSeparator: ','},
                    output: {decimalMark: ',',
                    thousandsSeparator: ''}
                }
            });
        }
    });
});

function doExport(selector, params) {
    var options = {
        tableName: 'quotation',
        worksheetName: 'quotation'
    };

    $.extend(true, options, params);

    $(selector).tableExport(options);
}

//popup editable event
function editValuePopup() {
    $.fn.editable.defaults.mode = 'popup';

    //for taxes and margins
    $('.taxes').editable({
        type: 'text',
        inputclass:'lebar',
        showbuttons:true,
        title: 'Enter a value' ,
        value:'',
        placement:'top',
        emptytext:'-----',
        validate: function(value) {
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            }
            else{
                if(value<0 || value>100){
                    return 'The value must be between 0 and 100';
                }else{
                    $(this).on('hidden.bs.modal', function () {
                        table  = $(this).closest('table');
                        room_type = table.attr('id').replace('table_','');
                        length = parseInt(table.find('.pax_number').attr('colspan'));

                        if(~$(this).attr('id').indexOf('margin')){
                            calculateMargin(this, room_type, value, length);
                        }else{
                            calculateTaxes(this, room_type, value, length);
                        }

                        calculateTotal(table);
                    });
                }
            }
        }
    });

    //for fees, guides flights, customers flights and others
    $('.others').editable({
        type: 'text',
        inputclass:'lebar',
        showbuttons:true,
        title: 'Enter a value' ,
        value:'',
        placement:'top',
        emptytext:'-----',
        validate: function(value) {
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            }else{
                $(this).on('hidden.bs.modal', function () {
                    table  = $(this).closest('table');
                    length = parseInt(table.find('.pax_number').attr('colspan'));
                    td = $(this).parent('td');
                    for (i=0;i<length;i++) {
                        td.siblings().eq(i+1).text(value);
                    }
                    calculateTotal(table);
                });
            }
        }
    });
}

//calculation for margins
function calculateMargin($this, room_type, margin, length){
    var span_taxes = $('#'+$($this).attr('id').replace('margin','taxes'));
    var td_margin = $($this).closest('td');
    var td_taxes = span_taxes.closest('td');
    var tr_id = $($this).closest('tr').prev().attr('id');
    var tax = isFloat(span_taxes.text()) ? span_taxes.text() : 0;

    for (i=0;i<length;i++) {
        val = $('tr#'+tr_id+' > td.td_'+room_type+':eq(' + i + ')').text();
        val_margin = val * margin / 100;
        td_margin.siblings().eq(i+1).text(roundValue(val_margin));

        val_taxes  = val_margin * tax / 100;
        td_taxes.siblings().eq(i+1).text(roundValue(val_taxes));
    }
}

//calculation for taxes
function calculateTaxes($this, room_type, tax, length){
    var td_taxes = $($this).closest('td');
    var tr_margin_id = $($this).closest('tr').prev().attr('id');

    for (i=0;i<length;i++) {
        val_margin = $('tr#'+tr_margin_id+' > td.td_'+room_type+':eq(' + i + ')').text();
        val_taxes  = val_margin * tax / 100;
        td_taxes.siblings().eq(i+1).text(roundValue(val_taxes));
    }
}

//make somme in table(total)
function calculateTotal(table){
    var table_id = table.attr('id');
    var room_type = table_id.replace('table_','');
    var euro_exchange = parseFloat($('#euro_exchange').text());
    var dollar_exchange = parseFloat($('#dollar_exchange').text());
    var length = parseInt($('#'+table_id).find('.pax_number').attr('colspan'));

    for (i=0;i<length;i++) {
        var total = 0;
        $('td.td_'+room_type+':eq(' + i + ')', 'tr').each(function() {
            if($(this).text() != ""){
                total = total + Number.parseFloat($(this).text());
            }
        });
        var total_USD = $('#'+table_id+' .tr_USD td');
        var total_EUR = $('#'+table_id+' .tr_EUR td');
        var total_MGA = $('#'+table_id+' .tr_MGA td');

        total_MGA.eq(i+2).text(roundValue(total));
        total_EUR.eq(i+1).text(roundValue(total / euro_exchange));
        total_USD.eq(i+1).text(roundValue(total / dollar_exchange));
    }
}

// function tableEvent(){
//     var $TABLE = $('.table-editable');
//
//     /*** add others row ***/
//     $('.table-add').click(function () {
//         table_id = $(this).closest('table').attr('id');
//         var $clone = $TABLE.find('#'+table_id+' tr.hide').clone(true).removeClass('hide');
//         $clone.find('td:eq(1) span').attr('class','others').css('border-bottom', 'none').remove('editable').editable({
//             type: 'text',
//             inputclass:'lebar',
//             showbuttons:true,
//             title: 'Enter a value' ,
//             value:'',
//             placement:'top',
//             emptytext:'------',
//             validate: function(value) {
//                 if($.trim(value) == '') {
//                     return 'Numeric value required';
//                 }
//                 if ($.isNumeric(value) == '') {
//                     return 'Numeric value required';
//                 }else{
//                     $(this).on('hidden.bs.modal', function () {
//                         table_id  = $(this).closest('table').attr('id');
//                         length = $('#'+table_id+' tbody tr:eq(1) td ').length;
//                         td = $(this).parent('td');
//                         for (i=0;i<length-2;i++) {
//                             td.siblings().eq(i+1).text(value);
//                         }
//                         somme(table_id);
//                     });
//                 }
//             }
//         });
//         $TABLE.find('#'+table_id+' .tr_MGA').before($clone);
//     });

//     /*** remove others row ***/
//     $('.table-remove').click(function () {
//         table_id = $(this).closest('table').attr('id');
//         length = $('#'+table_id+' tbody tr:eq(1) td').length;
//         for (i=1;i<length-1;i++) {
//             $(this).parents('td').siblings().eq(i).text(0);
//         }
//         somme(table_id);
//         $(this).parents('tr').detach();
//     });
// }
