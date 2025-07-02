# MetaLife: Decentralized Artificial Life with IPFS Integration

[MetaLife](https://metalambda.org/modularmetalife.html) is a decentralized, self-reproducing computational framework inspired by lambda calculus, artificial life, and graph rewriting. The project combines 3D visualization, evolutionary algorithms, and decentralized storage to create a unique digital ecosystem.

## Core Features

### Artificial Life Simulation
- **Self-Reproducing Organisms**: Digital life forms that can replicate, mutate, and evolve
- **Directional Growth**: Life forms grow with genetic curving properties that determine their shape and direction
- **Mutation System**: Organisms can mutate their properties, creating diverse evolutionary paths
- **Energy System**: Life forms share energy during reproduction, creating natural selection pressures

### 3D Visualization
- **Babylon.js Integration**: Real-time 3D rendering of the artificial life ecosystem
- **Voxel-Based Representation**: Life forms are visualized as voxel structures in 3D space
- **Interactive Camera**: Users can navigate the 3D space to observe life forms from different angles
- **Simulation Controls**: Step controls (100 steps, 1000 steps) to advance the simulation

### Protocol Labs Technology Integration

#### IPFS (InterPlanetary File System)
- **Snapshot System**: Save the entire state of your simulation to IPFS with a single click
- **Decentralized Storage**: All snapshots are stored on IPFS, making them accessible from anywhere
- **Snapshot Registry**: A collection of all saved snapshots, also stored on IPFS
- **CID-Based Retrieval**: Load any snapshot using its Content Identifier (CID)

#### Filecoin Virtual Machine (FVM)
- **Smart Contract Integration**: Experimental support for FVM contracts
- **Wallet Connection**: Connect Ethereum wallets for seed generation and FVM interaction

### User Interface
- **Minimizable Panels**: Collapsible UI sections for better space management
- **Snapshot Management**: Name, save, and load snapshots from the registry
- **Simulation Controls**: Control the evolution speed with step buttons
- **Seed System**: Use custom seeds or wallet-based seeds to initialize simulations

## How It Works

### Snapshot System
1. **Creating Snapshots**: Click "Snapshot → IPFS" to save the current state
2. **Registry Management**: All snapshots are added to a registry, which is also stored on IPFS
3. **Loading Snapshots**: Click on any snapshot in the registry to restore that exact state
4. **Registry Persistence**: The registry CID is saved in localStorage and can be manually copied

### Life Form Evolution
1. **Initialization**: Life forms are created from seeds
2. **Mutation**: During reproduction, genetic properties are slightly modified
3. **Directional Growth**: Each life form has direction vectors and curve properties
4. **Interaction**: Life forms can interact with each other in the 3D space

## Getting Started

1. Visit [MetaLife](https://metalambda.org/modularmetalife.html)
2. Enter a seed value or connect your wallet for a seed
3. Click "Apply" to initialize the simulation
4. Use the step buttons to advance the simulation
5. Save snapshots to IPFS when you find interesting states
6. Explore the registry to view and load past snapshots

## Technical Implementation

MetaLife is built using:
- **Babylon.js**: For 3D rendering and physics
- **IPFS HTTP Client**: For decentralized storage
- **Ethereum Integration**: For wallet connection and seed generation
- **Custom Cellular Automata**: For life form behavior and evolution

## Future Directions

- Enhanced FVM integration for on-chain evolution
- Multi-user shared environments
- More complex genetic algorithms
- Improved UI and visualization options

For more details, visit [MetaLambda](https://metalambda.org/modularmetalife.html) or watch our [demo video](https://youtu.be/HhNnnKV-h_Q).

See also this development log: https://github.com/fractastical/metametaverse/blob/main/log.md
