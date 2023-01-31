$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}
function validatePersonalInfoForm() {
  $(".details-form-validated").valid();
}

$(document).ready(function () {
  var navListItems = $("div.setup-panel div a"),
    allWells = $(".setup-content"),
    allNextBtn = $(".nextBtn");
  allPreviousBtn = $(".PreviousBtn");
  fillanothe = $(".fillbtn");

  $(".bulknext").click(function () {
    const parent = $(this).closest(".setup-content");
    const checkedValues = parent.find("input[type='radio']:checked").length;
    const totalValues = parent.find("ul").length;
    if (checkedValues === totalValues) {
      parent.children(".nextBtn").eq(0).trigger("click");
    }
  });

  if (sessionStorage.getItem("lead")) {
    const leadData = JSON.parse(sessionStorage.getItem("lead"));

    document.getElementById("Name").value = leadData["Name"];
    document.getElementById("date_of_birth").value = leadData["Date_of_Birth"];
    document.getElementById("Email").value = leadData["Email"];
    document.getElementById("Phone").value = leadData["Phone"];
    document.getElementById("Address").value = leadData["Address"];
    document.getElementById("Zip").value = leadData["Zip"];
    sessionStorage.removeItem("lead");
    setTimeout(function () {
      $("#step-1").find(".nextBtn").eq(0).trigger("click");
    }, 250);
  }
  if ($(".details-form-validated").length) {
    $(".details-form-validated").validate({
      // initialize the plugin
      rules: {
        Name: {
          required: true,
        },
        Date_of_Birth : {
          required: true,
          minAge: true,
        },
        Email: {
          required: true,
          email: true,
        },
        Address: {
          required: true,
        },
        Zip: {
          required: true,
          zipcode:true,
        },
        Phone: {
          required: true,
          phoneUS: true,
        },
        TCPA: {
          required: true,
        },
      },
      submitHandler: function (form) {
        const templateParams = getFormData($(form));

        var spinner = $(".preloader");

        spinner.show();

        const scriptURL =
          "https://script.google.com/macros/s/AKfycbzI91aqt-gVW_3uI9pVBPUJIoVkcg5KpRFIHrudd8PxPDsdsPQKABPal6KRqNazeuKdLg/exec";
        fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(templateParams),
        })
          .then((response) => {
            // console.log("Success!", response);
            spinner.hide();
            $(form)[0].reset();
            // setTimeout(function () { window.location.reload(1); }, 5000);
          })
          .catch((error) => console.error("Error!", error.message));
        // emailjs
        //   .send("service_vy20ypd", "template_9tfhrs5", templateParams)
        //   .then(
        //     function (response) {
        //       // console.log("SUCCESS!", response.status, response.text);
        //     },
        //     function (error) {
        //       console.log("FAILED...", error.message);
        //     }
        //   );

        // return false;
      },
    });
  }

  allWells.hide();
  // $('step-1').show();

  fillanothe.click(function () {
    $("/step-1").trigger("click");
  });

  navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr("href")),
      $item = $(this);

    if (!$item.hasClass("disabled")) {
      navListItems.removeClass("btn-primary").addClass("btn-default");
      $item.addClass("btn-primary");
      allWells.hide();
      $target.show();
      // $target.find('input:eq(0)').focus();
    }
  });

  allPreviousBtn.click(function () {
    var curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
        .parent()
        .prev()
        .children("a"),
      curInputs = curStep.find("input[type='text'],input[type='url']"),
      isValid = true;
    $(".form-group").removeClass("has-error");
    for (var i = 0; i > curInputs.length; i++) {
      if (!curInputs[i].validity.valid) {
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
    }

    if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");
  });

  allNextBtn.click(function () {
    var curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
        .parent()
        .next()
        .children("a"),
      curInputs = curStep.find("input[type='text'],input[type='url'],input[type='email'],input[type='checkbox'],input[type='phone'],input[type='date'],input[type='radio']"),
      isValid = true;

    $(".form-group").removeClass("has-error");
    for (var i = 0; i < curInputs.length; i++) {
      if (!curInputs[i].validity.valid) {
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
    }

    if (isValid) {
      setTimeout(function () {
        nextStepWizard.removeAttr("disabled").trigger("click");
      }, 250);
    }
  });

  $("div.setup-panel div a.btn-primary").trigger("click");
  // US phone number validation
$.validator.addMethod("phoneUS", function(Phone, element) {
  Phone = Phone.replace(/\s+/g, "");
  const validity = this.optional(element) || Phone.length > 9 && 
  Phone.match(/^(\([0-9]\d{2}\)|[0-9]\d{2})-?[0-9]\d{2}-?\d{4}$/);
  if (validity){
    $(element).get(0).setCustomValidity('');
  }
  else{
    $(element).get(0).setCustomValidity('Invalid');
  }
  return validity;

}, "Please specify valid 10 digit phone number");



// date of birth validation
$.validator.addMethod("minAge", function(value, element) {
  const popupService = $('input[name=Service]:checked').val();
  const formService = $('input[name=Service]').val();
  const service = popupService?popupService:formService;
  var min = service === "reverse_mortgage"?60:20;
  var today = new Date();
  var birthDate = new Date(value);
  var age = today.getFullYear() - birthDate.getFullYear();

  if (age > min+1) {
    $(element).get(0).setCustomValidity('');
    return true; }

  var m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }

  const validAge = age >= min;
  if (validAge){
    $(element).get(0).setCustomValidity('');
  }
  else{
    $(element).get(0).setCustomValidity('Invalid');
  }
  return validAge; 
}, "You are age is not old enough!");

date_of_birth.max = new Date().toISOString().split("T")[0];

$.validator.addMethod("zipcode", function(value, element) {
  const validZipcode = this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
  
  if (validZipcode){
    $(element).get(0).setCustomValidity('');

  }
  else{
    $(element).get(0).setCustomValidity('Invalid');
  }
  return validZipcode;
}, "Please provide a valid zipcode.");
});


