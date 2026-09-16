function Paginacao({ paginaAtual, totalPaginas, onMudarPagina }) {
  if (totalPaginas <= 1) return null;

  const botaoEstilo = (desabilitado) => ({
    height: '38px',
    padding: '0 18px',
    borderRadius: '999px',
    border: '1.5px solid var(--line, #d8dfe8)',
    background: desabilitado ? 'var(--surface, #f4f8fb)' : 'var(--white, #fff)',
    color: desabilitado ? 'var(--text-soft, #7a8a99)' : 'var(--navy, #112D4E)',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: desabilitado ? 'not-allowed' : 'pointer',
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
      <button
        type="button"
        disabled={paginaAtual === 1}
        onClick={() => onMudarPagina(paginaAtual - 1)}
        style={botaoEstilo(paginaAtual === 1)}
      >
        ← Anterior
      </button>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-soft, #7a8a99)' }}>
        Página {paginaAtual} de {totalPaginas}
      </span>
      <button
        type="button"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onMudarPagina(paginaAtual + 1)}
        style={botaoEstilo(paginaAtual === totalPaginas)}
      >
        Próxima →
      </button>
    </div>
  );
}

export default Paginacao;
