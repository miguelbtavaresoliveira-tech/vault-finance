// components/TransactionCard.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';


export default function TransactionItem({ item, onEdit, onDelete }) {
  const { isDarkMode } = useContext(ThemeContext);
  const isReceita = item.tipo === 'receita'

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  //Mapeamento dinâmico de ícones por categoria 
  const getCategoryIcon = (categoria) => {
    switch (categoria.toLowerCase()) {
      case 'alimentacao':
      case 'mercado':
        return 'card-outline'
      case 'transporte':
      case 'gasolina':
        return 'card-outline'
      case 'renda':
      case 'salario':
        return 'cash-outline'
      case 'lazer':
        return 'game-controller-outline'
      default:
        return 'receipt-outline'
    }
  }


  return (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <View style={[styles.iconBox, { backgroundColor: isReceita ? (isDarkMode ? '#064E3B' : '#D1FAE5') : (isDarkMode ? '#7F1D1D' : '#FEE2E2')} ]}>
      <Ionicons
      name={getCategoryIcon(item.categoria)}
      size={22}
      color={isReceita ? (isDarkMode ? '#34D399' : '#10B981') : (isDarkMode ? '#F87171' : '#EF4444') }
      />
      </View>

      {/* Informações da Transação */}
      <View style={styles.info}>
        <Text style={[styles.description, isDarkMode && styles.descriptionDark]} numberOfLines={1}>
          {item.descricao}
        </Text>
        <Text style={[styles.subtext, isDarkMode && styles.subtextDark]}>
          {item.categoria} • {item.data}
        </Text>
      </View>

      {/* Valor e ações (editar / deletar ) */}
      <View style={styles.rightSection}>
        <Text style={[styles.value, { color: isReceita ? (isDarkMode ? '#34D399' : '#10B981') : (isDarkMode ? '#F87171' : '#EF4444')}]}>
          {isReceita ? `+ ${formatCurrency(item.valor)}` : `- ${formatCurrency(item.valor)}`} 
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(item)} style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}>
            <Ionicons name='pencil' size={18} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.actionButton, isDarkMode && styles.actionButtonDark]}>
            <Ionicons name='trash-outline' size={18} color={isDarkMode ? '#F87171' : '#EF4444'} />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  
  )


}












const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  subtext: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 6,
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  actionButtonDark: {
    backgroundColor: '#334155',
  },
  cardDark: {
    backgroundColor: '#1E293B',
  },
  descriptionDark: {
    color: '#F8FAFC',
  },
  subtextDark: {
    color: '#CBD5E1',
  },
});