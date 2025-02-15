import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ICategory, IPost } from "interfaces";
import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Hooks / DataGrid",
    component: DataGrid,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DataGrid>;

export const Basic: ComponentStory<typeof DataGrid> = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    const categoryIds = dataGridProps.rows.map((item) => item.category.id);
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const columns = React.useMemo<GridColDef<IPost>[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
            {
                field: "category.id",
                headerName: "Category",
                type: "number",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = categoriesData?.data.find(
                        (item) => item.id === row.category.id,
                    );
                    return category?.title;
                },
            },
            { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
        ],
        [categoriesData, isLoading],
    );

    return (
        <div style={{ height: 700, width: "100%" }}>
            <DataGrid {...dataGridProps} columns={columns} />
        </div>
    );
};
