
import { Grid, GridItem } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';

export enum GridItemSize {
    xsmol,
    smol,
    medium,
    long,
    xlong,
}

interface IGridItemProps {
    size: GridItemSize;
    children: JSX.Element;
}

export const ManageItemGridCell: Component<IGridItemProps> = (props: IGridItemProps) => {

    const getColSpan = (grdSize: GridItemSize) => {
        if (grdSize == GridItemSize.xsmol) return 1;
        if (grdSize == GridItemSize.smol) return 2;
        if (grdSize == GridItemSize.medium) return 4;
        if (grdSize == GridItemSize.long) return 6;
        if (grdSize == GridItemSize.xlong) return 12;
    }

    return (
        <GridItem colSpan={getColSpan(props.size)}>
            {props.children}
        </GridItem>
    )
};

interface IGridProps {
    children: JSX.Element;
}

export const ManageItemGrid: Component<IGridProps> = (props: IGridProps) => {

    return (
        <Grid templateColumns={{ "@initial": "repeat(2, 1fr)", "@md": "repeat(12, 1fr)" }} gap="$6">
            {props.children}
        </Grid>
    )
};

