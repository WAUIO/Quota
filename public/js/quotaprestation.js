$(document).ready(function () {

    $ajax({
        type:"GET",
        url:"/Json/prestation.json",
        data:"JSON",
        success:function (data) {
            alert(data);
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
})



