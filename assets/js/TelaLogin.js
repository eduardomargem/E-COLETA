$(document).ready(function () {
    // Animação para a página ao carregar
    $('body').hide().fadeIn(1000); 
  
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
            showError($(this), 'Usuário deve ter entre 6 e 50 caracteres.');
        } else {
            clearError($(this));
        }
    });
  
    $('#password').on('input', function () {
        var password = $(this).val().trim();
        if (password.length < 8 || password.length > 50) {
            showError($(this), 'Senha deve ter entre 8 e 50 caracteres.');
        } else {
            clearError($(this));
        }
    });
  
    $('#loginButton').click(function () {
        $('.error-message').remove(); // Remove mensagens de erro anteriores
  
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();
        var isValid = true;
  
        // Validação dos campos
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
  
        if (password.length < 8 || password.length > 50) {
            showError($('#password'), 'A senha deve ter entre 8 e 50 caracteres.');
            isValid = false;
        }
  
        // Se a validação passar, redireciona para a página index.html
        if (isValid) {
            $('body').append('<div class="success-message">Login bem-sucedido! Redirecionando...</div>');
            $('.success-message').hide().fadeIn(); 
            setTimeout(function () {
                $('body').fadeOut(1000, function () {
                    window.location.href = "index.html"; 
                }); 
            }, 2000); 
        }
  
        return false; 
    });
  });
  