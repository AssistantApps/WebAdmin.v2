import { Td, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { BasicLink } from '../../components/core/link';
import { AppsDropdown } from '../../components/dropdown/appDropdown';
import { LangDropdown } from '../../components/dropdown/langDropdown';
import { PlatformTypeDropdown } from '../../components/dropdown/platformTypeDropdown';
import { TableAppLogosCell } from '../../components/manage/appLogos';
import { codeModalMapping, isVisibleMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormImageInput, TableLogoCell } from '../../components/manage/image';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { PlatformType } from '../../contracts/generated/Enum/platformType';
import { AppNoticeViewModel } from '../../contracts/generated/ViewModel/AppNoticeViewModel';
import { AppViewModel } from '../../contracts/generated/ViewModel/appViewModel';
import { LanguageViewModel } from '../../contracts/generated/ViewModel/languageViewModel';
import { formatDate, formatForDateLocal } from '../../helper/dateHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { getManageAppNoticeService } from '../../services/api/manage/manageAppNoticeService';

export const ManageAppNoticesPage: Component = () => {

    return (
        <FetchAndRender
            fetchApps={true}
            fetchLanguages={true}
            render={(apps: Array<AppViewModel>, langs: Array<LanguageViewModel>) => (
                <ManageResourceBasePage
                    title="Manage AppNotices"
                    itemName="App Notice"
                    disableGetByIdOption={true}
                    crudService={getManageAppNoticeService()}
                    defaultItem={{ date: formatForDateLocal(new Date()), sortOrder: 0, isVisible: false }}
                    tableHeadItems={[
                        { title: 'Apps' },
                        { title: 'Name' },
                        { title: 'Subtitle' },
                        { title: 'Icon', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Link', textAlign: 'center' },
                        { title: 'Platforms' },
                        { title: 'Language Code' },
                        { title: 'End Date' },
                        { title: 'Sort Order' },
                        { title: 'Is Visible' },
                    ]}
                    tableRowRender={(item: AppNoticeViewModel) => (
                        <>
                            <TableAppLogosCell
                                maxWidth="75px"
                                selectedApps={[item.appGuid]}
                                appsFromApi={apps}
                            />
                            <Td>{item.name}</Td>
                            <Td>{item.subtitle}</Td>
                            <TableLogoCell url={item.iconUrl} showTooltip={true} maxWidth="75px" margin="0 auto" />
                            <Td textAlign="center">
                                <BasicLink href={item.externalUrl}>🔗</BasicLink>
                            </Td>
                            <Td>
                                <Text class="clamp-to-2-lines">{item.platforms.map(p => capitalizeFirstLetter(PlatformType[p])).join(', ')}</Text>
                            </Td>
                            <Td>{item.languageCode}</Td>
                            <Td maxWidth="75px" margin="0 auto" textAlign="center">{formatDate(item.endDate)}</Td>
                            <Td>{item.sortOrder}</Td>
                            <Td>{item.isVisible ? '✔' : '❌'}</Td>
                        </>
                    )}
                    propToFormMappings={[
                        {
                            component: AppsDropdown,
                            gridItemSize: GridItemSize.medium,
                            property: 'appGuid',
                            label: 'App',
                            placeholder: 'Select an app',
                            additional: [
                                {
                                    prop: 'multiple',
                                    value: (_) => false
                                },
                                {
                                    prop: 'appsFromApi',
                                    value: (_) => apps
                                }
                            ],
                        },
                        {
                            component: LangDropdown,
                            gridItemSize: GridItemSize.medium,
                            property: 'languageCode',
                            label: 'Language Code',
                            placeholder: 'Please select a language',
                            additional: [
                                {
                                    prop: 'multiple',
                                    value: (_) => false
                                },
                                {
                                    prop: 'langsFromApi',
                                    value: (_) => langs
                                }
                            ],
                        },
                        {
                            component: PlatformTypeDropdown,
                            gridItemSize: GridItemSize.medium,
                            property: 'platforms',
                            label: 'Platforms',
                            placeholder: 'Please select a platform',
                            additional: [
                                {
                                    prop: 'multiple',
                                    value: (_) => true
                                },
                            ],
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'name',
                            label: 'Name',
                            placeholder: 'Event name',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'subtitle',
                            label: 'Subtitle',
                            placeholder: 'Event description',
                        },
                        {
                            component: FormImageInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'iconUrl',
                            label: 'Icon Url',
                            placeholder: 'https://cdn.assistantapps...',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'externalUrl',
                            label: 'External Url',
                            placeholder: 'https://',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'endDate',
                            label: 'Date',
                            placeholder: '2023-03-22',
                            additional: [
                                {
                                    prop: 'inputType',
                                    value: (_) => 'datetime-local'
                                }
                            ],
                        },
                        sortOrderMapping,
                        isVisibleMapping,
                        codeModalMapping,
                    ]}
                />
            )}
        />
    );
};



export default ManageAppNoticesPage;
