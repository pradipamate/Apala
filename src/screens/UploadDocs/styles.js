import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default {
  header_icons: {
    color: '#fff',
    fontSize: 25,
    padding: 10,
  },
  header_right: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
  badge: {
    width: 20,
    height: 20,
    backgroundColor: '#ff40b4',
  },
  badge_text: {
    color: '#212121',
    fontFamily: 'Roboto',
    fontSize: hp('1.5%'),
  },
  container: {
    backgroundColor: '#0a0a0a',
    flex: 1,
    padding: hp('1%'),
  },
  buttons: {
    borderWidth: 1,
    borderColor: '#ff40b4',
    borderRadius: 50,
  },
  buttons_text: {
    fontFamily: 'Roboto',
    color: '#ff40b4',
    fontSize: hp('4%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7%'),
  },
  imageview: {
    borderRightWidth: 1,
    padding: 10,
    marginTop: '1%',
    borderRightColor: "grey"
  },
  view1: {
    flexDirection: "row",
    width: wp('25%'),
    height: hp('18%'),
    marginRight: wp('1%'),
    marginLeft: wp('5.5%'),
    borderWidth: 1,
    marginTop: hp('5%'),
    borderColor: "grey",
    borderRadius: 12
  },
  view2: {
    flexDirection: "row",
    marginRight: wp('4%'),
    marginLeft: wp('4%'),
    borderWidth: 0.5,
    marginTop: hp('2%'),
    borderColor: "grey"
  },
  icon: {
    justifyContent: "center",
    alignContent: "flex-end",
    color: '#ff40b4'
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    // backgroundColor: '#333',
  },

  iconStyle: {

    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff'

  },

  sub_Category_Text: {
    fontSize: 18,
    color: '#fff',
    padding: 10
  },

  category_Text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 21,
    padding: 10
  },

  category_View: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#333'
  },

  Btn: {
    padding: 10,
    backgroundColor: '#fff'
  },



  card: { flex: 0, backgroundColor: '#fff'},
  cardItem: { backgroundColor: '#fff' },
  cardLeft: { fontWeight: 'bold', color: '#999', marginTop: '1%', width: '100%' },
  cardLeft2: { fontWeight: 'bold', color: '#333', marginTop: '1%', width: '100%',fontSize: 22 },

  cardLeft1: { fontWeight: 'bold', color: '#333', marginTop: '1%', width: '100%' },

  paymentype: { fontWeight: 'bold', color: '#fff', marginTop: '1%' },
  orderStatusView: { backgroundColor: '#ff40b4', paddingHorizontal: '4%', paddingVertical: '1%', marginTop: '2%' },
  orderStausText: { fontWeight: 'bold', fontSize: 14, color: '#fff' },
  cardItem1: { backgroundColor: '#fff', marginTop: '-1%' },

};