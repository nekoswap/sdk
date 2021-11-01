import { Currency, Token } from 'entities'

export let ChainId: Record<string, number> = {},
  ETHER: Record<number, Currency> = {},
  WETH: Record<number, Token> = {}

export function init({
  ChainId,
  ETHER,
  WETH
}: {
  ChainId: Record<string, number>
  ETHER: Record<number, Currency>
  WETH: Record<string, Token>
}) {
  ChainId = ChainId
  ETHER = ETHER
  WETH = WETH
}
