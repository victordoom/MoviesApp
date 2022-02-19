import React from 'react'
import { Image, View } from 'react-native'

export const Logo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
                source={ require('../assets/logo.png') }
                style={{
                    width: 230,
                    height: 100 
                }}
            />
        </View>
    )
}
