using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace MetaLambda
{
    /// <summary>
    /// Core implementation of MetaLambda for Unity following the canonical specification
    /// </summary>
    public class MetaLambdaCore : MonoBehaviour
    {
        [Header("Simulation Parameters")]
        public int startingEnergy = 10000;
        public Vector3Int worldSize = new Vector3Int(100, 100, 100);
        public int startingNumberOfOrganisms = 50;
        public int stepsPerSimulation = 10000;

        [Header("Seed Configuration")]
        public string seedAddress = ""; // Ethereum address format: 0x + 40 hex characters

        private List<MetaOrganism> activeOrganisms = new List<MetaOrganism>();
        private Dictionary<Vector3Int, MetaOrganism> positionMap = new Dictionary<Vector3Int, MetaOrganism>();
        private int completedSteps = 0;
        private System.Random random;

        // Parameters derived from seed
        private int xFreq, yFreq, zFreq;
        private string colorA, colorB, colorC;
        private int splitFreq, mutationRate, musicParam;
        private Vector3Int initialPosition;

        void Start()
        {
            // Generate random seed if none provided
            if (string.IsNullOrEmpty(seedAddress))
            {
                seedAddress = "0x" + GenerateRandomHex(40);
            }

            // Parse seed according to canonical specification
            ParseSeed(seedAddress);

            // Initialize simulation
            InitializeSimulation();
        }

        /// <summary>
        /// Parses the seed according to the canonical specification
        /// </summary>
        /// <param name="seed">Ethereum address format seed</param>
        private void ParseSeed(string seed)
        {
            // Remove 0x prefix if present
            if (seed.StartsWith("0x"))
            {
                seed = seed.Substring(2);
            }

            // Parse parameters according to specification
            xFreq = HexToDecimal(seed.Substring(0, 3)) % 200;
            yFreq = HexToDecimal(seed.Substring(3, 3)) % 200;
            zFreq = HexToDecimal(seed.Substring(6, 3)) % 200;
            
            colorA = seed.Substring(9, 2);
            colorB = seed.Substring(11, 2);
            colorC = seed.Substring(13, 2);
            
            splitFreq = HexToDecimal(seed.Substring(15, 2));
            mutationRate = HexToDecimal(seed.Substring(17, 2));
            musicParam = HexToDecimal(seed.Substring(19, 2));
            
            initialPosition = new Vector3Int(
                HexToDecimal(seed.Substring(21, 2)) % 100,
                HexToDecimal(seed.Substring(23, 2)) % 100,
                HexToDecimal(seed.Substring(25, 2)) % 100
            );

            // Initialize random with seed for deterministic behavior
            random = new System.Random(HexToDecimal(seed));
        }

        /// <summary>
        /// Initializes the simulation with organisms based on seed parameters
        /// </summary>
        private void InitializeSimulation()
        {
            // Clear any existing simulation
            activeOrganisms.Clear();
            positionMap.Clear();
            completedSteps = 0;

            // Create initial organisms
            for (int i = 0; i < startingNumberOfOrganisms; i++)
            {
                // Create organism with parameters derived from seed
                CreateOrganism();
            }

            Debug.Log($"Simulation initialized with {activeOrganisms.Count} organisms");
        }

        /// <summary>
        /// Creates a new organism with parameters derived from seed
        /// </summary>
        private void CreateOrganism()
        {
            // Create game object for organism
            GameObject organismObj = new GameObject("Organism_" + activeOrganisms.Count);
            organismObj.transform.parent = transform;
            
            // Add MetaOrganism component
            MetaOrganism organism = organismObj.AddComponent<MetaOrganism>();
            
            // Initialize with parameters from seed
            Vector3Int position = new Vector3Int(
                (initialPosition.x + random.Next(worldSize.x)) % worldSize.x,
                (initialPosition.y + random.Next(worldSize.y)) % worldSize.y,
                (initialPosition.z + random.Next(worldSize.z)) % worldSize.z
            );
            
            // Convert hex color to Unity color
            Color color = new Color(
                HexToFloat(colorA),
                HexToFloat(colorB),
                HexToFloat(colorC)
            );
            
            // Initialize organism
            organism.Initialize(
                position,
                startingEnergy,
                color,
                xFreq,
                yFreq,
                zFreq,
                splitFreq,
                mutationRate
            );
            
            // Add to active organisms
            activeOrganisms.Add(organism);
            
            // Add to position map
            positionMap[position] = organism;
        }

        /// <summary>
        /// Runs a single step of the simulation
        /// </summary>
        public void RunStep()
        {
            if (completedSteps >= stepsPerSimulation)
            {
                Debug.Log("Simulation completed");
                return;
            }

            // Create a copy of the list to avoid modification during iteration
            List<MetaOrganism> currentOrganisms = new List<MetaOrganism>(activeOrganisms);
            
            // Update position map
            positionMap.Clear();
            
            // Apply metaLambda function to each organism
            foreach (MetaOrganism organism in currentOrganisms)
            {
                // Skip if organism has been removed
                if (!activeOrganisms.Contains(organism))
                    continue;
                
                // Apply metaLambda function (core computational action)
                ApplyMetaLambda(organism);
                
                // Decrease energy
                organism.energy -= 1;
                
                // Remove if energy too low
                if (organism.energy < 2)
                {
                    activeOrganisms.Remove(organism);
                    Destroy(organism.gameObject);
                    continue;
                }
                
                // Handle boundary conditions (wrap around)
                WrapPosition(organism);
                
                // Check for collisions
                CheckCollisions(organism);
                
                // Update position map
                positionMap[organism.position] = organism;
            }
            
            completedSteps++;
            Debug.Log($"Step {completedSteps} completed. Active organisms: {activeOrganisms.Count}");
        }

        /// <summary>
        /// Applies the metaLambda function to an organism (core computational action)
        /// </summary>
        private void ApplyMetaLambda(MetaOrganism organism)
        {
            // Implementation of the metaLambda function as defined in the canonical spec
            // This is the core computational action that determines organism behavior
            
            // Calculate new position based on frequencies
            Vector3Int newPosition = new Vector3Int(
                organism.position.x + Mathf.RoundToInt(Mathf.Sin(organism.xFreq * completedSteps * 0.01f) * 2),
                organism.position.y + Mathf.RoundToInt(Mathf.Cos(organism.yFreq * completedSteps * 0.01f) * 2),
                organism.position.z + Mathf.RoundToInt(Mathf.Sin(organism.zFreq * completedSteps * 0.01f) * 2)
            );
            
            // Apply mutation if random chance hits
            if (random.Next(100) < organism.mutationRate)
            {
                Mutate(organism);
            }
            
            // Update organism position
            organism.position = newPosition;
            
            // Update visual representation
            organism.UpdateVisual();
        }

        /// <summary>
        /// Mutates an organism's parameters
        /// </summary>
        private void Mutate(MetaOrganism organism)
        {
            // Mutate frequencies
            organism.xFreq += random.Next(-organism.mutationRate, organism.mutationRate + 1);
            organism.yFreq += random.Next(-organism.mutationRate, organism.mutationRate + 1);
            organism.zFreq += random.Next(-organism.mutationRate, organism.mutationRate + 1);
            
            // Mutate color
            Color newColor = organism.color;
            newColor.r = Mathf.Clamp01(newColor.r + (random.Next(-10, 11) * 0.01f));
            newColor.g = Mathf.Clamp01(newColor.g + (random.Next(-10, 11) * 0.01f));
            newColor.b = Mathf.Clamp01(newColor.b + (random.Next(-10, 11) * 0.01f));
            organism.color = newColor;
        }

        /// <summary>
        /// Wraps organism position at world boundaries
        /// </summary>
        private void WrapPosition(MetaOrganism organism)
        {
            organism.position.x = (organism.position.x + worldSize.x) % worldSize.x;
            organism.position.y = (organism.position.y + worldSize.y) % worldSize.y;
            organism.position.z = (organism.position.z + worldSize.z) % worldSize.z;
        }

        /// <summary>
        /// Checks for collisions between organisms
        /// </summary>
        private void CheckCollisions(MetaOrganism organism)
        {
            // Check if another organism is at the same position
            if (positionMap.TryGetValue(organism.position, out MetaOrganism other) && other != organism)
            {
                // Energy boost on collision
                organism.energy += 1111;
                Debug.Log("Collision detected! Energy boost applied.");
            }
        }

        /// <summary>
        /// Runs multiple steps of the simulation
        /// </summary>
        public void RunMultipleSteps(int steps)
        {
            StartCoroutine(RunStepsCoroutine(steps));
        }

        private IEnumerator RunStepsCoroutine(int steps)
        {
            for (int i = 0; i < steps; i++)
            {
                RunStep();
                
                // Yield every 10 steps to prevent freezing
                if (i % 10 == 0)
                    yield return null;
            }
            
            Debug.Log($"Completed {steps} steps");
        }

        #region Utility Functions

        /// <summary>
        /// Converts hex string to decimal
        /// </summary>
        private int HexToDecimal(string hex)
        {
            return Convert.ToInt32(hex, 16);
        }

        /// <summary>
        /// Converts hex string to float (0-1 range)
        /// </summary>
        private float HexToFloat(string hex)
        {
            return HexToDecimal(hex) / 255f;
        }

        /// <summary>
        /// Generates random hex string of specified length
        /// </summary>
        private string GenerateRandomHex(int length)
        {
            string chars = "0123456789abcdef";
            char[] result = new char[length];
            
            for (int i = 0; i < length; i++)
            {
                result[i] = chars[UnityEngine.Random.Range(0, chars.Length)];
            }
            
            return new string(result);
        }

        #endregion
    }

    /// <summary>
    /// Represents a single organism in the MetaLambda simulation
    /// </summary>
    public class MetaOrganism : MonoBehaviour
    {
        // Core properties
        public Vector3Int position;
        public int energy;
        public Color color;
        
        // Frequency parameters
        public int xFreq;
        public int yFreq;
        public int zFreq;
        public int splitFreq;
        public int mutationRate;
        
        // Visual representation
        private MeshRenderer meshRenderer;
        
        /// <summary>
        /// Initializes the organism with the specified parameters
        /// </summary>
        public void Initialize(Vector3Int position, int energy, Color color, 
                              int xFreq, int yFreq, int zFreq, 
                              int splitFreq, int mutationRate)
        {
            this.position = position;
            this.energy = energy;
            this.color = color;
            this.xFreq = xFreq;
            this.yFreq = yFreq;
            this.zFreq = zFreq;
            this.splitFreq = splitFreq;
            this.mutationRate = mutationRate;
            
            // Create visual representation
            CreateVisual();
            
            // Update position
            UpdateVisual();
        }
        
        /// <summary>
        /// Creates the visual representation of the organism
        /// </summary>
        private void CreateVisual()
        {
            // Add cube mesh
            GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.transform.parent = transform;
            cube.transform.localPosition = Vector3.zero;
            cube.transform.localScale = Vector3.one * 0.8f;
            
            // Get mesh renderer
            meshRenderer = cube.GetComponent<MeshRenderer>();
            
            // Create material
            Material material = new Material(Shader.Find("Standard"));
            material.color = color;
            material.EnableKeyword("_EMISSION");
            material.SetColor("_EmissionColor", color);
            
            // Apply material
            meshRenderer.material = material;
        }
        
        /// <summary>
        /// Updates the visual representation based on current parameters
        /// </summary>
        public void UpdateVisual()
        {
            // Update position
            transform.position = new Vector3(position.x, position.y, position.z);
            
            // Update color
            if (meshRenderer != null)
            {
                meshRenderer.material.color = color;
                meshRenderer.material.SetColor("_EmissionColor", color);
            }
        }
    }
}
