import os
import sys
from pathlib import Path
from datetime import datetime, timezone, date
import yaml
import re
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

BLOG_CONTENT_DIR = Path("src/content/blog")

def extract_frontmatter(content: str, file_name: str):
    """
    Extracts YAML frontmatter metadata from Markdown content.
    
    Parses the YAML frontmatter at the beginning of the content and returns a tuple containing the metadata dictionary, the remaining body content, and the original YAML string. Returns (None, None, None) if extraction or parsing fails.
    """
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        logging.debug(f"No YAML frontmatter delimiters found in {file_name}")
        return None, None, None

    yaml_content_str = match.group(1)
    body_content = content[match.end():]

    try:
        metadata = yaml.safe_load(yaml_content_str)
        if isinstance(metadata, dict):
            logging.debug(f"Successfully extracted metadata for {file_name}")
            return metadata, body_content, yaml_content_str
        else:
            logging.warning(f"Frontmatter in {file_name} parsed but is not a dictionary (type: {type(metadata)}). Skipping file.")
            return None, None, None
    except yaml.YAMLError as e:
        logging.error(f"Error parsing YAML frontmatter in {file_name}: {e}. Skipping file.")
        return None, None, None
    except Exception as e:
        logging.error(f"Unexpected error parsing YAML in {file_name}: {e}. Skipping file.")
        return None, None, None


def publish_post_if_ready(file_path: Path):
    """
    Publishes a blog post by updating its draft status if its publication date has arrived.
    
    Checks the YAML frontmatter of a Markdown file to determine if the post is marked as a draft and has a publication date (`pubDate`) that is in the past or present. If so, updates the draft status to `false` and rewrites the file. Returns `True` if the file was updated, otherwise `False`.
    """
    made_change = False
    file_name = file_path.name

    try:
        logging.debug(f"Processing file: {file_name}")
        content = file_path.read_text(encoding='utf-8')

        metadata, body, original_yaml = extract_frontmatter(content, file_name)

        if metadata is None:
            return False

        is_draft = metadata.get('draft')
        pub_date_value = metadata.get('pubDate')

        logging.debug(f"File: {file_name}, Draft Status: {is_draft}, PubDate Value: {pub_date_value} (Type: {type(pub_date_value).__name__})")

        if is_draft is True:
            if pub_date_value is not None:
                pub_date_dt = None
                try:
                    if isinstance(pub_date_value, datetime):
                        logging.debug(f"Handing pubDate for {file_name} as datetime object.")
                        pub_date_dt = pub_date_value
                        if pub_date_dt.tzinfo is None or pub_date_dt.tzinfo.utcoffset(pub_date_dt) is None:
                            logging.debug(f"Making naive datetime UTC for {file_name}")
                            pub_date_dt = pub_date_dt.replace(tzinfo=timezone.utc)

                    elif isinstance(pub_date_value, date) and not isinstance(pub_date_value, datetime):
                         logging.debug(f"Handing pubDate for {file_name} as date object, converting to datetime.")
                         pub_date_dt = datetime(pub_date_value.year, pub_date_value.month, pub_date_value.day, 0, 0, 0, tzinfo=timezone.utc)

                    elif isinstance(pub_date_value, str):
                        logging.debug(f"Handing pubDate for {file_name} as string, parsing.")
                        parsed_date_str = pub_date_value.replace('Z', '+00:00')
                        pub_date_dt = datetime.fromisoformat(parsed_date_str)
                    else:
                        logging.warning(f"Unexpected type for pubDate in {file_name}: {type(pub_date_value)}. Cannot compare date.")

                    if pub_date_dt:
                        now_utc = datetime.now(timezone.utc)
                        logging.debug(f"Comparing pubDate {pub_date_dt} with current time {now_utc} for {file_name}")

                        if pub_date_dt <= now_utc:
                            logging.info(f"Publishing {file_name} (pubDate: {pub_date_value})")

                            new_yaml = re.sub(r"^\s*draft:\s*true\s*$", "draft: false", original_yaml, flags=re.MULTILINE | re.IGNORECASE)

                            if new_yaml == original_yaml:
                                 logging.debug(f"Regex replacement failed for 'draft: true' in {file_name}, trying string replace.")
                                 temp_yaml = original_yaml.replace('draft: true', 'draft: false', 1)
                                 new_yaml = temp_yaml.replace('draft: True', 'draft: false', 1)


                            if new_yaml != original_yaml:
                                try:
                                    new_content = f"---\n{new_yaml.strip()}\n---\n{body}"
                                    file_path.write_text(new_content, encoding='utf-8')
                                    logging.info(f"Successfully updated draft status to false in {file_name}")
                                    made_change = True
                                except IOError as write_err:
                                     logging.error(f"Failed to write updated content to {file_name}: {write_err}")
                                except Exception as write_ex:
                                     logging.error(f"Unexpected error writing updated content to {file_name}: {write_ex}")
                            else:
                                 logging.warning(f"Could not find/replace 'draft: true' in {file_name}. Already false or formatted unusually?")
                        else:
                             logging.info(f"Skipping {file_name}: Publication date ({pub_date_value}) is in the future.")

                except ValueError as e:
                    logging.warning(f"Could not process pubDate value '{pub_date_value}' (type {type(pub_date_value).__name__}) in {file_name}: {e}. Skipping date check.")
                except Exception as e:
                    logging.error(f"Unexpected error during date processing for {file_name} with value '{pub_date_value}': {e} (Type: {type(e).__name__})")
            else:
                 logging.warning(f"Skipping {file_name}: Draft is true, but 'pubDate' key is missing.")
        else:
            logging.info(f"Skipping {file_name}: Draft status is not explicitly 'true' (current value: {is_draft}).")

    except FileNotFoundError:
        logging.error(f"File vanished before processing: {file_name}")
    except PermissionError as pe:
        logging.error(f"Permission error reading file {file_name}: {pe}")
    except IOError as e:
        logging.error(f"IOError reading file {file_name}: {e}")
    except UnicodeDecodeError as ude:
        logging.error(f"Encoding error reading file {file_name}. Ensure it's UTF-8: {ude}")
    except Exception as e:
        logging.exception(f"Unexpected error processing file {file_name}: {e}")

    return made_change

