const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'sa-east-1', // Configuração para a região South America (São Paulo)
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
  endpoint: process.env.ENDPOINT_S3,
});

const uploadFile = async (path, mimetype, buffer) => {
  try {
    const uploadParams = {
      Bucket: process.env.BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    };

    const uploadCommand = new PutObjectCommand(uploadParams);    

    await s3.send(uploadCommand);

    const url = process.env.ENDPOINT_S3;
    const bucket = process.env.BUCKET;
    
    const formedUrl = `${url}/${bucket}/${path}`
    
    return {
      url: formedUrl,
      path,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFile = async (path) => {
  try {
    const deleteParams = {
      Bucket: process.env.BUCKET,
      Key: path,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);

    await s3.send(deleteCommand);
    console.log(`Arquivo ${path} deletado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar o arquivo ${path}:`, error);
    throw error;
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};
