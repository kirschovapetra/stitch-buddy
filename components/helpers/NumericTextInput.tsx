import {TextInput} from "react-native-paper";
import React from "react";
import { TextInput as NativeTextInput } from "react-native";
import {NumericTextInputProps, TEXTINPUT_MODE} from "@/assets/types";

/**
 *
 * @param value
 * @param label
 * @param setValue
 * @param style
 * @param onBlur
 * @param errorValue
 * @constructor
 */
export function NumericTextInput({value, label, setValue, style, onBlur, errorValue}:NumericTextInputProps) {

    return (
        <TextInput
               mode={TEXTINPUT_MODE}
               dense
               value={""+value}
               label={label}
               style={style}
               onChangeText={x => setValue(Number(x.replace(/[^0-9]/g, '')))}
               render={(props) => <NativeTextInput {...props} keyboardType="numeric"/>}
               error={errorValue !== undefined}
               onBlur={onBlur}

        />
    );
}