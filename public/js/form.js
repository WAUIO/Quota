$(document).ready(function () {
    $(this).scrollTop(0);
    $('[type="checkbox"]').prop('checked', false);
     $("select").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    $('#menu2').css('display','none');
    $('#hb').css('display','none');
    $('#fb').css('display','none');
    $('#chmenu').css('display','none');
    $('#chhb').css('display','none');
    $('#chfb').css('display','none');

    checkOption();
    inHouse();
    Quotaroom();

});
function checkOption(){
    $("[type='checkbox']").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(3);
        var select_picker = parent.find('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
            select_picker.parents().addClass('disabled');
        }
    });

}
function inHouse(){

    $('#select-hotel').on('change', function () {
        $('.loader').show();
        $('[type="checkbox"]').prop('checked', false);

        var optionSelected = $("option:selected", this);
        var id = optionSelected.val();
        $.ajax({
            type: 'GET',
            url: '/path',
            dataType: 'html',
            data: {
                id: id
            },


            success: function (data) {
                $('.loader').hide();
                var d = JSON.parse(data);
                console.log(d);
                $('#sgl').empty();
                $('#dbl').empty();
                $('#tpl').empty();
                $('#fml').empty();
                // $('#ext').empty();
                // $('#exch').empty();
                $.each(d,function(i,r){
                    var str=r.others;
                    console.log(r.others);
                    var obj=JSON.parse(str);
                    if(r.category=="Single"|| r.category=="Extra-bed"){
                        var opt = "<option value=" +  r.item_id + ">" + obj['name'].value + "</option>";

                        $('#sgl').append(opt);

                    }else if(r.category=="Single" || r.category=="Double"){
                        var pto = "<option value=" + r.item_id + ">" + obj['name'].value+ "</option>";
                        $('#dbl').append(pto);
                    }else if(r.category=="Single" || r.category=="Double" || r.category=="Triple"){
                        var lpt = "<option value=" + r.item_id + ">" +  obj['name'].value+ "</option>";
                        $('#tpl').append(lpt);
                    }else if(r.category=="Single" || r.category=="Double" || r.category=="Triple"||r.category=="Family"){
                        var lmf = "<option value=" + r.item_id+ ">" +  obj['name'].value+ "</option>";
                        $('#fml').append(lmf);
                    }else {
                        var txe = "<option value=" + r.item_id + ">" + obj['name'].value + "</option>";
                        $('#ext').append(txe);
                        $('#exch').append(txe);
                    }
                });
                $.ajax({
                    type:'GET',
                    url:'/rest',
                    dataType:'html',
                    data: {
                        id: id
                    },
                    success:function (d) {

                    console.log(d);
                        var data=JSON.parse(d);
                        console.log(data);
                        $('#bft').empty();
                        $('#lch').empty();
                        $('#dnr').empty();
                            $.each(data,function(e,o){
                            if(o.meals=="Breakfast" || o.meals.match(/Breakfast/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var bch="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chb").append(bch)
                                }else{
                                    var brk="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#bft").append(brk);
                                }
                            }else if(o.meals=="Lunch" || o.meals.match(/Lunch/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var lch="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#lch").append(lch);
                                }else{
                                    var lun="<option value=" + o.item_id+ ">" + o.menu + "</option>";
                                    $("#lch").append(lun);
                                }
                            }else if(o.meals=="dinner" || o.meals.match(/Dinner/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var dch="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chd").append(dch);
                                }else{
                                    var din="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#dnr").append(din);
                                }

                            }else if(o.meals=="menu" || o.meals.match(/Menu/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chmenu').css('display','block');
                                    $("#menu-child").html(o.menu);
                                }else{
                                    $('#menu2').css('display','block');
                                    $("#menu-adult").html(o.menu);
                                }
                            }else if(o.meals=="FB" || o.meals.match(/FB/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chfb').css('display','block');
                                    $("#fb-child").html(o.menu);
                                }else{
                                    $('#fb').css('display','block');
                                    $("#fb-adult").html(o.menu);
                                }
                            }else if(o.meals=="HB" || o.meals.match(/HB/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chhb').css('display','block');
                                    $("#hb-child").html(o.menu);
                                }else{
                                    $('#hb').css('display','block');
                                    $("#hb-adult").html(o.menu);
                                }

                            }
                        });
                    }
                });
            },
            error: function () {
                console.log("you have an error!");
            }
        });
    });
}
function Quotaroom(){
    $("#save").click(function() {
        $('#loader_gif').show();
        var houseId=$("#select-hotel option:selected").val();
        var idcli=$('#customer').text();

        var euro = $("#euro").text();
        var dollar = $("#dollar").text();
        var basesingle="";
        var basedouble="";
        var basetriple="";
        var basefamily="";
        var baseextra="";
        var baseextrac="";
        var vignet=0;
        var tax=0;
        var board ={};
        var childBoard={};

        if ($("#single").is(':checked')) {
            var parent = $("#single").parents().eq(3);
            var opt = parent.find('select option:selected');
            var value = opt.val();
            var single="";
            if(value!==""){
                $.ajax({
                    type: 'GET',
                    url: '/sgl',
                    async: false,
                    data: {
                        id: value
                    },
                    success: function (data) {
                        single+="base=Single&price=";
                        single+= data;

                    }
                });
            }
            basesingle+=single;
            basesingle+="&idHouse="+houseId;
            basesingle+="&id="+idcli;
        }

        if ($("#double").is(':checked')) {
            var par= $("#double").parents().eq(3);
            var options = par.find('select option:selected');
            var double="base=Double&price=";
            var sum=0;
            $.each(options,function () {
             var i= $(this).val();
                if(i!==""){
                    $.ajax({
                        type: 'GET',
                        url: '/sgl',
                        async: false,
                        data: {
                            id: i
                        },
                        success: function (data) {

                            sum=(sum + parseInt(data))/2;

                        }
                    });
                }
            });
            double+=sum;
            basedouble+=double;
            basedouble+="&idHouse="+houseId;
            basedouble+="&id="+idcli;
        }

        if ($("#triple").is(':checked')) {
            var dad= $("#triple").parents().eq(3);
            var optselect = dad.find('select option:selected');
            var triple="base=Triple&price=";
            var som=0;
            $.each(optselect,function () {
                var j= $(this).val();
                if(j!==""){
                    $.ajax({
                        type: 'GET',
                        url: '/sgl',
                        async: false,
                        data: {
                            id: j
                        },
                        success: function (data) {
                            som=(som + parseInt(data))/3;

                        }
                    });
                }
            });
            triple+=som;
            basetriple+=triple;
            basetriple+="&idHouse="+houseId;
            basetriple+="&id="+idcli;
        }

        if ($("#family").is(':checked')) {
            var mom = $("#family").parents().eq(3);
            var opselect = mom.find('select option:selected');
            var vr = opselect.val();
            var family="base=Family&price=";
            var add=0;
            if(vr!==""){
                $.ajax({
                    type: 'GET',
                    url: '/sgl',
                    async: false,
                    data: {
                        id: vr
                    },
                    success: function (data) {
                        add=(add + parseInt(data));
                    }
                });
            }
            family+=add;
            basefamily+=family;
            basefamily+="&idHouse="+houseId;
            basefamily+="&id="+idcli;
        }

        if ($("#extra-adult").is(':checked')) {
            var hisparent = $("#extra-adult").parents().eq(3);
            var hisopt = hisparent.find('select option:selected');
            var hisvalue = hisopt.val();
            var extra="";
           if(hisvalue!==""){
               $.ajax({
                   type: 'GET',
                   url: '/sgl',
                   async: false,
                   data: {
                       id: hisvalue
                   },
                   success: function (data) {
                       extra+="base=Extra-bed&price=";
                       extra+= data;

                   }
               });
           }
            baseextra+=extra;
            baseextra+="&idHouse="+houseId;
            baseextra+="&id="+idcli;
        }

        if ($("#extra-child").is(':checked')) {
            var hisparents = $("#extra-child").parents().eq(3);
            var hisopts = hisparents.find('select option:selected');
            var hisvalues = hisopts.val();
            var extrac="";
            if(hisvalues!==""){
                $.ajax({
                    type: 'GET',
                    url: '/sgl',
                    async: false,
                    data: {
                        id: hisvalues
                    },
                    success: function (data) {
                        extrac+="base=Extra-bed&price=";
                        extrac+= data;

                    }
                });
            }
            baseextrac+=extrac;
            baseextrac+="&idHouse="+houseId;
            baseextrac+="&id="+idcli;
        }

        //get breakfast for adult value
        if ($('#adult-breakfast').is(':checked')) {
            var ancestor = $('#adult-breakfast').parents().eq(3);
            var siblings = ancestor.find('select option:selected');
            var result = siblings.val();
            var breakfast="";
            $.ajax({
                type: 'GET',
                url: '/brd',
                async: false,
                data: {
                    id: result
                },
                success: function (data) {
                 if(result!=""){

                     breakfast+= data;
                 }
                }
            });
                board.Breakfast=breakfast;

        }

        //get lunch for adult value
        if($('#adult-lunch').is(':checked')){
            var parent_lunch=$('#adult-lunch').parents().eq(3);
            var sibling_lunch=parent_lunch.find('select option:selected');
            var lunch_value=sibling_lunch.val();
            var lunch="";
            $.ajax({
                type:'GET',
                url:'/brd',
                async: false,
                data:{
                    id: lunch_value
                },
                success:function(dat){
                    if(lunch_value!=""){
                        lunch+= dat+"',";
                    }
                }

            });

            board.Lunch=lunch;
        }

        //get dinner for adult value
        if($('#adult-dinner').is(':checked')){
            var parent_dinner=$('#adult-dinner').parents().eq(3);
            var sibling_dinner=parent_dinner.find('select option:selected');
            var dinner_value=sibling_dinner.val();
            var dinner="";
            $.ajax({
                type:'GET',
                url:'/brd',
                async: false,
                data:{
                    id: dinner_value
                },
                success:function(dat){
                    if(dinner_value!=""){
                        dinner+= dat;
                    }
                }

            });

                board.Dinner=dinner;
        }

        //get menu for adult value
        if($('#amenu').is(':checked')){
            var c=$("#menu-adult").text();
            var things="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: c
                },
                success:function(dat){
                    if(c!=""){
                        things+= dat;
                    }
                }

            });

            board.Menu=things;
        }

        //get board type hb for adult value
        if($('#ahb').is(':checked')){
            var h=$("#hb-adult").text();
            var hb="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: h
                },
                success:function(dat){
                    if(h!=""){
                        hb+= dat+"',";
                    }
                }

            });

            board.HB=hb;
        }

        //get board type for adult value
        if($('#afb').is(':checked')){
            var b=$("#fb-adult").text();
            var fb="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: b
                },
                success:function(dat){
                    if(b!=""){
                        fb+= dat+"',";
                    }
                }

            });

            board.FB=fb;
        }

        //get breakfast for child value
        if ($('#child-breakfast').is(':checked')) {
            var gp = $('#child-breakfast').parents().eq(3);
            var sibl = gp.find('select option:selected');
            var rslt = sibl.val();
            var childbreakfast="";
            $.ajax({
                type: 'GET',
                url: '/brd',
                async: false,
                data: {
                    id: rslt
                },
                success: function (data) {
                    if(rslt!=""){
                        childbreakfast+= data;
                    }
                }
            });
            childBoard.Breakfast=childbreakfast;

        }

        //get lunch for child value
        if ($('#child-lunch').is(':checked')) {
            var origin = $('#child-lunch').parents().eq(3);
            var effect = origin.find('select option:selected');
            var output = effect.val();
            var childlunch="";
            $.ajax({
                type: 'GET',
                url: '/brd',
                async: false,
                data: {
                    id: output
                },
                success: function (data) {
                    if(output!=""){
                       childlunch+= data;
                    }
                }
            });
            childBoard.Lunch=childlunch;

        }

        //get dinner for child value
        if($('#child-dinner').is(':checked')){
            var mother=$('#child-dinner').parents().eq(3);
            var child=mother.find('select option:selected');
            var r=child.val();
            var childdinner="";
            $.ajax({
                type:'GET',
                url:'/brd',
                async: false,
                data:{
                    id: r
                },
                success:function(dat){
                    if(r!=""){
                        childdinner+= dat+"',";
                    }
                }
            });

            childBoard.Dinner=childdinner;
        }

        //get board type menu for child value
        if($('#menuc').is(':checked')){
            var it=$("#menu-child").text();
            var menuc="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: it
                },
                success:function(dat){
                    if(it!=""){
                        menuc+= dat+"',";
                    }
                }

            });

            childBoard.Menu=menuc;
        }

       //get board type half-board for child value
        if($('#hbc').is(':checked')){
            var hbc=$("#hb-child").text();
            var chb="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: hbc
                },
                success:function(dat){
                    if(hbc!=""){
                        chb+= dat;
                    }
                }

            });

            childBoard.HB=chb;
        }

        //get board type full-board for child value
        if($('#fbc').is(':checked')){
            var cb=$("#fb-child").text();
            var cfb="";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: cb
                },
                success:function(dat){
                    if(cb!=""){
                        cfb+= dat;
                    }
                }

            });

            childBoard.FB=cfb;
        }

        var stringBoard=JSON.stringify(board);
        var stringChildboard = JSON.stringify(childBoard);
        var others= {};
        var detail = {};

        others.euro = euro;
        others.dollar = dollar;
        others.vignet =  vignet;
        others.tax = tax;
        others.board = stringBoard;

        detail.euro = euro;
        detail.dollar = dollar;
        detail.vignet =  vignet;
        detail.tax = tax;
        detail.board = stringChildboard;

        var stringOthers=JSON.stringify(others);
        var stringDetail = JSON.stringify(detail);


        //information for singleroom
        basesingle+="&others="+stringOthers;
        //information for doubleroom
        basedouble+="&others="+stringOthers;
        //information for tripleroom
        basetriple+="&others="+stringOthers;
        //information for familyroom
        basefamily+="&others="+stringOthers;
        //information for extra-adultroom
        baseextra+="&others="+stringOthers;
        //information for extra-childroom
        baseextrac+="&others="+stringDetail;

        //post information of singlebase into database
        if(basesingle.match(/Single/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:basesingle,
                dataType : "html",
                success:function(){
                    $('#loader_gif').hide();
                    console.log('successfull1');
                },
                error:function(){
                    console.log('error1');
                }
            });
        }

        //post information of doublebase into database
        if(basedouble.match(/Double/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:basedouble,
                dataType : "html",
                success:function(){
                    $('#loader_gif').hide();
                    console.log('successfull2');
                },
                error:function(){
                    console.log('error2');
                }
            });
        }

        //post information of triplebase into database
        if(basetriple.match(/Triple/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:basetriple,
                dataType : "html",
                success:function(){
                    $('#loader_gif').hide();
                    console.log('successfull3');
                },
                error:function(){
                    console.log('error3');
                }
            });
        }

        //post information of familybase into database
        if(basefamily.match(/Family/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:basefamily,
                dataType : "html",
                success:function(){
                    $('#loader_gif').hide();
                    console.log('successfull4');
                },
                error:function(){
                    console.log('error4');
                }
            });
        }


        //post information of extrabase into database
        if(baseextra.match(/Extra-bed/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:baseextra,
                dataType : "html",
                success:function(){
                    console.log('successfull5');
                    $('#loader_gif').hide();
                },
                error:function(){
                    console.log('error5');
                }
            });
        }

        //post information of extrachildbase into database
        if(baseextrac.match(/Extra-bed/g)){
            $.ajax({
                type:'GET',
                url:'/quota',
                data:baseextrac,
                dataType : "html",
                success:function(){
                    $('#loader_gif').hide();
                    console.log('successfull6');
                },
                error:function(){
                    console.log('error6');
                }
            });
        }

         location.reload();
    });
}
