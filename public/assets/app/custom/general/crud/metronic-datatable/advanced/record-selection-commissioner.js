"use strict";
// Class definition
var KTDatatableAgency = function() {
    // Private functions
    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: `${location.protocol}//${window.location.host}/commissioner/getall`,
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

        columns: [{
                field: 'profile_image',
                title: 'Image',
                sortable: true,
                width:70,
                template: function(row) {
                    if (row.profile_image != '') {
                        return `<img src="/uploads/user/${row.profile_image}" class="img-responsive" width="50px">`;
                    } else {
                        return '<img src="/uploads/no-image.png" class="img-responsive" width="50px">';
                    }
                },
            },
            {
                field: 'first_name',
                title: 'Name',
                sortable: true,
                width:120,
                template: function(row) {
                    return `${row.first_name} ${row.last_name}`;
                },
            },
            // {
            //     field: 'last_name',
            //     title: 'Last Name',
            //     sortable: true,
            //     template: function(row) {
            //         return row.last_name;
            //     },
            // },
           {
                field: 'user_name',
                title: 'Username',
                sortable: true,
                width:130,
                template: function(row) {
                    return row.user_name;
                },
            },
            {
                field: 'email',
                title: 'Contact Info',
                sortable: true,
                width:200,
                // callback function support for column rendering
                template: function(row) {
                    return "<b>Email:</b> "+row.email+"<br><b>Phone:</b> "+row.phone;
                },
            },
            /* {
                field: 'isBlock',
                title: 'Block Status',
                sortable: false,
                width: 80,
                textAlign: 'center',
                // callback function support for column rendering
                template: function (row) {

                    var class_name = 'kt-badge--danger';
                    var title = 'Blocked';
                    if (row.isBlock == true) {
                        class_name = 'kt-badge--brand';
                        title = 'Unblocked';
                    }

                    return '<span style="cursor:pointer;" class="kt-badge ' + class_name +
                        ' kt-badge--inline kt-badge--pill KTStatusUpdate onHover" data-id="' + row._id + '" >' + title +
                        '</span>';
                },
            }, */
            {
                field: 'isActive',
                title: 'Status',
                sortable: false,
                width: 80,
                textAlign: 'center',
                // callback function support for column rendering
                template: function(row) {

                    var class_name = 'kt-badge--danger';
                    var title = 'Inactive';
                    if (row.isActive == true) {
                        class_name = 'kt-badge--brand';
                        title = 'Active';
                    }

                    return '<span style="cursor:pointer;" class="kt-badge ' + class_name +
                        ' kt-badge--inline kt-badge--pill KTStatusUpdate onHover" data-id="' + row._id + '" >' + title +
                        '</span>';
                },
            },
            {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 80,
                overflow: 'visible',
                textAlign: 'left',
                autoHide: false,
                template: function(row) {
                    return '\
                    \<a href="' + location.protocol + "//" + window.location.host + '/commissioner/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                    \<a id="del-' + row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktDelete" title="Delete">\
                        <i class="flaticon-delete"></i>\
                    </a>\
                ';
                },
            }
        ],
    };

    // basic demo
    var agencySelector = function() {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#commissionerRecordSelection').KTDatatable(options);

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        datatable.on(
            'kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',
            function(e) {
                var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes();
                var count = checkedNodes.length;
                $('#kt_datatable_selected_number').html(count);
                if (count > 0) {
                    $('#kt_datatable_group_action_form').collapse('show');
                } else {
                    $('#kt_datatable_group_action_form').collapse('hide');
                }
            });

        $('#kt_modal_fetch_id').on('show.bs.modal', function(e) {
            var ids = datatable.rows('.kt-datatable__row--active').
            nodes().
            find('.kt-checkbox--single > [type="checkbox"]').
            map(function(i, chk) {
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
        }).on('hide.bs.modal', function(e) {
            $(e.target).find('.kt-datatable_selected_ids').empty();
        });

        $(document).on('click', '.KTStatusUpdate', function() {
            var elemID = $(this).data('id');

            swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, change it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result) {

                if (result.value) {
                    window.location.href = `${window.location.protocol}//${window.location.host}/commissioner/status-change/${elemID}`;
                }
            });
        })

        $(document).on('click', '.ktDelete', function() {
            var elemID = $(this).attr('id').replace('del-', '');
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result) {
                if (result.value) {
                    window.location.href = `${location.protocol}//${window.location.host}/commissioner/delete/${elemID}`;
                }
            });
        });
    };

    return {
        // public functions
        init: function() {
            agencySelector();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableAgency.init();
});