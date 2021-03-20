import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    item: {
        padding: 10,
    },
});



function FlatListBasics({ tableData }) {

    const [checkedArr, setCheckedArr] = useState([...tableData]);

    const handleCheck = (index) => {
        let tmpCheckedArr = checkedArr;
        tmpCheckedArr[index].checked = !tmpCheckedArr[index].checked;
        setCheckedArr([...tmpCheckedArr]);
    }
    const ItemSeparator = () => <View style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10,
    }}
    />

    const renderItemComponent = (item) =>
        <TouchableOpacity style={styles.container}>
            <CheckBox key={item.key} value={checkedArr[item.key].checked} onChange={() => handleCheck(item.key)}></CheckBox>
            <Text style={styles.item}>{item.sdt}</Text>
            <Text style={styles.item}>{item.content}</Text>
        </TouchableOpacity>

    return (
        <SafeAreaView>

            <FlatList
            style={{marginBottom: 160}}
                ItemSeparatorComponent={ItemSeparator}
                data={tableData}
                renderItem={({ item }) =>
                    renderItemComponent(item)
                }
            />

        </SafeAreaView>
    );
}

export default FlatListBasics;