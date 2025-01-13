function encryptImage() {
    const input=document.getElementById('fileinput');
    const encryptKey=document.getElementById('encryptcode').value;
    const file=input.files[0];
    
    if(!file||!encryptKey) {
      alert('Please upload an image and enter an encryption key.');
      return;
    }
    const reader=new FileReader();
    reader.onload=function(event) {
      const imageData=event.target.result;
      // Encrypt the image data
      const encryptedData=CryptoJS.AES.encrypt(imageData, encryptKey).toString();
      // Display the encrypted data
      document.getElementById('output').innerText=encryptedData;
      //download link for the encrypted data
      const blob=new Blob([encryptedData], { type: 'text/plain' });
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.download='encrypted.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    reader.readAsDataURL(file);
  }
  
  function decryptImage() {
    const encryptedFileInput=document.getElementById('encryptedfileinput');
    const decryptKey=document.getElementById('decryptcode').value;
    const encryptedFile = encryptedFileInput.files[0];
  
    if (!encryptedFile||!decryptKey) {
      alert('Please upload an encrypted file and enter the decryption key.');
      return;
    }
  
    const reader=new FileReader();
    reader.onload=function(event) {
      const encryptedData=event.target.result;
      // Remove data URL prefix if present
      const base64Data=encryptedData.split(",")[1] ? encryptedData.split(",")[1] : encryptedData;
      // Decrypt the image data
      const decryptedData=CryptoJS.AES.decrypt(base64Data, decryptKey).toString(CryptoJS.enc.Utf8);
      if (!decryptedData) {
        alert('Decryption failed. Please check the key and try again.');
        return;
      }
      // Create an image element to display the decrypted image
      const img=new Image();
      img.src=decryptedData;
      document.getElementById('output').innerHTML='';
      document.getElementById('output').appendChild(img);
    };
    reader.readAsText(encryptedFile);
  }
  