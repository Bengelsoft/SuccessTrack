#!/bin/bash
npx ts-json-schema-generator --path '../src/app/domain/*.ts' --type 'SuccessTracker' --out 'SuccessTracker.json' --additional-properties 'true' --expose 'all'

# Assign input arguments to variables
template_file="domain_documentation/template_domain_documentation.md"
content_file="SuccessTracker.json"
output_file="../docs/SucessTracker_domain.md"

# Check if the input template file exists
if [ ! -f "$template_file" ]; then
    echo "Error: Template file '$template_file' not found."
    exit 1
fi

# Check if the input content file exists
if [ ! -f "$content_file" ]; then
    echo "Error: Content file '$content_file' not found."
    exit 1
fi

# Read the contents of the template and content files
template_content=$(cat "$template_file")
content=$(cat "$content_file")

# Replace the '<content>' placeholder with the content from the content file
output_content=${template_content//'<content>'/"$content"}

# Write the result to '$output_file'
echo "$output_content" > "$output_file"
echo "Content created successfully. Output file: $output_file"

# Remove SuccessTracker.json
rm SuccessTracker.json
