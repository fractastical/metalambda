use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

const FREQ_MIN: f32 = -1000.0;
const FREQ_MAX: f32 = 1000.0;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct LifeForm {
    pub x_freq: f32,
    pub y_freq: f32,
    pub z_freq: f32,
    pub mutation: f32,
}

fn sanitize_freq(value: f32) -> f32 {
    if value.is_nan() {
        0.0
    } else {
        value.clamp(FREQ_MIN, FREQ_MAX)
    }
}

#[wasm_bindgen]
impl LifeForm {
    #[wasm_bindgen(constructor)]
    pub fn new(x_freq: f32, y_freq: f32, z_freq: f32, mutation: f32) -> LifeForm {
        LifeForm { x_freq, y_freq, z_freq, mutation }
    }

    #[wasm_bindgen]
    pub fn mutate(&mut self) {
        let dx = (js_sys::Math::random() as f32 - 0.5) * self.mutation;
        let dy = (js_sys::Math::random() as f32 - 0.5) * self.mutation;
        let dz = (js_sys::Math::random() as f32 - 0.5) * self.mutation;

        self.x_freq = sanitize_freq(self.x_freq + dx);
        self.y_freq = sanitize_freq(self.y_freq + dy);
        self.z_freq = sanitize_freq(self.z_freq + dz);
    }
}

#[wasm_bindgen]
pub fn step_simulation(json_state: &str) -> Result<String, JsValue> {
    let mut life_forms: Vec<LifeForm> = serde_json::from_str(json_state)
        .map_err(|e| JsValue::from_str(&format!("Deserialization error: {}", e)))?;

    for lf in &mut life_forms {
        lf.mutate();
    }

    serde_json::to_string(&life_forms)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}
