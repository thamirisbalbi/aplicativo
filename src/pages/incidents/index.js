import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoimg from '../../assets/logo.png'; //passa automaticamente a logo que se adequa a tela que roda a aplicação

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const navigation = useNavigation();
    const [total, setTotal] = useState(0); //armazena total de itens. Usestate inicia com ototal de zero itens. 

    function navigateToDetail() {
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const response = await api.get('/incidents'); //api pegando rota incidents
    
        setIncidents(response.data); //data seria onde estão os dados vindos da api. 
        setTotal(response.headers['x-total-count']);
    } //cria função fora do useEffect para depois ser usada nele

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoimg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)} //retorna apenas id por conter um objeto em data 
                showsVerticalScrollIndicator={false}
                renderItem={( { item: incident } ) => ( //pega um atributo de renderItem (item) e esclarece que é a mesma coisa que incident na aplicação: ela conterá os dados mandados da api 
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                 style: 'currency', 
                                 currency: 'BRL' })
                                 .format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
