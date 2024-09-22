#!/bin/bash

# Create the dist directory if it doesn't exist
echo "Creating dist directory..."
mkdir -p ./dist

# Output file
output_js="./dist/appSage.tailwind.js"
output_css="./dist/appSage.css"
css_file="./app/css/main.css"

# Clear the output file if it exists
echo "Clearing the output files..."
echo -n "" > "$output_js"
echo -n "" > "$output_css"

# Define an array of the required files in order
declare -a js_files=(
    "./app/js/tailwind.js"
    "./app/js/tailwind.config.js"
    "./app/js/dashboard/main.js"
    "./app/js/editor/grid.js"
    "./app/js/editor/style/grid.js"
    "./app/js/editor/column.js"
    "./app/js/editor/style/column.js"
    "./app/js/editor/content.js"
    "./app/js/editor/sidebar.js"
    "./app/js/editor/style.js"
    "./app/js/editor/main.js"
    "./app/js/editor/globals.js"
    "./app/js/editor/save.js"
    "./app/js/editor/load.js"
    "./app/js/load.js"
    "./app/js/editor/responsive.js"
    "./app/js/remote_save.js"
    "./app/js/editor/media.js"
    "./app/js/preview/main.js"
)

# Debugging output to verify the array content
echo "JS Files array defined:"
for file in "${js_files[@]}"; do
    echo "$file"
done

# Loop through the array and append each file to the output file
for js_file in "${js_files[@]}"
do
    echo "Processing $js_file..."
    if [[ -f "$js_file" ]]; then
        echo "Appending $js_file to $output_js"
        echo "/* File: $js_file */" >> "$output_js"
        cat "$js_file" >> "$output_js"
        echo -e "\n" >> "$output_js"  # Add a newline for separation
    else
        echo "Warning: $js_file not found, skipping."
    fi
done

echo "Appending $css_file to $output_css"
echo "/* File: $css_file */" >> "$output_css"
cat "$css_file" >> "$output_css"
echo -e "\n" >> "$output_css"  # Add a newline for separation

echo "All specified JS files have been merged into $output_js and $output_css"
