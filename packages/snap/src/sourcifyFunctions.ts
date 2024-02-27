export class SourcifyFunctions {
    /**
     * @param address
     * @returns sourcifyInfo object- an array
     */
    static async getSourcifyInfo(address: any) {
        const response = await fetch(`https://sourcify.dev/server/check-all-by-addresses?addresses=${address}&chainIds=1`, {
            headers: {
            'accept': 'application/json'
            }
        });

    const sourcifyInfo = await response.json();
    return sourcifyInfo;
    }

    static async evaluation(address: any) {
        const sourcifyInfo: any = await this.getSourcifyInfo(address);
        const firstResult = sourcifyInfo[0]; // whole json object is an array at index 0
    
        // console.log(firstResult); // json data object
    
        if (firstResult.status === 'false') {
            return "DANGEROUS";
        } else {
            return "SAFE";
        }
    }
}

// (async () => {
//     const address = '0xC04D68ccE75d7D9F5dbcdb55f2f11E6A04eC89d1'; // Aliza's addy
//     const result = await SourcifyFunctions.evaluation(address);
//     console.log(result); // This will log "DANGEROUS" or "SAFE" based on the evaluation
// })();
