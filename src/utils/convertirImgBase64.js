function getImageBase64(url, callback){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result); // Base64 listo
    };
    reader.readAsDataURL(xhr.response);
  };

  xhr.send();

};

export default getImageBase64;