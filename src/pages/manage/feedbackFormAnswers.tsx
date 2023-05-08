import { FeedbackFormAdminAnswerItemViewModel, FeedbackFormAdminAnswerViewModel, PlatformType } from '@assistantapps/assistantapps.api.client';
import { Box, Center, Divider, Heading, SimpleGrid, Text, VStack } from '@hope-ui/solid';
import { useParams } from '@solidjs/router';
import { Component, For, Show, createSignal, onMount } from 'solid-js';

import { Card } from '../../components/common/card';
import { PageHeader } from '../../components/common/pageHeader';
import { LoadingSpinner } from '../../components/core/loading';
import { NetworkState } from '../../constants/enum/networkState';
import { feedbackFormGuidParam } from '../../constants/route';
import { formatDate } from '../../helper/dateHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { ManageFeedbackFormAnswerService } from '../../services/api/manage/manageFeedbackFormAnswerService';

export const ManageFeedbackFormAnswersPage: Component = () => {
    const params = useParams<{ [feedbackFormGuidParam]: string }>();

    const [answers, setAnswers] = createSignal<Array<FeedbackFormAdminAnswerViewModel>>([]);
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);

    onMount(() => {
        fetchAll();
    })

    const fetchAll = async () => {
        const resourceService = new ManageFeedbackFormAnswerService(params[feedbackFormGuidParam]);
        const cacheItemsResult = await resourceService.readAll();
        setAnswers(cacheItemsResult.value);

        setNetworkState(NetworkState.Success);
    }

    return (
        <>
            <PageHeader text="Manage Feedback Answers"></PageHeader>
            <Box m={50}></Box>

            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <Center height="25vh">
                    <LoadingSpinner />
                </Center>
            </Show>
            <Show when={networkState() == NetworkState.Error}>
                <Center>Error</Center>
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Card class="section-read-all">
                    <VStack>
                        <Heading size="xl" mb="1em">Feedback Form Answers</Heading>
                        <SimpleGrid minChildWidth="400px" gap="1em" rowGap="1.25em" mb="1em" width="100%">
                            <Show
                                when={answers().length > 0}
                                fallback={(<Text mt="1em">No Items</Text>)}
                            >
                                <For each={answers()}>
                                    {(item) => (
                                        <Card>
                                            <VStack>
                                                <Text><span style={{ color: 'grey' }}>{capitalizeFirstLetter(PlatformType[item.platformType])}</span> - {formatDate(item.dateAnswered)}</Text>
                                                <Divider my="0.5em" />
                                                <Text color="gray">Anonymous User Guid</Text>
                                                <Text>{item.anonymousUserGuid}</Text>
                                                <Text color="gray" mt="0.5em">Submission Guid</Text>
                                                <Text>{item.submissionGuid}</Text>
                                                <Divider my="0.5em" />
                                                <For each={item.answers}>
                                                    {(answer: FeedbackFormAdminAnswerItemViewModel) => (
                                                        <>
                                                            <Text color="gray" mt="0.5em" textAlign="center">{answer.questionText}</Text>
                                                            <Text>{answer.answer}</Text>
                                                        </>
                                                    )}</For>
                                            </VStack>
                                        </Card>
                                    )}</For>
                            </Show>
                        </SimpleGrid>
                    </VStack>
                </Card>
            </Show>
        </>
    );
};

export default ManageFeedbackFormAnswersPage;
