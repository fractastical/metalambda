// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Proof-of-Render reward token for MetaLife – deployable on FeVM / FVM.
// Contributors submit an IPFS manifest proof signed by the life-form owner
// to mint ERC-20 tokens proportional to the simulation steps computed.

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ProofOfRenderToken is ERC20 {
    using ECDSA for bytes32;

    // Address that controls the life-form and authorises proofs.
    address public lifeformOwner;

    // Replay-protection: proofs already used.
    mapping(bytes32 => bool) public usedProofs;

    // 1 token = 1 simulated step (can be changed via rewardMultiplier).
    uint256 public rewardMultiplier = 1 ether;

    event ProofAccepted(bytes32 indexed proofId, address indexed worker, uint256 steps);

    constructor(string memory name_, string memory symbol_, address owner_) ERC20(name_, symbol_) {
        lifeformOwner = owner_;
    }

    /// Submit a proof manifest and mint reward tokens.
    ///
    /// The life-form owner signs the keccak256 hash of:
    ///   keccak256(manifestCID | steps | stateHash)
    /// where:
    ///   manifestCID – raw UTF-8 bytes of the IPFS CID (multibase)
    ///   steps       – uint256 number of ticks simulated
    ///   stateHash   – keccak256 hash of resulting snapshot JSON
    ///
    /// Workers provide the signature and receive tokens if valid & unused.
    function mintWithProof(
        address to,
        bytes calldata manifestCID,
        uint256 steps,
        bytes32 stateHash,
        bytes calldata ownerSignature
    ) external {
        bytes32 proofId = keccak256(abi.encodePacked(manifestCID, steps, stateHash));
        require(!usedProofs[proofId], "Proof already used");

        // Verify owner signature (EIP-191 personal_sign).
        bytes32 ethHash = proofId.toEthSignedMessageHash();
        address signer = ECDSA.recover(ethHash, ownerSignature);
        require(signer == lifeformOwner, "Invalid owner signature");

        usedProofs[proofId] = true;
        _mint(to, steps * rewardMultiplier);

        emit ProofAccepted(proofId, to, steps);
    }

    // Owner functions ---------------------------------------------------
    function setRewardMultiplier(uint256 weiPerStep) external {
        require(msg.sender == lifeformOwner, "Only owner");
        rewardMultiplier = weiPerStep;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == lifeformOwner, "Only owner");
        lifeformOwner = newOwner;
    }
}
