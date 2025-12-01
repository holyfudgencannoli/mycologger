// features/Layout/index.tsx
import React from 'react';
import { View } from 'react-native';
import { ImageBG } from "@components/ImageBG";
import { ScreenPrimative } from "@components/ScreenPrimative";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ImageBG image={require('../../assets/bg.jpg')}>
      <ScreenPrimative>
        {/* THIS MUST BE flex: 1 + background transparent */}
        <View style={{ flex: 1, backgroundColor: 'transparent', zIndex: 999 }}>
          {children}
        </View>
      </ScreenPrimative>
    </ImageBG>
  );
}