use std::process::Command;

pub fn select_folder() -> Option<String> {
    let output = Command::new("zenity")
        .arg("--file-selection")
        .arg("--directory")
        .output()
        .expect("Failed to execute Zenity");

    if output.status.success() {
        let path = String::from_utf8_lossy(&output.stdout).trim().to_string();
        if !path.is_empty() {
            return Some(path);
        }
    }

    None
}
