$(document).ready(function () {
    $("#click").click(function(){
    addColumn();
});

});
function addColumn() {
    var minvalues= [];
    var maxvalues= [];
    var tr=$("#Tbody > tr");
        tr.each(function(){
            var min=$(this).find("td > [name='paxmin']").val();
            var max=$(this).find("td > [name='paxmax']").val();
           if(min!=="" && max !==""){
               minvalues.push(parseInt(min));
               maxvalues.push(parseInt(max));
           }
        });


    var minimum=Math.min.apply(Math,minvalues);
    var maximum=Math.max.apply(Math,maxvalues);


    if(minimum<=maximum){
        for (var i=minimum;i<=maximum;i++){
            var colhead=$("<th>");

            colhead.attr("rowspan","2");
            colhead.text(i);
            $("#Thead").append(colhead);

        }

        for (var i=minimum;i<=maximum;i++){
            var bigtotal=0;
            var colfoot=$("<td>");
             tr.each(function(){
                 var min=$(this).find("td > [name='paxmin']").val();
                 var max=$(this).find("td > [name='paxmax']").val();
                 var svc_unit=parseInt($(this).find("td > [name='nbsvc']").val());
                 var amount=parseInt($(this).find(".tarif").html());
                 var total=svc_unit*amount;


                     $(this).find('td').eq(7).html(total);


                     var colbody=$("<td>");
                     var subtotal =(total/i);
                     if(i<min || i>max){
                         colbody.text("0");

                     }else{
                         colbody.html(subtotal.toFixed(2));
                         bigtotal=bigtotal+subtotal;
                     }

                     $(this).append(colbody);


                 $(".table").append($(this));
            });
            colfoot.html(bigtotal.toFixed(2));
            $("#Tfoot").append(colfoot);

        }

    }else{
        alert('WARNING: Pax min> Pax max');
    }
}

function loadJson() {
    var url="/Json/data.json";
    $ajax({
        type:"GET",
        url:url,
        data: { get_param: 'value' },
        dataType:"JSON",
        success:function (data) {
            $.each(data,function (index,quota) {

                for(var i=1;i<data.length;i++){
                    var row=$('<tr>');
                    var service=$('<td>');
                    var code=$('<td>');
                    var minnumber=$('<td>');
                    var maxnumber=$('<td>');
                    var rate=$('<td>');
                    var nbrservice=$('<td>');
                    var totalprice=$('<td>');
                    var title=$('td');

                    var inputsvc=('<input>');
                    inputsvc.attr({type:text,name:limitsvc});
                    var mininput=('<input>');
                    mininput.attr({type:text,name:limitmin});
                    var maxinput=('<input>');
                    maxinput.attr({type:text,name:limitmax});
                    var inputnbrsvc=$('<input>');
                    inputnbrsvc.attr({type:text,name:nbrsvc});
                    var nbservice=0;
                    $('[name="nbrsvc"]').change(function(){
                        nbservice+=parseInt(inputnbrsvc.val());
                    });
                    var price=nbrservice*quota.tarif;

                    code.append(i);
                    service.append(quota.service);
                    service.append(inputsvc);
                    rate.append(quota.tarif);
                    title.append(quota.titre);
                    minnumber.append(mininput);
                    maxnumber.append(maxinput);
                    nbrservice.append(inputnbrsvc);
                    totalprice.append(price);

                    row.append(code);
                    row.append(service);
                    row.append(minnumber);
                    row.append(maxnumber);
                    row.append(rate);
                    row.append(nbrservice);
                    row.append(totalprice);
                    row.append(title);

                    $('#Tbody').append(row);

                }
            });
        }
    });
}



