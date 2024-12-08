async function EfetuarCompra(id, nome, email, preco, obj, data) {
    const url = "http://localhost:5000/efetuarCompra"; // URL do endpoint

    const dataToSend = {
        id: id,
        nome: nome,
        email: email,
        preco: preco,
        obj: obj,
        data: data,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error(Erro: ${response.statusText});
        }

        const result = await response.json();
        console.log("Resposta da API:", result); // Exibe a string de resposta
        return result; // Retorna o JSON recebido da API
    } catch (error) {
        console.error("Erro ao efetuar compra:", error.message);
    }
}

// Exemplo de uso:
EfetuarCompra(
    1, 
    "João Silva", 
    "joao.silva@example.com", 
    150.00, 
    "Produto X", 
    new Date().toISOString()
)
    .then(response => {
        console.log("Resultado da compra:", response);
    })
    .catch(err => {
        console.error("Erro capturado:", err);
    });