# MetaLife: Decentralized Modular Artificial Life

**[Watch the Demo Video](https://youtu.be/oMEHwwOj0_w)**

[MetaLife](https://metalambda.org/modularmetalife.html) is a decentralized artificial life simulation that combines lambda calculus principles with IPFS storage. Users can create, evolve, and observe 3D life forms with genetic properties, save simulation states to IPFS, and reload them via a registry system.

## Lambda Calculus Foundation

At its core, MetaLambda is modeled as a single lambda term:

(λs.((λx.(x (x x))) (λr.(r (s s)))))

This represents a self-reproducing, rewriting system where `λs` is the system state, `(λx.(x (x x)))` is a self-reproducing node, and `(λr.(r (s s)))` applies rewriting rules.

## Key Features

### Artificial Life & Visualization
- Self-reproducing 3D organisms with directional growth and mutation
- Babylon.js-powered real-time visualization
- Interactive simulation controls (100/1000 steps)

### Protocol Labs Technologies
- **IPFS Integration**: Save and load simulation snapshots via content-addressed storage
- **Snapshot Registry**: Collection of all snapshots stored on IPFS with CID-based retrieval
- **FVM Support**: Experimental Filecoin Virtual Machine integration
- **Wallet Connection**: Use Ethereum wallets for seed generation

## How to Use

1. Visit [MetaLife](https://metalambda.org/modularmetalife.html)
2. Enter a seed or connect your wallet
3. Use step controls to evolve your ecosystem
4. Name and save snapshots to IPFS
5. Load previous snapshots from the registry

The project demonstrates how decentralized storage can preserve complex computational states while exploring emergent behaviors in artificial life systems.

Deployed at: http://metalambda.org

Development log: https://github.com/fractastical/metametaverse/blob/main/log.md
