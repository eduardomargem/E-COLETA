$(document).ready(function() {
    $('#send-code').click(function() {
        // Verifica se os campos estão preenchidos corretamente
        const username = $('#username').val().trim();
        const email = $('#email').val().trim();
        const cmail = $('#cmail').val().trim();

        if (!username || !email || !cmail) {
            Swal.fire({
                title: 'Erro!',
                text: 'Por favor, preencha todos os campos.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        if (email !== cmail) {
            Swal.fire({
                title: 'Erro!',
                text: 'Os e-mails não coincidem. Por favor, verifique.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Alerta de sucesso
        Swal.fire({
            title: 'Código enviado!',
            text: 'O código foi enviado para seu e-mail.',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                
                window.location.href = 'login.html';
            }
        });
    });
});
