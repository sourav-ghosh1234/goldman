// Image Display action
$(document).on('change', '.imagepicker', function(e) {
    var reader = new FileReader();
    if (e.target.files[0].type != 'image/png' &&
        e.target.files[0].type != 'image/jpeg' &&
        e.target.files[0].type != 'image/jpg') {
        swal.fire(
            'Error!',
            'Please select image',
            'error'
        )
        $(".imagepicker").val('');
        $('.pickedImage').attr('src', '');
        $('.pickedImage').hide();
        return false;
    }
    //Read the contents of Image File.
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        $('.pickedImage').show();
        //Initiate the JavaScript Image object.
        var image = new Image();
        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;
        $('.pickedImage').attr('src', e.target.result);
    };
});

$(document).on('change', '.imagepickerWithPreviewId', function(e) {
    var imagePreview = $(this).data("previewelement");
    var previewElement = `#${imagePreview}`
    var reader = new FileReader();
    if (e.target.files[0].type != 'image/png' &&
        e.target.files[0].type != 'image/jpeg' &&
        e.target.files[0].type != 'image/jpg') {
        swal.fire(
            'Error!',
            'Please select image',
            'error'
        )
        $(".imagepickerWithPreviewId").val('');
        $(previewElement).attr('src', '');
        $(previewElement).hide();
        return false;
    }
    //Read the contents of Image File.
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        $(previewElement).show();
        //Initiate the JavaScript Image object.
        var image = new Image();
        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;
        $(previewElement).attr('src', e.target.result);
    };
});

$(document).on('click', '.addBanner', function(e) {
    e.preventDefault();
    let numOfItems = $('.banner').length;
    let item = `<div class="form-group row banner">
                    <div class="col-lg-5">
                        <input type="file" name="banner_${numOfItems}" required id="image" class="form-control imagepickerWithPreviewId required" data-previewelement="banner${numOfItems}Preview">
                    </div>
                    <div class="col-lg-5">
                        <img class="bannerImage" id="banner${numOfItems}Preview" height="80px" src="">
                    </div>
                    <div class="col-lg-2"><button class="btn btn-danger btn-rounded pull-right removeBanner" id="item${numOfItems}">Remove</button></div>
                    <div class="col-lg-5 mt-4">
                        <input type="text" class="form-control requuired" name="banners[${numOfItems}][title]" placeholder="Enter Image Alt Text">
                    </div>
                </div>
                `;

    $('.banner-item-wrapper').append(item);
});

$(document).on('click', '.removeBanner', function(e) {
    e.preventDefault();
    $(this).closest('.banner').remove();
});


$(document).ready(function() {

    $('.addMoreItems').click(function() {
        var str = $('#defaultItemsGroup').html();
        $('#itemsGroup').append(str);
        initAutocomplete();
    });

    $(document).on('click', '.removeItems', function() {
        $(this).parent().parent().remove();
    });

    $(".allownumericwithoutdecimal").on("keypress keyup blur", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    // Allow only decimal number //
    $('.allownumericwithdecimal').on('input', function() {
        this.value = this.value
            .replace(/[^\d.]/g, '') // numbers and decimals only
            //.replace(/(^[\d]{2})[\d]/g, '$1')   // not more than 2 digits at the beginning
            .replace(/(\..*)\./g, '$1') // decimal can't exist more than once
            .replace(/(\.[\d]{2})./g, '$1'); // not more than 2 digits after decimal
    });
});