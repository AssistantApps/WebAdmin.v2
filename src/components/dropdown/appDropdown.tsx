import { Flex, Text } from "@hope-ui/solid";
import { Component, createSignal, onMount, Show } from "solid-js";

import { NetworkState } from "../../constants/enum/networkState";
import { AppViewModel } from "../../contracts/generated/ViewModel/appViewModel";
import { getManageAppsService } from "../../services/api/manage/manageAppService";
import { Dropdown } from "../common/dropdown";
import { SmolLoadingSpinner } from "../core/loading";

interface IProps {
    placeholder?: string;
    value?: Array<string>;
    multiple?: boolean;
    langsFromApi?: Array<AppViewModel>;
    onChange?: (values: Array<string> | string) => void;
}

export const AppsDropdown: Component<IProps> = (props: IProps) => {
    const [appOptions, setSelectedAppOptions] = createSignal<Array<AppViewModel>>(props.langsFromApi ?? []);
    const [networkState, setNetworkState] = createSignal<NetworkState>((props.langsFromApi != null) ? NetworkState.Success : NetworkState.Loading);

    onMount(() => {
        if (props.langsFromApi != null && props.langsFromApi.length > 0) return;
        fetchApps();
    })

    const fetchApps = async () => {
        const aaResult = await getManageAppsService().readAllCached();
        if (aaResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setSelectedAppOptions(aaResult.value);
        setNetworkState(NetworkState.Success);
    }

    return (
        <>
            <Show when={networkState() == NetworkState.Error}>
                <Text>Something went wrong</Text>
            </Show>
            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <Dropdown
                    title={props.multiple == true ? 'Selected apps' : 'Selected app'}
                    placeholder={(<Flex justifyContent="center"><SmolLoadingSpinner /></Flex>)}
                    options={[]}
                />
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Dropdown
                    title={props.multiple == true ? 'Selected apps' : 'Selected app'}
                    multiple={props.multiple}
                    onSelect={props.onChange}
                    placeholder={props.placeholder}
                    selectedValues={props.value}
                    options={appOptions().map(app => ({
                        title: app.name,
                        value: app.guid,
                        image: app.iconUrl,
                    }))}
                />
            </Show>
        </>
    );
}