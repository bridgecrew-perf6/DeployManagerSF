import {TypesFloder, packageXML} from './interfaces'

export const XMLPCK: packageXML = {
  Package: {
    $: {xmlns: 'http://soap.sforce.com/2006/04/metadata'},
    version: '54.0'
  }
}

// eslint-disable-next-line no-shadow
export enum API {
  CustomField,
  StaticResource,
  LightningComponentBundle,
  CustomObject,
  ApexClass,
  Layout,
  CustomLabels
}

export const pathsSFDX = new Map<String, TypesFloder>([
  [
    'CustomObject',
    {
      childXmlNames: [
        'CustomField',
        'Index',
        'BusinessProcess',
        'RecordType',
        'CompactLayout',
        'WebLink',
        'ValidationRule',
        'SharingReason',
        'ListView',
        'FieldSet'
      ],
      directoryName: 'objects',
      inFolder: false,
      metaFile: false,
      suffix: 'object',
      xmlName: 'CustomObject'
    }
  ],
  [
    'ApexClass',
    {
      directoryName: 'classes',
      inFolder: false,
      metaFile: true,
      suffix: 'cls',
      xmlName: 'ApexClass'
    }
  ],
  [
    'Layout',
    {
      directoryName: 'layouts',
      inFolder: false,
      metaFile: false,
      suffix: 'layout',
      xmlName: 'Layout'
    }
  ],
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
    'LightningComponentBundle',
    {
      directoryName: 'lwc',
      inFolder: false,
      metaFile: false,
      suffix: null,
      xmlName: 'LightningComponentBundle'
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
  ]
])
