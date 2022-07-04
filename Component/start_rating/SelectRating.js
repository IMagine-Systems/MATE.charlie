import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {useState} from 'react';

export default function SelectRating() {
    // To set the default Star Selected
    const [defaultRating, setDefaultRating] = useState(0);
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    // Filled Star. You can also give the path from local
    const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    
    return (
        <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={item}
                    onPress={() => setDefaultRating(item)}
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
      },
      starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
      },
});