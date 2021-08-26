import axios from "axios";
import expressAsyncHandler from "express-async-handler";

// REGISTER
export const registerFace = expressAsyncHandler(async (req, res) => {
  const { uid } = req.body;
  const form = req.file;

  try {
    const res = await axios.post(
      "https://alchera-face-authentication.p.rapidapi.com/v1/face",
      form,
      {
        headers: {
          "content-type":
            "multipart/form-data; boundary=---011000010111000001101001",
          uid: uid,
          "x-rapidapi-key":
            "1912477eb1mshb0cc45c3cda0331p1740ffjsnb718647bc85f",
          "x-rapidapi-host": "alchera-face-authentication.p.rapidapi.com",
        },
      }
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
});

// COMPARE
const form = new FormData();
form.append("image", "2021-07-13-115812.jpg");

const options = {
  method: "POST",
  url: "https://alchera-face-authentication.p.rapidapi.com/v1/face/compare",
  headers: {
    "content-type": "multipart/form-data; boundary=---011000010111000001101001",
    uid: "2oi1oimd3oi3diod3",
    "x-rapidapi-key": "1912477eb1mshb0cc45c3cda0331p1740ffjsnb718647bc85f",
    "x-rapidapi-host": "alchera-face-authentication.p.rapidapi.com",
  },
  data: "[form]",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

//   Register

const form = new FormData();
form.append("image", "2021-07-13-115815.jpg");

const options = {
  method: "POST",
  url: "https://alchera-face-authentication.p.rapidapi.com/v1/face",
  headers: {
    "content-type": "multipart/form-data; boundary=---011000010111000001101001",
    uid: "2oi1oimd3oi3diod3",
    "x-rapidapi-key": "1912477eb1mshb0cc45c3cda0331p1740ffjsnb718647bc85f",
    "x-rapidapi-host": "alchera-face-authentication.p.rapidapi.com",
  },
  data: "[form]",
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
