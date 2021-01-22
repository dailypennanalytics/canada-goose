import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
  AppState,
  Animated,
  Image,
} from 'react-native'
import { useQuery } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/core'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import {
  CustomHeader,
  SectionHeader,
  HeadlineArticle,
  HorizontalArticleCarousel,
  ArticleList,
  ActivityIndicator,
  HeaderLine,
} from '../components'
import {
  PARTIAL_NAVIGATE,
  NAVIGATE_TO_ARTICLE_SCREEN,
  GET_HOME_SECTIONS,
  GET_HOME_SECTION_NAME,
  GET_HOME_QUERIES,
} from '../utils/helperFunctions'
<<<<<<< HEAD
import { GET_HOME_FEED_ORDER_KEY, Storage } from '../utils/storage'
import { PublicationEnum } from '../utils/constants'
=======
>>>>>>> 228e987d1eb7abac743b65888a13237527df1a40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    color: '#fff',
  },
})

const HomeView = ({
  navigation,
  publication,
  homeSections,
  data,
  loading,
  refetch,
}) => {
  const { centerpiece: centerArticles, top: topArticles } = data

  const sectionData = homeSections.map(section => ({
    name: section,
    articles: data[section],
  }))

  const [offset, setOffset] = useState(0)

  const handleScroll = scrollData => {
    setOffset(scrollData.nativeEvent.contentOffset.y)
    //setY(scrollData.nativeEvent.contentOffset.y)
    console.log(scrollData.nativeEvent.contentOffset.y)
  }

  // TODO (liz): defaultSections cannot be stored inside useState
  // otherwise, redux won't update it for some reasons
  // a quick fix I can think of is to put this function inside HomeScreenComp
  // and pass the ordered sections to this component
  const loadHomeSectionOrder = async () => {
    let order = await Storage.getItem(GET_HOME_FEED_ORDER_KEY(publication))
    if (order == null) return defaultSections
    if (order == GET_HOME_SECTIONS(publication)) return defaultSections

    let newSections = []
    order.forEach(section => {
      defaultSections.forEach(item => {
        if (section == item.name) {
          newSections.push(item)
        }
      })
    })

    return newSections
  }

  // const sections = await loadHomeSectionOrder()

  // console.log(sections.length)

  // useEffect(() => {
  //   loadHomeSectionOrder()
  // }, [reorderHomeSection])

  const onRefresh = useCallback(() => {
    refetch()
  })

  //Header consts
  const [scrollY, setScrollY] = useState(new Animated.Value(0))
  const minScroll = 10
  const AnimatedHeaderHeight = getStatusBarHeight(true) + 50
  const negativeHeaderHeight =
    Platform.OS === 'android'
      ? -AnimatedHeaderHeight
      : -(AnimatedHeaderHeight - getStatusBarHeight(true))
  const clampedScrollY = scrollY.interpolate({
    inputRange: [minScroll, minScroll + 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  })
  const minusScrollY = Animated.multiply(clampedScrollY, -1)
  const translateY = Animated.diffClamp(minusScrollY, negativeHeaderHeight, 0)
  const opacity = translateY.interpolate({
    inputRange: [negativeHeaderHeight, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })
  const DP_HEADER_LOGO = require('../static/logos/dp-header.png')
  const ST_HEADER_LOGO = require('../static/logos/34st-header.png')
  const UTB_HEADER_LOGO = require('../static/logos/utb-header2.png')

  const GET_HEADER_LOGO = () => {
    switch (publication) {
      case PublicationEnum.dp:
        return DP_HEADER_LOGO
      case PublicationEnum.street:
        return ST_HEADER_LOGO
      default:
        return UTB_HEADER_LOGO
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 2,
            backgroundColor: '#fff',
            borderBottomColor: '#AAA',
            borderBottomWidth: 1,
          },
          { transform: [{ translateY: translateY }] },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            height: AnimatedHeaderHeight,
            position: 'absolute',
            width: '100%',
            zIndex: 3,
            backgroundColor: '#fff',
            alignItems: 'center',
            //justifyContent: "center",
            borderBottomColor: '#DDD',
            borderBottomWidth: 1,
            opacity: opacity,
            //paddingTop: getStatusBarHeight(true) + 12,
            ...Platform.select({
              ios: {
                paddingTop: getStatusBarHeight(true) + 10,
              },
              android: {
                paddingTop: getStatusBarHeight(true),
              },
            }),
          },
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <View style={{ height: 28 }}>
          <Image
            source={GET_HEADER_LOGO()}
            style={{ flex: 1, resizeMode: 'contain' }}
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        //onScroll={event => handleScroll(event)}
        style={{
          paddingTop: Platform.select({
            android: AnimatedHeaderHeight,
            ios: 0,
          }),
        }}
        contentInset={{ top: AnimatedHeaderHeight }}
        contentOffset={{
          x: 0,
          y: Platform.select({ android: 0, ios: -AnimatedHeaderHeight }),
        }}
        automaticallyAdjustContentInsets={false}
        //
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            progressViewOffset={AnimatedHeaderHeight}
          />
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            NAVIGATE_TO_ARTICLE_SCREEN(navigation, 'HomeArticle', {
              article: centerArticles[0],
            })
          }
        >
          <HeadlineArticle data={centerArticles[0]} publication={publication} />
        </TouchableOpacity>

        <HeaderLine publication={publication} />
        <SectionHeader title="Top Stories" publication={publication} />
        <HorizontalArticleCarousel
          articles={topArticles}
          navigateToArticleScreen={PARTIAL_NAVIGATE(
            navigation,
            'HomeArticle',
            NAVIGATE_TO_ARTICLE_SCREEN
          )}
          publication={publication}
        />

        {sectionData.map((el, i) => {
          const { name, articles } = el
          return (
            <View key={i}>
              <HeaderLine publication={publication} />
              <SectionHeader
                title={GET_HOME_SECTION_NAME(publication, name)}
                publication={publication}
              />
              <ArticleList
                articles={articles}
                navigateToArticleScreen={PARTIAL_NAVIGATE(
                  navigation,
                  'HomeArticle',
                  NAVIGATE_TO_ARTICLE_SCREEN
                )}
                publication={publication}
              />
            </View>
          )
        })}
<<<<<<< HEAD
      </Animated.ScrollView>
=======
      </ScrollView>
      <CustomHeader publication={publication} contentOffset={offset} />
>>>>>>> 228e987d1eb7abac743b65888a13237527df1a40
    </View>
  )
}

