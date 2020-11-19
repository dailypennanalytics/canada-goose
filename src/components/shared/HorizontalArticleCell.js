import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: 'HelveticaNeue-CondensedBold',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  image: {
    width: 100,
    height: 100,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  category: {
    color: '#A61E21',
    fontFamily: 'HelveticaNeue-CondensedBold',
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 13,
    paddingBottom: 4,
  },
  hView: {
    backgroundColor: 'rgba(100, 0, 0, 0.0)',
    flexDirection: 'row',
    paddingHorizontal: 20,
    //paddingVertical: 10,
    marginVertical: 10,
  },
  vView: {
    paddingHorizontal: 15,
    flexShrink: 1,
  },
})

export const HorizontalArticleCell = ({ imageURL, category, title }) => (
  <View style={styles.hView}>
    <View style={styles.imageView}>
      <Image style={styles.image} source={{ uri: imageURL }} />
    </View>
    <View style={styles.vView}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title} numberOfLines={4}>
        {title}
      </Text>
    </View>
  </View>
)