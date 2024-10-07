$(document).ready(function () {
  // Animação para a página ao carregar
  $('body').hide().fadeIn(1000); // Animação de fade-in em 1 segundo


  function showError(element, message) {
      element.next('.error-message').remove();
      element.after('<span class="error-message">' + message + '</span>');
      element.next('.error-message').fadeIn(); // Animação de fade in
  }

  function clearError(element) {
      element.next('.error-message').fadeOut(function () { // Animação de fade out
          $(this).remove();
      });
  }


  $('#username').on('input', function () {
      var username = $(this).val().trim();
      if (username.length < 6 || username.length > 50) {
          showError($(this), 'usuário deve ter entre 6 e 50 caracteres.');
      } else {
          clearError($(this));
      }
  });

  $('#password').on('input', function () {
      var password = $(this).val().trim();
      if (password.length < 8 || password.length > 50) {
          showError($(this), 'senha deve ter entre 8 e 50 caracteres.');
      } else {
          clearError($(this));
      }
  });

  $('#loginButton').click(function () {

      $('.error-message').remove();

      var username = $('#username').val().trim();
      var password = $('#password').val().trim();


      var isValid = true;

      if (username === '') {
          showError($('#username'), 'Por favor, insira o nome de usuário.');
          isValid = false;
      }

      if (password === '') {
          showError($('#password'), 'Por favor, insira a senha.');
          isValid = false;
      }


      if (username.length < 6 || username.length > 50) {
          showError($('#username'), 'O nome de usuário deve ter entre 6 e 50 caracteres.');
          isValid = false;
      }

      // Verificando o comprimento da senha
      if (password.length < 8 || password.length > 50) {
          showError($('#password'), 'A senha deve ter entre 8 e 50 caracteres.');
          isValid = false;
      }

      
      if (isValid) {
          $('body').append('<div class="success-message">Login bem-sucedido! Redirecionando...</div>');
          $('.success-message').hide().fadeIn(); // Animação de fade in para a mensagem de sucesso
          setTimeout(function () {
              dor
              $('body').fadeOut(1000, function () {
                  window.location.href = "index.html";
              }); 
          }, 2000); 
      }

      return false;
  });
});
