"use strict";
// Class definition
var KTDatatableAdminUser = function () {
    // Private functions
    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: `${location.protocol}//${window.location.host}/adminuser/getall`,
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: true, // enable/disable datatable scroll both horizontal and
            // vertical when needed.
            height: 500, // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        pagination: true,

        // columns definition

        columns: [
            {
                field: 'first_name',
                title: 'Name',
                sortable: true,
                width: 90,
                template: function (row) {
                    if (row.first_name == '' && row.last_name == '') {
                        return 'N/A';
                    } else {
                        return row.first_name + ' ' + row.last_name;
                    }
                },
            },
            {
                field: 'email',
                title: 'Email',
                sortable: true,
                width: 180,
                // callback function support for column rendering
                template: function (row) {
                    if (row.email == '') {
                        return 'N/A';
                    } else {
                        return row.email;
                    }
                },
            },
            {
                field: 'roleDetails.role',
                title: 'Role',
                sortable: true,
                width: 140,
                // callback function support for column rendering
                template: function (row) {
                    return row.roleDetails.roleDisplayName;
                },
            },
            {
                field: 'isActive',
                title: 'Status',
                sortable: false,
                width: 60,
                // callback function support for column rendering
                template: function (row) {
                    var status = {
                        "true": {
                            'title': 'Active',
                            'class': 'kt-badge--brand'
                        },
                        "false": {
                            'title': 'Inactive',
                            'class': ' kt-badge--danger'
                        },
                    };
                    return '<span class="kt-badge ' + status[row.isActive].class +
                        ' kt-badge--inline kt-badge--pill KTMembershipStatusUpdate onHover curserpointer" data-id="' + row._id + '">' + status[row.isActive].title +
                        '</span>';
                },
            }, {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 90,
                overflow: 'visible',
                textAlign: 'left',
                autoHide: false,
                template: function (row) {
                    return '\
                    \<a href="' + location.protocol + "//" + window.location.host + '/adminuser/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                    \<a id="del-' + row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktDelete" title="Delete">\
                        <i class="flaticon-delete"></i>\
                    </a>\
                ';
                },
            }],
    };

    // basic demo
    var adminuserSelector = function () {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#adminuserRecordSelection').KTDatatable(options);

        $('#kt_form_role').on('change', function () {
            datatable.search($(this).val(), 'role');
        });

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        datatable.on(
            'kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',
            function (e) {
                var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes();
                var count = checkedNodes.length;
                $('#kt_datatable_selected_number').html(count);
                if (count > 0) {
                    $('#kt_datatable_group_action_form').collapse('show');
                } else {
                    $('#kt_datatable_group_action_form').collapse('hide');
                }
            });

        $('#kt_modal_fetch_id').on('show.bs.modal', function (e) {
            var ids = datatable.rows('.kt-datatable__row--active').
                nodes().
                find('.kt-checkbox--single > [type="checkbox"]').
                map(function (i, chk) {
                    return $(chk).val();
                });
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $(e.target).find('.kt-datatable_selected_ids').append(c);
        }).on('hide.bs.modal', function (e) {
            $(e.target).find('.kt-datatable_selected_ids').empty();
        });

        $(document).on('click', '.ktDelete', function () {
            var elemID = $(this).attr('id').replace('del-', '');
            swal.fire({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    window.location.href = `${location.protocol}//${window.location.host}/adminuser/delete/${elemID}`;
                }
            });
        });

        $(document).on('click', '.KTMembershipStatusUpdate', function () {
            var elemID = $(this).data('id');
            swal.fire({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, change it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    window.location.href = `${location.protocol}//${window.location.host}/adminuser/status-change/${elemID}`;
                }
            });
        });
    };



    return {
        // public functions
        init: function () {
            adminuserSelector();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableAdminUser.init();
});