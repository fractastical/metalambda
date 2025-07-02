# MetaLife: Decentralized Modular Artificial Life

**[Watch the Demo Video](https://youtu.be/oMEHwwOj0_w)**

[MetaLife](https://metalambda.org/modularmetalife.html) is a decentralized artificial life simulation that combines lambda calculus principles with IPFS storage. Users can create, evolve, and observe 3D life forms with genetic properties, save simulation states to IPFS, and reload them via a registry system.

## Canonical Specification

### Seed-Based Deterministic Generation

The MetaLambda system uses a deterministic approach to generate lifeforms from seeds. This specification ensures that any rendering engine implementing this protocol will produce identical computational actions for the same seed input.

#### Seed Format and Processing

1. **Seed Input**: A hexadecimal string (typically an Ethereum address format: 0x + 40 hex characters)
2. **Seed Parsing**:
   - Characters 0-3: xFrequency (modulo 200)
   - Characters 3-6: yFrequency (modulo 200)
   - Characters 6-9: zFrequency (modulo 200)
   - Characters 9-11: colorComponent A
   - Characters 11-13: colorComponent B
   - Characters 13-15: colorComponent C
   - Characters 15-17: splitFrequency
   - Characters 17-19: mutationRate
   - Characters 19-21: musicParameter
   - Characters 21-23: positionX (modulo 100)
   - Characters 23-25: positionY (modulo 100)
   - Characters 25-27: positionZ (modulo 100)

### Lambda Calculus Foundation

At its core, MetaLambda is modeled as a single lambda term:

```
(λs.((λx.(x (x x))) (λr.(r (s s)))))
```

This represents a self-reproducing, rewriting system where `λs` is the system state, `(λx.(x (x x)))` is a self-reproducing node, and `(λr.(r (s s)))` applies rewriting rules.

### Computational Actions Specification

1. **Initialization**:
   - Create initial cellular automata at positions derived from seed
   - Set energy levels to a standard value (10000)
   - Apply color values derived from seed

2. **Evolution Steps**:
   - For each step, apply the metaLambda function to each cellular automaton
   - Decrease energy by 1 per step
   - Remove entities with energy < 2
   - Handle boundary conditions (wrap around at edges)
   - Detect collisions between entities and apply energy boost (1111) when found
   - Apply mutation based on the mutation parameter

3. **Mutation Algorithm**:
   - Randomly alter frequency values by ±mutationRate
   - Probability of mutation = mutationRate/100
   - Color mutation follows RGB incrementation rules

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

## Future Genetic Evolution Model

The next generation of MetaLambda will implement a genetic breeding system where organisms can share and combine their computational DNA:

1. **Breeding Mechanism**:
   - When two organisms collide with sufficient energy, they may produce offspring
   - The offspring inherits a combination of both parents' lambda expressions
   - Code crossover occurs at randomly selected points in the parent lambda terms

2. **Genetic Code Sharing**:
   - Each organism carries a lambda expression representing its behavior
   - During reproduction, sections of code are exchanged between parents
   - Expression fragments are spliced together using lambda calculus composition rules
   - Binding variables are properly renamed to maintain semantic integrity

   ```
   # Lambda calculus representation of genetic code sharing
   
   # Parent organisms with their lambda expressions
   Parent1 = (λx.λy.(x (y x)))
   Parent2 = (λa.λb.(b (a b)))
   
   # Genetic crossover at selected points
   # Taking the head of Parent1 and tail of Parent2
   Offspring1 = (λx.λb.(b (x b)))
   
   # Taking the head of Parent2 and tail of Parent1
   Offspring2 = (λa.λy.(y (a y)))
   
   # Mutation operation (random term substitution)
   Mutated = (λx.λy.(y (x y))) → (λx.λy.(y (x (x y))))
   ```

3. **Fitness and Selection**:
   - Organisms with more successful traits (energy acquisition, longevity) have higher chances of reproduction
   - Environmental pressures can be introduced to guide evolution
   - Emergent behaviors can be selected for through multi-generational evolution
   
   ```
   # Lambda calculus representation of fitness evaluation
   
   # Environment interaction function
   Environment = (λorg.λres.(org res))
   
   # Organism evaluation in environment returns fitness score
   Fitness = (Environment Organism Resources)
   
   # Selection probability proportional to fitness
   SelectionProbability = (λorg.λpop.(Fitness org) / Σ(Fitness pop))
   ```
