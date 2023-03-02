export default async function getPublicKey() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const account = accounts[0]

            const publicKey = await window.ethereum.request({
                method: 'eth_getEncryptionPublicKey',
                params: [account],
            })
            return publicKey;

        } catch (error) {
            console.log({ error })
        }
    }

}