def main():
    """
    Scans the blog content directory for Markdown files and publishes eligible draft posts.
    
    Checks each Markdown file for draft status and publication date, updating the draft flag if the post should be published. Logs the number of posts processed and updated. Exits with an error if the content directory is missing.
    """
    logging.info("Starting auto-publish script...")
    total_changes = 0

    if not BLOG_CONTENT_DIR.is_dir():
        resolved_path = BLOG_CONTENT_DIR.resolve()
        cwd = Path.cwd()
        logging.critical(f"Blog content directory not found at expected path: {BLOG_CONTENT_DIR}")
        logging.critical(f"Resolved path attempted: {resolved_path}")
        logging.critical(f"Current working directory: {cwd}")
        logging.critical("Ensure the script is run from the repository root or BLOG_CONTENT_DIR is correct.")
        sys.exit(1)

    logging.info(f"Checking posts in directory: {BLOG_CONTENT_DIR}")

    try:
        files_to_check = list(BLOG_CONTENT_DIR.glob("*.md")) + list(BLOG_CONTENT_DIR.glob("*.mdx"))
        logging.info(f"Found {len(files_to_check)} potential post files (.md, .mdx).")

        processed_files = 0
        for file_path in files_to_check:
            if file_path.is_file():
                if publish_post_if_ready(file_path):
                    total_changes += 1
                processed_files += 1
            else:
                 logging.warning(f"Path found by glob is not a file (skipped): {file_path}")

        logging.info(f"Processed {processed_files} files.")

    except Exception as e:
        logging.exception(f"An unexpected error occurred during file processing loop: {e}")

    logging.info("-" * 20)
    if total_changes > 0:
        logging.info(f"Script finished. {total_changes} post(s) were updated.")
    else:
        logging.info("Script finished. No posts needed publishing or updating.")
    logging.info("-" * 20)

if __name__ == "__main__":
    main()