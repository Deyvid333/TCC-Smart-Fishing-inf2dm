function ContadorCaracteres({ atual, max }) {
  const noLimite = atual >= max;
  return (
    <small
      style={{
        display: 'block',
        textAlign: 'right',
        fontSize: '0.72rem',
        marginTop: '2px',
        color: noLimite ? '#a12626' : 'var(--text-soft)',
      }}
    >
      {atual}/{max} caracteres{noLimite ? ' — limite atingido' : ''}
    </small>
  );
}

export default ContadorCaracteres;
