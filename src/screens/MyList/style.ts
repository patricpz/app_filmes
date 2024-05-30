import { StyleSheet } from "react-native";


 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242A32',
    },
    header: {
      padding: 20
    },
    headerText: {
        marginTop: 16,
        fontSize: 24, 
        lineHeight: 45,
        color: "#FFF"
    },
    containerInput: {
        backgroundColor: "#67686D",
        borderRadius: 16,
        height: 42,
        padding: 10,
        marginTop: 24,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"

    },
    input: {
      color: "#FFF",
      width: "80%",
      paddingLeft: 15
    },
    noResult: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 18,
      marginTop: 20,
      fontWeight: 'bold',
  },
  });