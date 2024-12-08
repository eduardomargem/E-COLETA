from flask import Flask, jsonify, request
import mysql.connector
import uuid

app = Flask(__name__)



def get_db_connection():
    connection = mysql.connector.connect(
        host="127.0.0.1",  
        port="3306",   
        user="root",  
        password="admin", 
        database="bancopi"
    )
    return connection

#Cria conta
@app.route('/criaConta', methods=['POST'])
def register():
   
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    if not nome or not email or not senha:
        return jsonify({"message": "Todos os campos são obrigatórios!"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM usuarios WHERE email = %s", (email,))
        usuario_existente = cursor.fetchone()

        if usuario_existente:
            return jsonify({"message": "E-mail já cadastrado!"}), 400

        cursor.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)",
            (nome, email, senha)
        )
        connection.commit()  

        return jsonify({"message": "Conta criada!"}), 201

    except mysql.connector.Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return jsonify({"message": "Erro ao conectar ao banco de dados."}), 500

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()



#Fazer Login
@app.route('/login', methods=['POST'])
def login_entrar():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"message" : "Preencha todos os campos"}), 400
 
    try:

        connection = get_db_connection()
        cursor = connection.cursor()

        consulta = "SELECT * FROM usuarios WHERE email = %s AND senha = %s"
        cursor.execute(consulta, (email, senha))

        usuario = cursor.fetchone()

        if usuario:
            return jsonify({"retorno" : "Login bem sucedido", "usuario_id" : usuario[0], "Usuario nome" : usuario[1], "pontos" : usuario[4]}), 200
        else:
            return jsonify({"retorno" : "E-mail ou senha inválidos"}), 401
        
    except mysql.connector.Error as e:
        return jsonify({"retorno" : "Erro ao consultar o banco de dados"})
    finally:
        cursor.close
        connection.close
    

#Efetuar uma compra
@app.route('/efetuarCompra', methods=['POST'])
def efetuar_compra():
    try:
        dados = request.get_json()

        if not dados:
            return jsonify({"retorno": "Campos faltando"}), 400
        
        id = dados.get("id")
        nome = dados.get("nome")
        email = dados.get("email")
        preco = dados.get("preco")
        obj = dados.get("obj")
        data = dados.get("data")

        # Verifica se todos os dados necessários foram fornecidos
        if not all([id, nome, email, preco, obj, data]):
            return jsonify({"retorno": "Campos obrigatórios faltando"}), 400

        conexao = get_db_connection()
        cursor = conexao.cursor()

        
        verificaSaldo = "SELECT pontos FROM usuarios WHERE id = %s"
        cursor.execute(verificaSaldo, (id,))
        usuario = cursor.fetchone()

        if usuario is None:
            return jsonify({"retorno": "Usuario não encontrado"}), 404

        
        pontos = int(usuario[0])

        if pontos < preco:
            return jsonify({"retorno": "Saldo insuficiente"}), 400
    
       
        codigo = str(uuid.uuid4()) 

        query = """
        INSERT INTO compras 
        (codigo_compra, id_usuario, data_hora, nome_usuario, email_usuario, preco, objeto_comprado)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (codigo, id, data, nome, email, preco, obj))

        # Atualiza os pontos do usuário após a compra
        update = "UPDATE usuarios SET pontos = pontos - %s WHERE id = %s"
        cursor.execute(update, (preco, id))

        conexao.commit()

        return jsonify({"retorno": "Compra efetuada", "codigo_compra": codigo}), 200
    
    except mysql.connector.Error as e:
        return jsonify({"retorno": "Erro ao conectar no banco", "erro": str(e)}), 500
    
    except Exception as e:
        return jsonify({"retorno": "Erro interno", "erro": str(e)}), 500
    
    finally:
        cursor.close()
        conexao.close()


#BuscarCompra
@app.route('/buscaCompra/<codigo_compra>', methods=["GET"])
def buscaCompra(codigo_compra):
    try:
   
        if not codigo_compra:
            return jsonify({"retorno": "Código da compra não fornecido."}), 400
        
        conexao = get_db_connection()
        cursor = conexao.cursor()

    
        cursor.execute("SELECT * FROM compras WHERE codigo_compra = %s", (codigo_compra,))
        compra = cursor.fetchone()

        if compra is None:
            return jsonify({"retorno": "Nenhuma compra com esse código"}), 404
        
     
        dados_compra = {
            "codigo_compra": compra[0],
            "id_usuario": compra[1],
            "data_hora": compra[2].strftime("%Y-%m-%d %H:%M:%S"),
            "nome_usuario": compra[3],
            "email_usuario": compra[4],
            "preco": float(compra[5]),
            "objeto_comprado": compra[6]
        }

        return jsonify(dados_compra), 200

    except mysql.connector.Error as e:
        
        return jsonify({"retorno": "Erro ao conectar ao banco de dados. Detalhes: " + str(e)}), 500
    
    except Exception as e:
        
        return jsonify({"retorno": "Erro inesperado. Detalhes: " + str(e)}), 500

    finally:
        cursor.close()
        conexao.close


app.run(port=5000, host='localhost', debug=True)
