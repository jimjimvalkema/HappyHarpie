import { AddressLike, ethers } from "ethers";

//globals
const harpieApiKey = "d8832f15-e9e5-489c-9087-bea84a79258a"
const provider = new ethers.BrowserProvider(window.ethereum)

export class harpieFunctions {
    static harpieApiKey = "d8832f15-e9e5-489c-9087-bea84a79258a"
    static provider = new ethers.BrowserProvider(window.ethereum)

    /**
     * 
     * @param {AddressLike} address
     * @returns {Bool} isContract
     */
    static async isContract(address: AddressLike) {
        return "0x" !== (await provider.getCode(address))
    }

    static async getAddressName(address: AddressLike) {
        if (await this.isContract(address)) {
            return await this.getContractName(address)
        } else {
            const ensName = await provider.lookupAddress(String(address))
            if (ensName === null) {
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
    static async getContractName(address: AddressLike) {
        const harpieFetchResult = await fetch("https://api.harpie.io/v2/getcontractname", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: harpieApiKey,
                address: String(address)
            })
        })
        const name = (await harpieFetchResult.json())["contractOwner"]
        if (name === "NO_DATA") {
            return address
        } else {
            return await provider.lookupAddress(String(address))
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
                apiKey: harpieApiKey,
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
