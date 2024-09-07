import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<Api.Common.EnableStatus, App.I18n.I18nKey> = {
  '1': 'page.system.common.status.enable',
  '0': 'page.system.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const resourceTypeRecord: Record<Api.System.ResourceType, App.I18n.I18nKey> = {
  'D': 'page.system.resource.resourceType.directory',
  'M': 'page.system.resource.resourceType.menu',
  'B': 'page.system.resource.resourceType.button'
};

export const resourceTypeOptions = transformRecordToOption(resourceTypeRecord);

export const resourceIconTypeRecord: Record<Api.System.IconType, App.I18n.I18nKey> = {
  '1': 'page.system.resource.iconType.iconify',
  '2': 'page.system.resource.iconType.local'
};

export const resourceIconTypeOptions = transformRecordToOption(resourceIconTypeRecord);
