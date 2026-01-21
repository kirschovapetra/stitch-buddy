import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {styles} from "@/assets/styles";
import React from "react";
import ProjectDetail from "@/components/ui/ProjectDetail";

export default function Project() {
  return (
      <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
              <ProjectDetail/>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}
