import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-banner-carousel";

export default function CustomCarousel(props) {
    const { arrayImages, height, width } = props;

    return (
        <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={width}
            pageIndicatorStyle={styles.indicator}
            activePageIndicatorStyle={styles.indicatorActive}
        >
            {arrayImages.map(imageUrl => (
                <View key={imageUrl}>
                    <Image
                        style={{ width, height }}
                        source={{ uri: imageUrl }}
                    />
                </View>
            ))}
        </Carousel>
    );
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: "#00A680"
    },
    indicatorActive: {
        backgroundColor: "#00FFC5"
    }
});
