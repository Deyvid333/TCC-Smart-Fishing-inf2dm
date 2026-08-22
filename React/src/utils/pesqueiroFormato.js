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

export const statusPesqueiro = (aprovado) => {
  if (aprovado === true) return { texto: 'Aprovado', chave: 'aprovado' };
  if (aprovado === false) return { texto: 'Negado', chave: 'negado' };
  return { texto: 'Em análise', chave: 'pendente' };
};
