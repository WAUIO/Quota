
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
                var d = JSON.parse(data);
                console.log(d);
                $('#sgl').empty();
                $('#dbl').empty();
                $('#tpl').empty();
                $('#fml').empty();
                // $('#ext').empty();
                $('#exch').empty();
                $.each(d,function(i,r){
                    // debugger;
                // for ($i = 0; $i < d.length; $i++) {
                    var str=r.others;
                    var obj=JSON.parse(str);
                    // alert(obj['name'].value+','+r.item_id+','+r.category);


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
                        var data=JSON.parse(d);
                        console.log(data);
                        $('#bft').empty();
                        $('#lch').empty();
                        $('#dnr').empty();
                        // for ($j = 0; $j < data.length; $j++) {
                            $.each(data,function(e,o){
                            if(o.meals=="Breakfast" || o.meals.match(/Breakfast/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var bch="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chb").append(bch);
                                }else{
                                    var brk="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#bft").append(brk);
                                }
                            }else if(o.meals=="Lunch" || o.meals.match(/Lunch/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    var lch="<option value=" + o.item_id + ">" + o.menu + "</option>";
                                    $("#chl").append(lch);
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
                                }else{

                                    $('#menu').css('display','block');
                                }
                            }else if(o.meals=="HB" || o.meals.match(/HB/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chhb').css('display','block');
                                }else{
                                    $('#hb').css('display','block');
                                }
                            }else if(o.meals=="FB" || o.meals.match(/FB/g)){
                                if(o.meals.match(/CH/g) ||o.menu.match(/y.o/g)){
                                    $('#chfb').css('display','block');
                                }else{
                                    $('#hb').css('display','block');
                                }

                            }
                        });
                    }
                });
            },
            error: function () {
                alert("you have an error!");
            }
        });
    });
}
function Quotaroom(){

}
