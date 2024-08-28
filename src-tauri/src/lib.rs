mod folder_select;
mod generate_thumbnails;

use folder_select::select_folder;
use generate_thumbnails::generate_thumbnails;
use serde_json::json;
use std::collections::HashMap;
use std::process::Command;
use std::thread;

#[tauri::command]
fn settings_click() -> String {
    "Settings clicked".to_string()
}

#[tauri::command]
fn call_command(command: String, path: String) -> String {
    // Replace $VP with the actual path
    let full_command = command.replace("$VP", &path);

    // Run the command in a separate thread
    thread::spawn(move || {
        let output = Command::new("sh")
            .arg("-c")
            .arg(format!("nohup {} > /dev/null 2>&1 &", full_command))
            .output();

        match output {
            Ok(output) => {
                if !output.stdout.is_empty() {
                    eprintln!("stdout: {}", String::from_utf8_lossy(&output.stdout));
                }
                if !output.stderr.is_empty() {
                    eprintln!("stderr: {}", String::from_utf8_lossy(&output.stderr));
                }
            }
            Err(e) => eprintln!("Failed to execute command: {}", e),
        }
    });

    "Command is running in the background".to_string()
}

#[tauri::command]
fn get_wallpapers(app_data_dir_path: String, path: Option<String>) -> (String, String) {
    let folder_path = match path {
        Some(p) => p,
        None => select_folder().unwrap_or_else(|| String::new()),
    };

    if folder_path.is_empty() {
        (
            json!({"error": "No folder selected"}).to_string(),
            String::new(),
        )
    } else {
        let thumbnails_map: HashMap<String, String> =
            generate_thumbnails(&folder_path, &app_data_dir_path);
        let thumbnails_json =
            serde_json::to_string(&thumbnails_map).expect("Failed to convert to JSON");
        (thumbnails_json, folder_path)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            settings_click,
            get_wallpapers,
            call_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
