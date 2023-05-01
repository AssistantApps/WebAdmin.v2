
import { AppViewModel, LicenceViewModel } from '@assistantapps/assistantapps.api.client';
import { Td, Text } from '@hope-ui/solid';
import { Component, Show } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { AppsDropdown } from '../../components/dropdown/appDropdown';
import { TableAppLogosCell } from '../../components/manage/appLogos';
import { codeModalMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { FormSwitch } from '../../components/manage/switch';
import { ManageResourceMode } from '../../constants/enum/manageResourceMode';
import { formatDate } from '../../helper/dateHelper';
import { getManageLicenceService } from '../../services/api/manage/manageLicenceService';

export const ManageLicencesPage: Component = () => {

    return (
        <FetchAndRender
            fetchApps={true}
            render={(apps: Array<AppViewModel>) => (
                <ManageResourceBasePage
                    title="Manage Licences"
                    itemName="Licence"
                    disableGetByIdOption={true}
                    crudService={getManageLicenceService()}
                    tableHeadItems={[
                        { title: 'Licence Key' },
                        { title: 'App' },
                        { title: 'Name' },
                        { title: 'Is Active', maxWidth: '75px', textAlign: 'center' },
                        { title: 'Date Created' },
                        { title: 'Date Redeemed' },
                    ]}
                    tableRowRender={(item: LicenceViewModel) => (
                        <>
                            <Td><Text>{item.guid}</Text></Td>
                            <TableAppLogosCell
                                maxWidth="75px"
                                selectedApps={[item.appGuid]}
                                appsFromApi={apps}
                            />
                            <Td><Text>{item.name}</Text></Td>
                            <Td textAlign="center">{item.isActive ? '✔' : '❌'}</Td>
                            <Td margin="0 auto" textAlign="center">{formatDate(item.dateCreated)}</Td>
                            <Td margin="0 auto" textAlign="center">
                                <Show
                                    when={item.dateRedeemed != null}
                                    fallback={<Text>Not redeemed</Text>}
                                >
                                    <Text>{formatDate(item.dateRedeemed!)}</Text>
                                </Show>
                            </Td>
                        </>
                    )}
                    propToFormMappings={[
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'guid',
                            label: 'Licence Key',
                            hiddenIn: [ManageResourceMode.Add],
                            placeholder: 'Licence Key',
                            additional: [
                                {
                                    prop: 'disabled',
                                    value: (_) => true
                                }
                            ],
                        },
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
                            property: 'name',
                            label: 'Name',
                            placeholder: 'Name',
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'dateCreated',
                            label: 'Date Created',
                            hiddenIn: [ManageResourceMode.Add],
                            placeholder: '2023-03-22',
                            additional: [
                                {
                                    prop: 'inputType',
                                    value: (_) => 'datetime-local'
                                },
                                {
                                    prop: 'disabled',
                                    value: (_) => true
                                }
                            ],
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'dateRedeemed',
                            label: 'Date Redeemed',
                            hiddenIn: [ManageResourceMode.Add],
                            placeholder: 'Not redeemed',
                            additional: [
                                {
                                    prop: 'inputType',
                                    value: (_) => 'datetime-local'
                                },
                                {
                                    prop: 'disabled',
                                    value: (_) => true
                                }
                            ],
                        },
                        {
                            component: FormSwitch,
                            gridItemSize: GridItemSize.xsmol,
                            property: 'isActive',
                            label: 'Is Active',
                            hiddenIn: [ManageResourceMode.Add],
                        },
                        codeModalMapping,
                    ]}
                />
            )}
        />
    );
};

export default ManageLicencesPage;
