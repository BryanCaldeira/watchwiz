import { SelectList } from 'react-native-select-bottom-list';
import { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


const SelectInput = (props) => {
  const {
    data,
    value,
    placeHolder,
    onSelect,
  } = props;

  return (
    <>
      <SelectList
        itemTextStyle={{
          textAlign: 'center',
          marginBottom: 10
        }}
        placeHolder={placeHolder ?? "Select category"}
        style={{...selectInputProps.style, ...props?.style}}
        onSelect={(item) => onSelect(item)}
        value={value}
        data={data ?? []}
      />
    </>
  )
}

export default SelectInput;

const selectInputProps = {
  style: StyleSheet.create({
    marginVertical: 20,
    borderRadius: 50,
    padding: 10,
  }),
}
