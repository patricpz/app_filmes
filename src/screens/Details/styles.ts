import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242A32",
    },

    header: {
        paddingTop: 30,
        height: 115,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    headerText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: '700',
    },

    titleMovie: {
        position: "absolute",
        height: 50,
        left: 140,
        right: 32,
        top: 240,
        color: '#FFF',
        fontSize: 18,
        lineHeight: 27,
        fontWeight: "700",
    },

    detailsImage: {
        position: "absolute",
        width: "100%",
        height: 210,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsPosterImage: {
        width: 100,
        height: 160,
        borderRadius: 16,
        left: 29,
        top: 140,
        right: 251,
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FCAF17",
        marginBottom: 10,
    },



    description: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 170,
    },
    descriptionGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    descriptionText:{
        marginRight: 10,
        color: "#92929D"
    },

    descriptionText1:{
        marginRight: 10,
        color: "#FF8700"
    },

    about: {
        padding: 20
    },
    aboutText: {
        color: "#FFF",
        textAlign: "justify",
    },


    releaseDate: {
        fontSize: 16,
        color: "#FCAF17",
        marginBottom: 10,
    },
    voteAverage: {
        fontSize: 16,
        color: "#FCAF17",
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});