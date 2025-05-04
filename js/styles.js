import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stackTitle: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#9f68a8',
    fontFamily: "Nunito"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6edfa', // Pale pinkish-purple
    paddingBottom: 40,
  },
  blockContainer: {
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#9f68a8', // Deep lilac
    marginBottom: 15,
    fontFamily: "Nunito"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#ff6b81', // Girly red
  },
  plusButton: {
    backgroundColor: '#68c46c', // Soft green
  },
  disabledButton: {
    opacity: 0.5,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
    minWidth: 60,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },
  countText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "Nunito"
  },
  resetButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#9f68a8', // Soft purple
  },
  resetText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: "Nunito"
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  heartsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    marginHorizontal: 2,
    color: "#d88dd4",
  },
});

export default styles;
