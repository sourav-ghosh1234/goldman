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
                    url: `${window.location.protocol}//${window.location.host}/role/getall`,
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

        rows: {
            autoHide: false
            },

        // columns definition

        columns: [{
            field: 'roleDisplayName',
            title: 'Title',
            template: '{{roleDisplayName}}',
        },
        {
            field: 'desc',
            title: 'Description',
            template: function(row) {
                if(row.desc.length > 100) {
                    return `${row.desc.substr(0, 97)}...`;
                } else {
                    return `${row.desc}`;
                }
            }
        },
        {
            field: 'Actions',
            title: 'Actions',
            sortable: false,
            width: 110,
            overflow: 'visible',
            textAlign: 'left',
	        autoHide: false,
            template: function(row) {
                if(row.rolegroup == 'backend') {
                    if(row.role == 'admin'){
                        return '\
                    \<a href="'+ window.location.protocol + '//' + window.location.host + '/role/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>';
                    } else {
                        return '\
                        \<a href="'+ window.location.protocol + '//' + window.location.host + '/role/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                            <i class="flaticon-edit"></i>\
                        </a>\
                        \<a href="'+ window.location.protocol + '//' + window.location.host + '/permission/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                            <i class="flaticon-exclamation"></i>\
                        </a>\
                        ';
                    }
                } else {
                    return '\
                    \<a href="'+window.location.protocol+'//'+window.location.host+'/role/edit/'+row._id+'" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>';
                }
            },
        }],
    };

    // basic demo
    var cmsSelector = function() {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#roleRecordSelection').KTDatatable(options);

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val(), 'isActive');
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

        $(document).on('click', '.KTStatusUpdate', function(){
            var elemID = $(this).data('id');
            swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, change it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result){
                if (result.value) {
                    window.location.href = `${location.protocol}//${window.location.host}/admin/cms/status-change/${elemID}`;
                }
            });
        })
        
        $(document).on('click', '.ktDelete', function(){
            var elemID = $(this).attr('id').replace('del-', '');
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result){
                if (result.value) {
                    window.location.href = `${window.location.protocol}//${window.location.host}/admin/cms/delete/${elemID}`;
                }
            });
        });        
    };

    

    return {
        // public functions
        init: function() {
            cmsSelector();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableCms.init();
});