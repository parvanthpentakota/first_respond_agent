import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function App() {
  const [isActive, setIsActive] = useState(false);

  const handleSOS = () => {
    setIsActive(true);
    Alert.alert(
      "EMERGENCY SENT",
      "Deploying local responders to your coordinates.",
      [{ text: "OK", onPress: () => setIsActive(false) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Responder UI</Text>
        <Text style={styles.subHeaderText}>Mobile Dispatch Center</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.mapProxy}>
          <Text style={styles.mapText}>Live GPS Map Rendered Here</Text>
        </View>

        <TouchableOpacity 
          style={[styles.sosButton, isActive && styles.sosActive]}
          onPress={handleSOS}
          activeOpacity={0.8}
        >
          <Text style={styles.sosText}>🚨 EMERGENCY SOS</Text>
          <Text style={styles.sosSub}>Tap to dispatch instantly</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  mapProxy: {
    height: 300,
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  mapText: {
    color: '#64748b',
    fontWeight: '600',
  },
  sosButton: {
    backgroundColor: '#ef4444',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  sosActive: {
    backgroundColor: '#dc2626',
    transform: [{ scale: 0.98 }],
  },
  sosText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sosSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
  },
});
