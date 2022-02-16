import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native';
import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const TestComp = ({navigation}) => {

  return (
      <Text>Hello test comp</Text>
  );
}

export default function App() {

  const [pressChar, setPressChar] = useState();
  let [arrayChar, setArrayChar] = useState([]);

  let sprint = 0;


  const calculatorButton = options => (
      <TouchableOpacity style={[options.normBtn, options.colorBtn]} onPress={(event)=>{



        switch (options.btnKey) {

          case "<":
            arrayChar.pop();
            setArrayChar([...arrayChar]);
            break;

          case "=":

            let regex = '[/*-+]';

            setPressChar(eval(arrayChar.join('')));

            console.log(eval(arrayChar.join('')));

            /*arrayChar.forEach((char)=>{
              if (char.match(regex)) {
                console.log(char.match(regex)[0]);
              }

            });*/


            break;

          default:

            if (pressChar && arrayChar) {
              arrayChar = [options.btnKey];
              setPressChar('');
              setArrayChar(arrayChar);
              return;
            }

            setArrayChar([...arrayChar, options.btnKey]);

        }



        //setPressChar(arrayChar.join(''));

        //console.log(arrayChar.join(''));


        Vibration.vibrate(5)
      }}>

        <Text style={styles.myBtnTxt}>  {options.btnKey} </Text>

      </TouchableOpacity>
  )



  return (
    <View>

      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Test" component={TestComp} options={{title: 'Test comp'}}/>


        </Stack.Navigator>
        <TestComp/>
      </NavigationContainer>

      <View style={{backgroundColor: '#831515', minHeight: '30%', alignItems: "flex-end", justifyContent: "flex-end", }}>

        <Text style={{color: '#fff', fontSize:38, position: 'absolute', right:10}}>
          {arrayChar.join('')} {pressChar?`= ${pressChar}`:``}
        </Text>

      </View>

      <View style={styles.buttons} >


        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '%',
            colorBtn: styles.myFunctionalBtn,
          })
        }

        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: 'CE',
            colorBtn: styles.myFunctionalBtn,
          })
        }

        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: 'C',
            colorBtn: styles.myFunctionalBtn,
          })
        }


        {
          calculatorButton({
            normBtn: styles.myBtn,
            colorBtn: styles.myFunctionalBtn,
            btnKey: '<'
          })
        }

        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '7'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '8'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '9'
          })
        }


        {
          calculatorButton({
            normBtn: styles.myBtn,
            colorBtn: styles.myFunctionalBtn,
            btnKey: '*'
          })
        }


        {/**/}


        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '4'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '5'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '6'
          })
        }


        {
          calculatorButton({
            normBtn: styles.myBtn,
            colorBtn: styles.myFunctionalBtn,
            btnKey: '-'
          })
        }

        {/**/}

        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '1'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '2'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '3'
          })
        }


        {
          calculatorButton({
            normBtn: styles.myBtn,
            colorBtn: styles.myFunctionalBtn,
            btnKey: '+'
          })
        }

        {/**/}

        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '.'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '0'
          })
        }



        {
          calculatorButton({
            normBtn: styles.myBtn,
            btnKey: '.'
          })
        }


        {
          calculatorButton({
            normBtn: styles.myBtn,
            colorBtn: styles.myFunctionalBtn,
            btnKey: '='
          })
        }


      </View>
    </View>
  );
}


let darkMode = false;

const styles = StyleSheet.create({

  myBtn:{
    backgroundColor: '#ee9d9d',
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '54%',
    flex: 2,
    margin: .2,
  },
  myFunctionalBtn:{
    backgroundColor: '#a8a867',
  },

  myBtnTxt:{
    fontSize: 28
  },

  flexTest: {
    color: "#000000",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /**************/

  results: {
    backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: 45,
    color: '#00b9d6',
    margin: 15,
    fontSize: 35,
  },
  historyText: {
    color: darkMode ? '#B5B7BB' : '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: '5%',
    margin: 15,
    backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  /////
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {

    /*alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10*/

    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '54%',
    flex: 2,
  },
  ///
  textButton: {
    color: darkMode ? '#b5b7bb' : '#7c7c7c',
    fontSize: 28,
  }
});
