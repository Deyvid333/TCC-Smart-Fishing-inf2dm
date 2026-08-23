export const PEIXES_DISPONIVEIS = [
  'tilapia', 'dourado', 'carpa', 'pacu', 'tambaqui', 'pintado', 'traira',
  'curimbata', 'lambari', 'piau', 'patinga', 'jundia', 'matrinxa', 'tucunare',
  'tambacu', 'cachara', 'bicuda', 'trairao', 'catfish',
];

export const parseInformacao = (informacao) => {
  if (!informacao) return { regrasPermitido: '', regrasProibido: '' };
  const partes = informacao.split('|');
  return {
    regrasPermitido: partes.find((p) => p.startsWith('P:'))?.replace('P:', '') || '',
    regrasProibido: partes.find((p) => p.startsWith('X:'))?.replace('X:', '') || '',
  };
};

export const parseDescricao = (descricao) => {
  if (!descricao) return { descricaoTexto: '', informacoesRapidas: '', catalogoPeixes: '' };
  const partes = descricao.split(' | ');
  return {
    descricaoTexto: partes[0] || '',
    informacoesRapidas: partes.find((p) => p.startsWith('Info:'))?.replace('Info:', '') || '',
    catalogoPeixes: partes.find((p) => p.startsWith('F:'))?.replace('F:', '') || '',
  };
};

export const buildInformacao = (regrasPermitido, regrasProibido) => {
  const partes = [
    regrasPermitido ? 'P:' + regrasPermitido.substring(0, 80) : '',
    regrasProibido ? 'X:' + regrasProibido.substring(0, 80) : '',
  ].filter(Boolean);
  return partes.join('|').substring(0, 100);
};

export const buildDescricao = (descricaoTexto, informacoesRapidas, catalogoPeixes) => {
  const partes = [
    descricaoTexto,
    informacoesRapidas ? 'Info:' + informacoesRapidas : '',
    catalogoPeixes ? 'F:' + catalogoPeixes : '',
  ].filter(Boolean);
  return partes.join(' | ').substring(0, 600);
};

export const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// Codifica os dias abertos + precos num formato compacto e facil de reler,
// em vez do dono escrever um texto livre tipo "aberto seg a sex, 30 reais".
export const buildInfoRapida = (diasAbertos, precoSemana, precoFimSemana) => {
  const partes = [];
  if (diasAbertos?.length) partes.push('D:' + diasAbertos.join(','));
  if (precoSemana) partes.push('S:' + precoSemana);
  if (precoFimSemana) partes.push('F:' + precoFimSemana);
  return partes.join(';');
};

export const parseInfoRapida = (informacoesRapidas) => {
  const vazio = { diasAbertos: [], precoSemana: '', precoFimSemana: '' };
  if (!informacoesRapidas) return vazio;
  const partes = informacoesRapidas.split(';');
  const dias = partes.find((p) => p.startsWith('D:'))?.replace('D:', '').split(',').filter(Boolean) || [];
  const precoSemana = partes.find((p) => p.startsWith('S:'))?.replace('S:', '') || '';
  const precoFimSemana = partes.find((p) => p.startsWith('F:'))?.replace('F:', '') || '';
  return { diasAbertos: dias, precoSemana, precoFimSemana };
};

// Transforma o formato compacto num texto legivel pra exibir na pagina publica do pesqueiro.
export const formatarInfoRapidaTexto = (informacoesRapidas) => {
  const { diasAbertos, precoSemana, precoFimSemana } = parseInfoRapida(informacoesRapidas);
  const linhas = [];
  if (diasAbertos.length) linhas.push('Aberto: ' + diasAbertos.join(', '));
  if (precoSemana) linhas.push('Dia de semana: R$' + precoSemana);
  if (precoFimSemana) linhas.push('Fim de semana: R$' + precoFimSemana);
  return linhas.join('\n');
};

export const statusPesqueiro = (aprovado) => {
  if (aprovado === true) return { texto: 'Aprovado', chave: 'aprovado' };
  if (aprovado === false) return { texto: 'Negado', chave: 'negado' };
  return { texto: 'Em análise', chave: 'pendente' };
};
