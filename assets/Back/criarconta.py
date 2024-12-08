async function CriaConta(nome, email, senha) {
    const url = "http://localhost:5000/register"; // URL do endpoint

    const data = {
        nome: nome,
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
        console.log("Resposta da API:", result); // Exibe a string de resposta
        return result; // Retorna o JSON recebido da API
    } catch (error) {
        console.error("Erro ao criar conta:", error.message);
    }
}

// Exemplo de uso:
CriaConta("João Silva", "joao.silva@example.com", "senhaSegura123")
    .then(response => {
        console.log("Resultado da criação de conta:", response);
    })
    .catch(err => {
        console.error("Erro capturado:", err);
    });