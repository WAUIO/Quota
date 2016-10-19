$(document).ready(function () {
    workspace();
});

function workspace(){

    $("#loader").show();
    $.ajax({
        url: "/Ajax/getWorkspace",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {

            var table = $("<table>");
            var visibility = $('#form_webhook').is(':visible');
            table.attr("class", "table table-striped table-sm table-bordered");
            table.attr("id", "tableau");
            $.each(data, function (i, list) {

                var row = $("<tr>");
                var spaceLink = $('<td class="col-md-6 td_action">');
                var hookLink = $("<td class='col-md-1'>");
                var goToLink = $("<a>");
                goToLink.attr("class", "btn btn-success btn-center");
                goToLink.attr("href", "/form/"+list.ref_type +"/"+ list.space_id+"/_");
                goToLink.append("webhook");
                hookLink.append(goToLink);
                spaceLink.text(list.name);
                spaceLink.click(function(){
                    document.location.href="/space/" + list.space_id;
                });
                row.append(spaceLink);
                row.append(hookLink);
                table.append(row);
            });
            $("#loader").hide();
            $("#tableW").append(table);
            $("#tableau").DataTable({
                "columnDefs": [
                    { "title": "Workspace", "targets": 0 },
                    { "title": "Action", "targets": 1 },
                ],
                'order': [[ 0, 'asc' ]],
                'aoColumns': [
                    null,
                    {
                        'bSortable': false
                    }
                ]
            });
            var nodata = $(".dataTables_empty").is(':visible');
            if(nodata == true) {
                $("#table-hook_paginate").css("display","none");
            }

        },
        });

}
