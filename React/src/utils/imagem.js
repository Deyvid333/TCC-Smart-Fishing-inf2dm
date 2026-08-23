// Redimensiona a imagem no navegador antes de enviar, pra não mandar um arquivo gigante pro banco.
export const redimensionarImagem = (file, tamanhoMax = 320, qualidade = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const escala = Math.min(1, tamanhoMax / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', qualidade));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

export const soBase64 = (dataUrl) => dataUrl.split(',')[1] || '';
