pub fn count_videos(folder_path: &str) -> usize {
    let path = Path::new(folder_path);
    fs::read_dir(path)
        .expect("Failed to read directory")
        .filter_map(|entry| entry.ok())
        .filter(|entry| is_video_file(&entry.path()))
        .count()
}
