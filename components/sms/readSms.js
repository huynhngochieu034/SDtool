import React from 'react';
import { useState } from 'react';
import { Button, Text, View, PermissionsAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';
import TableSms from './table';
import FlatListBasics from './table';

function ReadSms() {

    const getToday = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    const [currentDate, setCurrentDate] = useState(getToday);
    const [tableData, setTableData] = useState([]);

    const requestSMSPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: "Cấp quyền",
                    message:
                        "Cấp quyền đọc tin nhắn ",
                    buttonNeutral: "Hỏi lại sau",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getSMS();
            } else {

            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getSMS = () => {
        setTableData([]);
        let newdate = currentDate;
        newdate = newdate.split("-").reverse().join("-");
        //newdateAdd = newdate.split("-").reverse().join("-");

        let filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // read: 0, // 0 for unread SMS, 1 for SMS already read
            // body: 'How are you shadman', // content to match
            minDate: new Date(newdate + "T16:30").getTime() - 86340000,
            maxDate: new Date(newdate + "T16:30").getTime(),
            // indexFrom: 0, // start from index 0
            // maxCount: 10, // count of SMS to return each time
        };
        console.log(filter.maxDate, filter.minDate);
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('Count: ', count);
                console.log('List: ', smsList);
                let arr = JSON.parse(smsList);
                let dtTable = [];
                let obj = {};

                arr.forEach(function (object, index) {
                    obj = {
                        key: index,
                        sdt: object.address,
                        content: object.body,
                        checked: false
                    }

                    dtTable.push(obj);
                    //console.log('Object: ' + object);
                    console.log('-->' + object.address);
                    //console.log('-->' + object.body);
                    //alert('your message with selected id is --->' + object.body)
                });
                setTableData([...dtTable]);
            },
        );
    }

    return (
        <View style={{ marginTop: 10 }}>
            <DatePicker
                style={{ width: 200 }}
                date={currentDate}
                mode="date"
                placeholder="Chọn ngày"
                format="DD-MM-YYYY"
                confirmBtnText="Xác nhận"
                cancelBtnText="Hủy"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { setCurrentDate(date) }}
            />
            <Button title="Tìm tin nhắn" onPress={requestSMSPermission}></Button>
            {tableData.length >= 1 ? <FlatListBasics tableData={tableData}></FlatListBasics> : <></>}
            
        </View>
    );
};
export default ReadSms;