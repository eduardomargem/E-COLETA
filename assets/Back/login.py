async function Login(email, senha) {
    const url = "http://localhost:5000/login"; // URL do endpoint

    const data = {
        email: email,
        senha: senha,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(Erro: ${response.statusText});
        }

        const result = await response.json();
        console.log("Resposta da API:", result); 
        return result; // Retorna o JSON recebido da API
    } catch (error) {
        console.error("Erro ao fazer login:", error.message);
    }
}

// Exemplo de uso:
Login("usuario@example.com", "senha123")
    .then(response => {
        console.log("Resultado do Login:", response);
    })
    .catch(err => {
        console.error("Erro capturado:", err);
    });