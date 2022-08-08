# Flat File Import/Export Demo

See API documented here [Import Export API Docs](https://apidocs.kibocommerce.com/?spec=importexport#overview)

## Export Instructions

1. Copy mozu.config.json.example to mozu.config.json, then update the variables to point to the sandbox you want to generate an export of
2. Run `node export.js`
3. Your export will be in `tmp/export.zip` relative to this directory, the file contents will be auto-unzipped for you

## Import Instructions

1. Manually update the files you want, then place your import in `tmp/import.zip`.
2. Run `node import.js`