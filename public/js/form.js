$(document).ready(function(){

    $(".form-control").attr("disabled","disabled");
    $("#hotel").removeAttr("disabled");
    selectSingle();
    selectDouble();
    selectTriple();
    selectFamily();
    selectExtraAdult();
    selectExtraChild();
    breakfastAdult();
    breakfastChild();
    lunchAdult();
    lunchChild();
    dinnerAdult();
    dinnerChild();
    save();
});
function selectSingle() {
    $("#single").click(function(){

        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){

            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
function selectDouble() {
    $("#double").click(function(){

        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){

            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
function selectTriple() {
    $("#triple").click(function(){

        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){

            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
function selectFamily() {
    $("#family").click(function(){

        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){

            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
function selectExtraAdult() {
    $("#extra-adult").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){

            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}
function selectExtraChild() {
    $("#extra-child").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}

function breakfastChild() {
    $("#breakfast-child").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}
function lunchChild() {
    $("#child-lunch").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}
function dinnerChild() {
    $("#child-dinner").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
function breakfastAdult() {
    $("#adult-breakfast").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}
function lunchAdult() {
    $("#adult-lunch").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }


    });
}
function dinnerAdult() {
    $("#adult-dinner").click(function(){
        var parent=$(this).parents().eq(3);

        var child=parent.children('div').eq(1);
        if($(this).is(':checked')){
            child.children().removeAttr("disabled");
        }else{
            child.children().attr("disabled","disabled");
        }

    });
}
var lunch=$("#adult-lunch").is(':checked');
var dinner=$("#adult-dinner").is(':checked');
function save(){
    $("#save").click(function(){
        if($("#single").is(':checked')){
            var parent=$("#single").parents().eq(3);
            var child=parent.children('div').eq(1);
            var singleValue=child.children().find('option:selected').val();
           // alert(singleValue);
            if($("#adult-breakfast").is(':checked')){
                var ancestor=$("#adult-breakfast").parents().eq(3);
                var desceding=ancestor.children('div').eq(1);
                var breakfastAd=desceding.children().find('option:selected').val();
                alert(singleValue+','+breakfastAd);
            }
        }
    });

}

