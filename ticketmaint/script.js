// TicketMaint - Sistema de Chamados de Manutenção (com API Flask)

const API_BASE = "http://localhost:5000/api";

// === Utilitários ===
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString("pt-BR");
}

// === Funções de API ===
async function getChamados() {
  try {
    const response = await fetch(`${API_BASE}/chamados`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar chamados:", error);
    return [];
  }
}

async function criarChamado(dados) {
  try {
    const response = await fetch(`${API_BASE}/chamados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar chamado:", error);
    return null;
  }
}

async function atualizarChamado(id, dados) {
  try {
    const response = await fetch(`${API_BASE}/chamados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar chamado:", error);
    return null;
  }
}

async function deletarChamado(id) {
  try {
    await fetch(`${API_BASE}/chamados/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Erro ao deletar chamado:", error);
  }
}

async function limparTudo() {
  try {
    await fetch(`${API_BASE}/chamados`, { method: "DELETE" });
  } catch (error) {
    console.error("Erro ao limpar tudo:", error);
  }
}

// === FORMULÁRIO (index.html) ===
const formChamado = document.getElementById("formChamado");
if (formChamado) {
  formChamado.addEventListener("submit", async function (e) {
    e.preventDefault();

    const maquina = document.getElementById("maquina").value;
    const setor = document.getElementById("setor").value || "Não informado";
    const gravidade = document.getElementById("gravidade").value;
    const operador = document.getElementById("operador").value || "Anônimo";
    const descricao = document.getElementById("descricao").value;

    if (!maquina || !gravidade) {
      alert("Por favor, preencha os campos obrigatórios!");
      return;
    }

    const chamado = {
      maquina,
      setor,
      gravidade,
      operador,
      descricao,
    };

    const resultado = await criarChamado(chamado);

    if (resultado) {
      alert("✓ Chamado enviado com sucesso!");
      formChamado.reset();
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    } else {
      alert("Erro ao criar chamado!");
    }
  });
}

// === DASHBOARD (dashboard.html) ===
const listaChamados = document.getElementById("listaChamados");
const totalCount = document.getElementById("totalCount");
const pendentesCount = document.getElementById("pendentesCount");
const emReparoCount = document.getElementById("emReparoCount");
const concluidoCount = document.getElementById("concluidosCount");
const searchInput = document.getElementById("search");
const filterGravidade = document.getElementById("filterGravidade");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const exportJsonBtn = document.getElementById("exportJsonBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

async function renderizar() {
  if (!listaChamados) return;

  const chamados = await getChamados();

  // Atualizar estatísticas
  if (totalCount) totalCount.textContent = chamados.length;
  if (pendentesCount)
    pendentesCount.textContent = chamados.filter(
      (c) => c.status === "Pendente",
    ).length;
  if (emReparoCount)
    emReparoCount.textContent = chamados.filter(
      (c) => c.status === "Em Reparo",
    ).length;
  if (concluidoCount)
    concluidoCount.textContent = chamados.filter(
      (c) => c.status === "Concluído",
    ).length;

  // Filtros
  const searchTerm = (searchInput?.value || "").toLowerCase();
  const filterValue = filterGravidade?.value || "all";

  // Filtrar chamados
  const filtrados = chamados.filter((chamado) => {
    const matchBusca =
      !searchTerm ||
      chamado.maquina.toLowerCase().includes(searchTerm) ||
      chamado.setor.toLowerCase().includes(searchTerm) ||
      chamado.operador.toLowerCase().includes(searchTerm);

    const matchGrav =
      filterValue === "all" || chamado.gravidade === filterValue;

    return matchBusca && matchGrav;
  });

  // Renderizar tickets
  listaChamados.innerHTML = "";

  if (filtrados.length === 0) {
    listaChamados.innerHTML =
      '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;"><div style="font-size: 48px;">📭</div><p style="color: #999; font-size: 16px; margin-top: 15px;">Nenhum chamado encontrado</p></div>';
    return;
  }

  filtrados.forEach((chamado) => {
    const statusClass = `status-${chamado.status.toLowerCase().replace(" ", "")}`;
    const badgeClass = chamado.gravidade.toLowerCase();

    const badgeEmoji =
      {
        baixa: "🟢",
        média: "🟡",
        alta: "🔴",
      }[badgeClass] || "⚪";

    const acoes =
      chamado.status === "Pendente"
        ? `<button onclick="iniciarReparo('${chamado.id}')" style="flex: 1; padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🔧 Iniciar Reparo</button>`
        : chamado.status === "Em Reparo"
          ? `<button onclick="concluirReparo('${chamado.id}')" style="flex: 1; padding: 8px 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">✓ Concluir</button>`
          : "";

    const ticketHtml = `
      <div class="ticket ${statusClass}">
        <h3>${chamado.maquina}</h3>
        <div class="meta">
          <span class="badge ${badgeClass}">${badgeEmoji} ${chamado.gravidade}</span>
          <span>${chamado.setor}</span>
        </div>
        <p><strong>Operador:</strong> ${chamado.operador}</p>
        <p>${chamado.descricao}</p>
        <div class="meta">${formatDate(chamado.data)}</div>
        <div class="actions" style="display: flex; gap: 8px; margin-top: 15px; flex-wrap: wrap;">
          ${acoes}
          <button onclick="excluirChamado('${chamado.id}')" style="flex: 1; padding: 8px 12px; background: #f0f0f0; color: #666; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🗑️ Excluir</button>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; font-weight: 600;">
          Status: ${chamado.status}
        </div>
      </div>
    `;

    listaChamados.innerHTML += ticketHtml;
  });
}

async function iniciarReparo(id) {
  await atualizarChamado(id, { status: "Em Reparo" });
  await renderizar();
}

async function concluirReparo(id) {
  await atualizarChamado(id, { status: "Concluído" });
  await renderizar();
}

async function excluirChamado(id) {
  if (confirm("Tem certeza que deseja excluir este chamado?")) {
    await deletarChamado(id);
    await renderizar();
  }
}

async function exportarCSV() {
  const chamados = await getChamados();

  let csv = "ID,Máquina,Setor,Gravidade,Operador,Status,Data,Descrição\n";

  chamados.forEach((c) => {
    const desc = c.descricao.replace(/"/g, '""');
    csv += `${c.id},"${c.maquina}","${c.setor}","${c.gravidade}","${c.operador}","${c.status}","${c.data}","${desc}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `chamados_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function exportarJSON() {
  const chamados = await getChamados();
  const json = JSON.stringify(chamados, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `chamados_backup_${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function limparTudoConfirm() {
  if (
    confirm(
      "Tem certeza que deseja deletar TODOS os chamados? Esta ação não pode ser desfeita!",
    )
  ) {
    await limparTudo();
    await renderizar();
  }
}

// Event listeners do dashboard
if (searchInput) searchInput.addEventListener("input", renderizar);
if (filterGravidade) filterGravidade.addEventListener("change", renderizar);
if (exportCsvBtn) exportCsvBtn.addEventListener("click", exportarCSV);
if (exportJsonBtn) exportJsonBtn.addEventListener("click", exportarJSON);
if (clearAllBtn) clearAllBtn.addEventListener("click", limparTudoConfirm);

// Carregar dashboard ao iniciar
if (listaChamados) {
  renderizar();
  setInterval(renderizar, 2000); // Atualiza a cada 2 segundos
}
