
import { Flex, Image, Td, Tooltip } from '@hope-ui/solid';
import { Component, For } from 'solid-js';
import { AppImage } from '../../constants/image';

import { AppViewModel } from '../../contracts/generated/ViewModel/appViewModel';

interface ITableAppLogosCellProps {
    selectedApps: Array<string>;
    appsFromApi: Array<AppViewModel>;
    maxWidth?: string;
    margin?: string;
}

export const TableAppLogosCell: Component<ITableAppLogosCellProps> = (props: ITableAppLogosCellProps) => {

    const getAppIcon = (appGuid: string) => {
        const app = props.appsFromApi.find(aa => aa.guid == appGuid);
        if (app == null) return AppImage.fallbackImg;

        return app.iconUrl;
    }

    const getAppName = (appGuid: string) => {
        const app = props.appsFromApi.find(aa => aa.guid == appGuid);
        if (app == null) return 'Unknown';

        return app.name;
    }

    return (
        <Td maxWidth={props.maxWidth}>
            <Flex gap="0.5em">
                <For each={props.selectedApps}>
                    {(item, index) => (
                        <Tooltip label={getAppName(item)}>
                            <Image src={getAppIcon(item)} class="logo-sm" margin={props.margin} />
                        </Tooltip>
                    )}
                </For>
            </Flex>
        </Td>
    );
};
