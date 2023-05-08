
import { UserActivityActionType, UserActivityViewModel } from '@assistantapps/assistantapps.api.client';
import { Alert, Center, Flex, Text } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { formatDate } from '../helper/dateHelper';

interface IUserActivityListItemProps extends UserActivityViewModel {

}

export const UserActivityListItem: Component<IUserActivityListItemProps> = (props: IUserActivityListItemProps) => {

    const getAlertType = (type: UserActivityActionType) => {
        if (type == UserActivityActionType.create) return 'success';
        if (type == UserActivityActionType.read) return 'info';
        if (type == UserActivityActionType.update) return 'success';
        if (type == UserActivityActionType.delete) return 'warning';
        return 'danger';
    }

    const getAlertIcon = (type: UserActivityActionType) => {
        if (type == UserActivityActionType.create) return '✨';
        if (type == UserActivityActionType.read) return '👀';
        if (type == UserActivityActionType.update) return '📝';
        if (type == UserActivityActionType.delete) return '🔥';
        return '❓'
    }

    return (
        <Alert status={getAlertType(props.action)} width="100%" my="0.25em">
            <Flex width="100%">
                <Center>
                    {getAlertIcon(props.action)}
                </Center>
                <Flex flex={1} pl="1em">
                    <Text flex={1}>{props.username} - {props.description}</Text>
                    <Text>{formatDate(props.actionDate)}</Text>
                </Flex>
            </Flex>
        </Alert>
    );
};
