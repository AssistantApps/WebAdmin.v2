
import { DonationViewModel } from '@assistantapps/assistantapps.api.client';
import { Td } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { BasicLink } from '../../components/core/link';
import { DonationTypeDropdown } from '../../components/dropdown/donationTypeDropdown';
import { codeModalMapping, isVisibleMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { formatDate, formatForDateLocal } from '../../helper/dateHelper';
import { getManageDonationService } from '../../services/api/manage/manageDonationService';

export const ManageDonationsPage: Component = () => {

    return (
        <ManageResourceBasePage
            title="Manage Donations"
            itemName="Donation"
            serverPagination={true}
            unknownPagination={true}
            disableGetByIdOption={true}
            crudService={getManageDonationService()}
            defaultItem={{ date: formatForDateLocal(new Date()), sortOrder: 0, isHidden: false }}
            pageSizeOptions={[10]}
            searchTooltip="Searches: username & email"
            searchFunc={(item: DonationViewModel, searchText: string) => (
                item.username.includes(searchText) ||
                item.email.includes(searchText)
            )}
            tableHeadItems={[
                { title: 'Username' },
                { title: 'Email' },
                { title: 'Type' },
                { title: 'Amount' },
                { title: 'Currency' },
                { title: 'Actual amount' },
                { title: 'Is Visible' },
                { title: 'Date' },
            ]}
            tableRowRender={(item: DonationViewModel) => (
                <>
                    <Td>{item.username}</Td>
                    <Td><BasicLink href={`mailto:${item.email}`}>{item.email}</BasicLink></Td>
                    <Td>{item.type}</Td>
                    <Td>{item.amount}</Td>
                    <Td>{item.currency}</Td>
                    <Td>{item.actualAmount}</Td>
                    <Td>{item.isHidden ? '❌' : '✔'}</Td>
                    <Td>{formatDate(item.date)}</Td>
                </>
            )}
            propToFormMappings={[
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'username',
                    label: 'Username',
                    placeholder: 'John Smith',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'email',
                    label: 'Email',
                    placeholder: 'john@smith.com',
                },
                {
                    component: DonationTypeDropdown,
                    gridItemSize: GridItemSize.medium,
                    property: 'type',
                    label: 'Source',
                    placeholder: 'Please select a donation type',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'amount',
                    label: 'Amount',
                    placeholder: '5',
                    additional: [
                        {
                            prop: 'inputType',
                            value: (_) => 'number'
                        }
                    ],
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.smol,
                    property: 'currency',
                    label: 'Currency',
                    placeholder: 'USD',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'actualAmount',
                    label: 'Actual Amount',
                    placeholder: '5',
                    additional: [
                        {
                            prop: 'inputType',
                            value: (_) => 'number'
                        }
                    ],
                },
                isVisibleMapping,
                codeModalMapping,
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'date',
                    label: 'Date',
                    placeholder: '2023-03-22',
                    additional: [
                        {
                            prop: 'inputType',
                            value: (_) => 'datetime-local'
                        }
                    ],
                },
            ]}
        />
    );
};

export default ManageDonationsPage;
