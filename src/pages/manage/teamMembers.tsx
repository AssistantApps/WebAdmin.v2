import { Td, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { BasicLink } from '../../components/core/link';
import { codeModalMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormImageInput, TableLogoCell } from '../../components/manage/image';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { TeamMemberViewModel } from '../../contracts/generated/ViewModel/teamMemberViewModel';
import { getManageTeamMemberService } from '../../services/api/manage/manageTeamMemberService';

export const ManageMembersPage: Component = () => {

    return (
        <ManageResourceBasePage
            title="Manage Team Members"
            itemName="Team Member"
            disableGetByIdOption={true}
            crudService={getManageTeamMemberService()}
            defaultItem={{ sortOrder: 0 }}
            pageSizeOptions={[100]}
            tableHeadItems={[
                { title: 'Name' },
                { title: 'Role' },
                { title: 'Image Url', textAlign: 'center' },
                { title: 'Link' },
                { title: 'Sort Order', maxWidth: '75px', textAlign: 'center' },
            ]}
            tableRowRender={(item: TeamMemberViewModel) => (
                <>
                    <Td><Text>{item.name}</Text></Td>
                    <Td><Text>{item.role}</Text></Td>
                    <TableLogoCell url={item.imageUrl} margin="0 auto" maxHeight="40px !important" showTooltip={true} />
                    <Td>
                        <BasicLink href={item.linkUrl ?? ''}>{item.linkName}</BasicLink>
                    </Td>
                    <Td>{item.sortOrder}</Td>
                </>
            )}
            propToFormMappings={[
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'name',
                    label: 'Name',
                    placeholder: 'John Smith',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'role',
                    label: 'Role',
                    placeholder: 'Does XYZ',
                },
                {
                    component: FormImageInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'imageUrl',
                    label: 'Image Url',
                    placeholder: 'https://cdn.assistantapps...',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'linkName',
                    label: 'Link Name',
                    placeholder: 'Youtube channel',
                },
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.medium,
                    property: 'linkUrl',
                    label: 'Link Url',
                    placeholder: 'https://google.com',
                },
                sortOrderMapping,
                codeModalMapping,
            ]}
        />
    );
};

export default ManageMembersPage;
