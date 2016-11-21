
$(document).ready(function () {
    $(this).scrollTop(0);
    $('[type="checkbox"]').prop('checked', false);

     $("select").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");

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
                $('#ext').empty();
                $('#exch').empty();
                for ($i = 0; $i < d.length; $i++) {
                    if(d[$i].Category=="single"|| d[$i].Category=="extra-bed"){
                        var opt = "<option value=" + d[$i].Id + ">" + d[$i].Name + "</option>";

                        $('#sgl').append(opt);

                    }else if(d[$i].Category=="single" || d[$i].Category=="double"){
                        var pto = "<option value=" + d[$i].Id + ">" + d[$i].Name + "</option>";
                        $('#dbl').append(pto);
                    }else if(d[$i].Category=="single" || d[$i].Category=="double" || d[$i].Category=="triple"){
                        var lpt = "<option value=" + d[$i].Id + ">" + d[$i].Name + "</option>";
                        $('#tpl').append(lpt);
                    }else if(d[$i].Category=="single" || d[$i].Category=="double" || d[$i].Category=="triple"||d[$i].Category=="family"){
                        var lmf = "<option value=" + d[$i].Id + ">" + d[$i].Name + "</option>";
                        $('#fml').append(lmf);
                    }else {
                        var txe = "<option value=" + d[$i].Id + ">" + d[$i].Name + "</option>";
                        $('#ext').append(txe);
                        $('#exch').append(txe);
                    }
                }
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
                        for ($j = 0; $j < data.length; $j++) {
                            if(data[$j].Meals=="breakfast" || data[$j].Meals.match(/breakfast/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var bch="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#chb").append(bch);
                                }else{
                                    var brk="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#bft").append(brk);
                                }
                            }else if(data[$j].Meals=="lunch" || data[$j].Meals.match(/lunch/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var lch="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#chl").append(lch);
                                }else{
                                    var lun="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#lch").append(lun);
                                }
                            }else if(data[$j].Meals=="dinner" || data[$j].Meals.match(/dinner/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var dch="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#chd").append(dch);
                                }else{
                                    var din="<option value=" + data[$j].Id + ">" + data[$j].Menu + "</option>";
                                    $("#dnr").append(din);
                                }

                            }else if(data[$j].Meals=="Menu" || data[$j].Meals.match(/Menu/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var menuc="<div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> Menu </label> </div> </div>";
                                    $('#chmenu').html(menuc);
                                }else{
                                    var menu=" <div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> Menu </label> </div> </div>";
                                    $('#menu').html();
                                }
                            }else if(data[$j].Meals=="HB" || data[$j].Meals.match(/HB/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var hbc=" <div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> HB </label> </div> </div>";
                                    $('#chhb').html(hbc);
                                }else{
                                    var hb=" <div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> HB </label> </div> </div>";
                                    $('#hb').html(hb);
                                }
                            }else if(data[$j].Meals=="FB" || data[$j].Meals.match(/FB/g)){
                                if(data[$j].Meals.match(/CH/g) ||data[$j].Menu.match(/y.o/g)){
                                    var fbc=" <div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> Menu </label> </div> </div>";
                                    $('#chfb').html(fbc);
                                }else{
                                    var fb="<div class='col-md-5'> <div class='checkbox'> <label> <input id='menu' type='checkbox'> FB </label> </div> </div>";
                                    $('#fb').html(fb);
                                }

                            }
                        }
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
