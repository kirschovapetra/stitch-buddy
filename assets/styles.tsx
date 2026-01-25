import {StyleSheet} from 'react-native';
import {DefaultTheme} from "react-native-paper";
export const styles = StyleSheet.create({
    mainContainer:{
        marginHorizontal:16
    },
    projectsListItemContainer: {
        paddingHorizontal:20,
        paddingVertical:5,
        marginVertical: 8,
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        borderRadius:10
    },
    countBlockButtonsContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center"
    },
    countBlockResetButton: {
      marginBottom:5
    },
    projectListItemTextContainer: {
        justifyContent:"center",
        textAlign: "center",
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
    projectTitle: {
        justifyContent:"center",
        textAlign: "center",
        padding:5,
        marginVertical:8
    },
    projectsListButtonsContainer: {
        flex:1,
        justifyContent:"flex-end",
        flexDirection:"row"
    },
    addProjectButtonsContainer: {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        flexDirection:"row",
        textAlign: "center"
    },
});

export const theme = {
    ...DefaultTheme,
    colors: {
        "primary": "rgb(0, 104, 116)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(151, 240, 255)",
        "onPrimaryContainer": "rgb(0, 31, 36)",
        "secondary": "rgb(74, 98, 103)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(205, 231, 236)",
        "onSecondaryContainer": "rgb(5, 31, 35)",
        "tertiary": "rgb(185, 12, 85)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(255, 217, 223)",
        "onTertiaryContainer": "rgb(63, 0, 24)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(250, 253, 253)",
        "onBackground": "rgb(25, 28, 29)",
        "surface": "rgb(250, 253, 253)",
        "onSurface": "rgb(25, 28, 29)",
        "surfaceVariant": "rgb(219, 228, 230)",
        "onSurfaceVariant": "rgb(63, 72, 74)",
        "outline": "rgb(111, 121, 122)",
        "outlineVariant": "rgb(191, 200, 202)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(46, 49, 50)",
        "inverseOnSurface": "rgb(239, 241, 241)",
        "inversePrimary": "rgb(79, 216, 235)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(238, 246, 246)",
            "level2": "rgb(230, 241, 242)",
            "level3": "rgb(223, 237, 238)",
            "level4": "rgb(220, 235, 237)",
            "level5": "rgb(215, 232, 234)"
        },
        "surfaceDisabled": "rgba(25, 28, 29, 0.12)",
        "onSurfaceDisabled": "rgba(25, 28, 29, 0.38)",
        "backdrop": "rgba(41, 50, 52, 0.4)"
    }
};