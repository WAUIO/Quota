$(document).ready(function () {
     addColumn();

});
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
        $('.pax_msg').css({'display':'block','color':'red'})
    }
}





