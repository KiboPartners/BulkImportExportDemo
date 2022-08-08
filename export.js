
let importExportResourceFactory = require('./importExportFactory')
let helpers = require('./helpers')
JSZip = require("jszip")
fs = require("fs")
let request = require('request')

let exportJob = async () => {
  let importExportResource = importExportResourceFactory()
  let exportJobResponse = await importExportResource.createExportJob({}, {
    body: {
      "name": "Catalog Export Job Test",
      "domain": "catalog",
      "resources": [
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
      ].map((e) => { return { "format": "Standard", "resource": e, "deleteOmitted": false } })
    }
  })
  let jobId = exportJobResponse.id
  var jobStatus = {}
  while (true) {
    jobStatus = await importExportResource.getExportJob({ id: jobId })
    // console.log(jobStatus)
    if (jobStatus.isComplete == true) {
      break;
    }
    console.log("Waiting...")
    await helpers.wait(2000)
  }

  // There is a delay between when the job completes and the files array is available
  let numTries = 0;
  while (true) {
    jobStatus = await importExportResource.getExportJob({ id: jobId })
    // console.log(jobStatus)
    if (jobStatus.files && jobStatus.files.length > 0) {
      break;
    }
    numTries++;
    if (numTries > 20) {
      throw new Exception("No files array after 20 tries, something is wrong.");
    }
    console.log("Files array not populated, waiting...")
    await helpers.wait(2000)
  }

  let fileLink = await importExportResource.getPublicLink({ id: jobStatus.files[0].id })

  let stream = await request({ uri: fileLink, headers: {} })

  let self = this;
  return new Promise((resolve, reject) => {
    var buffers = [];
    stream.on('data', function (buffer) {
      buffers.push(buffer);
    });
    stream.on('end', function () {
      var buffer = Buffer.concat(buffers);

      // Uncomment to save the export to disk for analysis
      try { fs.mkdirSync('tmp') } catch (e) { }
      fs.writeFile("tmp/export.zip", buffer, "binary", function (err) { });
      var zip = new JSZip();
      zip.loadAsync(buffer).then(function (zip) {
        for (let file of Object.keys(zip.files)) {
          zip.file(file).async("binarystring").then(data => {
            fs.writeFileSync("tmp/" + file, data);
          }).catch(e => {
            console.error(e)
          })
        }
      })
    })
  })
}

exportJob()