const HomeScreenComp = ({ navigation, publication, settings }) => {
  // const [lastActiveTime, setLastActiveTime] = useState(Date.now())
  const appState = useRef(AppState.currentState)
  const [appStateState, setAppStateState] = useState(appState.current)
  const { homeSectionPreferences, _ } = settings

  let homeSections =
    homeSectionPreferences == null ||
    homeSectionPreferences[publication] == null
      ? GET_HOME_SECTIONS(publication)
      : homeSectionPreferences[publication]

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }

    if (appState.current.match(/active/)) {
      console.log('App has come to the background!')
    }

    appState.current = nextAppState
    setAppStateState(appState.current)
    console.log('AppState', appState.current)
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

<<<<<<< HEAD
=======
  // useEffect(() => {
  //   console.log(
  //     '@@@@@@@ update homeSection @@@@@@@',
  //     settings.homeSectionPreferences[publication]
  //   )
  //   // console.log(homeSection)
  //   // homeSections = homeSection[publication]
  //   // homeSections = settings.homeSectionPreferences[publication]
  // }, [settings.homeSectionPreferences])

>>>>>>> 228e987d1eb7abac743b65888a13237527df1a40
  const { loading, error, data, refetch } = useQuery(
    GET_HOME_QUERIES(publication)
  )

  useFocusEffect(
    useCallback(() => {
      console.log('home screen focused')
      console.log(Boolean(data))

      if (data) {
        console.log('refetching home screen articles')
        refetch()
      }

      return () => {
        console.log('home screen blurred')
      }
    }, [data])
  )

  if (!data) return <ActivityIndicator />

  if (error) {
    console.log(error)
    return <Text> Error </Text>
  }

<<<<<<< HEAD
  let HOME_SECTIONS = GET_HOME_SECTIONS(publication)

  const { centerpiece: centerArticles, top: topArticles } = data

  const defaultSections = HOME_SECTIONS.map(section => ({
    name: section,
    articles: data[section],
  }))

=======
>>>>>>> 228e987d1eb7abac743b65888a13237527df1a40
  return (
    <HomeView
      navigation={navigation}
      publication={publication}
      homeSections={homeSections}
      data={data}
      loading={loading}
      refetch={refetch}
    />
  )
}

const mapStateToProps = ({ publication, settings }) => ({
  publication,
  settings,
})

export const HomeScreen = connect(mapStateToProps)(HomeScreenComp)
