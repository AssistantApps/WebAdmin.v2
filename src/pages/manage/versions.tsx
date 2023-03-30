
import { Td, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { FetchAndRender } from '../../components/common/fetchWrap';

import { AppsDropdown } from '../../components/dropdown/appDropdown';
import { PlatformTypeDropdown } from '../../components/dropdown/platformTypeDropdown';
import { TableAppLogosCell } from '../../components/manage/appLogos';
import { codeModalMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { FormMarkdown } from '../../components/manage/markdown';
import { PlatformType } from '../../contracts/generated/Enum/platformType';
import { AppViewModel } from '../../contracts/generated/ViewModel/appViewModel';
import { VersionViewModel } from '../../contracts/generated/ViewModel/Version/versionViewModel';
import { formatDate, formatForDateLocal } from '../../helper/dateHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { getManageVersionService } from '../../services/api/manage/manageVersionService';

export const ManageVersionsPage: Component = () => {

    return (
        <FetchAndRender
            fetchApps={true}
            render={(apps: Array<AppViewModel>) => (
                <ManageResourceBasePage
                    title="Manage Versions"
                    itemName="version"
                    disableGetByIdOption={true}
                    crudService={getManageVersionService()}
                    defaultItem={{ activeDate: formatForDateLocal(new Date()), sortOrder: 0, isVisible: false }}
                    tableHeadItems={[
                        { title: 'App' },
                        { title: 'Build name', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Build code', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Markdown' },
                        { title: 'Platforms' },
                        { title: 'Active Date' },
                    ]}
                    tableRowRender={(item: VersionViewModel) => (
                        <>
                            <TableAppLogosCell
                                maxWidth="75px"
                                selectedApps={[item.appGuid]}
                                appsFromApi={apps}
                            />
                            <Td maxWidth="75px" textAlign="center">{item.buildName}</Td>
                            <Td maxWidth="75px" textAlign="center">{item.buildNumber}</Td>
                            <Td width="40%">
                                <Text class="clamp-to-1-lines">{item.markdown}</Text>
                            </Td>
                            <Td>
                                <Text class="clamp-to-2-lines">{item.platforms.map(p => capitalizeFirstLetter(PlatformType[p])).join(', ')}</Text>
                            </Td>
                            <Td maxWidth="75px" margin="0 auto" textAlign="center">{formatDate(item.activeDate)}</Td>
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
                                }
                            ],
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'buildName',
                            label: 'Build Name',
                            placeholder: '1.0.0',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'buildNumber',
                            label: 'Build Number',
                            placeholder: '20',
                            additional: [
                                {
                                    prop: 'inputType',
                                    value: (_) => 'number',
                                },
                            ],
                        },
                        {
                            component: FormMarkdown,
                            gridItemSize: GridItemSize.xlong,
                            property: 'markdown',
                            label: 'Markdown',
                            placeholder: 'markdown',
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
                            property: 'activeDate',
                            label: 'Date',
                            placeholder: '2023-03-22',
                            additional: [
                                {
                                    prop: 'inputType',
                                    value: (_) => 'datetime-local'
                                }
                            ],
                        },
                        codeModalMapping,
                    ]}
                />
            )}
        />
    );
};

export default ManageVersionsPage;
