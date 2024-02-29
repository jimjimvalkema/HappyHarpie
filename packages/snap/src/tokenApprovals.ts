import { harpieFunctions } from "./harpieFunctions";

export class TokenApprovals {
    static covalantApi = "cqt_rQpPDd4CxJJm7mBqJWt6hKdggvPj:"

    static async getTokenApprovals(userAddress: String) {
        const result = await fetch(`https://api.covalenthq.com/v1/eth-mainnet/approvals/${userAddress}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(TokenApprovals.covalantApi)
            }
        });
        return await result.json()
    }

    static partitionTokensByBalanceType(approvalsPerToken: any) {
        const balanceTypes: any = { "hasValue": [], "unkownValue": [], "zeroValue": [] };
        const partition = approvalsPerToken.reduce(
            (accumulator: any, currentApproval: any) => {
                if (currentApproval.balance_quote === null) {
                    if (parseInt(currentApproval.balance) > 0) {
                        accumulator["unkownValue"].push(currentApproval)
                    } else {
                        accumulator["zeroValue"].push(currentApproval)
                    }
                } else {
                    if (currentApproval.balance_quote > 0.01) {
                        accumulator["hasValue"].push(currentApproval)
                    } else {
                        accumulator["zeroValue"].push(currentApproval)
                    }
                }
                return accumulator
            },
            balanceTypes,
        );
        return partition
    }

    static async checkApprovals(approvalsPerToken: any) {
        const tokensWithMaliciousApprovals:any = {}

        for (const token of approvalsPerToken) {
            let maliciousSpenders = token.spenders.map((spender: any) => harpieFunctions.isMaliciousAddress(spender["spender_address"]))
            maliciousSpenders = await Promise.all(maliciousSpenders)
            const isMaliciousSpender = Object.fromEntries(maliciousSpenders.map(
                (isMalicious: any, index: any) => [token.spenders[index]["spender_address"], isMalicious]
            ))
            const tokenAddress = token["token_address"]
            tokensWithMaliciousApprovals[tokenAddress] = Object.keys(isMaliciousSpender).filter((spenderAddress)=>isMaliciousSpender[spenderAddress])
        }

        return tokensWithMaliciousApprovals

    }
}