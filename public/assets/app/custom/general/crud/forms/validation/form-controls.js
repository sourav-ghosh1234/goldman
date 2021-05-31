// Class definition

var KTFormControls = function() {
    // Private functions

    var myProfileValidation = function() {
        $("#frmMyProfile").validate({
            // define validation rules
            rules: {
                full_name: {
                    required: true,
                    letterswithbasicpunc: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                full_name: {
                    required: "Please enter your full name",
                    letterswithbasicpunc: "Please enter alphabets only"
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter valid email"
                }
            },
            //display error alert on form submit  
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var changePasswordValidation = function() {
        $("#changePasswordForm").validate({
            // define validation rules
            rules: {
                old_password: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 6
                },
                password_confirm: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                }
            },
            messages: {
                old_password: {
                    required: "Please enter your old password",
                    minlength: "Password must be atleast 6 characters length"
                },
                password: {
                    required: "Please enter your new password",
                },
                password_confirm: {
                    required: "Make sure that you have entered the same password here.",
                    minlength: "Confirm password must be atleast 6 characters length",
                    equalTo: "Confirm password must match with password"
                }
            },
            //display error alert on form submit  
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var editSetting = function () {
        // alert('hgfd');
        $("#editSettings").validate({

            // define validation rules
            rules: {
                setting_value: {
                    required: true,
                    // letterswithbasicpunc: true
                },
            },
            messages: {
                setting_value: {
                    required: "Please enter Setting Value"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var editCMSValidation = function () {
        $("#frmEditCMS").validate({

            // define validation rules
            rules: {
                event: 'blur',
                content: {
                    required: function (textarea) {
                        CKEDITOR.instances[textarea.id].updateElement(); // update textarea
                        var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
                        return editorcontent.length === 0;
                    }
                },
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter title"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var commissionerAddValidation = function () {
        $('#commissionerAddForm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                profile_image: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                password: {
                    required: true,
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                profile_image: {
                    required: 'Profile Image is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email: 'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
                password: {
                    required: 'Password is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var commissionerEditValidation = function () {
        $('#commissionerValidation').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email:true
                },
                phone: {
                    required: true
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email:'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var memberAddValidation = function () {
        $('#memberAddFrm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                profile_image: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                password: {
                    required: true,
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                profile_image: {
                    required: 'Profile Image is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email: 'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
                password: {
                    required: 'Password is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var memberEditValidation = function () {
        $('#memberEditFrm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email: 'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var sportAddValidation = function () {
        $('#frmsport').validate({
            rules: {
                title: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var notificationAddValidation = function () {
        $('#frmnotification').validate({
            rules: {
                event: 'blur',
                content: {
                    required: function (textarea) {
                        CKEDITOR.instances[textarea.id].updateElement(); // update textarea
                        var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
                        return editorcontent.length === 0;
                    }
                },
                title: {
                    required: true
                },
               /*  content: {
                    required: true
                }, */
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                content: {
                    required: 'Content is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var notificationEditValidation = function () {
        $('#frmEditNotification').validate({
            rules: {
                event: 'blur',
                content: {
                    required: function (textarea) {
                        CKEDITOR.instances[textarea.id].updateElement(); // update textarea
                        var editorcontent = textarea.value.replace(/<[^>]*>/gi, ''); // strip tags
                        return editorcontent.length === 0;
                    }
                },
                title: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                content: {
                    required: 'Content is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }; 

    var commissionerfeeEditValidation = function () {
        $('#frmcommissionerfee').validate({
            rules: {
                amount: {
                    required: true
                },
            },
            messages: {
                amount: {
                    required: 'Amount is Required'
                },
            },
            invalidHandler: function (event, validate) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var leaguefeeEditValidation = function () {
        $('#frmleaguefee').validate({
            rules: {
                amount: {
                    required: true
                },
            },
            messages: {
                amount: {
                    required: 'Amount is Required'
                },
            },
            invalidHandler: function (event, validate) {
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var editContactInfo = function () {
        $("#editContactinfos").validate({
            rules: {
                contactinfo_value: {
                    required: true,
                    // letterswithbasicpunc: true
                },
            },
            messages: {
                contactinfo_value: {
                    required: "Please enter Contact Info Value"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var playerAddValidation = function () {
        $('#playerAddFrm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                profile_image: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                password: {
                    required: true
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                profile_image: {
                    required: 'Profile Image is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email: 'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
                password: {
                    required: 'Password is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var playerEditValidation = function () {
        $('#playerEditFrm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                address: {
                    required: true
                },
                user_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
            },
            messages: {
                first_name: {
                    required: 'First Name is Required'
                },
                last_name: {
                    required: 'Last Name is Required'
                },
                address: {
                    required: 'Address is Required'
                },
                user_name: {
                    required: 'User Name is Required'
                },
                email: {
                    required: 'Email is Required',
                    email: 'Please enter valid email'
                },
                phone: {
                    required: 'Phone is Required'
                },
            },
            invalidHandler: function (event, validate) {

            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    };

    var blankSpaceNotAllow = function () {
        $("input").on("keypress", function (e) {
            var startPos = e.currentTarget.selectionStart;
            if (e.which === 32 && startPos == 0)
                e.preventDefault();
        });
    };

    return {
        // public functions
        init: function() {
            myProfileValidation();
            changePasswordValidation();
            commissionerAddValidation();
            commissionerEditValidation();
            memberAddValidation();
            memberEditValidation();
            editSetting();
            editCMSValidation();
            sportAddValidation();
            notificationAddValidation();
            notificationEditValidation();
            commissionerfeeEditValidation();
            leaguefeeEditValidation();
            editContactInfo();
            playerAddValidation();
            playerEditValidation();
        }
    };
}();

jQuery(document).ready(function() {
    KTFormControls.init();
});