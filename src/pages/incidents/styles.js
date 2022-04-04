import { StyleSheet } from "react-native";
import { Constants } from "expo-constants"; //importa informações fixas para cada projeto

export default StyleSheet.create({
    container: {
        flex: 1, //aplicação ocupa tamanho inteiro
        paddingHotizontal: 24, //quero fazer um padding nas laterais
        paddingTop: Constants.statusBarHeight + 20, //tamanho da status bar para ela ficar mais abaixo da tela

    },

    header: {
        flexDirection: 'row', //os itens do header ficam lado a lado
        justifyContent: 'space-between',
        alignItems: 'center' //centraliza o texto e o coloca à direita  
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    }, 

    headerTextBold: {
        fontWeight: 'bold'
    }
});