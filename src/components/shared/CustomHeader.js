import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PublicationEnum } from "../../../NavigationController";
import { PublicationPrimaryColorRgba } from "../../utils/branding";
const DP_LOGO = require("../../static/logos/dp-logo-large.png");
// const STREET_LOGO = require("../../static/logos/street-logo-large.png");
// const UTB_LOGO = require("../../static/logos/utb-logo-large.png");

// half the height of the header
const headerHalf = Math.round(Dimensions.get("window").height) * 0.06;

const styles = StyleSheet.create({
  barContent: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },

  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },

  image: {
    height: "60%",
    resizeMode: "contain",
    alignSelf: "center",
  },

  view: {
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    top: 0,
  },

  safeAreaView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    height: headerHalf,
    shadowOffset: {},
    shadowColor: "#000",
    shadowRadius: 3,
    elevation: 2,
  },
});

export const CustomHeader = ({ publicationState, contentOffset }) => {
  const fadeStart = 100;
  const fadeEnd = 175;
  const fadeDist = fadeEnd - fadeStart;
  const dpRed = "rgba(166, 30, 33)";
  const utbBlue = "rgba(33, 60, 220)";

  function addOpacity(rgbString, opacity) {
    return rgbString.split(")")[0] + "," + opacity + ")";
  }

  function getLogo(publication) {
    // TODO: Implement when we get all logos
    return DP_LOGO;
  }

  function animateMenu() {
    // TO DO: create animation here

    // TO DO: move this to where a publication is selected
    const newPub =
      publicationState.currPublication == PublicationEnum.utb
        ? PublicationEnum.dp
        : PublicationEnum.utb;
    publicationState.switchPublication(newPub);
  }

  return (
    <View
      style={{
        ...styles.view,
        ...{
          backgroundColor: addOpacity(
            PublicationPrimaryColorRgba(publicationState.currPublication),
            (contentOffset - fadeStart) / fadeDist
          ),
          paddingTop: Platform.OS == "ios" ? headerHalf : StatusBar.height,
          shadowColor: contentOffset < fadeEnd ? null : "#000",
          shadowOffset: contentOffset < fadeEnd ? null : { height: 5 },
          shadowOpacity: contentOffset < fadeEnd ? null : 0.5,
          shadowRadius: contentOffset < fadeEnd ? null : 8,
          elevation: contentOffset < fadeEnd ? null : 4,
        },
      }}
      // imageStyle={{ opacity: (contentOffset - fadeStart) / fadeDist }}
    >
      <TouchableOpacity onPress={animateMenu} opacity={1}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{
            ...styles.safeAreaView,
            ...{ shadowOpacity: contentOffset < fadeEnd ? 1 : 0 },
          }}
        >
          <Image
            source={getLogo(publicationState.currPublication)}
            style={styles.image}
          />
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
};
