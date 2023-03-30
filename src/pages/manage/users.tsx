
import { Td } from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';

import { TableLogoCell } from '../../components/manage/image';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { ManageUserPermissionsModal } from '../../components/manage/modal/manageUserPermissionsModal';
import { UserViewModel } from '../../contracts/generated/ViewModel/User/userViewModel';
import { formatDate } from '../../helper/dateHelper';
import { getManageUserService } from '../../services/api/manage/manageUserService';

export const ManageUsersPage: Component = () => {
    const [selectedUserGuid, setSelectedUserGuid] = createSignal<string>();

    return (
        <>
            <ManageResourceBasePage
                title="Manage Users"
                itemName="user"
                serverPagination={true}
                unknownPagination={true}
                disableEditAction={true}
                disableGetByIdOption={true}
                crudService={getManageUserService()}
                pageSizeOptions={[10]}
                searchTooltip="Searches: username & email"
                searchFunc={(item: UserViewModel, searchText: string) => (
                    item.username.includes(searchText)
                )}
                tableHeadItems={[
                    { title: 'Avatar', maxWidth: '50px', textAlign: 'center' },
                    { title: 'Username' },
                    { title: 'Join Date' },
                    { title: 'Is Admin', textAlign: 'center' },
                    { title: 'Is Donator', textAlign: 'center' },
                    { title: 'Is Patron', textAlign: 'center' },
                ]}
                tableRowRender={(item: UserViewModel) => (
                    <>
                        <TableLogoCell
                            url={item.profileImageUrl}
                            fallbackSrc="/assets/img/fallbackAvatar.png"
                            borderRadius="100% !important"
                            maxWidth="35px"
                            margin="0 auto"
                        />
                        <Td>{item.username}</Td>
                        <Td>{formatDate(item.joinDate)}</Td>
                        <Td textAlign="center">{item.isAdmin ? '✔' : '❌'}</Td>
                        <Td textAlign="center">{item.isDonator ? '✔' : '❌'}</Td>
                        <Td textAlign="center">{item.isPatreon ? '✔' : '❌'}</Td>
                    </>
                )}
                actionsPerRow={[
                    {
                        emoji: '🔐',
                        label: 'Permissions',
                        order: 6,
                        onClick: (item: UserViewModel) => setSelectedUserGuid(item.guid),
                    }
                ]}
                propToFormMappings={[]}
            />
            <ManageUserPermissionsModal
                title="Manage permissions for user"
                userGuid={selectedUserGuid() ?? ''}
                isOpen={selectedUserGuid() != null}
                onClose={() => setSelectedUserGuid(undefined)}
            />
        </>
    );
};

export default ManageUsersPage;
