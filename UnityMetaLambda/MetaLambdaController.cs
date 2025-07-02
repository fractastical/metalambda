using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using MetaLambda;

/// <summary>
/// Controller for the Unity implementation of MetaLambda
/// Provides UI controls and integration with the core simulation
/// </summary>
public class MetaLambdaController : MonoBehaviour
{
    [Header("Core Reference")]
    public MetaLambdaCore metaLambdaCore;
    
    [Header("UI Elements")]
    public InputField seedInput;
    public Button initializeButton;
    public Button stepButton;
    public Button step100Button;
    public Button step1000Button;
    public Text statusText;
    
    [Header("Camera Controls")]
    public float cameraRotationSpeed = 10f;
    public float cameraZoomSpeed = 5f;
    
    private Camera mainCamera;
    private Transform cameraTarget;
    private float cameraDistance = 150f;
    
    void Start()
    {
        // Create core if not assigned
        if (metaLambdaCore == null)
        {
            GameObject coreObject = new GameObject("MetaLambdaCore");
            metaLambdaCore = coreObject.AddComponent<MetaLambdaCore>();
        }
        
        // Set up camera
        mainCamera = Camera.main;
        cameraTarget = new GameObject("CameraTarget").transform;
        cameraTarget.position = new Vector3(50, 50, 50); // Center of the world
        
        // Position camera
        UpdateCameraPosition();
        
        // Set up UI buttons
        if (initializeButton != null)
            initializeButton.onClick.AddListener(InitializeSimulation);
        
        if (stepButton != null)
            stepButton.onClick.AddListener(RunSingleStep);
        
        if (step100Button != null)
            step100Button.onClick.AddListener(() => RunMultipleSteps(100));
        
        if (step1000Button != null)
            step1000Button.onClick.AddListener(() => RunMultipleSteps(1000));
        
        // Generate random seed if input field is empty
        if (seedInput != null && string.IsNullOrEmpty(seedInput.text))
        {
            seedInput.text = "0x" + GenerateRandomHex(40);
        }
        
        UpdateStatus("Ready to initialize simulation");
    }
    
    void Update()
    {
        // Camera rotation with mouse
        if (Input.GetMouseButton(1)) // Right mouse button
        {
            float horizontalInput = Input.GetAxis("Mouse X") * cameraRotationSpeed;
            float verticalInput = Input.GetAxis("Mouse Y") * cameraRotationSpeed;
            
            cameraTarget.Rotate(Vector3.up, horizontalInput, Space.World);
            cameraTarget.Rotate(Vector3.right, -verticalInput, Space.World);
        }
        
        // Camera zoom with scroll wheel
        float scrollInput = Input.GetAxis("Mouse ScrollWheel") * cameraZoomSpeed;
        cameraDistance = Mathf.Clamp(cameraDistance - scrollInput * 10f, 10f, 300f);
        
        // Update camera position
        UpdateCameraPosition();
    }
    
    private void UpdateCameraPosition()
    {
        if (mainCamera != null && cameraTarget != null)
        {
            mainCamera.transform.position = cameraTarget.position - cameraTarget.forward * cameraDistance;
            mainCamera.transform.LookAt(cameraTarget);
        }
    }
    
    /// <summary>
    /// Initializes the simulation with the current seed
    /// </summary>
    public void InitializeSimulation()
    {
        if (metaLambdaCore != null)
        {
            // Set seed from input field
            if (seedInput != null)
            {
                metaLambdaCore.seedAddress = seedInput.text;
            }
            
            // Start the simulation
            StartCoroutine(InitializeCoroutine());
        }
    }
    
    private IEnumerator InitializeCoroutine()
    {
        // Disable UI during initialization
        SetUIInteractable(false);
        UpdateStatus("Initializing simulation...");
        
        // Wait for end of frame to allow UI update
        yield return new WaitForEndOfFrame();
        
        // Create a new GameObject with the MetaLambdaCore component
        GameObject oldCore = metaLambdaCore.gameObject;
        GameObject newCore = new GameObject("MetaLambdaCore");
        metaLambdaCore = newCore.AddComponent<MetaLambdaCore>();
        metaLambdaCore.seedAddress = seedInput.text;
        
        // Destroy the old core
        Destroy(oldCore);
        
        // Wait for initialization
        yield return new WaitForSeconds(0.5f);
        
        // Re-enable UI
        SetUIInteractable(true);
        UpdateStatus("Simulation initialized with seed: " + metaLambdaCore.seedAddress);
    }
    
    /// <summary>
    /// Runs a single step of the simulation
    /// </summary>
    public void RunSingleStep()
    {
        if (metaLambdaCore != null)
        {
            metaLambdaCore.RunStep();
            UpdateStatus("Step completed");
        }
    }
    
    /// <summary>
    /// Runs multiple steps of the simulation
    /// </summary>
    public void RunMultipleSteps(int steps)
    {
        if (metaLambdaCore != null)
        {
            StartCoroutine(RunStepsCoroutine(steps));
        }
    }
    
    private IEnumerator RunStepsCoroutine(int steps)
    {
        // Disable UI during processing
        SetUIInteractable(false);
        UpdateStatus($"Running {steps} steps...");
        
        // Run multiple steps
        metaLambdaCore.RunMultipleSteps(steps);
        
        // Wait for completion (approximate time)
        float waitTime = steps / 100f; // Rough estimate
        float elapsed = 0f;
        
        while (elapsed < waitTime)
        {
            UpdateStatus($"Running {steps} steps... {Mathf.FloorToInt((elapsed/waitTime) * 100)}%");
            elapsed += Time.deltaTime;
            yield return null;
        }
        
        // Re-enable UI
        SetUIInteractable(true);
        UpdateStatus($"Completed {steps} steps");
    }
    
    /// <summary>
    /// Updates the status text
    /// </summary>
    private void UpdateStatus(string message)
    {
        if (statusText != null)
        {
            statusText.text = message;
            Debug.Log(message);
        }
    }
    
    /// <summary>
    /// Sets all UI elements interactable state
    /// </summary>
    private void SetUIInteractable(bool interactable)
    {
        if (seedInput != null)
            seedInput.interactable = interactable;
        
        if (initializeButton != null)
            initializeButton.interactable = interactable;
        
        if (stepButton != null)
            stepButton.interactable = interactable;
        
        if (step100Button != null)
            step100Button.interactable = interactable;
        
        if (step1000Button != null)
            step1000Button.interactable = interactable;
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
            result[i] = chars[Random.Range(0, chars.Length)];
        }
        
        return new string(result);
    }
}
