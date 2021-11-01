import { validateAndParseAddress } from '../utils'

/**
 * Represents a factory contract.
 */
export class Factory {
  public readonly chainId: number
  public readonly address: string
  public readonly initCode: string

  public constructor(chainId: number, address: string, initCode: string) {
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
    this.initCode = initCode
  }
}
