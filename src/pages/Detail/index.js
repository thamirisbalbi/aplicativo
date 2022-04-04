import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import logoimg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoimg} />
                
                <TouchableOpacity onPress={() => {}}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
        </View>
    );
}