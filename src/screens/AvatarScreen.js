import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {apiService} from '../services/apiService';
import {createApiHeader} from '../services/createApiHeader';
import {useUserContext} from '../contexts/UserContext';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Avatar from '../components/Avatar';
import MoneyIcon from '../components/MoneyIcon';

const AvatarScreen = () => {
  const [avatars, setAvatars] = useState([]);
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await apiService.fetchAvatars(
          createApiHeader(user.token),
        );
        setAvatars(response.data);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchAvatars();
  }, [user.token]);

  const handleEquip = async item => {
    try {
      const response = await apiService.equipAvatar(
        createApiHeader(user.token),
        item.id,
      );
      if (response.data) {
        setAvatars(state =>
          state.map(avatar =>
            avatar.isCurrent === true ? {...avatar, isCurrent: false} : avatar,
          ),
        );
        setAvatars(state =>
          state.map(avatar =>
            avatar.id === item.id ? {...avatar, isCurrent: true} : avatar,
          ),
        );
        setUser({...user, avatarImage: item.imageURL});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuy = async item => {
    try {
      const response = await apiService.buyAvatar(
        createApiHeader(user.token),
        item.id,
      );
      if (response.data) {
        setAvatars(state =>
          state.map(avatar =>
            avatar.id === item.id ? {...avatar, isBought: true} : avatar,
          ),
        );
        const newMoney = user.money - item.price;
        setUser({...user, money: newMoney});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderAvatar = ({item}) => (
    <View style={styles.avatarContainer}>
      <Avatar image={item.imageURL} style={styles.avatarImage} />
      <View style={styles.avatarDetails}>
        <Paragraph style={styles.avatarName}>{item.name}</Paragraph>
        <Paragraph style={styles.avatarPrice}>
          {item.price} <MoneyIcon style={styles.moneyIcon} />
        </Paragraph>
      </View>
      <View style={styles.buttonContainer}>
        {item.isCurrent ? (
          <Paragraph style={styles.equippedText}>Naudojama</Paragraph>
        ) : item.isBought ? (
          <Button onPress={() => handleEquip(item)} style={styles.button}>
            Naudoti
          </Button>
        ) : (
          <Button onPress={() => handleBuy(item)} style={styles.button}>
            Pirkti
          </Button>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header>Veikėjų parduotuvė</Header>
      <FlatList
        data={avatars}
        renderItem={renderAvatar}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  avatarDetails: {
    flex: 1,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  avatarPrice: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '25%',
  },
  button: {
    width: '100%',
  },
  equippedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  moneyIcon: {
    width: 16,
    height: 16,
  },
});

export default AvatarScreen;
