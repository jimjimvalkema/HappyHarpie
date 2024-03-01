import { harpieFunctions } from "./harpieFunctions";


export class signatureChecker {
    static async checkEIP712(signature: any) {
        //TODO detect signature type
        //get all addresses from the 712 signature
        const addressTypes = signature["data"]["types"]["message"].filter((type:any)=>type.type==="address")
        let allAddresses = addressTypes.map((type:any)=>signature["data"]["message"][type.name])
        allAddresses.push(signature.data.domain.verifyingContract)

        //check the addresses are malicious
        let isMaliciousAddressBools = allAddresses.map((address: any) => harpieFunctions.isMaliciousAddress(address))
        isMaliciousAddressBools = await Promise.all(isMaliciousAddressBools)
        const maliciousAddresses = allAddresses.filter((address:any,index:any)=>isMaliciousAddressBools[index])
        
        return maliciousAddresses
    }

    static async delayedMessage(delayInms:number, message:string) {
        await new Promise(resolve => setTimeout(resolve, delayInms));
        return 
      };    

    static async promiseWithTimeLimit(promise:any, timeLimit:any, timeExceededMessage:any) {
        return await  Promise.race([promise, this.delayedMessage(timeLimit, timeExceededMessage)])

    }
}