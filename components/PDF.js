import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Button
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
                        title: 'CameraExample App External Storage Write Permission',
                        message:
                            'CameraExample App needs access to Storage data in your SD Card ',
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
    onPressButton() {
        Share.open({
            title: "This is my report ",
            message: "Message:",
            url: "file:///storage/emulated/0/doc/test.pdf",
            subject: "Report",
        })
    }

    onPressAButton() {
        const url = "/storage/emulated/0/docs/test.pdf";
        const title = 'Awesome Contents';
        const message = 'Please check this out.';
        const options = Platform.select({
            ios: {
                activityItemSources: [
                    {
                        placeholderItem: { type: 'url', content: url },
                        item: {
                            default: { type: 'url', content: url },
                        },
                        subject: {
                            default: title,
                        },
                        linkMetadata: { originalUrl: url, url, title },
                    },
                    {
                        placeholderItem: { type: 'text', content: message },
                        item: {
                            default: { type: 'text', content: message },
                            message: null, // Specify no text to share via Messages app.
                        },
                    },
                ],
            },
            default: {
                title,
                subject: title,
                message: `${message} ${url}`,
                url: 'file:///storage/emulated/0/doc/test.pdf'
            },
        });

        Share.open(options);
    }

    async createPDF() {
        let options = {
            //Content to print
            html:
                '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
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
                        <Image
                            //We are showing the Image from online
                            source={{
                                uri:
                                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
                            }}
                            //You can also show the image from you project directory like below
                            //source={require('./Images/facebook.png')}
                            style={styles.ImageStyle}
                        />
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