import  {useEffect, useState} from "react";

const useAwsTextractImageConverter = () => {
    // AWS Services:
    const aws = require('aws-sdk');
    const textract = require("aws-sdk/clients/textract");
    const s3 = new aws.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: 'ahmedtextractbucket' }
    });

    // AWS S3 Config:
    const bucketName = "ahmedtextractbucket";
    const table = "textract_uploads"

    // Variables:
    const [isConverting, setIsConverting] = useState(false)

    useEffect(() => {
        setupAWS();
    });

    const setupAWS = () => {
        // to be saved in .env for security or use backend server.
        aws.config.region = 'us-east-1';
        aws.config.credentials = new aws.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:d4388dde-fd09-45ee-b84d-6a622d05a70e'});
    }

    const uploadFileToS3Bucket = async (imageFile) => {
        const fileName = imageFile.name;
        const albumPhotosKey = encodeURIComponent(table) + "/";

        const photoKey = albumPhotosKey + fileName;

        // Use S3 ManagedUpload class as it supports multipart uploads
        const upload = s3.upload({
            Bucket: bucketName,
            Key: photoKey,
            Body: imageFile
        });

        return upload.promise();
    }

    const convertImageToText = async (imageFile) => {
        setIsConverting(true);

        const isFile = imageFile instanceof File;

        if(!isFile) {
            imageFile = await downloadImageFromURL(imageFile);
        }

        try{
            await uploadFileToS3Bucket(imageFile);
        } catch (e) {
            alert("Error while uploading to S3 bucket, please check the console for more details.")
            console.log("Error: ",e)
            setIsConverting(false)
            return 0;
        }

        const textractService = new textract();

        const params = {
            Document: {
                S3Object: {
                    Bucket: bucketName,
                    Name: 'textract_uploads/' + imageFile.name
                }
            }
        };

        try {
            let response = await textractService.detectDocumentText(params).promise();

            return response.Blocks.filter(block => block.BlockType === "LINE");
        }catch(e){
            alert("Error while converting the uploaded image, please check the console for more details.")
            console.log("Error: ",e)
            return 0;
        } finally {
            setIsConverting(false)
        }
    }

    const downloadImageFromURL = async (URL) => {
        const response = await fetch(URL);
        return  await response.blob();
    }

    return {
        convertImageToText,
        isConverting
    }
}

export default useAwsTextractImageConverter;

