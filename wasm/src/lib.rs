use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct LifeForm {
    pub x_freq: f32,
    pub y_freq: f32,
    pub z_freq: f32,
    pub mutation: f32,
}

#[wasm_bindgen]
impl LifeForm {
    #[wasm_bindgen(constructor)]
    pub fn new(x_freq: f32, y_freq: f32, z_freq: f32, mutation: f32) -> LifeForm {
        LifeForm { x_freq, y_freq, z_freq, mutation }
    }

    #[wasm_bindgen]
    pub fn mutate(&mut self) {
        self.x_freq += (js_sys::Math::random() as f32 - 0.5) * self.mutation;
        self.y_freq += (js_sys::Math::random() as f32 - 0.5) * self.mutation;
        self.z_freq += (js_sys::Math::random() as f32 - 0.5) * self.mutation;
    }
}

#[wasm_bindgen]
pub fn step_simulation(json_state: &str) -> String {
    let mut life_forms: Vec<LifeForm> = serde_json::from_str(json_state).unwrap_or_default();
    for lf in &mut life_forms {
        lf.mutate();
    }
    serde_json::to_string(&life_forms).unwrap()
}
