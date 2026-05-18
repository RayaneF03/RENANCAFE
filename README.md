# TicketMaint - Gestão de Manutenção Industrial

Um sistema moderno e responsivo para gerenciamento de tickets de manutenção em ambientes industriais.

## 🎨 Features

- ✅ **Criar tickets** de manutenção com máquina, setor, gravidade e descrição
- ✅ **Painel de controle** com estatísticas em tempo real
- ✅ **Filtros inteligentes** por máquina, setor, operador e gravidade
- ✅ **Gerenciamento de status** (Pendente → Em Reparo → Concluído)
- ✅ **Exportação de dados** em CSV e JSON
- ✅ **Interface responsiva** para desktop, tablet e mobile
- ✅ **Design moderno** com gradiente roxo e animações suaves

## 🚀 Quick Start

### Instalação

1. **Instale as dependências:**

```bash
pip install -r requirements.txt
```

2. **Navegue para a pasta do projeto:**

```bash
cd /Users/Aluno/RENANCAFE
```

3. **Inicie o servidor Flask:**

```bash
python3 app.py
```

4. **Abra no navegador:**

```
http://localhost:5000
```

## 📁 Estrutura do Projeto

```
RENANCAFE/
├── app.py                 # Servidor Flask (API)
├── requirements.txt       # Dependências Python
├── chamados.json         # Dados dos chamados (gerado automaticamente)
├── README.md             # Este arquivo
└── ticketmaint/
    ├── index.html        # Formulário de solicitação
    ├── dashboard.html    # Painel de controle
    ├── style.css         # Estilos modernos
    └── script.js         # Lógica JavaScript com API
```

## 🔧 Tecnologia

- **Backend:** Flask + Flask-CORS
- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Dados:** JSON (chamados.json)
- **Fonte:** Google Fonts Poppins

## 📊 API Endpoints

| Método | Endpoint             | Descrição               |
| ------ | -------------------- | ----------------------- |
| GET    | `/api/chamados`      | Lista todos os chamados |
| POST   | `/api/chamados`      | Cria novo chamado       |
| PUT    | `/api/chamados/<id>` | Atualiza chamado        |
| DELETE | `/api/chamados/<id>` | Deleta chamado          |
| DELETE | `/api/chamados`      | Limpa todos os chamados |
| GET    | `/api/export/csv`    | Exporta em CSV          |
| GET    | `/api/export/json`   | Exporta em JSON         |

## 💾 Dados Armazenados

Cada chamado contém:

- ID único (timestamp)
- Máquina (obrigatório)
- Setor
- Gravidade (Baixa, Média, Alta) - obrigatório
- Operador
- Descrição
- Status (Pendente, Em Reparo, Concluído)
- Data e hora de criação
- Data/hora de início (quando muda para Em Reparo)
- Data/hora de conclusão (quando muda para Concluído)

## 🎯 Workflow Típico

1. Operário clica em "Solicitar Suporte" (index.html)
2. Preenche formulário com dados da máquina e problema
3. Envio cria ticket com status "Pendente"
4. Ticket aparece no painel (dashboard.html)
5. Técnico clica "Iniciar Reparo" (muda para "Em Reparo")
6. Técnico clica "Concluir" quando reparo termina (muda para "Concluído")
7. Dados podem ser exportados para análise posterior

## 📱 Responsividade

- **Desktop (1200px+):** Layout completo com grid de 3 colunas
- **Tablet (768px-1199px):** Layout otimizado com 2 colunas
- **Mobile (<768px):** Layout vertical com uma coluna

## 🎨 Paleta de Cores

- Primária: Roxo Gradiente (#667eea → #764ba2)
- Fundo: Branco (#ffffff)
- Texto: Cinza escuro (#333333)
- Borda: Cinza claro (#e0e0e0)

Badges:

- 🟢 Baixa: Verde (#10b981)
- 🟡 Média: Amarelo (#f59e0b)
- 🔴 Alta: Vermelho (#e74c3c)

## 📝 Licença

Projeto interno para RENANCAFE.
