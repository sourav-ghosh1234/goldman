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

    var editSetting = function() {
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
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var agentFrmValidation = function() {
        $("#frmAgent").validate({
            // define validation rules
            rules: {
                full_name: {
                    required: true,
                    letterswithbasicpunc: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
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
                },
                phone: {
                    required: "Please enter your phone number"
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

    var editCMSValidation = function() {
        $("#frmEditCMS").validate({

            // define validation rules
            rules: {
                event: 'blur',
                content: {
                    required: function(textarea) {
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
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var notificationAddValidation = function() {
        $('#frmnotification').validate({
            rules: {
                event: 'blur',
                content: {
                    required: function(textarea) {
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
            invalidHandler: function(event, validate) {

            },
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var notificationEditValidation = function() {
        $('#frmEditNotification').validate({
            rules: {
                event: 'blur',
                content: {
                    required: function(textarea) {
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
            invalidHandler: function(event, validate) {

            },
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var editContactInfo = function() {
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
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var frmServiceValidation = function() {
        $('#frmService').validate({
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
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var frmCreateArtValidation = function() {
        $('#frmCreateArt').validate({
            rules: {
                title: {
                    required: true
                },
                image: {
                    required: true,
                    accept: 'image/*'
                },
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                image: {
                    required: "Image is required",
                    accept: "Invalid file type"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var editArtFrmValidation = function() {
        $('#editArtFrm').validate({
            rules: {
                title: {
                    required: true
                },
                image: {
                    accept: 'image/*'
                },
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                image: {
                    accept: "Invalid file type"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var languageFrmValidation = function() {
        $('#languageFrm').validate({
            rules: {
                title: {
                    required: true
                },
                shortcode: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                shortcode: {
                    required: "Shortcode is Required"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var contactRequestFrmValidation = function() {
        $('#frmAddContactRequest').validate({
            rules: {
                salutation: {
                    required: true
                },
                firstName: {
                    required: true
                },
                lastName: {
                    required: true
                },
                email: {
                    required: true
                },
                dialCode: {
                    required: true
                },
                contactNo: {
                    required: true
                },
                message: {
                    required: true
                },
            },
            messages: {
                salutation: {
                    required: 'Salutation is Required'
                },
                firstName: {
                    required: "First Name is Required"
                },
                lastName: {
                    required: "Last Name is Required"
                },
                email: {
                    required: "Email is Required"
                },
                dialCode: {
                    required: "Dial Code is Required"
                },
                contactNo: {
                    required: "Contact No is Required"
                },
                message: {
                    required: "Message is Required"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var addPropertyFrmValidation = function() {
        $('#addPropertyFrm').validate({
            rules: {
                title: {
                    required: true
                },
                price: {
                    required: true
                },
                image: {
                    required: true
                },
                description: {
                    required: true
                },
                propertyType: {
                    required: true
                },
                totalArea: {
                    required: true
                },
                noOfBedRooms: {
                    required: true
                },
                noOfKitchens: {
                    required: true
                },
                noOfBathrooms: {
                    required: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Title is Required',
                },
                price: {
                    required: 'Price is Required',
                },
                image: {
                    required: 'Image is Required',
                },
                description: {
                    required: 'Description is Required',
                },
                propertyType: {
                    required: 'Propetyrtype is Required',
                },
                totalArea: {
                    required: 'Total Area is Required',
                },
                noOfBedRooms: {
                    required: 'No Of Bedrooms is Required',
                },
                noOfKitchens: {
                    required: 'No of Kitchens is Required',
                },
                noOfBathrooms: {
                    required: 'No of Bathrooms is Required',
                },
                address: {
                    required: 'Address is Required',
                },
                city: {
                    required: 'City is Required',
                },
                country: {
                    required: 'Country is Required',
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var editPropertyFrmValidation = function() {
        $('#editPropertyFrm').validate({
            rules: {
                title: {
                    required: true
                },
                price: {
                    required: true
                },
                description: {
                    required: true
                },
                propertyType: {
                    required: true
                },
                totalArea: {
                    required: true
                },
                noOfBedRooms: {
                    required: true
                },
                noOfKitchens: {
                    required: true
                },
                noOfBathrooms: {
                    required: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Title is Required',
                },
                price: {
                    required: 'Price is Required',
                },
                description: {
                    required: 'Description is Required',
                },
                propertyType: {
                    required: 'Propetyrtype is Required',
                },
                totalArea: {
                    required: 'Total Area is Required',
                },
                noOfBedRooms: {
                    required: 'No Of Bedrooms is Required',
                },
                noOfKitchens: {
                    required: 'No of Kitchens is Required',
                },
                noOfBathrooms: {
                    required: 'No of Bathrooms is Required',
                },
                address: {
                    required: 'Address is Required',
                },
                city: {
                    required: 'City is Required',
                },
                country: {
                    required: 'Country is Required',
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var cityFrmValidation = function() {
        $('#cityFrm').validate({
            rules: {
                city: {
                    required: true
                },
                countryId: {
                    required: true
                },
            },
            messages: {
                city: {
                    required: 'City is Required'
                },
                countryId: {
                    required: "Country is Required"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var newsFrmAddValidation = function() {
        $('#frmAddNews').validate({
            rules: {
                title: {
                    required: true
                },
                date: {
                    required: true
                },
                author_name: {
                    required: true
                },
                image: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                date: {
                    required: 'Date is Required'
                },
                author_name: {
                    required: 'Author name is Required'
                },
                image: {
                    required: "Please upload an image"
                },
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var newsFrmEditValidation = function() {
        $('#frmEditNews').validate({
            rules: {
                title: {
                    required: true
                },
                date: {
                    required: true
                },
                author_name: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'Title is Required'
                },
                date: {
                    required: 'Date is Required'
                },
                author_name: {
                    required: 'Author name is Required'
                }
                
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var amenitiesAddFrmEditValidation = function() {
        $('#addAmenitiesFrm').validate({
            rules: {
                title: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'Please enter title'
                }
                
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var amenitiesEditFrmEditValidation = function() {
        $('#editAmenitiesFrm').validate({
            rules: {
                title: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'Please enter title'
                }
                
            },
            invalidHandler: function(event, validate) {},
            submitHandler: function(form) {
                form[0].submit();
            }
        });
    };

    var blankSpaceNotAllow = function() {
        $("input").on("keypress", function(e) {
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
            editSetting();
            agentFrmValidation();
            editCMSValidation();
            notificationAddValidation();
            notificationEditValidation();
            editContactInfo();
            frmServiceValidation();
            frmCreateArtValidation();
            editArtFrmValidation();
            languageFrmValidation();
            contactRequestFrmValidation();
            addPropertyFrmValidation();
            editPropertyFrmValidation();
            cityFrmValidation();
            newsFrmAddValidation();
            newsFrmEditValidation();
            amenitiesAddFrmEditValidation();
            amenitiesEditFrmEditValidation();
        }
    };
}();

jQuery(document).ready(function() {
    KTFormControls.init();
});