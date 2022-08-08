let Client = require('mozu-node-sdk/client');
let constants = Client.constants;

/**
 * https://apidocs.kibocommerce.com/?spec=importexport#overview
 **/
let importExportResourceFactory = Client.sub({
  createExportJob: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/export'
  }),
  deleteExportJob: Client.method({
    method: constants.verbs.DELETE,
    url: '{+tenantPod}/api/platform/data/export'
  }),
  getExportJob: Client.method({
    method: constants.verbs.GET,
    url: '{+tenantPod}/api/platform/data/export/{id}'
  }),
  listExportJobs: Client.method({
    method: constants.verbs.GET,
    url: '{+tenantPod}/api/platform/data/export'
  }),

  downloadFile: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/files/{id}/content'
  }),
  getFile: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/files/{id}'
  }),
  getPublicLink: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/files/{id}/generatelink?hourDuration=24'
  }),
  uploadFile: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/files?fileType=import&fileName={id}'
  }),

  createImportJob: Client.method({
    method: constants.verbs.POST,
    url: '{+tenantPod}/api/platform/data/import'
  }),
  deleteImportJob: Client.method({
    method: constants.verbs.DELETE,
    url: '{+tenantPod}/api/platform/data/import'
  }),
  getImport: Client.method({
    method: constants.verbs.GET,
    url: '{+tenantPod}/api/platform/data/import/{id}'
  }),
})

module.exports = importExportResourceFactory