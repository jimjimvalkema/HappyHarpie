import {signatureMallicous} from "./testSignatures"
import { signatureChecker } from "../src/signatureChecker"

export async function main() {
    const maliciousAddresses = signatureChecker.checkEIP712(signatureMallicous)
    console.log(maliciousAddresses) 
}  

main()