/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Fragment, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";

import messagesAPI from "@atelier/shared/api/messages";
import { Background } from "@atelier/core/context";
import { Message } from "@atelier/stores/types";
import $useChat, { ChatContext } from "@atelier/app/useChat";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

function Messages() {
  const { messages } = useContext(ChatContext);

  return (
    <View>
      {messages &&
        Object.values(messages).map((message) => {
          return <Text key={message.id}>{message.content}</Text>;
        })}
    </View>
  );
}

function MessageInput() {
  const [rawMessage, setRawMessage] = useState("");

  const { sendMessage } = useContext(ChatContext);
  return (
    <Fragment>
      <View>
        <TextInput
          placeholder="Ingrese el mensaje"
          onChangeText={(text) => {
            setRawMessage(text);
          }}
          defaultValue={rawMessage}
        />
      </View>
      <Button
        title="send"
        onPress={() => {
          console.log(rawMessage, "message to be sent");
          sendMessage({ content: rawMessage });
          setRawMessage("");
        }}
      ></Button>
    </Fragment>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const { messages, sendMessage } = useContext(ChatContext);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    // @ts-ignore
    <ChatContext.Provider value={$useChat()}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
            <Section title="Messages">
              <Messages />
            </Section>
            <Section title="Input">
              <MessageInput />
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ChatContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
