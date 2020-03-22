import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Button,
    //Share
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
export default class PDF extends Component {
    state = {
        filePath: ''
    };
    constructor(props) {
        super(props);
    }

    askPermission() {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'ShapenSoul App External Storage Write Permission',
                        message:
                            'ShapenSoul App needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            this.createPDF();
        }
    }
    onPressButton = () => {
        const url = "file://"+this.state.filePath
        Share.open({url})
    }

    onShare = async () => {
        const result = await Share.open({
            message:"hey",
            url: this.state.filePath,
            subject:"report"
        })
    }

    async createPDF() {
        let options = {
            //Content to print
            html:
                `<head>
                <title>Diet</title>
                    <img src='https://en.wikipedia.org/wiki/React_Native#/media/File:React-icon.svg' alt='header' height='250' width='1300' >
                </head>
                <body>
                <pre style='font-size: x-large;
                            text-align: center;'>
                    Sesame Ladoo:
            
                    Sesame seeds 150 gm
                    Jaggery desi 75 gm
            
                    Method :
                    Dry roast the sesame seeds, grind it in a coarse mixture.
                    Add water in jaggery, make a jaggery syrup of one thread consistency.
                    Mix the sesame seeds in the jaggery syrup.
                    Make ladoos of medium size.
                    
                    Benefits :
                    Seseame seeds are good source of calcium and phosphorous.
                    Good for arthritis.</pre>
                    <hr>
                </body>"`,
            //File Name
            fileName: 'test',
            //File directory
            directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
        this.setState({ filePath: file.filePath });
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                <TouchableOpacity onPress={this.askPermission.bind(this)}>
                    <View>
                        <Text style={styles.text}>Create PDF</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>{this.state.filePath}</Text>
                <Button onPress={this.onPressButton} title="Share" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F4F4F',
        borderWidth: 1,
        borderColor: '#000',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 16,
    },
    ImageStyle: {
        height: 150,
        width: 150,
        resizeMode: 'stretch',
    },
});