const imageBase64 = (imagem) => {
    const nomeDaImagem = imagem.split('.');
        const nomeSemExtencao = nomeDaImagem[0];
        const extencao = nomeDaImagem[1];
        const nomeImagemBase64 = Buffer.from(nomeSemExtencao).toString('base64');
        const resultado = nomeImagemBase64 + '.' + extencao;
        return resultado;
}

module.exports = imageBase64;