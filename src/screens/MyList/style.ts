import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A32',
  },
  header: {
    padding: 20,
  },
  headerText: {
    marginTop: 16,
    fontSize: 24,
    lineHeight: 45,
    color: "#FFF",
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FCAF17",
  },
  movieBanner: {
    width: 75, 
    height: 112,  
    borderRadius: 8,
  },
  movieTitle: {
    marginLeft: 10,
    fontSize: 20,
    color: "#FFF",
    flexShrink: 1,
    top: -37,
  },
  noResult: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
},
});