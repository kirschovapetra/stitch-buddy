import {TextInput} from "react-native-paper";
import React from "react";
import { TextInput as NativeTextInput } from "react-native";
export function NumericTextInput({value, label, setValue, style, onBlur, errorValue}:
                                 {value:any, label?:any, setValue:any, errorValue?:any, style?:any, onBlur?:any}) {

    return (
        <TextInput
               value={value}
               mode="outlined"
               dense
               label={label}
               style={style}
               onChangeText={x => setValue(x.replace(/[^0-9]/g, ''))}
               render={(props) => <NativeTextInput {...props} keyboardType="numeric"/>}
               error={errorValue !== undefined}
               onBlur={onBlur}
        />
    );
}