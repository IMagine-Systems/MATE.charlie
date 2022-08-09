import { View, Image, StyleSheet } from "react-native";
import {useState} from 'react';

export default function CustomRatingBar({data}) {
    // To set the default Star Selected
    const [defaultRating, setDefaultRating] = useState(data.score);
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
                <Image
                    style={styles.starImageStyle}
                    source={
                    item <= defaultRating
                        ? { uri: starImageFilled }
                        : { uri: starImageCorner }
                    }
                />
            );
        })}
        </View>
    );
}

const styles = StyleSheet.create({
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
    },
    starImageStyle: {
        width: 15,
        height: 15,
        resizeMode: 'cover',
    },
});