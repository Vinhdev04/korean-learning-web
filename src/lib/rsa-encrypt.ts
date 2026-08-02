import * as forge from 'node-forge';

export const encryptForClient = (text: string): string => {
  const publicKeyPem = (process.env.NEXT_PUBLIC_PUBLIC_KEY_RSA_Server_Receive || '')
    .replace(/\\n/g, '\n');  

  const clientPublicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const encrypted = clientPublicKey.encrypt(text, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
};