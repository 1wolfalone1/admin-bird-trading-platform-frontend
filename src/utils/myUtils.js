export const dataUrlToFile = (url, fileName) => {
   const [mediaType, data] = url.split(",");

   const mime = mediaType.match(/:(.*?);/)?.[0];

   var n = data.length;

   const arr = new Uint8Array(n);

   while (n--) {
      arr[n] = data.charCodeAt(n);
   }

   return new File([arr], fileName, { type: mime });
};
export const dataAsyncUrlToFile = async (dataUrl, fileName) => {
   const res = await fetch(dataUrl);
   const blob = await res.blob();
   const contentType = await res.headers.get("content-type");
   console.log(contentType, "content-type");
   return new File([blob], fileName, { type: contentType });
};

export const objectToBlob = (object) => {
   const json = JSON.stringify(object);

   // Create a Blob from the JSON string
   const blob = new Blob([json], {
      type: "application/json",
   });
   return blob;
};


export const convertImageUrlToBase64 = async (imageUrl, a) => {
   try {
      console.log(imageUrl, a);
     const response = await fetch(imageUrl);
     const blob = await response.blob();
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onloadend = () => resolve(reader.result);
       reader.onerror = reject;
       reader.readAsDataURL(blob);
     });
   } catch (error) {
     console.error('Error converting image to base64:', error);
     return null;
   }
 };
