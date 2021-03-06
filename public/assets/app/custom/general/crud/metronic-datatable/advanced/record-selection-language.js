"use strict";
// Class definition
var KTDatatableCms = function() {
    // Private functions
    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: `${location.protocol}//${window.location.host}/language/getall`,
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
                field: 'icon',
                title: 'Image',
                width: 120,
                template: function(row) {
                    return `<img src="/uploads/language/${row.icon}" alt="" height="32" width="32">`
                },
            },
            {
                field: 'title',
                title: 'Language',
                width: 170,
                template: function(row) {
                    return row.title;
                },
            },
            {
                field: 'shortcode',
                title: 'Code',
                width: 110,
                template: function(row) {
                    return row.shortcode;
                },
            },
            {
                field: 'isDefault',
                title: 'Default',
                width: 110,
                template: function(row) {
                    return row.isDefault == true ? 'Yes' : 'No';
                },
            },
            {
                field: 'status',
                title: 'Status',
                width: 130,
                // callback function support for column rendering
                template: function(row) {
                    var status = {
                        "Active": { 'title': "Active", 'class': 'kt-badge--brand' },
                        "Inactive": { 'title': "Inactive", 'class': ' kt-badge--danger' },
                    };
                    return '<span style="cursor:pointer;" class="kt-badge ' + status[row.status].class +
                        ' kt-badge--inline kt-badge--pill KTLanguageStatusUpdate onHover" data-id="' + row._id + '" >' + status[row.status].title +
                        '</span>';
                },
            },
            {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 110,
                overflow: 'visible',
                textAlign: 'left',
                autoHide: false,
                //template: function(row) {
                //	return '\
                //	\<a href="http://'+window.location.host+'/country/edit/'+row._id+'" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                //	<i class="flaticon-edit"></i>\
                //	</a>';
                //},
                template: function(row) {
                    return '\
						\<a href="http://' + window.location.host + '/language/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
						<i class="flaticon-edit"></i>\
						</a>\
						\<a id="del-' + row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktManagerDelete" title="Delete">\
						<i class="flaticon-delete"></i>\
						</a>\
					';
                },
            }
        ],
    };

    // basic demo
    var languageSelector = function() {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#languageRecordSelection').KTDatatable(options);

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

        $(document).on('click', '.ktManagerDelete', function() {
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
                    window.location.href = `http://${window.location.host}/language/delete/${elemID}`;
                }
            });
        });


        $(document).on('click', '.KTLanguageStatusUpdate', function() {
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
                    window.location.href = `http://${window.location.host}/language/status-change/${elemID}`;
                }
            });
        })
    };



    return {
        // public functions
        init: function() {
            languageSelector();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableCms.init();
});