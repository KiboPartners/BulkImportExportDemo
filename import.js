
let importExportFactory = require('./importExportFactory')
let helpers = require('./helpers')
JSZip = require("jszip")
fs = require("fs")
let request = require('request')
  
let importJob = async () => {
  
    let importExportResource = importExportFactory()
    // First we upload the file
    let filename = "catalog.zip"

    let fileResponse = await importExportResource.uploadFile({
         filename:filename 
    }, {
         body: fs.readFileSync("tmp/import.zip"),
         headers: { 'Content-Type': "application/zip" }
    });

    console.log(fileResponse)

    console.log({
          "id": fileResponse.id,
          "locationType": fileResponse.locationType,
          "fileName": filename,
          "fileType": "import"
     })
  
   let importJob = await importExportResource.createImportJob({}, { body: {
        "name": "Catalog Import Job Test",
        "format": "Legacy",
        "domain": "catalog",
        files: [fileResponse],
         "resources": [
        "AttributeValues",
        "Attributes",
        "Categories",
        "CategoryImages",
        "Images",
        "LocationInventory",
        "LocationTypes",
        "Locations",
        "PricelistEntries",
        "PricelistEntryExtras",
        "PricelistEntryPrices",
        "Pricelists",
        "ProductBundles",
        "ProductCatalog",
        "ProductExtras",
        "ProductImages",
        "ProductOptionLocalization",
        "ProductOptions",
        "ProductPropertyLocale",
        "ProductRanking",
        "ProductTypeAttributeValues",
        "ProductTypeAttributes",
        "ProductTypes",
        "Products",
        "SortDefinition"
         ].map((e) => { return {"format": "Legacy", "resource": e, "deleteOmitted": false}})}})

    let jobId = importJob.id
    var jobStatus = {}
    while (true) {
        jobStatus = await importExportResource.getImport({jobId: jobId})
        console.log(jobStatus)
        if (jobStatus.isComplete == true) {
            break;
        }
        console.log("Waiting...")
        await helpers.wait(2000)
    }

    console.log("Complete!")
}

importJob()