import { harpieFunctions } from "./harpieFunctions"
import {normalEthTx} from "./testTransactions"

export async function main() {

    console.log(await harpieFunctions.createInformationMessage(normalEthTx))

}  

main()