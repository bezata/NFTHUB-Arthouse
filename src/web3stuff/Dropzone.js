import axios from "axios";

const pinataApiKey = "37349a08b8489b950b38";
const pinataSecretApiKey =
  "f9c107f9b3be86eded9f0acba053effd8318bd98d87d48dedd97ea3cc36781fb";
const pinataBaseURL = "https://api.pinata.cloud/pinning";

export const UploadFileToIPFS = async (file) => {
  const url = `${pinataBaseURL}/pinFileToIPFS`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    return {
      success: true,
      pinataURL: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const UploadJSONToIPFS = async (metadata, pinataMetadata) => {
  const url = `${pinataBaseURL}/pinJSONToIPFS`;

  const pinataOptions = {
    cidVersion: 0,
  };

  const data = {
    pinataContent: metadata,
    pinataOptions,
    pinataMetadata,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    return {
      success: true,
      pinataURLJSON: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      metadata,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};