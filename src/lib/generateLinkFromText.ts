export const removeVietnameseTones = (str: string) => {
    str = str.toLowerCase();
    const accents = [
      { base: 'a', letters: 'áàảãạăắằẳẵặâấầẩẫậ' },
      { base: 'e', letters: 'éèẻẽẹêếềểễệ' },
      { base: 'i', letters: 'íìỉĩị' },
      { base: 'o', letters: 'óòỏõọôốồổỗộơớờởỡợ' },
      { base: 'u', letters: 'úùủũụưứừửữự' },
      { base: 'y', letters: 'ýỳỷỹỵ' },
      { base: 'd', letters: 'đ' },
    ];
  
    accents.forEach((accent) => {
      str = str.replace(new RegExp(`[${accent.letters}]`, 'g'), accent.base).trim();
    });
  
    return str;
  };
  

export const generateLinkFromName = (str: string): string => {
  const normalizedName = removeVietnameseTones(str);
  return normalizedName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};
