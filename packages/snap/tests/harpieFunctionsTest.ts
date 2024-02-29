import { harpieFunctions } from "../src/harpieFunctions"
import {normalEthTx} from "./testTransactions"

export async function main() {

    console.log(await harpieFunctions.createInformationMessage(normalEthTx))

}  

main()