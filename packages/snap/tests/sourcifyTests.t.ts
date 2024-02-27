import { SourcifyFunctions } from '../src/sourcifyFunctions';
const address = '0xC04D68ccE75d7D9F5dbcdb55f2f11E6A04eC89d1';

async function testGetSourcifyInfo() {
    try {
        // Call the getSourcifyInfo method/func
        const sourcifyInfo = await SourcifyFunctions.getSourcifyInfo(address);
        
        // outputting output
        console.log('Sourcify Info:', sourcifyInfo);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the test function
testGetSourcifyInfo();

async function testEvaluation() {
    try {
        const result = await SourcifyFunctions.evaluation(address);
        console.log(result); // Output should be "DANGEROUS" or "SAFE"
    } catch (error) {
        console.error("Failed to evaluate:", error);
    }
}

testEvaluation();
