const decodeBase64 = (base64String)=>{
    const stringBase64 = base64String.split(".");    
    const nameBase64 = stringBase64[0];    
    const extention = stringBase64[1];    

    const buffer = Buffer.from(nameBase64, 'base64');    
    const decodedImage = buffer.toString('utf-8');    

    const imageUrl = `${process.env.ENDPOINT_S3}/${process.env.BUCKET}/${decodedImage}.${extention}`;    

    return imageUrl;
};

module.exports = decodeBase64;
