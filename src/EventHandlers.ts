/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  UniswapV2FactoryContract,
  UniswapV2PairContract,
} from "../generated/src/Handlers.gen";

import {
  UniswapV2Factory_PairCreatedEntity,
  UniswapV2Pair_BurnEntity,
  UniswapV2Pair_MintEntity,
  UniswapV2Pair_SwapEntity,
  UniswapV2Pair_SyncEntity,
  UniswapV2Pair_TransferEntity,
} from "../generated/src/Types.gen";

UniswapV2FactoryContract.PairCreated.loader(({ event, context }) => {
  context.contractRegistration.addUniswapV2Pair(event.params.pair);
});

UniswapV2FactoryContract.PairCreated.handler(({ event, context }) => {
  const uniswapV2Factory_PairCreatedEntity: UniswapV2Factory_PairCreatedEntity =
    {
      id: event.transactionHash + event.logIndex.toString(),
      token0: event.params.token0,
      token1: event.params.token1,
      pair: event.params.pair,
      _3: event.params._3,
    };

  context.UniswapV2Factory_PairCreated.set(uniswapV2Factory_PairCreatedEntity);
});
UniswapV2PairContract.Burn.loader(({ event, context }) => {});

UniswapV2PairContract.Burn.handler(({ event, context }) => {
  const uniswapV2Pair_BurnEntity: UniswapV2Pair_BurnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    to: event.params.to,
  };

  context.UniswapV2Pair_Burn.set(uniswapV2Pair_BurnEntity);
});
UniswapV2PairContract.Mint.loader(({ event, context }) => {});

UniswapV2PairContract.Mint.handler(({ event, context }) => {
  const uniswapV2Pair_MintEntity: UniswapV2Pair_MintEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
  };

  context.UniswapV2Pair_Mint.set(uniswapV2Pair_MintEntity);
});
UniswapV2PairContract.Swap.loader(({ event, context }) => {});

UniswapV2PairContract.Swap.handler(({ event, context }) => {
  const uniswapV2Pair_SwapEntity: UniswapV2Pair_SwapEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    amount0In: event.params.amount0In,
    amount1In: event.params.amount1In,
    amount0Out: event.params.amount0Out,
    amount1Out: event.params.amount1Out,
    to: event.params.to,
  };

  context.UniswapV2Pair_Swap.set(uniswapV2Pair_SwapEntity);
});
UniswapV2PairContract.Sync.loader(({ event, context }) => {});

UniswapV2PairContract.Sync.handler(({ event, context }) => {
  const uniswapV2Pair_SyncEntity: UniswapV2Pair_SyncEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    reserve0: event.params.reserve0,
    reserve1: event.params.reserve1,
  };

  context.UniswapV2Pair_Sync.set(uniswapV2Pair_SyncEntity);
});
UniswapV2PairContract.Transfer.loader(({ event, context }) => {});

UniswapV2PairContract.Transfer.handler(({ event, context }) => {
  const uniswapV2Pair_TransferEntity: UniswapV2Pair_TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
  };

  context.UniswapV2Pair_Transfer.set(uniswapV2Pair_TransferEntity);
});
