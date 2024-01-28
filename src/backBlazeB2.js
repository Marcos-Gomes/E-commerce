const { B2 } = require('backblaze-b2');
const { createB2 } = require('b2');

const b2 = createB2({
  applicationKeyId: process.env.KEY_ID,
  applicationKey: process.env.APP_KEY,
});

const deleteFile = async (fileName) => {
  try {     
    const response = await b2.deleteFileVersion({
      fileName      
    });

    console.log(`Arquivo ${fileName} deletado com sucesso.`);
    console.log(response);
  } catch (error) {
    console.error(`Erro ao deletar o arquivo ${fileName}:`, error);
    throw error;
  }
};

module.exports = deleteFile;