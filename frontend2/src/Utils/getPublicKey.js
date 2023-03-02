import { bufferToHex } from 'ethereumjs-util'
import { encrypt } from '@metamask/eth-sig-util'

export async function getPublicKey() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const account = accounts[0]

            const publicKey = await window.ethereum.request({
                method: 'eth_getEncryptionPublicKey',
                params: [account],
            })
            console.log(publicKey);
            return publicKey;


        } catch (error) {
            console.log({ error })
        }
    }

}

export async function encryptKeyIV(key, iv, encryptionPublicKey) {
    console.log(encryptionPublicKey);
    const encKey = bufferToHex(
        Buffer.from(
            JSON.stringify(
                encrypt({
                    publicKey: encryptionPublicKey,
                    data: key,
                    version: 'x25519-xsalsa20-poly1305',
                })
            ),
            'utf8'
        )
    )
    const encIV = bufferToHex(
        Buffer.from(
            JSON.stringify(
                encrypt({
                    publicKey: encryptionPublicKey,
                    data: iv,
                    version: 'x25519-xsalsa20-poly1305',
                })
            ),
            'utf8'
        )
    )
    console.log(encKey, encIV)
    return { encKey, encIV }
}

export async function decryptKeyIV(encKey, encIV) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const key = await window.ethereum.request({
        method: 'eth_decrypt',
        params: [encKey, accounts[0]],
    })
    const iv = await window.ethereum.request({
        method: 'eth_decrypt',
        params: [encIV, accounts[0]],
    })
    console.log(key, iv)
    return { key, iv }
}