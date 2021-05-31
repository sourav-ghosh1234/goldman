$(document).ready(function() {

    $('.addMoreItems').click(function() {
        var str = $('#defaultItemsGroup').html();
        $('#itemsGroup').append(str);
        initAutocomplete();
    });

    $(document).on('click', '.removeItems', function() {
        $(this).parent().parent().remove();
    });

    $(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[^\d].+/, ""));
         if ((event.which < 48 || event.which > 57)) {
             event.preventDefault();
         }
     });
    // Allow only decimal number //
	$('.allownumericwithdecimal').on('input', function() {		
		this.value = this.value
		.replace(/[^\d.]/g, '')             // numbers and decimals only
		//.replace(/(^[\d]{2})[\d]/g, '$1')   // not more than 2 digits at the beginning
		.replace(/(\..*)\./g, '$1')         // decimal can't exist more than once
		.replace(/(\.[\d]{2})./g, '$1');    // not more than 2 digits after decimal
	});
});