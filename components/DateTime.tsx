import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTime({
  date,
  mode,
  show,
  onChange,
}: {
  date: Date;
  mode: any;
  show: boolean;
  onChange: (e: any, d: any) => void;
}) {
  
  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}
