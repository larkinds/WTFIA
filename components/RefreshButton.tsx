import { Pressable, Text, StyleSheet } from 'react-native';

export default function RefreshButton(props: {onPressFunction: () => void}) {
  return (
    <Pressable onPress={props.onPressFunction}>
        <Text accessibilityLabel='Refresh' style={styles.refreshIcon}>&#x21bb;</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    refreshIcon: {
      color: "black",
      position: "relative",
      top: 3,
      fontSize: 20,
    },
});
  