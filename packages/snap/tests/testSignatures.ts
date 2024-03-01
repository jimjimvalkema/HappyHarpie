export const sepopliaNftListing = {
    "from": "0xab3f74bf693cd9cf123a31838357625ce3e5c0d2",
    "data": {
        "types": {
            "EIP712Domain": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "version",
                    "type": "string"
                },
                {
                    "name": "chainId",
                    "type": "uint256"
                },
                {
                    "name": "verifyingContract",
                    "type": "address"
                }
            ],
            "OrderComponents": [
                {
                    "name": "offerer",
                    "type": "address"
                },
                {
                    "name": "zone",
                    "type": "address"
                },
                {
                    "name": "offer",
                    "type": "OfferItem[]"
                },
                {
                    "name": "consideration",
                    "type": "ConsiderationItem[]"
                },
                {
                    "name": "orderType",
                    "type": "uint8"
                },
                {
                    "name": "startTime",
                    "type": "uint256"
                },
                {
                    "name": "endTime",
                    "type": "uint256"
                },
                {
                    "name": "zoneHash",
                    "type": "bytes32"
                },
                {
                    "name": "salt",
                    "type": "uint256"
                },
                {
                    "name": "conduitKey",
                    "type": "bytes32"
                },
                {
                    "name": "counter",
                    "type": "uint256"
                }
            ],
            "OfferItem": [
                {
                    "name": "itemType",
                    "type": "uint8"
                },
                {
                    "name": "token",
                    "type": "address"
                },
                {
                    "name": "identifierOrCriteria",
                    "type": "uint256"
                },
                {
                    "name": "startAmount",
                    "type": "uint256"
                },
                {
                    "name": "endAmount",
                    "type": "uint256"
                }
            ],
            "ConsiderationItem": [
                {
                    "name": "itemType",
                    "type": "uint8"
                },
                {
                    "name": "token",
                    "type": "address"
                },
                {
                    "name": "identifierOrCriteria",
                    "type": "uint256"
                },
                {
                    "name": "startAmount",
                    "type": "uint256"
                },
                {
                    "name": "endAmount",
                    "type": "uint256"
                },
                {
                    "name": "recipient",
                    "type": "address"
                }
            ]
        },
        "primaryType": "OrderComponents",
        "domain": {
            "name": "Seaport",
            "version": "1.5",
            "chainId": "11155111",
            "verifyingContract": "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC"
        },
        "message": {
            "offerer": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2",
            "offer": [
                {
                    "itemType": "3",
                    "token": "0xfc4A9d4Cd18DEA2aCD38d8a4F292dfA5006ec838",
                    "identifierOrCriteria": "1",
                    "startAmount": "1",
                    "endAmount": "1"
                }
            ],
            "consideration": [
                {
                    "itemType": "0",
                    "token": "0x0000000000000000000000000000000000000000",
                    "identifierOrCriteria": "0",
                    "startAmount": "9750000000000000",
                    "endAmount": "9750000000000000",
                    "recipient": "0xAB3f74BF693Cd9cF123A31838357625ce3e5c0d2"
                },
                {
                    "itemType": "0",
                    "token": "0x0000000000000000000000000000000000000000",
                    "identifierOrCriteria": "0",
                    "startAmount": "250000000000000",
                    "endAmount": "250000000000000",
                    "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719"
                }
            ],
            "startTime": "1709272667",
            "endTime": "1711947467",
            "orderType": "1",
            "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
            "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "salt": "24446860302761739304752683030156737591518664810215442929811201615252860937397",
            "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
            "totalOriginalConsiderationItems": "2",
            "counter": "0"
        }
    },
    "signatureMethod": "eth_signTypedData_v4"
}

export const signatureMallicous = { "from": "0x8c3b6b718a23a4ba76630274b53e7aaedc7319fa", "data": { "types": { "message": [{ "name": "valueA", "type": "string" }, { "name": "valueB", "type": "address" }], "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" }] }, "domain": { "name": "Ether Mail", "version": "1", "chainId": "0x1", "verifyingContract": "0xcccccccccccccccccccccccccccccccccccccccc" }, "primaryType": "message", "message": { "valueA": "hiiii", "valueB": "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731" } }, "signatureMethod": "eth_signTypedData_v4" }
