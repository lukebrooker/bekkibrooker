
(function ($) {
  'use strict'

  $('#contact-form').submit(function(e) {
    var $email = $('#email'),
        $name = $('#name'),
        $typeContainer = $('#type'),
        $type = $('#type').find('[name=contact-type]'),
        $typeSelected = $type.filter(':checked'),
        $msg = $('#msg'),
        $human = $('#human'),
        $submit = $('#submit'),
        $formFields = $('#contact-form-fields'),
        $formFieldsInputs =  $formFields.find('input, textarea'),
        $formResponse = $('#contact-form-response'),
        subject = '',
        message = $msg[0].value;

    e.preventDefault();

    $formFields.find('input, textarea').on('keyup change', function() {
      var $this = $(this);
      if ($this.val() !== '') {
        $this.removeClass('is-error')
          .next('.Form-error').remove();
      }
    });

    $formFields.find('input[type=radio]').on('click', function() {
      var $this = $(this);
      $this.parents('.is-error').removeClass('is-error')
        .next('.Form-error').remove();
    });

    // Detect Bots
    if ($human.val() !== '') {
      return false;
    }

    if ($name.val() === '') {
      attachError($name, 'Please enter your name.');
      return false;
    }

    if ($email.val() === '') {
      attachError($email, 'Please enter a valid email address.');
      return false;
    }

    if (!$typeSelected.length) {
      attachError($typeContainer,
        'Please choose which type of enquiry this is.');
      return false;
    }

    if (message === '') {
      attachError($msg, 'Please enter a message.');
      return false;
    }

    switch($typeSelected[0].value) {
      case 'type-wedding':
        subject = 'Wedding Hair Enquiry';
        break;
      case 'type-formal':
        subject = 'Formal Hair Enquiry';
        break;
      case 'type-fashion':
        subject = 'Fashion & Photo Shoot Enquiry';
        break;
      case 'type-general':
        subject = 'General Enquiry';
        break;
    }

    $formFields.addClass('is-sending')
    $formFieldsInputs.attr('disabled', 'disabled')
    $submit.text('Sending…')
      .addClass('is-active')
      .attr('disabled', 'disabled')

    $.ajax({
      async: true,
      crossDomain: true,
      url: 'https://api.sendgrid.com/api/mail.send.json',
      method: 'POST',
      headers: {
        authorization: 'Bearer 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',
        'cache-control': 'no-cache'
      },
      data: {
        to: 'hair@bekkibrooker.com',
        toname: 'Bekki Brooker',
        from: $email.val(),
        fromname: $name.val(),
        replyto: $email.val(),
        subject: subject,
        text: message
      }
    })
    .done(function(response) {
      // show success message
      // reset field after successful submission
      $name.val('');
      $email.val('');
      $type.prop('checked', false);
      $msg.val('');
      $submit.text('Message Sent');
      $formResponse.addClass('is-active');
    })
    .fail(function(response) {
      console.log('Error sending message.', response);
    });
    return false; // prevent page refresh
  });

  $('#contact-form-response-close').on('click', function(e) {
    var $formFields = $('#contact-form-fields'),
        $formFieldsInputs =  $formFields.find('input, textarea');
    e.preventDefault();
    $('#contact-form-response').removeClass('is-active');
    $formFields.removeClass('is-sending');
    $formFieldsInputs.removeAttr('disabled');
    $('#submit')
      .text('Send')
      .removeClass('is-active')
      .removeAttr('disabled');
  });

  function attachError($target, error) {
    var fieldOffset = $target.offset().top - 80,
        $targetError = $target.next('.Form-error');

    if ($targetError) {
      $targetError.remove();
    }

    $target.addClass('is-error').focus()
      .after('<div class="Form-error">' + error + '</div>');

    $('html, body').animate({
      scrollTop: fieldOffset
    }, 300);
  }
}(jQuery || $))
