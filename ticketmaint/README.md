# TicketMaint — Sistema de Gestão de Chamados de Manutenção Industrial

Um aplicativo web moderno e responsivo desenvolvido com **HTML, CSS e JavaScript puro**, projetado para gerenciar chamados de manutenção em ambiente de fábrica.

## ✨ Características

✅ Interface moderna com design responsivo  
✅ Criar e gerenciar chamados de manutenção  
✅ Sistema de status (Pendente, Em Reparo, Concluído)  
✅ Filtros por gravidade e busca inteligente  
✅ Exportar dados em CSV e backup JSON  
✅ Dados persistidos em localStorage (sem servidor necessário)  
✅ Funciona em tablets e computadores do chão de fábrica

## 🚀 Como Usar

### 1. Iniciar o servidor local

```bash
cd /Users/Aluno/RENANCAFE
python3 -m http.server 8000
```

### 2. Abrir no navegador

```
http://localhost:8000/ticketmaint/index.html
```

## 📋 Funcionalidades

### 📝 Página de Solicitação (index.html)

- Formulário intuitivo para criar novos chamados
- Seleção de máquina, setor, gravidade
- Campo de descrição do problema
- Registro automático do operador

### 📊 Painel de Controle (dashboard.html)

- Visualização de todos os chamados
- Estatísticas em tempo real (Total, Pendentes, Em Reparo, Concluídos)
- Busca e filtros por gravidade
- Ações rápidas (Iniciar Reparo, Concluir, Excluir)
- Exportar CSV e Backup JSON
- Limpar todos os dados

## 📁 Estrutura de Arquivos

```
ticketmaint/
├── index.html          # Página de solicitação
├── dashboard.html      # Painel de controle
├── style.css           # Estilos modernos
├── script.js           # Lógica principal
└── README.md           # Esta documentação
```

## 💾 Armazenamento de Dados

Todos os dados são armazenados localmente usando `localStorage` do navegador:

- **Chave**: `ticketmaint_chamados`
- **Formato**: JSON array

Os dados persistem entre sessões e não são enviados para nenhum servidor.

## 📥 Exportação de Dados

### CSV

Clique em **"📥 Exportar CSV"** no painel para baixar um arquivo com todos os chamados em formato CSV, compatível com Excel.

### JSON

Clique em **"💾 Backup JSON"** para fazer backup completo dos dados em formato JSON.

## 🌐 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Navegadores móveis (tablets/smartphones)

## 📱 Design Responsivo

A aplicação se adapta perfeitamente a qualquer tamanho de tela:

- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎨 Paleta de Cores

- **Primária**: #667eea (roxo)
- **Secundária**: #764ba2 (roxo escuro)
- **Sucesso**: #28a745 (verde)
- **Aviso**: #ffc107 (amarelo)
- **Informação**: #17a2b8 (azul)
- **Perigo**: #e74c3c (vermelho)

## 📝 Exemplo de Uso

1. **Criar um chamado**:
   - Acesse `index.html`
   - Selecione a máquina (ex: Injetora 01)
   - Informe o setor (ex: Linha A - Turno 1)
   - Selecione a gravidade (Baixa, Média, Alta)
   - Descreva o problema
   - Clique em "✓ Solicitar Suporte"

2. **Acompanhar chamados**:
   - Acesse `dashboard.html`
   - Visualize estatísticas em tempo real
   - Use filtros para buscar chamados específicos
   - Clique em "🔧 Iniciar Reparo" para marcar como em andamento
   - Clique em "✓ Concluir" quando o reparo estiver pronto

3. **Exportar dados**:
   - No painel, clique em "📥 Exportar CSV" ou "💾 Backup JSON"
   - O arquivo será baixado automaticamente

## 🔒 Privacidade

- Todos os dados ficam armazenados apenas no navegador local
- Nenhuma informação é enviada para servidores externos
- Os dados só são compartilhados se você exportá-los manualmente

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, você pode:

- Verificar se o localStorage está habilitado no navegador
- Limpar o cache do navegador se houver problemas
- Usar "🗑️ Limpar Tudo" para resetar completamente os dados

---

**TicketMaint © 2026**  
Transformando manutenção em produtividade
