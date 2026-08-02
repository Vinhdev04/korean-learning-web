import CryptoJS from 'crypto-js';

export class Crypto {
  private secret: string = "chips-salt";

  encrypt(value: string): string {
    let en = CryptoJS.AES.encrypt(value?.toString(), this.secret).toString();
    en = en.replace(/\+/g, "%2B");
    return en;
  }

  decrypt(value: string): string | undefined {
    try {
      const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(value || ""), this.secret);
      const plainText = decrypted.toString(CryptoJS.enc.Utf8);
  
      if (plainText && !isNaN(+plainText)) {
        return plainText;
      } else {
        console.error("Giải mã không hợp lệ:", plainText);
        return undefined;
      }
    } catch (error) {
      console.error("Lỗi giải mã:", error);
      return undefined;
    }
  }
}

