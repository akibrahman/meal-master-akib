import axios from "axios";

export const photoUpdateHandler = async (newImg, oldImg) => {
  return new Promise((resolve) => {
    if (newImg) {
      const imgData = new FormData();
      imgData.append("image", newImg);

      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_API
          }`,
          imgData
        )
        .then((res) => {
          resolve(res.data.data.display_url);
        });
    } else resolve(oldImg);
  });
};
