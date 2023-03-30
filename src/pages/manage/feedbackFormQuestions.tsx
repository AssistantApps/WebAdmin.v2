import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Td, Text } from '@hope-ui/solid';
import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';
import { QuestionTypeDropdown } from '../../components/dropdown/questionTypeDropdown';

import { codeModalMapping, sortOrderMapping } from '../../components/manage/commonMapping';
import { GridItemSize } from '../../components/manage/grid';
import { FormLongInput } from '../../components/manage/input';
import { ManageResourceBasePage } from '../../components/manage/manageResourceBasePage';
import { FormSwitch } from '../../components/manage/switch';
import { feedbackFormGuidParam } from '../../constants/route';
import { FeedbackQuestionType } from '../../contracts/generated/Enum/feedbackQuestionType';
import { FeedbackFormQuestionViewModel } from '../../contracts/generated/ViewModel/FeedbackForm/feedbackFormQuestionViewModel';
import { addSpacesForEnum, capitalizeFirstLetter } from '../../helper/stringHelper';
import { ManageFeedbackFormQuestionService } from '../../services/api/manage/manageFeedbackFormQuestionService';

export const ManageFeedbackFormQuestionsPage: Component = () => {
    const params = useParams<{ [feedbackFormGuidParam]: string }>();

    const resourceService = new ManageFeedbackFormQuestionService(params[feedbackFormGuidParam]);

    return (
        <ManageResourceBasePage
            title="Manage Feedback Form Questions"
            itemName="Feedback Form Question"
            disableGetByIdOption={true}
            disableCopyGuidAction={true}
            crudService={resourceService}
            defaultItem={{ sortOrder: 0 }}
            pageSizeOptions={[100]}
            tableHeadItems={[
                { title: 'Question' },
                { title: 'Type' },
                { title: 'Sort Order', maxWidth: '75px', textAlign: 'center' },
                { title: 'Answer can contain sensitive info', maxWidth: '75px', textAlign: 'center' },
            ]}
            tableRowRender={(item: FeedbackFormQuestionViewModel) => (
                <>
                    <Td><Text class="clamp-to-2-lines">{item.questionText}</Text></Td>
                    <Td>{capitalizeFirstLetter(addSpacesForEnum(FeedbackQuestionType[item.questionType]))}</Td>
                    <Td maxWidth="75px" margin="0 auto" textAlign="center">{item.sortOrder}</Td>
                    <Td maxWidth="75px" margin="0 auto" textAlign="center">{item.answerCanContainSensitiveInfo ? '🔒' : ''}</Td>
                </>
            )}
            propToFormMappings={[
                {
                    component: FormLongInput,
                    gridItemSize: GridItemSize.xlong,
                    property: 'questionText',
                    label: 'Question',
                    placeholder: 'What feature would you...',
                },
                {
                    component: QuestionTypeDropdown,
                    gridItemSize: GridItemSize.medium,
                    property: 'questionType',
                    label: 'Question Type',
                    placeholder: 'Please select a type',
                },
                sortOrderMapping,
                {
                    component: FormSwitch,
                    gridItemSize: GridItemSize.smol,
                    property: 'answerCanContainSensitiveInfo',
                    label: 'Answer can contain sensitive info',
                },
                codeModalMapping,
            ]}
        >
            <Flex justifyContent="center">
                <Alert status="warning">
                    <AlertIcon mr="1em" />
                    <Box flex="1">
                        <AlertTitle>Chance of deleting answers!</AlertTitle>
                        <AlertDescription display="block">
                            Deleting a question also deletes the answers
                        </AlertDescription>
                    </Box>
                </Alert>
            </Flex>
        </ManageResourceBasePage>
    );
};

export default ManageFeedbackFormQuestionsPage;
