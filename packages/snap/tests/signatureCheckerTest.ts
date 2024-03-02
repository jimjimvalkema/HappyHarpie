import {signatureMallicous, milady50PercentBelow, moladyListing60PercentBelow, moladyListing0, openSeaListingLowPrice} from "./testSignatures"
import { signatureChecker } from "../src/signatureChecker"

export async function main() {
    const signature = openSeaListingLowPrice
    let differenceFromFloor = 0
    let listingPrice
    let floorPrice
    const isOpenSeaListing = true
    if (isOpenSeaListing) {
        const signatureAny:any = signature
        const nftContractAddress = signatureAny.data.message.offer[0].token
        floorPrice = await signatureChecker.getFloorPrice(nftContractAddress)
        listingPrice = signatureChecker.getListingPriceOpenSea(signatureAny)
        differenceFromFloor = await signatureChecker.getPercentageDifferenceFromFloor(listingPrice, floorPrice)

    }
    const {headingContent,  textContent } = await signatureChecker.getFloorDifferenceMessage(signature,differenceFromFloor,listingPrice,floorPrice)
    console.log(`heading: ${headingContent}`)
    console.log(`text: ${textContent}`) 
}  

main()