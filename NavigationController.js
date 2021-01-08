import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  HomeScreen,
  ArticleScreen,
  DiscoveryScreen,
  SettingsScreen,
  AboutScreen,
  NotificationScreen,
  PrivacyScreen,
} from "./src/screens";
import ManageFeedScreen from "./src/screens/ManageFeedScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Enum for the 3 publications included in this app
const PublicationEnum = Object.freeze({
  dp: "The Daily Pennsylvanian",
  street: "34th Street",
  utb: "Under the Button",
});

const ScreenWithDefaultParams = (Comp, defaultParams) => {
  return class extends Component {
    render() {
      return <Comp {...this.props} screenProps={defaultParams} />;
    }
  };
};

// Navigation controller for all tabs
class TabNavigationController extends Component {
  constructor(props) {
    super(props);
    this.switchPublication = this.switchPublication.bind(this);
    this.state = {
      currPublication: PublicationEnum.dp,
      switchPublication: this.switchPublication,
    };
  }

  // Updates state to match for new publication
  switchPublication(newPublication) {
    if (newPublication != this.state.currPublication) {
      this.setState((prevState) => ({
        ...prevState.switchPublication,
        currPublication: newPublication,
      }));
    }
  }

  render() {
    // Navigation stack within the home tab
    const HomeStack = ({ screenProps }) => {
      return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#42f44b" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={ScreenWithDefaultParams(HomeScreen, screenProps)}
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Article"
            component={ArticleScreen}
            options={{ title: "Article", animationEnabled: false }}
          />
        </Stack.Navigator>
      );
    };
    // Navigation stack within the discovery tab
    const DiscoveryStack = () => (
      <Stack.Navigator
        initialRouteName="Discovery"
        screenOptions={{
          headerStyle: { backgroundColor: "#42f44b" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Discovery"
          component={DiscoveryScreen}
          options={{ title: "Discovery", headerShown: false }}
        />
        {/* TO DO: add more screens involved in discovery stack */}
      </Stack.Navigator>
    );

    // Navigation stack within the Article tab
    // TO DO: navigate to here when an article is clicked instead of the ArticleScreen
    const ArticleStack = () => (
      <Stack.Navigator
        initialRouteName="Article"
        screenOptions={{
          headerStyle: { backgroundColor: "#42f44b" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{ title: "Article", headerShown: false }}
        />
      </Stack.Navigator>
    );

    // Settings stack within the home tab
    const SettingsStack = ({ screenProps }) => {
      return (
        <Stack.Navigator
          initialRouteName="Settings"
          screenOptions={{
            headerStyle: { backgroundColor: "#ffffff" },
            // headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Settings"
            component={ScreenWithDefaultParams(SettingsScreen, screenProps)}
            options={{
              title: "Settings",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: "About", animationEnabled: false }}
          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{ title: "Notification", animationEnabled: false }}
          />
          <Stack.Screen
            name="Privacy"
            component={PrivacyScreen}
            options={{ title: "Privacy", animationEnabled: false }}
          />
          <Stack.Screen
            name="ManageFeedScreen"
            component={ManageFeedScreen}
            options={{ title: "Manage Feed", animationEnabled: false }}
          />
        </Stack.Navigator>
      );
    };

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "HomeStack") iconName = "ios-home";
              else if (route.name == "DiscoveryStack") iconName = "ios-search";
              else if (route.name === "SettingsStack")
                iconName = "ios-settings";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#A61E21",
            inactiveTintColor: "gray",
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={ScreenWithDefaultParams(HomeStack, {
              state: this.state,
            })}
          />
          <Tab.Screen name="DiscoveryStack" component={DiscoveryStack} />
          <Tab.Screen
            name="SettingsStack"
            component={ScreenWithDefaultParams(SettingsStack, {
              state: this.state,
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export { PublicationEnum, TabNavigationController };
