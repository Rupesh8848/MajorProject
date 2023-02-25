//import * as ethUtil from 'ethereumjs-util'
//import * as sigUtil from '@metamask/eth-sig-util';

export async function getPublicKey() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    let encryptionPublicKey;
    await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [accounts[0]], // you must have access to the specified account
    })
        .then((result) => {
            encryptionPublicKey = result;
        })
    console.log(typeof encryptionPublicKey);

    return encryptionPublicKey;
}

export async function encKeywithPublic(message, encryptionPublicKey) {
    /*const encryptedMessage = await ethUtil.bufferToHex(
        Buffer.from(
            JSON.stringify(
                sigUtil.encrypt({
                    publicKey: encryptionPublicKey,
                    data: message,
                    version: 'x25519-xsalsa20-poly1305',
                })
            ),
            'utf8'
        )
    );*/
    const encryptedMessage = "";
    console.log(encryptedMessage);
    return encryptedMessage;

}

export async function decKeywithPrivate(cipher) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    const decryptedMessage = await window.ethereum.request({
        method: 'eth_decrypt',
        params: [cipher, accounts[0]],
    });
    console.log(decryptedMessage);
    return decryptedMessage;
}