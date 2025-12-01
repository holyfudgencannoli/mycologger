import { StyleSheet, View, Button, Text } from 'react-native';
import 'react-native-reanimated';
import { Surface, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { useAuth } from '../../hooks/useAuthContext';
import { apiFetch } from '../../services/apiFetch';
import { ScreenPrimative } from '../../components/ScreenPrimative';
import { ImageBG } from '../../components/ImageBG';

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { login } = useAuth();

    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
            const body = { username, password }

            const data = await apiFetch('/auth/login', 'POST', '', body)
            const token = data.access_token;
            const user = data.user;

            login(user, token)
            navigation.navigate("Root");
        } catch (err) {
            console.error("Error caught in handleLogin:", {
                name: err?.name,
                message: err?.message,
                stack: err?.stack,
                full: JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
            });

            alert(`Server error: ${err?.message || "Unknown error"}`);
        }
    };

    return(
        <ImageBG image={require('../../assets/bg.jpg')}>
            
            <ScreenPrimative edges={[]} scroll>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>MycoLogger</Text>
                </View>
                <View style={styles.subtitleBox}>
                    <Text style={styles.subtitle}>Enter valid credentials below to sign in. </Text>
                </View>
                <Surface style={styles.formBox}>
                    <TextInput
                        style={{ marginTop: 16}}
                        label="Username"
                        value={username}
                        mode='outlined'
                        onChangeText={setUsername}
                        autoCapitalize='none'
                        autoComplete='username'
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        autoComplete='password'
                        autoCapitalize='none'
                        secureTextEntry={!showPassword}  // hides text if false
                        right={
                            <TextInput.Icon
                                icon={showPassword ? "eye-off" : "eye"}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                        style={{ marginTop: 16, marginBottom: 12 }}
                    />
                    {/* <Button onPress={() => navigation.navigate("Root")} color="#000080" style={styles.button} title='Log In'></Button> */}
                    <Button onPress={handleLogin} color="#000000" style={styles.button} title='Log In'></Button>
                </Surface>
            </ScreenPrimative>
        </ImageBG>
    )
    
}

const styles = StyleSheet.create({
  titleBox: {
    // flex: 0.05,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    width: '100%'
    // height: 60
  },
  subtitleBox: {
    // flex: 0.1,
    // backgroundColor: 'none',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay for readability
    alignItems: 'center',
    justifyContent: 'center',
    // padding:24,
    borderRadius: 10,
    margin: 24,
    // marginRight: 36
  },
  backgroundImage: {
    flex: 1, // Make the background image fill the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay for readability
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 48,
    // padding:48,
    textAlign: 'center',
    // top: 10,
    color: 'rgba(0, 192, 192,1)',
    textShadowColor: '#80f',
    textShadowRadius: '8',
  },
  subtitle: {
    fontSize: 24,
    padding:36,
    textAlign: 'center',
    // top: 10,
    color: 'rgba(0, 128, 192,1)',
    textShadowColor: '#fff',
    textShadowRadius: 2,
    // width: 250

  },
  container:{
    flex: 1,
    justifyContent: 'center',

  },
  formBox: {
    padding: 16,
    backgroundColor: 'rgba(0, 17, 255, 0.73)',
    borderWidth:4,
    borderColor:'white',
    borderRadius: 16


  }
});