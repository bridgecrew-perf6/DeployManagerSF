import {TypesFloder, packageXML} from './interfaces'

export const XMLPCK: packageXML = {
  Package: {
    $: {xmlns: 'http://soap.sforce.com/2006/04/metadata'},
    version: '54.0'
  }
}

export const pathsSFDX = new Map<String, TypesFloder>([
  [
    'CustomField',
    {
      directoryName: 'objects',
      directoryNameChild: 'fields',
      inFolder: false,
      metaFile: false,
      suffix: 'field',
      xmlName: 'CustomField'
    }
  ],
  [
    'StaticResource',
    {
      directoryName: 'staticresources',
      inFolder: false,
      metaFile: true,
      suffix: 'resource',
      xmlName: 'StaticResource',
      noExtension: true
    }
  ],
  [
    'CustomLabels',
    {
      childXmlNames: ['CustomLabel'],
      directoryName: 'labels',
      inFolder: false,
      metaFile: false,
      suffix: 'labels',
      xmlName: 'CustomLabels'
    }
  ]
])
