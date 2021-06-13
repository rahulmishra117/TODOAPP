import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Task from "./component/Task";
import { Icon } from "react-native-elements";
import Logo from "./component/Logo";

const image = {
  uri: "https://png.pngtree.com/thumb_back/fw800/background/20191215/pngtree-abstract-gradient-background-image_324814.jpg",
};

const image1 = {
  uri: "https://image.freepik.com/free-vector/abstract-colorful-background_23-2148929192.jpg",
};

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.logostyle}>
          <Logo />
        </View>
        <View style={styles.header}></View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <Text style={(styles.text_footer, { paddingTop: 40 })}>Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.button_value}>
            <Button
              color="#841584"
              borderRadius="25"
              title="Log In "
              onPress={() => navigation.navigate("TODO")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

function TodoScreen() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today'Task*/}
      <ImageBackground source={image1} style={styles.image}>
        <View style={styles.taskWrapper}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}></Text>
          </View>

          <View style={styles.items}>
            {/* Show all the Task */}

            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/*Writing Code*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "passing" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Enter Your Day Task"}
            value={task}
            onChangeText={(text) => setTask(text)}
          />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="" component={HomeScreen} />
        <Stack.Screen name="TODO" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'linear-gradient(to right, #f12711, #f5af19)'
    backgroundColor: "#F64C72",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  addText: {},
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "red",
    borderWidth: 1,
  },

  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    fontfamily: "Dancing Script",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button_value: {
    paddingTop: 40,
  },
  logostyle: {
    width: 20,
    height: 20,
    paddingTop: 80,
    paddingLeft: 140,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
