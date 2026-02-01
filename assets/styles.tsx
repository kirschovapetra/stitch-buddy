import {ColorSchemeName, StyleSheet} from 'react-native';
import { MD3DarkTheme, MD3LightTheme} from "react-native-paper";
export const styles = StyleSheet.create({
    mainContainer:{
        marginHorizontal:16
    },
    activityIndicator:{
        marginVertical:20
    },
    projectsListItemContainer: {
        paddingHorizontal:20,
        paddingVertical:5,
        marginVertical: 8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        borderRadius:10
    },
    projectsListHeaderContainer: {
        flex:1,
        paddingVertical: 5,
        flexDirection:"row",
        justifyContent:"space-between",
        elevation:2
    },
    menuContent: {
        marginTop:50
    },
    countBlockButtonsContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center"
    },countBlockProgressBarContainer: {
        paddingVertical:10
    },
    countBlockResetButton: {
      marginVertical:5
    },
    projectListItemTextContainer: {
        justifyContent:"center",
        textAlign: "center",
        // flex: 1,
        // flexWrap: 'wrap'
    },
    projectListItemButtonContainer: {
        justifyContent:"center",
        textAlign: "center",
        flexDirection:"row"
    },
    centerTextContainer: {
        justifyContent:"center",
        textAlign: "center",
        padding:5
    },
    centerTextInput: {
        justifyContent:"center",
        textAlign: "center",
        width: 60,
        padding:0
    },
    projectTitle: {
        justifyContent:"center",
        textAlign: "center",
        padding:5,
        marginVertical:8
    },
    projectsListButtonsContainer: {
        // flex:1,
        justifyContent:"center",
        marginTop:10
        // flexDirection:"row"
    },
    addProjectButtonsContainer: {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        flexDirection:"row",
        textAlign: "center",
        marginTop:10
    },
    sortMenuText: {
        marginLeft:10,
        marginTop:5
    },
    countBlockContainer:{
        marginHorizontal:10,
        marginTop:15,
        marginBottom:5,
        paddingVertical:10,
        paddingHorizontal:30
    },
    textInputStyle:{
        width:"50%",
        marginVertical:10
    }
});

const light = {
    "primary": "rgb(74, 120, 132)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(205, 230, 235)",
    "onPrimaryContainer": "rgb(16, 52, 61)",

    "secondary": "rgb(94, 104, 110)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(224, 227, 229)",
    "onSecondaryContainer": "rgb(28, 36, 41)",

    "tertiary": "rgb(176, 138, 84)",
    "onTertiary": "rgb(44, 32, 10)",
    "tertiaryContainer": "rgb(245, 226, 196)",
    "onTertiaryContainer": "rgb(58, 40, 14)",

    "error": "rgb(176, 48, 48)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(230,205,205)",
    "onErrorContainer": "rgb(66, 0, 2)",

    "background": "rgb(226,232,232)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(249, 251, 251)",
    "onSurface": "rgb(26, 28, 30)",

    "surfaceVariant": "rgb(231, 235, 237)",
    "onSurfaceVariant": "rgb(66, 72, 76)",

    "outline": "rgb(142, 147, 150)",
    "outlineVariant": "rgb(210, 215, 218)",

    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",

    "inverseSurface": "rgb(46, 50, 52)",
    "inverseOnSurface": "rgb(238, 241, 243)",
    "inversePrimary": "rgb(160, 200, 210)",

    "elevation": {
        "level0": "transparent",
        "level1": "rgb(242, 245, 246)",
        "level2": "rgb(238, 242, 243)",
        "level3": "rgb(234, 239, 240)",
        "level4": "rgb(232, 237, 239)",
        "level5": "rgb(229, 235, 237)"
    },

    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(46, 50, 53, 0.4)"
}


const dark = {
    "primary": "rgb(122, 164, 176)",
    "onPrimary": "rgb(20, 54, 62)",
    "primaryContainer": "rgb(52, 84, 92)",
    "onPrimaryContainer": "rgb(205, 230, 235)",

    "secondary": "rgb(192, 198, 201)",
    "onSecondary": "rgb(46, 50, 52)",
    "secondaryContainer": "rgb(68, 72, 75)",
    "onSecondaryContainer": "rgb(224, 227, 229)",

    "tertiary": "rgb(214, 186, 138)",
    "onTertiary": "rgb(54, 42, 16)",
    "tertiaryContainer": "rgb(90, 70, 32)",
    "onTertiaryContainer": "rgb(245, 226, 196)",

    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(119,47,47)",
    "onErrorContainer": "rgb(255, 180, 171)",

    "background": "rgb(35,36,39)",
    "onBackground": "rgb(228, 231, 233)",
    "surface": "rgb(28, 30, 32)",
    "onSurface": "rgb(228, 231, 233)",

    "surfaceVariant": "rgb(68, 72, 75)",
    "onSurfaceVariant": "rgb(200, 205, 208)",

    "outline": "rgb(140, 145, 148)",
    "outlineVariant": "rgb(68, 72, 75)",

    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",

    "inverseSurface": "rgb(228, 231, 233)",
    "inverseOnSurface": "rgb(46, 50, 52)",
    "inversePrimary": "rgb(74, 120, 132)",

    "elevation": {
        "level0": "transparent",
        "level1": "rgb(34, 37, 39)",
        "level2": "rgb(38, 41, 43)",
        "level3": "rgb(42, 45, 47)",
        "level4": "rgb(44, 47, 49)",
        "level5": "rgb(48, 51, 53)"
    },

    "surfaceDisabled": "rgba(228, 231, 233, 0.12)",
    "onSurfaceDisabled": "rgba(228, 231, 233, 0.38)",
    "backdrop": "rgba(46, 50, 53, 0.4)"
}

export const getTheme = (colorScheme:ColorSchemeName|string) => {
    return colorScheme === 'dark'
        ? {...MD3DarkTheme, colors: dark}
        : {...MD3LightTheme, colors: light};
}