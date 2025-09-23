import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import 'react-native-reanimated';
import { Surface, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { ThemedText } from '../../components/ThemedText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '../../scripts/AuthContext';
import { ThemedView } from '../../components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { login } = useAuth();

    const navigation = useNavigation()

    const handleLogin = async () => {
        try {
            const res = await fetch("http://10.0.0.45:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                const token = data.access_token;
                const user = data.user;
                login(user, token)
                navigation.navigate("Root");
            } else {
                alert(data.msg || "Login failed");
            }
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
        <ImageBackground
            source={require('../../assets/bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 0 }}
                enableOnAndroid={true}
                extraScrollHeight={180}
                keyboardOpeningTime={0}
                enableAutomaticScroll={true}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView  style={styles.container}>
                    <ThemedView style={styles.titleBox}>
                        <ThemedText style={styles.title}>MycoLogger</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.subtitleBox}>
                        <ThemedText style={styles.subtitle}>Enter valid credentials below to sign in. </ThemedText>
                    </ThemedView>
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
                    <View style={{ display:'flex', flexDirection: 'row', margin: 'auto', gap: 48 }}>
                        <Button color="#000000" onPress={() => navigation.navigate('RegisterScreen')} title='Create Account'></Button>
                        <Button color="#000000" title='Forgot Password' onPress={() => navigation.navigate('PasswordRecoveryScreen')}></Button>
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
    
}

const styles = StyleSheet.create({
  titleBox: {
    flex: 0.05,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
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