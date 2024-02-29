import { TokenApprovals } from "../src/tokenApprovals"
import {jimjimethApprovalsResult} from "./covalantResults"

export async function main() {
    //jimjim.etg
    const userAddress = "0x23bc95F84BD43C1FCc2bc285fDa4Cb12f9AEE2df"
    //console.log(JSON.stringify(await TokenApprovals.getTokenApprovals(userAddress)))
    const partition = TokenApprovals.partitionTokensByBalanceType(jimjimethApprovalsResult.data.items)
    console.log(Object.keys(partition).map((k)=>`${k} has: ${partition[k].length}`))
    console.log(await TokenApprovals.checkApprovals(partition["zeroValue"]))

}  

main()