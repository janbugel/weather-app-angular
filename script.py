import os

def write_file_content(output_file, file_path, content):
    """
    Writes the content of a file to the output file with clear start and end markers.
    """
    output_file.write(f"---\nFile: {file_path}\n---\n")
    output_file.write(content + "\n\n")

def process_directory(root_dir, output_file, exclude_files=['.DS_Store']):
    """
    Processes each file in the directory, excluding specified files.
    """
    for root, dirs, files in os.walk(root_dir):
        relative_path_root = os.path.relpath(root, root_dir)
        for file_name in files:
            if file_name in exclude_files:
                continue
            file_path = os.path.join(root, file_name)
            relative_file_path = os.path.join(relative_path_root, file_name) if relative_path_root != '.' else file_name
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    write_file_content(output_file, relative_file_path, content)
            except Exception as e:
                print(f"Could not read file {file_path}: {e}")

def compile_angular_codebase_to_text(root_dir, output_filename):
    """
    Compiles the Angular codebase into a single text file with clear delineation of files.
    """
    with open(output_filename, 'w', encoding='utf-8') as output_file:
        process_directory(root_dir, output_file)

if __name__ == '__main__':
    root_dir = '/Users/asdf/Documents/weather-app-angular/src'  # Update this path to your Angular app directory
    output_filename = 'angular_codebase_compilation.txt'
    compile_angular_codebase_to_text(root_dir, output_filename)
    print(f"Compilation completed: {output_filename}")