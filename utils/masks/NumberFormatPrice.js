import React from 'react';
import NumberFormat from 'react-number-format';

// deprecated
export default function NumberFormatPrice(props) {
	const { inputRef, onChange, ...other } = props;
	return (
	  <NumberFormat
	    {...other}
	    getInputRef={inputRef}
	    onValueChange={(values) => {
	      onChange({
		target: {
		  name: props.name,
		  value: values.value,
		},
	      });
	    }}
	    thousandSeparator
	    isNumericString
	    prefix='$ '
	  />
	);
      }