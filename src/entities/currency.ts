import JSBI from 'jsbi'

import { SolidityType, ChainId } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly chainId: number
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  public static readonly ETHER: Record<number, Currency> = {
    [ChainId.ETHEREUM]: new Currency(ChainId.ETHEREUM, 18, 'ETH', 'Ether'),
    [ChainId.ROPSTEN]: new Currency(ChainId.ETHEREUM, 18, 'ETH', 'Ether'),
    [ChainId.BSC]: new Currency(ChainId.BSC, 18, 'BNB', 'Ether'),
    [ChainId.OEC_TEST]: new Currency(ChainId.OEC_TEST, 18, 'OKT', 'Ether'),
    [ChainId.OEC]: new Currency(ChainId.OEC, 18, 'OKT', 'Ether'),
    [ChainId.BSC_TEST]: new Currency(ChainId.BSC_TEST, 18, 'BNB', 'Ether'),
    [ChainId.HECO]: new Currency(ChainId.HECO, 18, 'HT', 'Ether'),
    [ChainId.HECO_TEST]: new Currency(ChainId.HECO_TEST, 18, 'HT', 'Ether'),
    [ChainId.MOONRIVER]: new Currency(ChainId.MOONRIVER, 18, 'MOVR', 'Ether')
  }

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(chainId: ChainId, decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)
    this.chainId = chainId
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

const ETHER = Currency.ETHER
export { ETHER }
