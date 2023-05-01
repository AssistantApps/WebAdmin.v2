import { AppViewModel } from '@assistantapps/assistantapps.api.client';
import { Td } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { codeModalMapping, isVisibleMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormImageInput, TableLogoCell } from '../../components/manage/image';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { getManageAppsService } from '../../services/api/manage/manageAppService';

export const ManageAppsPage: Component = () => {

    return (
        <ManageResourceBasePage
            title="Manage Apps"
            itemName="App"
            disableGetByIdOption={true}
            crudService={getManageAppsService()}
            defaultItem={{ sortOrder: 0, isVisible: false }}
            setSortOrderOnItemLoad={true}
            tableHeadItems={[
                { title: 'Icon Url', maxWidth: '75px', textAlign: 'center' },
                { title: 'Logo Url', maxWidth: '75px', textAlign: 'center' },
                { title: 'Name' },
                { title: 'Game Name' },
                { title: 'Sort Order' },
                { title: 'Is Visible' },
            ]}
            tableRowRender={(item: AppViewModel) => (
                <>
                    <TableLogoCell url={item.iconUrl} showTooltip={true} maxWidth="75px" margin="0 auto" />
                    <TableLogoCell url={item.logoUrl} showTooltip={true} maxWidth="75px" margin="0 auto" />
                    <Td>{item.name}</Td>
                    <Td>{item.gameName}</Td>
                    <Td>{item.sortOrder}</Td>
                    <Td>{item.isVisible ? '✔' : '❌'}</Td>
                </>
            )}
            propToFormMappings={[
                {
                    component: FormImageInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'iconUrl',
                    label: 'Icon Url',
                    placeholder: 'https://cdn.assistantapps...',
                },
                {
                    component: FormImageInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'logoUrl',
                    label: 'Logo Url',
                    placeholder: 'https://cdn.assistantapps...',
                },
                sortOrderMapping,
                isVisibleMapping,
                codeModalMapping,
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'name',
                    label: 'Name',
                    placeholder: 'Assistant for ...',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'gameName',
                    label: 'Game Name',
                    placeholder: 'Assistant for No Man\'s Sky',
                },
            ]}
        />
    );
};



export default ManageAppsPage;
