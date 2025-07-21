import axios from "axios";

export function useImgur() {
  const IMGUR_CLIENT_ID = "546c25a59c58ad7";
  const IMGBB_API_KEY = "8081538c99af59dc9f09a586d1c91983";
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return {
        success: true,
        url: response.data.data.link,
        deleteHash: response.data.data.deletehash,
      };
    } catch (error) {
      try {
        const imgbbForm = new FormData();
        imgbbForm.append("image", imageFile);
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          imgbbForm,
        );
        return {
          success: true,
          url: imgbbResponse.data.data.url,
          deleteUrl: imgbbResponse.data.data.delete_url,
        };
      } catch (imgbbError) {
        return {
          success: false,
          error: imgbbError.message,
        };
      }
    }
  };

  return {
    uploadImage,
  };
}
