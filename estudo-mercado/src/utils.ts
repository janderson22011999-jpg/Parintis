import { CotacaoForm, Lote, LOTE_A_ITEMS, LOTE_B_ITEMS } from "./types";

const emptyItem = () => ({ marcaModelo: "", precoUnitarioBRL: "", precoUnitarioUSD: "", observacoes: "" });

export function makeInitialState(lote: Lote): CotacaoForm {
  const items = lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  return {
    lote,
    fornecedor: {
      razaoSocial: "", cnpj: "", responsavel: "", email: "",
      telefone: "", cidadeEstado: "", dataCotacao: new Date().toISOString().split("T")[0],
    },
    itens: items.map(() => emptyItem()),
    condicoes: {
      prazoEntrega: "30 dias corridos", validadeProposta: "60 dias",
      incluiImpostos: false, incluiFrete: false, observacoesGerais: "",
      concordaDeclaracao: false,
    },
  };
}

export function parseBRL(val: string): number {
  return parseFloat(val.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
}

export function calcTotalBRL(form: CotacaoForm): number {
  const items = form.lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  return form.itens.reduce((sum, it, i) => sum + parseBRL(it.precoUnitarioBRL) * items[i].quantidade, 0);
}

export function calcTotalUSD(form: CotacaoForm): number {
  const items = form.lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  return form.itens.reduce((sum, it, i) => sum + parseBRL(it.precoUnitarioUSD) * items[i].quantidade, 0);
}

export function formatBRL(val: number): string {
  return val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function validateForm(form: CotacaoForm): string[] {
  const errors: string[] = [];
  const f = form.fornecedor;
  if (!f.razaoSocial.trim()) errors.push("Razão social é obrigatória.");
  if (!f.cnpj.trim()) errors.push("CNPJ é obrigatório.");
  if (!f.responsavel.trim()) errors.push("Nome do responsável é obrigatório.");
  if (!f.email.trim()) errors.push("E-mail é obrigatório.");
  const items = form.lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  form.itens.forEach((it, i) => {
    if (!it.marcaModelo.trim()) errors.push(`Item ${items[i].id}: informe a marca/modelo.`);
    if (!it.precoUnitarioBRL.trim()) errors.push(`Item ${items[i].id}: informe o preço unitário em BRL.`);
  });
  if (!form.condicoes.concordaDeclaracao) errors.push("É necessário concordar com a declaração de veracidade.");
  return errors;
}

export function formatToEmail(form: CotacaoForm): string {
  const items = form.lote === "A" ? LOTE_A_ITEMS : LOTE_B_ITEMS;
  const numero = form.lote === "A" ? "SDC-NGUTUPA-C1-011A-2026" : "SDC-NGUTUPA-C1-011B-2026";
  const nomeLote = form.lote === "A"
    ? "Lote A — Informática, Comunicação e Energia"
    : "Lote B — Audiovisual, Iluminação e Segurança";
  const sep = "=".repeat(58);
  const f = form.fornecedor;

  const linhasItens = items.map((item, i) => {
    const cot = form.itens[i];
    const totalBRL = parseBRL(cot.precoUnitarioBRL) * item.quantidade;
    const totalUSD = parseBRL(cot.precoUnitarioUSD) * item.quantidade;
    return [
      `Item ${String(item.id).padStart(2, "0")} — ${item.descricao}`,
      `  Qtd: ${item.quantidade} ${item.unidade}`,
      `  Marca/Modelo Ofertado: ${cot.marcaModelo || "—"}`,
      `  Preço Unitário (BRL): R$ ${cot.precoUnitarioBRL || "—"}`,
      `  Preço Total (BRL):    R$ ${formatBRL(totalBRL)}`,
      totalUSD > 0 ? `  Preço Unitário (USD): US$ ${cot.precoUnitarioUSD}` : "",
      totalUSD > 0 ? `  Preço Total (USD):    US$ ${formatBRL(totalUSD)}` : "",
      cot.observacoes ? `  Observações: ${cot.observacoes}` : "",
    ].filter(Boolean).join("\n");
  }).join("\n\n");

  return `COTAÇÃO DE EQUIPAMENTOS — NGUTAPA
${nomeLote}
Processo: ${numero}
Data: ${f.dataCotacao}

${sep}
DADOS DO FORNECEDOR
${sep}
Razão Social: ${f.razaoSocial}
CNPJ: ${f.cnpj}
Responsável: ${f.responsavel}
E-mail: ${f.email}
Telefone: ${f.telefone}
Cidade/Estado: ${f.cidadeEstado}

${sep}
ITENS COTADOS
${sep}
${linhasItens}

${sep}
VALOR TOTAL ESTIMADO
${sep}
Total Geral (BRL): R$ ${formatBRL(calcTotalBRL(form))}
${calcTotalUSD(form) > 0 ? `Total Geral (USD): US$ ${formatBRL(calcTotalUSD(form))}` : ""}

${sep}
CONDIÇÕES
${sep}
Prazo de Entrega: ${form.condicoes.prazoEntrega}
Validade da Proposta: ${form.condicoes.validadeProposta}
Preços incluem impostos: ${form.condicoes.incluiImpostos ? "Sim" : "Não"}
Preços incluem frete até Vila Bethania SAI: ${form.condicoes.incluiFrete ? "Sim" : "Não"}
${form.condicoes.observacoesGerais ? `Observações Gerais: ${form.condicoes.observacoesGerais}` : ""}

${sep}
DECLARAÇÃO
${sep}
O fornecedor declara que os preços cotados refletem os valores reais praticados
no mercado e que os equipamentos atendem às especificações técnicas mínimas
exigidas no processo ${numero}.
Concordância: SIM — assinada eletronicamente.
`;
}
