import { AddressLike, Provider, ethers } from "ethers";

declare global {
    interface Window {
        ethereum?: any;
    }
}

/**
 * 
 * @returns 
 */
function getProvider() {
    //return new ethers.BrowserProvider(window.ethereum)
    if ((typeof (window) !== "undefined") && ("ethereum" in window)) {
        return new ethers.BrowserProvider(window.ethereum)
    } else {
        const provider = ethers.getDefaultProvider("https://mainnet.infura.io/v3/891310e614d7438f9b26f7adc8d8cf47")//"https://eth.llamarpc.com")
        return provider
    }
}

export class harpieFunctions {
    static harpieApiKey = "d8832f15-e9e5-489c-9087-bea84a79258a"
    static provider = getProvider() //new ethers.BrowserProvider(window.ethereum)//getProvider()
    /**
     * 
     * @param {AddressLike} address
     * @returns {Bool} isContract
     */
    static async isContract(address: AddressLike, provider: Provider = this.provider) {
        return "0x" !== (await provider.getCode(address))
    }

    static async getAddressName(address: AddressLike, provider: Provider = this.provider) {
        if (await this.isContract(address)) {
            return await this.getContractName(address)
        } else {
            const ensName = await provider.lookupAddress(String(address))
            if (ensName === "null") {
                return address
            } else {
                return ensName
            }
        }

    }

    /**
     * returns the contract name from harpie if they have it. otherwise it just returns the ens/address
     * @param address 
     * @returns name
     */
    static async getContractName(address: AddressLike, provider: Provider = this.provider) {
        const harpieFetchResult = await fetch("https://api.harpie.io/v2/getcontractname", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: this.harpieApiKey,
                address: String(address)
            })
        })
        const harpieResult = (await harpieFetchResult.json())
        const name = harpieResult["contractOwner"]
        if (name === "NO_DATA") {
            return await provider.lookupAddress(String(address))
        } else {
            return name
        }
    }

    /**
     * 
     * @param transaction 
     * @returns transactionInformation: {'summary':String, 'isDangerousOperation':Bool, 'recommendedAction':String, 'addressDetails':Object}
     */
    static async getTransactionInformation(transaction: any) {
        let txData
        if (transaction.data) {
            txData = transaction.data
        } else {
            txData = "0x0"
        }

        const harpieFetchResult = await fetch("https://api.harpie.io/v2/validateTransaction", {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: String(JSON.stringify({
                apiKey: this.harpieApiKey,
                to: transaction.to,
                value: transaction.value,
                from: transaction.from,
                data: txData
            }))
        })

        const transactionInformation = await harpieFetchResult.json()
        return transactionInformation
    }
}
