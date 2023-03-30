import { Text } from "@hope-ui/solid";
import { Component, createSignal, onMount, Show } from "solid-js";

import { NetworkState } from "../../constants/enum/networkState";
import { LanguageViewModel } from "../../contracts/generated/ViewModel/languageViewModel";
import { getManageLanguageService } from "../../services/api/manage/manageLanguageService";
import { Dropdown } from "../common/dropdown";
import { LoadingSpinner } from "../core/loading";

interface IProps {
    placeholder?: string;
    value?: Array<string>;
    multiple?: boolean;
    appsFromApi?: Array<LanguageViewModel>;
    onChange?: (values: Array<string> | string) => void;
}

export const LangDropdown: Component<IProps> = (props: IProps) => {
    const [langs, setLangs] = createSignal<Array<LanguageViewModel>>(props.appsFromApi ?? []);
    const [networkState, setNetworkState] = createSignal<NetworkState>((props.appsFromApi != null) ? NetworkState.Success : NetworkState.Loading);

    onMount(() => {
        if (props.appsFromApi != null && props.appsFromApi.length > 0) return;
        fetchLangs();
    })

    const fetchLangs = async () => {
        const aaResult = await getManageLanguageService().readAllCached();
        if (aaResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setLangs(aaResult.value);
        setNetworkState(NetworkState.Success);
    }

    return (
        <>
            <Show when={networkState() == NetworkState.Error}>
                <Text>Something went wrong</Text>
            </Show>
            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <LoadingSpinner />
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Dropdown
                    title={props.multiple == true ? 'Selected Languages' : 'Selected Language'}
                    multiple={props.multiple}
                    onSelect={props.onChange}
                    placeholder={props.placeholder}
                    selectedValues={props.value}
                    options={langs().map(app => ({
                        title: app.name,
                        value: app.languageCode,
                    }))}
                />
            </Show>
        </>
    );
}