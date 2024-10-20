import re

def remove_trailing_comma(input_file, output_file):
    with open(input_file, 'r') as f:
        content = f.read()

    # Use regex to remove the comma after the "name" value
    modified_content = re.sub(r'("name": "[^"]+"),(\s*})', r'\1\2', content)

    with open(output_file, 'w') as f:
        f.write(modified_content)

# Usage
input_file = 'menu-data.json'
output_file = 'processed_orders-id.json'
remove_trailing_comma(input_file, output_file)