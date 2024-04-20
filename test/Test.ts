import assert = require("assert")
import { MockDb, UniswapV2Factory } from "../generated/src/TestHelpers.gen";
import {
  EventsSummaryEntity,
  UniswapV2Factory_PairCreatedEntity,
} from "../generated/src/Types.gen";

import { Addresses } from "../generated/src/bindings/Ethers.bs";

import { GLOBAL_EVENTS_SUMMARY_KEY } from "../src/EventHandlers";


const MOCK_EVENTS_SUMMARY_ENTITY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  uniswapV2Factory_PairCreatedCount: BigInt(0),
  uniswapV2Pair_BurnCount: BigInt(0),
  uniswapV2Pair_MintCount: BigInt(0),
  uniswapV2Pair_SwapCount: BigInt(0),
  uniswapV2Pair_SyncCount: BigInt(0),
  uniswapV2Pair_TransferCount: BigInt(0),
};

describe("UniswapV2Factory contract PairCreated event tests", () => {
  // Create mock db
  const mockDbInitial = MockDb.createMockDb();

  // Add mock EventsSummaryEntity to mock db
  const mockDbFinal = mockDbInitial.entities.EventsSummary.set(
    MOCK_EVENTS_SUMMARY_ENTITY
  );

  // Creating mock UniswapV2Factory contract PairCreated event
  const mockUniswapV2FactoryPairCreatedEvent = UniswapV2Factory.PairCreated.createMockEvent({
    token0: Addresses.defaultAddress,
    token1: Addresses.defaultAddress,
    pair: Addresses.defaultAddress,
    _3: 0n,
    mockEventData: {
      chainId: 1,
      blockNumber: 0,
      blockTimestamp: 0,
      blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      srcAddress: Addresses.defaultAddress,
      transactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      transactionIndex: 0,
      logIndex: 0,
    },
  });

  // Processing the event
  const mockDbUpdated = UniswapV2Factory.PairCreated.processEvent({
    event: mockUniswapV2FactoryPairCreatedEvent,
    mockDb: mockDbFinal,
  });

  it("UniswapV2Factory_PairCreatedEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualUniswapV2FactoryPairCreatedEntity = mockDbUpdated.entities.UniswapV2Factory_PairCreated.get(
      mockUniswapV2FactoryPairCreatedEvent.transactionHash +
        mockUniswapV2FactoryPairCreatedEvent.logIndex.toString()
    );

    // Creating the expected entity
    const expectedUniswapV2FactoryPairCreatedEntity: UniswapV2Factory_PairCreatedEntity = {
      id:
        mockUniswapV2FactoryPairCreatedEvent.transactionHash +
        mockUniswapV2FactoryPairCreatedEvent.logIndex.toString(),
      token0: mockUniswapV2FactoryPairCreatedEvent.params.token0,
      token1: mockUniswapV2FactoryPairCreatedEvent.params.token1,
      pair: mockUniswapV2FactoryPairCreatedEvent.params.pair,
      _3: mockUniswapV2FactoryPairCreatedEvent.params._3,
      eventsSummary: "GlobalEventsSummary",
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualUniswapV2FactoryPairCreatedEntity, expectedUniswapV2FactoryPairCreatedEntity, "Actual UniswapV2FactoryPairCreatedEntity should be the same as the expectedUniswapV2FactoryPairCreatedEntity");
  });

  it("EventsSummaryEntity is updated correctly", () => {
    // Getting the actual entity from the mock database
    let actualEventsSummaryEntity = mockDbUpdated.entities.EventsSummary.get(
      GLOBAL_EVENTS_SUMMARY_KEY
    );

    // Creating the expected entity
    const expectedEventsSummaryEntity: EventsSummaryEntity = {
      ...MOCK_EVENTS_SUMMARY_ENTITY,
      uniswapV2Factory_PairCreatedCount: MOCK_EVENTS_SUMMARY_ENTITY.uniswapV2Factory_PairCreatedCount + BigInt(1),
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEventsSummaryEntity, expectedEventsSummaryEntity, "Actual UniswapV2FactoryPairCreatedEntity should be the same as the expectedUniswapV2FactoryPairCreatedEntity");
  });
});
