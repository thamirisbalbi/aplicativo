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
    
    const [page, setPage] = useState(1); //inicia na página 1
    const [loading, setLoading] = useState(false); //evita que os dados sejam carregados novamente: aplicação carregará uma página por vez

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //segundo parâmetro é a informação que se quer passar para a página Detail
    }

    async function loadIncidents() {
        if (loading) { //se estiver carregando
            return; 
        } //evita que outra requisição aconteça enquanto uma já está sendo feita 

        if (total > 0 && incidents.length == total ) { //total de registros no banco de dados
            return;
        } //não busca mais informações caso já tenha carregado todas

        setLoading(true); //else

        const response = await api.get('incidents', {
            params: { page } //passa como parâmetro o número da página p/ ser possível a rolagem infinita de casos
        } ); //api pegando rota incidents
    
        setIncidents([...incidents, ...response.data]); //forma de anexar os vetores
        //data seria onde estão os dados vindos da api. 
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
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
                onEndReached={loadIncidents} //aceita função disparada de forma automática quando o usuário chegar ao final da lista
                onEndReachedThreshold={0.2} //indica quantos porcento ao fim da lista o usuário precisa estar para carregar novos itens (nesse caso, precisa estar 20% no final da lista)
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
                            onPress={() => navigateToDetail(incident)} //não é possível colocar incident direto, se não será executado assim que for exibido em tela. É preciso sempre executar uma função(arrow function), em vez do valor de uma função. 
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
