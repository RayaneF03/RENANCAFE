from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from pathlib import Path

app = Flask(__name__, template_folder='ticketmaint', static_folder='ticketmaint', static_url_path='')
CORS(app)

# Arquivo de armazenamento de dados
DATA_FILE = 'chamados.json'

def load_chamados():
    """Carrega os chamados do arquivo JSON"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_chamados(chamados):
    """Salva os chamados no arquivo JSON"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(chamados, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    """Página inicial - Formulário"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Página do painel"""
    return render_template('dashboard.html')

@app.route('/api/chamados', methods=['GET'])
def get_chamados():
    """Retorna todos os chamados"""
    return jsonify(load_chamados())

@app.route('/api/chamados', methods=['POST'])
def criar_chamado():
    """Cria um novo chamado"""
    dados = request.json
    chamados = load_chamados()
    
    novo_chamado = {
        'id': str(int(datetime.now().timestamp() * 1000)),
        'maquina': dados.get('maquina'),
        'setor': dados.get('setor', ''),
        'gravidade': dados.get('gravidade'),
        'operador': dados.get('operador', ''),
        'descricao': dados.get('descricao', ''),
        'status': 'Pendente',
        'data': datetime.now().isoformat(),
        'dataAbertura': datetime.now().strftime('%d/%m/%Y, %H:%M:%S')
    }
    
    chamados.insert(0, novo_chamado)
    save_chamados(chamados)
    
    return jsonify(novo_chamado), 201

@app.route('/api/chamados/<chamado_id>', methods=['PUT'])
def atualizar_chamado(chamado_id):
    """Atualiza um chamado"""
    dados = request.json
    chamados = load_chamados()
    
    for chamado in chamados:
        if chamado['id'] == chamado_id:
            if 'status' in dados:
                chamado['status'] = dados['status']
                if dados['status'] == 'Em Reparo':
                    chamado['dataInicio'] = datetime.now().isoformat()
                elif dados['status'] == 'Concluído':
                    chamado['dataConclusao'] = datetime.now().isoformat()
            
            chamado.update(dados)
            save_chamados(chamados)
            return jsonify(chamado)
    
    return jsonify({'erro': 'Chamado não encontrado'}), 404

@app.route('/api/chamados/<chamado_id>', methods=['DELETE'])
def deletar_chamado(chamado_id):
    """Deleta um chamado"""
    chamados = load_chamados()
    chamados = [c for c in chamados if c['id'] != chamado_id]
    save_chamados(chamados)
    return jsonify({'mensagem': 'Chamado deletado'}), 200

@app.route('/api/chamados', methods=['DELETE'])
def limpar_tudo():
    """Limpa todos os chamados"""
    save_chamados([])
    return jsonify({'mensagem': 'Todos os chamados foram removidos'}), 200

@app.route('/api/export/csv', methods=['GET'])
def export_csv():
    """Exporta chamados em CSV"""
    chamados = load_chamados()
    
    csv = 'ID,Máquina,Setor,Gravidade,Operador,Status,Data,Descrição\n'
    for chamado in chamados:
        csv += f'{chamado["id"]},{chamado["maquina"]},{chamado["setor"]},{chamado["gravidade"]},{chamado["operador"]},{chamado["status"]},{chamado["data"]},"{chamado["descricao"]}"\n'
    
    return csv, 200, {'Content-Disposition': 'attachment; filename=chamados.csv', 'Content-Type': 'text/csv'}

@app.route('/api/export/json', methods=['GET'])
def export_json():
    """Exporta chamados em JSON"""
    chamados = load_chamados()
    return jsonify(chamados)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
