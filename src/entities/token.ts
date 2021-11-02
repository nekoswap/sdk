import { ChainId } from '../constants'
import invariant from 'tiny-invariant'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: number
  public readonly address: string

  public constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
    super(chainId, decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH: Record<number, Token> = {
  [ChainId.ETHEREUM]: new Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BSC]: new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped Ether'),
  [ChainId.OEC_TEST]: new Token(
    ChainId.OEC_TEST,
    '0x70c1c53E991F31981d592C2d865383AC0d212225',
    18,
    'WOKT',
    'Wrapped Ether'
  ),
  [ChainId.OEC]: new Token(ChainId.OEC, '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', 18, 'WOKT', 'Wrapped Ether'),
  [ChainId.BSC_TEST]: new Token(
    ChainId.BSC_TEST,
    '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    18,
    'WBNB',
    'Wrapped Ether'
  ),
  [ChainId.HECO]: new Token(ChainId.HECO, '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', 18, 'WHT', 'Wrapped Ether'),
  [ChainId.HECO_TEST]: new Token(
    ChainId.HECO_TEST,
    '0x7aF326B6351C8A9b8fb8CD205CBe11d4Ac5FA836',
    18,
    'WHT',
    'Wrapped Ether'
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    18,
    'WMOVR',
    'Wrapped Ether'
  )
}
