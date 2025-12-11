import {ReactNode} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {Card} from "@/components/Atoms/Card";

type RootProps = { children?: ReactNode, defaultTabName: string, onValueChange?: (value: string) => void}
export function Root({children, defaultTabName, onValueChange}: RootProps) {
    return (
        <Tabs.Root defaultValue={defaultTabName} onValueChange={onValueChange}>
            {children}
        </Tabs.Root>
    )
}

type TabsListProps = { children?: ReactNode };
export function TabsList({children}: TabsListProps): ReactNode {
    return(
        <Card className="rounded-b-none border-b border-b-accent2 pt-3 pb-0!">
            <Tabs.List className="flex flex-row gap-6">
                {children}
            </Tabs.List>
        </Card>
    )
}

type TriggerProps = {buttonText: string, tabName: string};
export function Trigger({buttonText, tabName}: TriggerProps) {
    return (
        <Tabs.Trigger className="text-smaller1 text-accent3 pb-2 data-[state=active]:text-primary data-[state=active]:border-b
                                hover:text-accent4 cursor-pointer select-none"
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

