import {Text, TextInput} from "react-native-paper";
import React from "react";
import { TextInput as NativeTextInput } from "react-native";
import {Controller} from "react-hook-form";
export function NumericTextInput({control, name, value, label, setValue, errorValue, customValidation=null}:
                                 {control:any, name:any, value:any, label:any, setValue:any, errorValue:any, customValidation?:any}) {

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{
                    validate: () => {
                        if (Number(value) < 0) return "${label} must be a positive number";
                        if (customValidation !== null) return customValidation;
                        return true;
                    }
                }}
                render={(field) => (
                    <TextInput {...field}
                               value={value}
                               mode="outlined"
                               dense
                               label={label}
                               onChangeText={x => setValue(x.replace(/[^0-9]/g, ''))}
                               render={(props) => <NativeTextInput {...props} keyboardType="numeric" />}
                               error={errorValue !== undefined}
                    />
                )}
            />
            {errorValue && <Text style={{ color: 'red' }}>{errorValue.message}</Text>}
        </>
    );
}