"use strict";
// Class definition
var KTDatatableSetting = function () {
  // alert('hfhfh');
  // Private functions
  var options = {
    // datasource definition
    data: {
      type: 'remote',
      source: {
        read: {
          url: `${location.protocol}//${window.location.host}/contactinfo/getall`,
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
      field: 'user_name',
      title: 'User Name',
      sortable: false,
      width: 150,
      template: function (row) {
        return `${row.prefix}. ${row.first_name} ${row.last_name}`
      }
    },
    {
      field: 'email',
      title: 'Email',
      sortable: false,
      width: 150,
      template: '{{email}}'
    },
    {
      field: 'phone_number',
      title: 'Phone',
      sortable: false,
      width: 150,
      template: '{{phone_number}}'
    },
    {
      field: 'message',
      title: 'Message',
      sortable: false,
      width: 300,
      template: '{{message}}'
    },
    {
      field: 'status',
      title: 'Status',
      width: 80,
      // callback function support for column rendering
      template: function (row) {
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
      width: 80,
      overflow: 'visible',
      textAlign: 'left',
      autoHide: false,
      template: function (row) {
        return '\
        \<a id="del-' + row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktManagerDelete" title="Delete">\
        <i class="flaticon-delete"></i>\
        </a>\
        ';
      },
    }
    ],
  };

  // basic demo
  var contactinfoSelector = function () {

    options.search = {
      input: $('#generalSearch'),
    };

    var datatable = $('#contactinfoRecordSelection').KTDatatable(options);

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
              window.location.href = `http://${window.location.host}/contactinfo/delete/${elemID}`;
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
              window.location.href = `http://${window.location.host}/contactinfo/status-change/${elemID}`;
          }
      });
  })
  };



  return {
    // public functions
    init: function () {
      contactinfoSelector();
    },
  };
}();

jQuery(document).ready(function () {
  KTDatatableSetting.init();
});