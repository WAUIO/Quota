
$(document).ready(function () {
    //btn webhook
    $(".btn-add-weebhook").click(function(){
        var ref_type =  $("#reftype").val();
        //var refid =  $("#refid").val();
        var pathname = window.location.pathname;
        if(ref_type == "space"){
            $(".AppType").css("display","none");
        }else if(ref_type == "app") {
            $(".spaceType").css("display","none");
        }
        else if(ref_type == "app_field") {
            $(".AppType").css("display","none");
            $(".spaceType").css("display","none");
            $(".fieldType").css("display","block");
        }
    });

    //attach hook
    $("#send_form").click(function () {
        $("#send_form").css("display", "none");
        $(".loading-save").css("display", "block");
        $(".error-form").css("display", "none");
        $(".ak-border-form").css("border", "2px solid #deebed");

        //set value
        var url = $("#url").val()
        var type = $("#type").val();
        var ref_type = $("#reftype").val();
        var ref_id = $("#refid").val();

        $.ajax({
            type: "GET",
            url: "/attachHook",
            data: {
                url: url,
                type: type,
                ref_type: ref_type,
                ref_id: ref_id
            },
            success: function (d) {

                if ($.isNumeric(d)) { //if is result return an id hook
                    getweebHook();

                }
                else if (d == "PodioBadRequestError") {
                    $(".error-form").css("display", "block");
                    $(".ak-border-form").css("border", "2px solid red");
                    $("#send_form").css("display", "block");
                    $(".loading-save").css("display", "none");
                }


            }
        })

        return false;
    })

    //delete weebhook
    $("#confirm_form").click(function(){
        var id_hook = $("#id_hook").val();
        $(".loading-del").css("display","block");
        $(".btn-choice").css("display","none");
        $.ajax({
            type: "GET",
            url: "/deletehook/"+id_hook,
            data: {
            },
            success: function (d) {
                getweebHook();
            }
        })
        return false;
    });


})

// show pop up confirm delete
function confirm_hook(id) {
    $("#id_hook").val(id);
    $("#confirm-hook").modal("toggle");

}

function getweebHook() {

    //var pathname = window.location.pathname;
    var ref_type =  $("#reftype").val();
    var refid =  $("#refid").val();

    $.ajax({
        type: "GET",
        url: "/listHook/" +ref_type+"/"+refid,
        data: {},
        success: function (d) {

            var visibility = $('#form_webhook').is(':visible');
            var visibilityDelConfirm  = $('#confirm-hook').is(':visible');

            $(".table-responsive").html(d);

            //hidden the modal form ( hidden the formular)
            if(visibility == true) {
                $("#send_form").css("display", "block");
                $(".loading-save").css("display", "none");
                $("#form_webhook").modal("toggle");
                //reset value of url and  type
                $("#url").val("");
            }
            //hidden the modal confirm delete
            if(visibilityDelConfirm == true) {
                $("#confirm-hook").modal("toggle");
                $(".loading-del").css("display","none");
                $(".btn-choice").css("display","block");
            }


        }
    })

}

function verify_hook(id){
    $("#btn-"+id).prop('disabled', true);
    $.ajax({
        ype: "GET",
        url: "/verifyHook/" +id,
        data: {},
        success: function (d) {
                getweebHook();
                $("#verify-hook").modal("toggle");
                setTimeout(function () {
                    $("#verify-hook").modal("hide")
                }, 1000);

        }
    })
}