import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./tabs.route";

export function Routes() {
    return (
        <NavigationContainer>
            <TabRoutes/>
        </NavigationContainer>
    )
}