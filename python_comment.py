import os
import re
from concurrent.futures import ThreadPoolExecutor

def remove_comments(content):
    url_pattern = r'https?://[^\s<>"\']+|www\.[^\s<>"\']+'
    urls = re.findall(url_pattern, content)
    
    for i, url in enumerate(urls):
        content = content.replace(url, f'__URL_{i}__')
    
    content = re.sub(r'(?<!:)//.*$', '', content, flags=re.MULTILINE)
    
    content = re.sub(r'<!--(?!>)[^{<>]*?-->', '', content)
    
    content = re.sub(r'{/\*(?![^*]*?(?:<a|href|src|http|www))[^*]*?\*/}', '', content)
    
    for i, url in enumerate(urls):
        content = content.replace(f'__URL_{i}__', url)
    
    return content

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        modified_content = remove_comments(content)
        
        if content != modified_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(modified_content)
            print(f"Processed: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_directory(src_path):
    allowed_extensions = ('.ts', '.tsx', '.astro', '.json')
    files_to_process = []

    for root, dirs, files in os.walk(src_path):
        if 'content' in dirs:
            dirs.remove('content')
            
        for file in files:
            if file.endswith(allowed_extensions):
                file_path = os.path.join(root, file)
                files_to_process.append(file_path)

    # Process files in parallel
    with ThreadPoolExecutor(max_workers=os.cpu_count()) as executor:
        executor.map(process_file, files_to_process)

if __name__ == "__main__":
    src_folder = "./src"
    print("Starting comment removal...")
    process_directory(src_folder)
    print("Comment removal complete!")