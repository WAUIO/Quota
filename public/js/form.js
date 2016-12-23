$(document).ready(function () {
    $(this).scrollTop(0);
    $('[type = "checkbox"]').prop('checked', false);
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
    $("[type = 'checkbox']").click(function () {
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
        $('[type = "checkbox"]').prop('checked', false);

        var optionSelected = $("option:selected", this);
        var id = optionSelected.val();
        $.ajax({
            type: 'GET',
            url: '/listroom',
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
                    var str = r.others;
                    console.log(r.others);
                    var obj = JSON.parse(str);
                    if(r.category == "Single"|| r.category == "Extra-bed"){
                        var opt = "<option value=" +  r.item_id + ">" + obj['name'].value + "</option>";

                        $('#sgl').append(opt);

                    }else if(r.category == "Single" || r.category == "Double"){
                        var pto = "<option value=" + r.item_id + ">" + obj['name'].value+ "</option>";
                        $('#dbl').append(pto);
                    }else if(r.category == "Single" || r.category == "Double" || r.category == "Triple"){
                        var lpt = "<option value=" + r.item_id + ">" +  obj['name'].value+ "</option>";
                        $('#tpl').append(lpt);
                    }else if(r.category == "Single" || r.category == "Double" || r.category == "Triple"||r.category == "Family"){
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
                    url:'/listboard',
                    dataType:'html',
                    data: {
                        id: id
                    },
                    success:function (d) {

                    console.log(d);
                        var data = JSON.parse(d);
                        console.log(data);
                        $('#bft').empty();
                        $('#lch').empty();
                        $('#dnr').empty();
                            $.each(data,function(e,o){
                            if(o.meals == "Breakfast" || o.meals.match(/Breakfast/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var bch = "<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chb").append(bch)
                                }else{
                                    var brk = "<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#bft").append(brk);
                                }
                            }else if(o.meals == "Lunch" || o.meals.match(/Lunch/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var lch = "<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#lch").append(lch);
                                }else{
                                    var lun = "<option value=" + o.item_id+ ">" + o.menu + "</option>";
                                    $("#lch").append(lun);
                                }
                            }else if(o.meals == "dinner" || o.meals.match(/Dinner/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var dch = "<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chd").append(dch);
                                }else{
                                    var din = "<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#dnr").append(din);
                                }

                            }else if(o.meals == "menu" || o.meals.match(/Menu/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chmenu').css('display','block');
                                    $("#menu-child").html(o.menu);
                                }else{
                                    $('#menu2').css('display','block');
                                    $("#menu-adult").html(o.menu);
                                }
                            }else if(o.meals == "FB" || o.meals.match(/FB/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chfb').css('display','block');
                                    $("#fb-child").html(o.menu);
                                }else{
                                    $('#fb').css('display','block');
                                    $("#fb-adult").html(o.menu);
                                }
                            }else if(o.meals == "HB" || o.meals.match(/HB/g)){
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
        var houseId = $("#select-hotel option:selected").val();
        var idcli = $('#customer').text();

        var euro = $("#euro").text();
        var dollar = $("#dollar").text();
        var basesingle = "";
        var basedouble = "";
        var basetriple = "";
        var basefamily = "";
        var baseextra = "";
        var baseextrac="";
        var singleOthers ={};
        var doubleOthers ={};
        var tripleOthers ={};
        var familyOthers ={};
        var extraOthers ={};
        var extracOthers ={};
        var board ={};
        var childBoard={};
        var data = [];

        if ($("#single").is(':checked')) {
            var parent = $("#single").parents().eq(3);
            var opt = parent.find('select option:selected');
            var value = opt.val();
            var sgl_title = opt.text();
            var single = "";
            var sgl_vignet = "";
            var sgl_tax = "";
            if(value!==""){
                $.ajax({
                    type: 'GET',
                    url: '/priceroom',
                    async: false,
                    data: {
                        id: value
                    },
                    success: function (data) {
                        console.log(data);
                        single+="base=Single&price=";
                        single+= data[0];
                        sgl_vignet+= data[1];
                        sgl_tax+= data[2];

                    }
                });
            }
            basesingle+=single;
            basesingle+="&idHouse="+houseId;
            basesingle+="&id="+idcli;
            singleOthers.vignet = sgl_vignet;
            singleOthers.tax = sgl_tax;
            singleOthers.room_title = sgl_title;
        }

        if ($("#double").is(':checked')) {
            var par = $("#double").parents().eq(3);
            var options = par.find('select option:selected');
            var dbl_vignet = "";
            var dbl_tax = "";
            var double = "base=Double&price=";
            var sum = 0;
            var title_dbl="";
            $.each(options,function () {
             var i = $(this).val();
             var title = $(this).text();
                if(i!==""){
                    $.ajax({
                        type: 'GET',
                        url: '/priceroom',
                        async: false,
                        data: {
                            id: i
                        },
                        success: function (data) {
                            console.log(data);

                            sum = (sum + parseInt(data[0]))/2;
                            dbl_vignet = data[1];
                            dbl_tax += data[2];

                        }
                    });
                }
                title_dbl+=title;
            });
            double+=sum;
            basedouble+=double;
            basedouble+="&idHouse="+houseId;
            basedouble+="&id="+idcli;
            doubleOthers.vignet = dbl_vignet;
            doubleOthers.tax = dbl_tax;
            doubleOthers.room_title = title_dbl;
        }

        if ($("#triple").is(':checked')) {
            var dad = $("#triple").parents().eq(3);
            var optselect = dad.find('select option:selected');
            var tpl_vignet = "";
            var tpl_tax = "";
            var triple = "base=Triple&price=";
            var som = 0;
            var title_triple = "";
            $.each(optselect,function () {
                var j = $(this).val();
                var title= $(this).text();
                if(j!==""){
                    $.ajax({
                        type: 'GET',
                        url: '/priceroom',
                        async: false,
                        data: {
                            id: j
                        },
                        success: function (data) {
                            console.log(data);
                            som=(som + parseInt(data[0]))/3;
                            tpl_vignet+= data[1];
                            tpl_tax+= data[2];
                        }
                    });
                }
                title_triple+=title;
            });
            triple+=som;
            basetriple+=triple;
            basetriple+="&idHouse="+houseId;
            basetriple+="&id="+idcli;
            tripleOthers.vignet =tpl_vignet;
            tripleOthers.tax =tpl_tax;
            tripleOthers.room_title =title_triple;
        }

        if ($("#family").is(':checked')) {
            var mom = $("#family").parents().eq(3);
            var opselect = mom.find('select option:selected');
            var fml_vignet = "";
            var fml_tax ="";
            var title_family =opselect.text();
            var vr = opselect.val();
            var family = "base=Family&price=";
            var add = 0;
            if(vr!==""){
                $.ajax({
                    type: 'GET',
                    url: '/priceroom',
                    async: false,
                    data: {
                        id: vr
                    },
                    success: function (data) {
                        console.log(data);
                        add = (add + parseInt(data[0]));
                        fml_vignet+= data[1];
                        fml_tax+= data[2];

                    }
                });
            }
            family+=add;
            basefamily+=family;
            basefamily+="&idHouse="+houseId;
            basefamily+="&id="+idcli;
            familyOthers.vignet = fml_vignet;
            familyOthers.tax = fml_tax;
            familyOthers.room_title = title_family;
        }

        if ($("#extra-adult").is(':checked')) {
            var hisparent = $("#extra-adult").parents().eq(3);
            var hisopt = hisparent.find('select option:selected');
            var hisvalue = hisopt.val();
            var extra_title = hisopt.text();
            var ext_vignet ="";
            var ext_tax ="";
            var extra="";
           if(hisvalue!==""){
               $.ajax({
                   type: 'GET',
                   url: '/priceroom',
                   async: false,
                   data: {
                       id: hisvalue
                   },
                   success: function (data) {
                       console.log(data);
                       extra+="base=Extra-bed&price=";
                       extra+= data[0];
                       ext_vignet += data[1];
                       ext_tax += data[2];

                   }
               });
           }
            baseextra+=extra;
            baseextra+="&idHouse="+houseId;
            baseextra+="&id="+idcli;
            extraOthers.vignet = ext_vignet;
            extraOthers.tax = ext_tax;
            extraOthers.room_title = extra_title;
        }

        if ($("#extra-child").is(':checked')) {
            var hisparents = $("#extra-child").parents().eq(3);
            var hisopts = hisparents.find('select option:selected');
            var hisvalues = hisopts.val();
            var extc_title = hisopts.text();
            var extc_vignet = "";
            var extc_tax = "";
            var extrac="";
            if(hisvalues!==""){
                $.ajax({
                    type: 'GET',
                    url: '/priceroom',
                    async: false,
                    data: {
                        id: hisvalues
                    },
                    success: function (data) {
                        console.log(data);
                        extrac+="base=Extra-bed&price=";
                        extrac+= data[0];
                        extc_vignet+= data[1];
                        extc_tax+= data[2];

                    }
                });
            }
            baseextrac+=extrac;
            baseextrac+="&idHouse="+houseId;
            baseextrac+="&id="+idcli;
            extracOthers.vignet = extc_vignet;
            extracOthers.tax = extc_tax;
            extracOthers.room_title = extc_title;
        }

        //get breakfast for adult value
        if ($('#adult-breakfast').is(':checked')) {
            var ancestor = $('#adult-breakfast').parents().eq(3);
            var siblings = ancestor.find('select option:selected');
            var result = siblings.val();
            var breakfast = "";
            $.ajax({
                type: 'GET',
                url: '/priceboard',
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
                board.Breakfast = breakfast;

        }

        //get lunch for adult value
        if($('#adult-lunch').is(':checked')){
            var parent_lunch = $('#adult-lunch').parents().eq(3);
            var sibling_lunch = parent_lunch.find('select option:selected');
            var lunch_value = sibling_lunch.val();
            var lunch = "";
            $.ajax({
                type:'GET',
                url:'/priceboard',
                async: false,
                data:{
                    id: lunch_value
                },
                success:function(dat){
                    if(lunch_value!=""){
                        lunch+= dat;
                    }
                }

            });

            board.Lunch=lunch;
        }

        //get dinner for adult value
        if($('#adult-dinner').is(':checked')){
            var parent_dinner = $('#adult-dinner').parents().eq(3);
            var sibling_dinner = parent_dinner.find('select option:selected');
            var dinner_value = sibling_dinner.val();
            var dinner = "";
            $.ajax({
                type:'GET',
                url:'/priceboard',
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
            var c = $("#menu-adult").text();
            var things = "";
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

            board.Menu = things;
        }

        //get board type hb for adult value
        if($('#ahb').is(':checked')){
            var h = $("#hb-adult").text();
            var hb = "";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: h
                },
                success:function(dat){
                    if(h!=""){
                        hb+= dat;
                    }
                }

            });

            board.HB = hb;
        }

        //get board type for adult value
        if($('#afb').is(':checked')){
            var b = $("#fb-adult").text();
            var fb = "";
            $.ajax({
                type:'GET',
                url:'/resto',
                async: false,
                data:{
                    menu: b
                },
                success:function(dat){
                    if(b!=""){
                        fb+= dat;
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
            var childbreakfast = "";
            $.ajax({
                type: 'GET',
                url: '/priceboard',
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
            childBoard.Breakfast = childbreakfast;

        }

        //get lunch for child value
        if ($('#child-lunch').is(':checked')) {
            var origin = $('#child-lunch').parents().eq(3);
            var effect = origin.find('select option:selected');
            var output = effect.val();
            var childlunch = "";
            $.ajax({
                type: 'GET',
                url: '/priceboard',
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
            var mother = $('#child-dinner').parents().eq(3);
            var child = mother.find('select option:selected');
            var r = child.val();
            var childdinner = "";
            $.ajax({
                type:'GET',
                url:'/priceboard',
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

            childBoard.Dinner = childdinner;
        }

        //get board type menu for child value
        if($('#menuc').is(':checked')){
            var it = ("#menu-child").text();
            var menuc = "";
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

            childBoard.Menu = menuc;
        }

       //get board type half-board for child value
        if($('#hbc').is(':checked')){
            var hbc = $("#hb-child").text();
            var chb = "";
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

            childBoard.HB = chb;
        }

        //get board type full-board for child value
        if($('#fbc').is(':checked')){
            var cb=$("#fb-child").text();
            var cfb = "";
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

        singleOthers.euro = euro;
        singleOthers.dollar = dollar;
        singleOthers.board = board;

        doubleOthers.euro = euro;
        doubleOthers.dollar = dollar;
        doubleOthers.board = board;

        tripleOthers.euro = euro;
        tripleOthers.dollar = dollar;

        familyOthers.euro = euro;
        familyOthers.dollar = dollar;
        familyOthers.board = board;

        extraOthers.euro = euro;
        extraOthers.dollar = dollar;
        extraOthers.board = board;

        extraOthers.euro = euro;
        extraOthers.dollar = dollar;
        extracOthers.board = childBoard;


        var stringsingle=JSON.stringify(singleOthers);
        var stringdouble = JSON.stringify(doubleOthers);
        var stringtriple = JSON.stringify(tripleOthers);
        var stringfamily = JSON.stringify(familyOthers);
        var stringextra = JSON.stringify(extraOthers);
        var stringextrac = JSON.stringify(extracOthers);


        //information for singleroom
        basesingle+="&others="+stringsingle;
        //information for doubleroom
        basedouble+="&others="+stringdouble;
        //information for tripleroom
        basetriple+="&others="+stringtriple;
        //information for familyroom
        basefamily+="&others="+stringfamily;
        //information for extra-adultroom
        baseextra+="&others="+stringextra;
        //information for extra-childroom
        baseextrac+="&others="+stringextrac;

        data.push(basesingle);
        data.push(basedouble);
        data.push(basetriple);
        data.push(basefamily);
        data.push(baseextra);
        data.push(baseextrac);

        $.each(data,function(i,val){
            if(val.match(/Single/g) || val.match(/Double/g) || val.match(/Triple/g) || val.match(/Family/g) || val.match(/Extra-bed/g)){

                $.ajax({
                    type:'GET',
                    url:'/savequotaroom',
                    data: val,
                    dataType : "html",
                    async: false,
                    success:function(){
                        console.log('successfull');
                    },
                    error:function(){
                        console.log('error');
                    }
                });
            }
        });

         location.reload();
    });
}
