// TODO: maybe remove these in the future
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View 
} from 'react-native';
import * as Linking from 'expo-linking';
import {
  ContentHeader,
  Icon,
  LinkButton,
  NavBar,
  SpacerInline 
} from '@elements';
import { IconName } from '@elements/Icon';
import useGlobal from '@state';
import styles, { ListItem } from './ContactScreen.styles';

const contactList: Array<{
  title: string;
  message: string;
  link: string;
  iconName: IconName;
}> = [
  {
    title: 'website',
    message: 'www.bananaapp.org',
    link: 'https://www.bananaapp.org',
    iconName: 'website',
  },
  {
    title: 'email',
    message: 'info@bananapp.org',
    // TODO: When the default iOS email app is uninstalled, this fails.
    link: 'mailto:info@bananapp.org',
    iconName: 'email',
  },
  {
    title: 'facebook',
    message: 'Connect with us on Facebook!',
    link: 'https://facebook.com/BeGoodProject',
    iconName: 'facebook',
  },
];

export default function ContactScreen(props) {
  const [ state, { updateAlert } ] = useGlobal() as any;

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    supported
      ? await Linking.openURL(url)
      : updateAlert({
        title: 'Oops!',
        message: `There was an error connecting to ${url}-- please try again later.`,
        dismissable: true,
      });
  };

  return (
    <View style={styles.outerContainer}>
      <NavBar {...props} />

      <ContentHeader headerSize="large" title="Contact Us" />

      <ScrollView style={styles.bodyContainer}>
        {/* Body Message */}
        <View style={styles.bodyMessage}>
          <Text style={styles.bodyMessageTitle}>
            We are here to help.
          </Text>

          <Text style={styles.bodyMessageBody}>
            {
              'Feel free to reach out to us with any questions or inquiries!'
							+ ' \nWe will get back to you in 1-2 business days.'
            }
          </Text>
        </View>

        {/* Contact List */}
        <View>
          {
            contactList.map((contact, i) => (
              <TouchableHighlight key={contact.title} onPress={() => openLink(contact.link)}>
                <View style={[ ListItem.container, i === 0 && ListItem.firstContainer ]}>
                  <View style={ListItem.title}>
                    <View style={ListItem.titleIcon}>
                      <Icon name={contact.iconName} size={24} />
                    </View>

                    <Text style={ListItem.titleText}>
                      {contact.title}
                    </Text>
                  </View>

                  <Text style={ListItem.message}>
                    {contact.message}
                  </Text>
                </View>
              </TouchableHighlight>
            ))
          }
        </View>

        <SpacerInline height={44} />
        <LinkButton
          text="Back"
          onPress={props.backDestination ? () => props.navigation.navigate(props.backDestination) : () => props.navigation.goBack()}
        />

      </ScrollView>
    </View>
  );
}
