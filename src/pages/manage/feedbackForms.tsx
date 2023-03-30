import { Td } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';

import { FetchAndRender } from '../../components/common/fetchWrap';
import { AppsDropdown } from '../../components/dropdown/appDropdown';
import { TableAppLogosCell } from '../../components/manage/appLogos';
import { codeModalMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { feedbackFormGuidParam, routes } from '../../constants/route';
import { AppViewModel } from '../../contracts/generated/ViewModel/appViewModel';
import { FeedbackFormViewModel } from '../../contracts/generated/ViewModel/FeedbackForm/feedbackFormViewModel';
import { formatDate } from '../../helper/dateHelper';
import { getManageFeedbackFormService } from '../../services/api/manage/manageFeedbackFormService';

export const ManageFeedbackFormPage: Component = () => {
    const navigate = useNavigate();

    return (
        <FetchAndRender
            fetchApps={true}
            render={(apps: Array<AppViewModel>) => (
                <ManageResourceBasePage
                    title="Manage Feedback Forms"
                    itemName="Feedback Form"
                    disableGetByIdOption={true}
                    disableCopyGuidAction={true}
                    crudService={getManageFeedbackFormService()}
                    defaultItem={{ sortOrder: 0 }}
                    pageSizeOptions={[100]}
                    tableHeadItems={[
                        { title: 'App' },
                        { title: 'Title' },
                        { title: 'Text' },
                        { title: 'Date Created' },
                    ]}
                    tableRowRender={(item: FeedbackFormViewModel) => (
                        <>
                            <TableAppLogosCell
                                maxWidth="75px"
                                selectedApps={[item.appGuid]}
                                appsFromApi={apps}
                            />
                            <Td>{item.title}</Td>
                            <Td>{item.text}</Td>
                            <Td margin="0 auto" textAlign="center">{formatDate(item.dateCreated)}</Td>
                        </>
                    )}
                    actionsPerRow={[
                        {
                            emoji: '❓',
                            label: 'Edit questions',
                            order: 7,
                            onClick: (item: FeedbackFormViewModel) => navigate(
                                routes.feedbackFormQuestions.replace(`:${feedbackFormGuidParam}`, `${item.guid}`)
                            ),
                        },
                        {
                            emoji: '💬',
                            label: 'View Answers',
                            order: 6,
                            onClick: (item: FeedbackFormViewModel) => navigate(
                                routes.feedbackFormAnswers.replace(`:${feedbackFormGuidParam}`, `${item.guid}`)
                            ),
                        }
                    ]}
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
                            component: FormLongInput,
                            gridItemSize: GridItemSize.long,
                            property: 'title',
                            label: 'Title',
                            placeholder: `Feedback Form ${formatDate(new Date(), 'YYYY')}`,
                        },
                        {
                            component: FormLongInput,
                            gridItemSize: GridItemSize.medium,
                            property: 'text',
                            label: 'Text',
                            placeholder: 'idk',
                        },
                        codeModalMapping,
                    ]}
                />
            )}
        />
    );
};

export default ManageFeedbackFormPage;
