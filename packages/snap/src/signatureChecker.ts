import { harpieFunctions } from "./harpieFunctions";
import { ethers } from "ethers";


/**
 * 
 * @returns 
 */
function getProvider() {
    //return new ethers.BrowserProvider(window.ethereum)
    if ((typeof (window) !== "undefined") && ("ethereum" in window)) {
        return new ethers.BrowserProvider(window.ethereum,"any")
    } else {
        const provider = ethers.getDefaultProvider("https://mainnet.infura.io/v3/891310e614d7438f9b26f7adc8d8cf47")//"https://eth.llamarpc.com")
        return provider
    }
}

export class signatureChecker {
    static alchemyApiKey = "fxI6RcQ7xg1KeVbh-muQvyMIZxWNqanM"

    static async getNftName(nftAddress:any) {
        const abi = [{
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }]
        const provider = getProvider()
        nftAddress = ethers.getAddress(nftAddress)
        const newContract:any = new ethers.Contract(nftAddress, abi, provider);
        return await newContract.name()

    }


    /**
     * recursivly gets all values from a object
     * @param obj 
     * @returns 
     */
    static getAllValues(obj:any){
        const values:any = Object.values(obj).map((value:any)=>{
            if (typeof(value)==="object") {
                return this.getAllValues(value)
            }else {
                return value
            }
            
        })
        return values.flat()
    }

    static async checkEIP712Addresses(signature: any) {
        
        const allAddresses = [...new Set( [...this.getAllValues(signature).filter((value:any)=>ethers.isAddress(value))] )]
        //check the addresses are malicious
        let isMaliciousAddressBools = allAddresses.map((address: any) => harpieFunctions.isMaliciousAddress(address))
        isMaliciousAddressBools = await Promise.all(isMaliciousAddressBools)
        const maliciousAddresses = allAddresses.filter((address: any, index: any) => isMaliciousAddressBools[index])

        return maliciousAddresses.filter((address)=>address!=="0x0000000000000000000000000000000000000000")
    }

    static getListingPriceOpenSea(OpenSeaSignature: any) {
        //technically can be inaccurate if the royalty fee starts high and listing starts low but it errors on the cautios side so should be fine
        const smallestPossibleListing = OpenSeaSignature.data.message.consideration.reduce((total: any, offer: any) => {
            const smallest = [BigInt(offer.endAmount), BigInt(offer.startAmount)].reduce((smallest: any, amount: any) => {
                if (BigInt(amount) < BigInt(smallest)) {
                    return BigInt(amount)
                } else {
                    return BigInt(smallest)
                }
            }, BigInt(offer.endAmount))
            total += BigInt(smallest)
            return total
        }, 0n)

        return smallestPossibleListing
    }

    static async getFloorPrice(nftContractAddress:any) {
        const floorPriceFetch =await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${this.alchemyApiKey}/getFloorPrice?contractAddress=${nftContractAddress}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        const floorPriceJson = await floorPriceFetch.json()

        //alchemys floor price is behind on openSea, using looksRare for now
        //TODO take  both and use lowest number
        const floorPrice = ethers.parseEther(floorPriceJson["looksRare"]["floorPrice"].toString())
        return floorPrice

    }

    static async getPercentageDifferenceFromFloor(listingPrice: any, floorPrice:any) {
        //assumes only one nft is sold
        //TODO alchemy brokey on sepolia so using milady for now
        //console.log(this.alchemyApiKey, nftContractAddress)

        //console.log("floor:",ethers.formatEther(floorPrice),"listing: ", ethers.formatEther(listingPrice), ethers.formatEther(listingPrice-floorPrice))//, ethers.formatEther(Number(listingPrice-floorPrice)/Number(floorPrice)) )
        
        if(listingPrice) {
            console.log(listingPrice,floorPrice, (Number(listingPrice)-Number(floorPrice))/Number(floorPrice)*100)
            return (Number(listingPrice-floorPrice))/Number(floorPrice)*100

        }else {
            return -100
        }
       
    }

    static isOpenseaSignature(signature:any) {
        const verifyingContract = signature.data.domain.verifyingContract.toLowerCase()
        return verifyingContract === "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC".toLowerCase()//metamask makes all addreses lowecase
    }

    static async getFloorDifferenceMessage(OpenSeaSignature:any, differenceFromFloor:any, listingPrice:any, floorPrice:any) {
    
        const nftContractAddress = OpenSeaSignature.data.message.offer[0].token
        const collectionName = await this.getNftName(nftContractAddress)
        const listingPriceTicker = "ETH" //TODO check what listing ticker is
        console.log("listing price",listingPrice)

        const formattedListingPrice = ethers.formatEther(listingPrice)
        const formattedfloorPrice = ethers.formatEther(floorPrice)
    
        let headingContent = `Caution this listing is ${Math.ceil(differenceFromFloor)}% below the floor price.`
        let textContent = `You are about to list a ${collectionName} nft for ${formattedListingPrice} ${listingPriceTicker}. The current floor price is ${formattedfloorPrice}`
        
        if (differenceFromFloor < -50 && differenceFromFloor>-90) {
          headingContent = `❗This might be a scam❗`
          //notice: metamask seems to not like multi line strings here?
          textContent = `This listing is ${Math.ceil(differenceFromFloor)}% below the floor price which is highly unusual. \n You are about to list a ${collectionName} nft for ${formattedListingPrice} ${listingPriceTicker}.\n But the current floor price is ${formattedfloorPrice} ${listingPriceTicker}. `
        } else if (differenceFromFloor < -90 && differenceFromFloor > -100){
          headingContent = `❗This is a scam❗`
          textContent = `This listing is too far below the floor price and is usually a scam! \n This listing is ${Math.ceil(differenceFromFloor)}% below the floor price which is highly unusual. \n You are about to list a ${collectionName} nft for ${formattedListingPrice} ${listingPriceTicker}. But the current floor price is ${formattedfloorPrice} ${listingPriceTicker}. `
    
        } else if (differenceFromFloor === -100) {
          headingContent = `❗This is a scam❗`
          textContent = `You're about to sign a mallicious listing that will give the hacker your ${collectionName} nft for free. \n This is a SCAM do NOT sign!`
        }
        return {headingContent: headingContent, textContent: textContent}
    }

    // static async delayedMessage(delayInms:number, message:string) {
    //     await new Promise(resolve => setTimeout(resolve, delayInms));
    //     return 
    //   };    

    // static async promiseWithTimeLimit(promise:any, timeLimit:any, timeExceededMessage:any) {
    //     return await  Promise.race([promise, this.delayedMessage(timeLimit, timeExceededMessage)])

    // }




    // static async getSignatureType
}