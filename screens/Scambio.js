import React, { useState, useEffect, useContext, createRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput, Button  } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AuthContext } from "../context/AuthContext";
import api from "../Utility/api.js"
import styles from "./Style.js";
import colors from "../config/colors";



function Scambio({navigation, route}) {

 

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  //const [, ] = useState();

  const [code, setCode] = useState('');
  console.log(code)

  

    
    const moveCards = async (portfolio_code) => {
       
    
        try {
          setLoading(true);
          const { result, errors, payload } = await api.post("move-card", {"card_id": route.params.card_id, portfolio_code });
          console.log("errore: ", errors);
          console.log("result: ", result);
          console.log("payload: ", payload);
          
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      const [hasPermission, setHasPermission] = useState(null);
      const [scanned, setScanned] = useState(false);
    
      useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned){
          setScanned(true);
          moveCards(data)
        }
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      } 

    
    return (
      
      <View style={{flex: 1}}>
        <View style={styles.scambiocontainer}>
        <View style={{height: '2%',width: '100%', alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={() => {navigation.navigate("CardListScreen")}}>
                    <View style={{ borderRadius: 100, height:40, width:40, alignItems: 'center', justifyContent: 'center'  }}>

                    <Text style={{fontSize:40,color: 'white'}}>x</Text>
                    </View>
                  </TouchableOpacity>

                </View>

          <View>

          <Text style={{fontSize:40, color:'white'}}>{route.params.card_name}</Text>
          <Text style={{fontSize:20, color:'white'}}>{route.params.card_game}</Text>

          </View>



        </View>
        <View style={{height: '40%', width:'100%',justifyContent:'space-around', alignItems: 'center'}}>

          <Text style={{color: colors.blu, width: '80%', fontSize: 18, textAlign:'center'}}>inserisci qui il codice utente dell' account a cui mandare la carta</Text>

          <TextInput
          style={styles.input}
          placeholder="insert here de code"
          placeholderTextColor="#0099e5"
          onChangeText={code => setCode(code)}
          defaultValue={code}
          /> 
           <Text style={{color: colors.red, width: '80%', fontSize: 15, textAlign:'center'}}>utilizza il qr code</Text>
        </View>
        <View style={{ width: "100%", height: '10%',justifyContent:'center', alignItems: "center" }}>

          <View style={styles.button}>

            <TouchableOpacity style={{width:300,alignItems:'center'}} onPress={() => {moveCards(code);navigation.navigate("CardListScreen")}}>
              <Text style={{fontSize:20, color:'white'}}>scambio</Text>
            </TouchableOpacity>

          </View>
        </View>

        <BarCodeScanner
        barCodeType={BarCodeScanner.Constants.BarCodeType.qr , BarCodeScanner.BarCodeSize={height:50,width:50} }
        
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} 




      </View>
         
      

  
    
    );

}

export default Scambio


    

    //Scambio con qr
  //  const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // } 

 

  //      <BarCodeScanner
  //       onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //       style={StyleSheet.absoluteFillObject}
  //     />
  //     {scanned && (
  //       <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
  //     )} 
