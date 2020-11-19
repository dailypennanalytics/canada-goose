import React from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

const TopStoryCard = ({ category, time, title, imageUrl }) => (
  <View style={styles.shadow}>
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: imageUrl }}
      ></ImageBackground>
      <View style={{ padding: 15 }}>
        <View style={styles.textRow}>
          <Text style={styles.category}>{category}</Text>
          <View style={styles.spacer} />
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 7,
    overflow: 'hidden',
  },

  imageBackground: {
    flex: 1,
    paddingHorizontal: 15,
  },

  textRow: {
    flexDirection: 'row',
  },

  title: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 16,
    flexShrink: 1,
    paddingTop: 5,
  },

  category: {
    color: 'darkred',
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.75,
  },

  time: {
    fontFamily: 'AvenirNextCondensed-Regular',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 9,
  },
  spacer: {
    flex: 1,
  },
})

export default TopStoryCard
