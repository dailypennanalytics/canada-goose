import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import { GEOMETRIC_BOLD, GEOMETRIC_REGULAR } from '../utils/fonts'

const people = require('../json/members.json')

const { width, height } = Dimensions.get('window')

const profilePicSize = width / 5
const profilePicCellSize = width / 4

const teamIntro =
  "Hi, we're the tech department at the DP: a team of student software engineers!"
const mission =
  'Our mission statement is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx \n \nOur ultimate goal is xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx xxx'

const GOOSE_LOGO = require('../static/logos/goose_from_canada_logo.png')

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
  },

  logo: {
    width: 300,
    height: 300,
  },

  sectionContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },

  intro: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    fontFamily: GEOMETRIC_BOLD,
  },

  mission: {
    paddingHorizontal: 60,
    fontSize: 12,
    fontFamily: GEOMETRIC_REGULAR,
  },

  meetTeam: {
    fontSize: 22,
    fontFamily: GEOMETRIC_BOLD,
    marginTop: 20,
    paddingVertical: 20,
  },

  profilePicImage: {
    paddingHorizontal: 20,
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2,
  },

  profilePicCell: {
    alignItems: 'center',
  },

  profileName: {
    fontSize: 12,
    color: '#808080',
    fontFamily: GEOMETRIC_REGULAR,
  },
})

const ProfileCell = ({ name, pic }) => {
  return (
    <View style={styles.profilePicCell}>
      <Image
        source={require('../static/logos/default_profile_pic.png')}
        style={styles.profilePicImage}
      />
      <Text style={styles.profileName}>{name}</Text>
    </View>
  )
}

export const AboutScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Image source={GOOSE_LOGO} style={styles.logo} />
      <Text style={styles.intro}>{teamIntro}</Text>
      <Text style={styles.mission}>{mission}</Text>
      <Text style={styles.meetTeam}>Meet the Team</Text>
      <FlatGrid
        itemDimension={profilePicCellSize}
        data={people}
        renderItem={({ item }) => (
          <ProfileCell name={item.name} image={item.pic} />
        )}
      />
    </ScrollView>
  )
}
