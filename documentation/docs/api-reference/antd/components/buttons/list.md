---
id: list-button
title: List
swizzle: true
---

`<ListButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123
// visible-block-start
import { useShow } from "@refinedev/core";
import {
    Show,
    // highlight-next-line
    ListButton,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        // highlight-next-line
        <Show headerButtons={<ListButton />} isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
        </Show>
    );
};

interface IPost {
    id: number;
    title: string;
}
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/123"]}
        resources={[
            {
                name: "posts",
                show: PostShow,
                list: () => {
                    return (
                        <RefineAntd.List>
                            <p>Your list page here</p>
                        </RefineAntd.List>
                    );
                },
            },
        ]}
    />,
);
```

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resource`

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@refinedev/antd";

const MyListComponent = () => {
    return <ListButton resource="categories" />;
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
            },
            {
                name: "categories",
                list: () => {
                    return (
                        <RefineAntd.List>
                            <p>Your list page here</p>
                        </RefineAntd.List>
                    );
                },
            },
        ]}
        DashboardPage={MyListComponent}
    />,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/docs/api-reference/core/components/refine-config#identifier)

### `meta`

It is used to pass additional parameters to the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md). By default, existing parameters in the route are used by the `list` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `list` action route is defined by the pattern: `/:authorId/posts`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
    return (
        <ListButton meta={{ authorId: "10" }} />
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { ListButton } from "@refinedev/antd";

const MyListComponent = () => {
    return (
        <ListButton
            // highlight-next-line
            hideText={true}
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: () => {
                    return (
                        <RefineAntd.List>
                            <p>Your list page here</p>
                        </RefineAntd.List>
                    );
                },
            },
        ]}
        DashboardPage={MyListComponent}
    />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { ListButton } from "@refinedev/antd";

export const MyListComponent = () => {
    return (
        <ListButton
            accessControl={{ enabled: true, hideIfUnauthorized: true }}
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@refinedev/antd";

const MyListComponent = () => {
    return <ListButton resourceNameOrRouteName="categories" />;
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
            },
            {
                name: "categories",
                list: () => {
                    return (
                        <RefineAntd.List>
                            <p>Your list page here</p>
                        </RefineAntd.List>
                    );
                },
            },
        ]}
        DashboardPage={MyListComponent}
    />,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect to `/categories`.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/ListButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
