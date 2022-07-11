import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {useState} from 'react';

export default function SelectRating({value, setValue}) {
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    
    const handleChange = (text, eventName, subEventName) => {
        setValue(prev => {
            return {
                ...prev,
                [eventName]: {
                    ...prev[eventName],
                    [subEventName]: text
                }
            }
        })
        console.log(value);
    }

    return (
        <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={item}
                    onPress={() => {
                        setDefaultRating(item);
                        handleChange(item, "LIDData", "score")
                    }}
                >
                    <Image
                        style={styles.starImageStyle}
                        source={
                        item <= defaultRating
                            ? { uri: starImageFilled }
                            : { uri: starImageCorner }
                        }
                    />
                </TouchableOpacity>
            );
        })}
        </View>
    );
}

const styles = StyleSheet.create({
    customRatingBarStyle: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        height: 50,
      },
      starImageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
      },
});