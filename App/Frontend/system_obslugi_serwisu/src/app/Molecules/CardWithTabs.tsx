import {ReactNode} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {Card} from "@/app/Atoms/Card";

type RootProps = { children?: ReactNode, defaultTabName: string}
export function Root({children, defaultTabName}: RootProps) {
    return (
        <Tabs.Root defaultValue={defaultTabName}>
            {children}
        </Tabs.Root>
    )
}

type TabsListProps = { children?: ReactNode };
export function TabsList({children}: TabsListProps): ReactNode {
    return(
        <Card className="rounded-b-none border-b-1 border-b-accent3 pt-3 pb-3">
            <Tabs.List className="flex flex-row gap-6">
                {children}
            </Tabs.List>
        </Card>
    )
}

type TriggerProps = {buttonText: string, tabName: string};
export function Trigger({buttonText, tabName}: TriggerProps) {
    return (
        <Tabs.Trigger className="font-bold text-accent4 data-[state=active]:text-black
                                hover:text-primary cursor-pointer select-none"
                      value={tabName}>
            {buttonText}
        </Tabs.Trigger>
    )
}

type ContentProps = {children?: ReactNode, tabName: string};
export function Content({children, tabName}: ContentProps) {
    return (
            <Tabs.Content value={tabName}>
                <Card className="rounded-t-none">
                    {children}
                </Card>
            </Tabs.Content>

    )
}

