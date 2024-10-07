$(document).ready(function () {
  // Máscaras para CPF, Telefone e CEP
  $('#cpf').mask('000.000.000-00', { reverse: true });
  $('#phone').mask('(00) 00000-0000');
  $('#cep').mask('00000-000');

  $('#registerButton').click(function () {
      let isValid = true;

      // Validações dos campos
      const username = $('#username').val();
      if (username.trim() === '') {
          showError('#username', 'Por favor, insira um apelido.');
          isValid = false;
      } else {
          clearError('#username');
      }

      const email = $('#email').val();
      if (email.trim() === '') {
          showError('#email', 'Por favor, insira um e-mail.');
          isValid = false;
      } else if (!validateEmail(email)) {
          showError('#email', 'Por favor, insira um e-mail válido.');
          isValid = false;
      } else {
          clearError('#email');
      }

      const cmail = $('#cmail').val();
      if (cmail !== email) {
          showError('#cmail', 'Os e-mails não coincidem.');
          isValid = false;
      } else {
          clearError('#cmail');
      }

      const password = $('#password').val();
      if (password.length < 6) {
          showError('#password', 'A senha deve ter no mínimo 6 caracteres.');
          isValid = false;
      } else {
          clearError('#password');
      }

      const cpassword = $('#cpassword').val();
      if (cpassword !== password) {
          showError('#cpassword', 'As senhas não coincidem.');
          isValid = false;
      } else {
          clearError('#cpassword');
      }

      const cpf = $('#cpf').val();
      if (cpf.trim() === '' || cpf.length !== 14) {
          showError('#cpf', 'Por favor, insira um CPF válido.');
          isValid = false;
      } else {
          clearError('#cpf');
      }

      const phone = $('#phone').val();
      if (phone.trim() === '' || phone.length < 14) {
          showError('#phone', 'Por favor, insira um telefone válido.');
          isValid = false;
      } else {
          clearError('#phone');
      }

      const address = $('#address').val();
      if (address.trim() === '') {
          showError('#address', 'Por favor, insira um endereço.');
          isValid = false;
      } else {
          clearError('#address');
      }

      const number = $('#number').val();
      if (number.trim() === '') {
          showError('#number', 'Por favor, insira um número.');
          isValid = false;
      } else {
          clearError('#number');
      }

      const cep = $('#cep').val();
      if (cep.trim() === '' || cep.replace('-', '').length !== 8) {
          showError('#cep', 'Por favor, insira um CEP válido.');
          isValid = false;
      } else {
          clearError('#cep');
      }

      if (!$('#termo').is(':checked')) {
          Swal.fire('Atenção', 'Você deve aceitar os termos para continuar.', 'warning');
          isValid = false;
      }

      // Mensagem de sucesso
      if (isValid) {
          Swal.fire('Sucesso', 'Cadastro realizado com sucesso!', 'success');
          $('#registerForm')[0].reset();
          $('.error-message').text('').hide();
      }
  });

  function showError(input, message) {
      $(input).next('.error-message').text(message).show();
  }

  function clearError(input) {
      $(input).next('.error-message').text('').hide();
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
});
