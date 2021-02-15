import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import ImageView from 'react-native-image-viewing'
import HTML from 'react-native-render-html'

import {
  BODY_SERIF,
  BODY_SERIF_BOLD,
  BODY_SERIF_ITALIC,
  GEOMETRIC_BOLD,
} from '../utils/fonts'
import { PublicationPrimaryColor } from '../utils/branding'

export const CustomHTML = ({ article, currPublication }) => {
  const [modalVisible, isModalVisible] = useState(false)
  const [imgURI, updateimgURI] = useState(null)

  const tagStyles = {
    p: {
      fontSize: 18,
      lineHeight: 28,
      marginBottom: 20,
      fontFamily: BODY_SERIF,
    },
    a: {
      fontSize: 18,
    },
    i: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: BODY_SERIF_ITALIC,
    },
    b: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: BODY_SERIF_BOLD,
    },
    strong: {
      fontSize: 18,
      lineHeight: 28,
      fontFamily: GEOMETRIC_BOLD,
      color: PublicationPrimaryColor(currPublication),
    },
  }

  const onLinkPress = (_, href) => {
    const { publication, slug } = getArticlePubSlug(href)
    const { name } = route

    const browserScreenName =
      name === 'HomeArticle' ? 'HomeBrowser' : 'SectionBrowser'
    const ArticleScreenName =
      name === 'HomeArticle' ? 'HomeArticle' : 'SectionArticle'

    if (!slug && isValidURL(href)) {
      Linking.openURL(href)
      //navigation.navigate(browserScreenName, { link: href })
    } else if (slug && publication) {
      navigation.push(ArticleScreenName, {
        articleSlug: slug,
        articlePublication: publication,
      })
    }
  }

  const IMGRenderer = (htmlAttribs, passProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          updateimgURI(htmlAttribs.src)
          isModalVisible(true)
        }}
        key={passProps.key}
        style={{
          width: '100%',
          minHeight: 100,
          marginBottom: 15,
        }}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: htmlAttribs.src }}
          style={{
            flex: 1,
            backgroundColor: 'blue',
            resizeMode: 'center',
            aspectRatio: htmlAttribs['data-width'] / htmlAttribs['data-height'],
            borderRadius: 2,
          }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <ImageView
        visible={modalVisible}
        onRequestClose={() => isModalVisible(false)}
        imageIndex={0}
        images={[{ uri: imgURI }]}
        swipeToCloseEnabled={true}
      />
      <View style={{ padding: 20 }}>
        <HTML
          onLinkPress={onLinkPress}
          source={{
            html: article.content,
          }}
          tagsStyles={tagStyles}
          allowWhitespaceNodes={false}
          renderers={{
            img: IMGRenderer,
          }}
        />
      </View>
    </>
  )
}
