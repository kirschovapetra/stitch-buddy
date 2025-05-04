import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6edfa",
    paddingBottom: 40,
  },
  blockContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 28,
    color: "#9f68a8",
    marginBottom: 5,
    fontFamily: "Nunito",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "#ff6b81",
  },
  plusButton: {
    backgroundColor: "#68c46c",
  },
  disabledButton: {
    opacity: 0.5,
  },
  countContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 10,
    minWidth: 60,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
  },
  countText: {
    fontSize: 32,
    color: "#333",
    fontFamily: "Nunito",
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#9f68a8",
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nunito",
  },
  separator: {
    marginVertical: 10,
  },
  heartsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 7,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#9f68a8",
    fontFamily: "Nunito",
    textAlign: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    opacity: 0.8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    width: "80%",
  },
  stackTitle: {
    fontSize: 28,
    color: "#9f68a8",
    fontFamily: "Nunito",
    flexShrink: 1,
    flexGrow: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  icon: {
    fontSize: 18,
    flexShrink: 0,
    color: "#d88dd4",
  },
  fullWidthBlock: {
    width: "80%", // or any percentage you prefer
    maxWidth: 400, // optional: cap it for tablets
  },
});

export default styles;
