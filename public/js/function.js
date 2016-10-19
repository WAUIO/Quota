$(document).ready(function () {
    var pathname = window.location.pathname;
    if ( pathname.split("/")[1] == "space"){
        $.ajax({
            type: "GET",
            url: "/tableApp",
            data: {
                space_id: pathname.split("/")[2]
            },
            success: function (d) {
                $("#loader").hide();
                $(".tableApp").html(d);
                $("#tableapp").dataTable({
                    "columnDefs": [
                        { "title": "Application", "targets": 0 },
                        { "title": "Action", "targets": 1 },
                        {"bSortable": false ,"aTargets": 1}
                    ],
                    'order': [[ 0, 'asc' ]],
                    "aoColumnsDefs": [
                        {
                            "bSortable": false ,"aTargets": 1
                        }
                    ]
                });
                $("#td").attr("class", "col-md-2");
            }
        })
    }else if(pathname.split("/")[1] == "app"){
        $.ajax({
            type: "GET",
            url: "/tableFields",
            data: {
                app_field_id: pathname.split("/")[2]
            },
            success: function (d) {
                $("#loader").hide();
                $(".tableFields").html(d);
                $("#tablefields").DataTable({
                    "columnDefs": [
                        { "title": "Fields", "targets": 0 },
                        { "title": "Action", "targets": 1 },
                        {"bSortable": false ,"aTargets": 1}
                    ],
                    'order': [[ 0, 'asc' ]],
                    "aoColumnsDefs": [
                        {
                            "bSortable": false ,"aTargets": 1
                        }
                    ]
                });
                $("#td").attr("class", "col-md-2");
                var nodata = $(".dataTables_empty").is(':visible');
                if(nodata == true) {
                    $("#table-hook_paginate").css("display","none");
                }

            }
        })
    }

    $(".btnWebhookSpace").click(function () {
        $id = $(this).attr("id");
        $("#refid").val($id.split("-")[1]);
        $("#reftype").val($id.split("-")[0]);

    });

    $('#loginform').submit(function (e) {
        e.preventDefault();
        loginForm(this);
    });


})

function confirm_hook(id) {
    $("#id_hook").val(id);
    $("#confirm-hook").modal("toggle");
}

function loginForm(form) {
    $.ajax({
        type: "GET",
        url: "/authpodio",
        data: $(form).serialize(),
        dataType : 'html',
        success: function (d) {
            if (d.match("Login or password invalid")) {
                $("body").html(d);
            }
            else {
                $("body").html(d);
            }
        }
    });

    return false;
}

function previewpage() {
    window.history.back();
}

